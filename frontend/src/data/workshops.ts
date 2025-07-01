export interface Workshop {
  id: number;
  title: string;
  description: string;
  date: string;
  time: string;
  location: string;
  image: string;
  tags: string[];
}

export const workshops: Workshop[] = [
  {
    id: 1,
    title: "Praxis ‘24: Robotics Event",
    description: "Praxis’ 24 showcased cutting-edge robotics through four dynamic challenges, from Robo Soccer to autonomous maze-solving. The event celebrated innovation, with Tinkerer’s Lab ECS honoring top performers for their skill and creativity.",
    date: "2024-03-06 ",
    time: "2:00 PM - 5:00 PM",
    location: "Amphitheater, 2nd Floor",
    image: "/workshops/praxis.jpg",
    tags: ["Electronics", "Beginner"]
  },
  {
    id: 2,
    title: "Machine Learning Basics",
    description: "Get started with Python and scikit-learn to build your first machine learning models.",
    date: "2023-12-22",
    time: "10:00 AM - 1:00 PM",
    location: "Lab 205, 2nd Floor",
    image: "/images/workshops/ml.jpg",
    tags: ["AI", "Python", "Intermediate"]
  },
  {
    id: 3,
    title: "3D Printing Workshop",
    description: "From design to print - learn how to create 3D models and operate our lab's 3D printers.",
    date: "2023-11-29",
    time: "3:00 PM - 6:00 PM",
    location: "Maker Space, 1st Floor",
    image: "/images/workshops/3dprinting.jpg",
    tags: ["Maker", "Hardware"]
  },
  {
    id: 4,
    title: "Web Development Bootcamp",
    description: "Build responsive websites using HTML, CSS, and JavaScript in this intensive 3-day workshop.",
    date: "2023-11-20",
    time: "9:00 AM - 4:00 PM",
    location: "Computer Lab 3",
    image: "/images/workshops/webdev.jpg",
    tags: ["Programming", "Beginner"]
  },
  {
    id: 5,
    title: "IoT with Raspberry Pi",
    description: "Connect sensors and build smart devices using Raspberry Pi and cloud services.",
    date: "2023-12-13",
    time: "1:00 PM - 5:00 PM",
    location: "Lab 201, 2nd Floor",
    image: "/images/workshops/iot.jpg",
    tags: ["Electronics", "Intermediate"]
  },
  {
    id: 6,
    title: "Advanced PCB Design",
    description: "Learn professional PCB design techniques using industry-standard software.",
    date: "2023-11-15",
    time: "10:00 AM - 3:00 PM",
    location: "Electronics Lab",
    image: "/images/workshops/pcb.jpg",
    tags: ["Hardware", "Advanced"]
  }
];