import './style.css';

document.addEventListener("DOMContentLoaded", fetchCourses);

// Interface for courses
interface CourseInfo {
  code: number;
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
      const courses: CourseInfo[] = await response.json();

      localStorage.setItem("courses", JSON.stringify(courses));
    } catch (error) {
      console.error("Course fetch failed:", error)
    }
  }
  showCourses(courses);
}

/* Function to delete a course from the list */
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


/* Function to add a new course to the list */

function addCourse() {

}

