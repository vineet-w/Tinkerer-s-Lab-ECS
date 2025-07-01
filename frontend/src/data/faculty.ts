export interface FacultyMember {
  name: string;
  role: string;
  department: string;
  image: string;
}

export const faculty: FacultyMember[] = [
  {
    name: "Mr. Yogesh Pandit",
    role: "Faculty In-Charge",
    department: "Electronics & Computer Science",
    image: "/team/yp.jpg"
  }
];