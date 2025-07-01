export interface StudentMember {
  name: string;
  year: string;
  department: string;
  role: string;
  image: string;
  teamType: "BE" | "TE"; // New property to distinguish teams
}

export const studentTeam: StudentMember[] = [
  // B.E. Team (Final Year)
  {
    name: "Srushti Pawar",
    year: "Final Year",
    department: "ECS",
    role: "Head",
    image: "/team/srushti.jpg",
    teamType: "BE"
  },
  {
    name: "Vineet Wagh",
    year: "Final Year",
    department: "ECS",
    role: "Deputy Head",
    image: "/team/vineet.jpeg",
    teamType: "BE"
  },
  {
    name: "Anushka Shinde",
    year: "Final Year",
    department: "ECS",
    role: "Technical Head",
    image: "/team/anushka.jpg",
    teamType: "BE"
  },
  {
    name: "Prajwal Kudapane",
    year: "Final Year",
    department: "ECS",
    role: "Technical Head",
    image: "/team/prajwal.jpg",
    teamType: "BE"
  },
  {
    name: "Riddhi Buva",
    year: "Final Year",
    department: "ECS",
    role: "Operations Head",
    image: "/team/riddhi.jpeg",
    teamType: "BE"
  },
  {
    name: "Ritika Zare",
    year: "Final Year",
    department: "ECS",
    role: "Operations Head",
    image: "/team/ritika.jpg",
    teamType: "BE"
  },
  {
    name: "Purvi Prasad",
    year: "Final Year",
    department: "ECS",
    role: "Creative Head",
    image: "/team/purvi.jpg",
    teamType: "BE"
  },
  {
    name: "Sneha Patil",
    year: "Final Year",
    department: "ECS",
    role: "Finance Head",
    image: "/team/sneha.jpg",
    teamType: "BE"
  },
  {
    name: "Kalpesh Rathod",
    year: "Final Year",
    department: "ECS",
    role: "Public Relations Head",
    image: "/team/kalpesh.jpg",
    teamType: "BE"
  },
  
  // T.E. Team (Third Year)
  {
    name: "Prasanna Nadgauda",
    year: "Third Year",
    department: "ECS",
    role: "Sr. Operations Officer",
    image: "/team/Prasanna.jpg", // Add actual image path
    teamType: "TE"
  },
  {
    name: "Maitrey Khedekar",
    year: "Third Year",
    department: "ECS",
    role: "Sr. Technical Officer",
    image: "/team/maitrey.jpg", // Add actual image path
    teamType: "TE"
  },
  {
    name: "Aastha Poojary",
    year: "Third Year",
    department: "ECS",
    role: "Sr. Public Relations Officer",
    image: "/team/aastha.png", // Add actual image path
    teamType: "TE"
  },
  {
    name: "Idhant Raje",
    year: "Third Year",
    department: "ECS",
    role: "Sr. Public Relations Officer",
    image: "/team/idhant.jpg", // Add actual image path
    teamType: "TE"
  },
  {
    name: "Atharva Chawrekar",
    year: "Third Year",
    department: "ECS",
    role: "Sr. Technical Officer",
    image: "/team/atharva.jpg", // Add actual image path
    teamType: "TE"
  },
  {
    name: "Yash Mandhare",
    year: "Third Year",
    department: "ECS",
    role: "Sr. Operations Officer",
    image: "/team/yash.png", // Add actual image path
    teamType: "TE"
  },
  {
    name: "Lucky Lalwani",
    year: "Third Year",
    department: "ECS",
    role: "Sr. Graphics Officer",
    image: "/team/lucky.jpg", // Add actual image path
    teamType: "TE"
  },
  {
    name: "Anshul Patil",
    year: "Third Year",
    department: "ECS",
    role: "Sr. Graphics Officer",
    image: "/team/anshul.png", // Add actual image path
    teamType: "TE"
  }
];