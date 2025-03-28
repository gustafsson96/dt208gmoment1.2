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
 * Function that displays courses to the screen

function showCourses() {

}
*/ 

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
