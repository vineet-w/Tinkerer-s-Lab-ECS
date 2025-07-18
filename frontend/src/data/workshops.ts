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
    id: 11,
    title: "Tinkerthon",
    description: "A rapid prototyping hackathon where teams build, test, and showcase innovative tech solutions.",
    date: "2025-04-16",
    time: "1:00 PM - 4:00 PM",
    location: "Lab B22, Second Floor",
    image: "/workshops/tinkerthon.jpg",
    tags: ["Hackathon", "Maker", "All Levels"]
  },
  {
    id: 10,
    title: "Nex-IoT",
    description: "Step into the future with advanced IoT concepts and real-world smart device integration.",
    date: "2024-03-19",
    time: "2:30 PM - 5:00 PM",
    location: "B62, 2nd Floor",
    image: "/workshops/nexiot.jpg",
    tags: ["IoT", "Advanced"]
  },
  {
    id: 9,
    title: "IoT Workshop",
    description: "Explore the Internet of Things by connecting sensors and devices to the cloud.",
    date: "2024-09-25",
    time: "3:30 PM - 5:00 PM",
    location: "B52, 2nd Floor",
    image: "/workshops/iot2.jpg",
    tags: ["IoT", "Electronics", "Intermediate"]
  },
  {
    id: 8,
    title: "Arduino Workshop",
    description: "Learn to program Arduino boards and create interactive electronic projects from scratch.",
    date: "2024-09-19",
    time: "1:00 PM - 5:00 PM",
    location: "B21, 2nd Floor",
    image: "/workshops/arduino.jpg",
    tags: ["Electronics", "Arduino", "Beginner"]
  },
  {
    id: 7,
    title: "Electronics workshop'24",
    description: "Dive into the fundamentals of electronics with hands-on circuit building and real-world applications.",
    date: "2024-08-08",
    time: "3:00 PM - 5:00 PM",
    location: "B21, 2nd Floor",
    image: "/workshops/electronics.jpg",
    tags: ["Electronics", "Beginner"]
  },
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