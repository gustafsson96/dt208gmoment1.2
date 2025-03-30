import './style.css';

const app = document.querySelector<HTMLDivElement>('#app');
app!.innerHTML = '<h1>Hello, TypeScript!</h1>';

// Interface for courses
interface CourseInfo {
  code: number;
  name: string;
  progression: "A" | "B" | "C";
  syllabus: string;
}

/**
 * Function to fetch courses from API only when local storage is empty
 */
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

/**
 * Function that displays courses to the screen
*/
function showCourses(courses: CourseInfo[]): void {
  const courseList = document.getElementById("course-list") as HTMLUListElement;
}


/**
 * Function to add a new course to the list

function addCourse() {

}
*/

/**
 * Function to delete a course from the list

function removeCourse() {

}
*/
