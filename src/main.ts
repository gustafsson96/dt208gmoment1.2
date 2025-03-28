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