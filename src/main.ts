import './style.css';

document.addEventListener("DOMContentLoaded", () => {
  fetchCourses();
  
  const form = document.getElementById("add-course-form") as HTMLFormElement;
  form.addEventListener("submit", addCourse);

  document.getElementById("reset-btn")!.addEventListener("click", resetCourses);
});

// Interface for courses
interface CourseInfo {
  code: string;
  coursename: string;
  progression: "A" | "B" | "C";
  syllabus: string;
}

/* Function to fetch courses from API only when local storage is empty */
async function fetchCourses(): Promise<void> {
  let courses: CourseInfo[] = JSON.parse(localStorage.getItem("courses") || "[]");

  if (courses.length === 0) {
    try {
      const response = await fetch("https://webbutveckling.miun.se/files/ramschema_ht24.json");
      courses = await response.json();

      localStorage.setItem("courses", JSON.stringify(courses));
    } catch (error) {
      console.error("Course fetch failed:", error)
    }
  }
  showCourses(courses);
}

/* Function to add a new course to the list */
function addCourse(event: Event): void {
  event.preventDefault();

  // Get form and inputs
  const form = document.getElementById("add-course-form") as HTMLFormElement;
  const courseCodeInput = document.getElementById("course-code") as HTMLInputElement;
  const courseCode = courseCodeInput.value;
  const courseNameInput = document.getElementById("course-name") as HTMLInputElement;
  const courseName = courseNameInput.value;
  const courseProgressionInput = document.getElementById("course-progression") as HTMLInputElement;
  const courseProgression = courseProgressionInput.value as "A" | "B" | "C";
  const syllabusInput = document.getElementById("course-syllabus") as HTMLInputElement;
  const courseSyllabus = syllabusInput.value;

  // Get courses from local storage
  let courses: CourseInfo[] = JSON.parse(localStorage.getItem("courses") || "[]");

  // Check if course code is unique
  const isCodeUnique = !courses.some(course => course.code === courseCode);
  if (!isCodeUnique) {
    alert("Kurskoden måste vara unik.");
    return;
  }

  // Check if course code is 6 chars
  if (courseCode.length !== 6) {
    alert("Kurskoden måste innehålla 6 tecken.");
    return;
  }

  // Check if progression is A, B or C
  if (!["A", "B", "C"].includes(courseProgression)) {
    alert("Kursprogression måste vara A, B eller C.");
    return;
  }

  // New course object
  const newCourse: CourseInfo = {
    code: courseCode,
    coursename: courseName,
    progression: courseProgression, 
    syllabus: courseSyllabus,
  };


  // Add new course
  courses.push(newCourse);

  // Update list of courses to local storage
  localStorage.setItem("courses", JSON.stringify(courses));

  // Clear form after submit
  form.reset();

  showCourses(courses);
}

/* Function to remove a course from the list */
function removeCourse(index: number): void {
  let courses: CourseInfo[] = JSON.parse(localStorage.getItem("courses") || "[]");

  courses.splice(index, 1);
  localStorage.setItem("courses", JSON.stringify(courses));

  showCourses(courses);
}

/* Function that displays courses to the screen */
function showCourses(courses: CourseInfo[]): void {
  const courseBody = document.getElementById("course-body") as HTMLTableElement;
  courseBody.innerHTML = "";

  courses.forEach((course, index) => {
    const row = document.createElement("tr");

    row.innerHTML = `
    <td>${course.code}</td>
    <td>${course.coursename}</td>
    <td>${course.progression}</td>
    <td><a href="${course.syllabus}" target="_blank" class="syllabus-link">View Syllabus</a></td>
    <td><button class="remove-btn" data-index="${index}">Remove</button></td>
    `;

    courseBody.appendChild(row);
  });

courseBody.addEventListener("click", (event) => {
  const target = event.target as HTMLButtonElement;
  if (target && target.classList.contains("remove-btn")) {
    const index = Number(target.getAttribute("data-index"));
    removeCourse(index);
  }
});
}

function resetCourses(): void {
  localStorage.removeItem("courses");
  fetchCourses();
}

