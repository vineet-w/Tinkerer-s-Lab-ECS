export interface Workshop {
  id: number;
  title: string;
  description: string;
  startDate: string;
  endDate?: string;          // ✅ Supports multi-day events
  time: string;
  location: string;
  image: string;
  tags: string[];
  registrationLink?: string; // ✅ Optional registration link
}

export const workshops: Workshop[] = [
  {
    id: 1,
    title: "Tinkerthon",
    description:
      "A rapid prototyping hackathon where teams build, test, and showcase innovative tech solutions.",
    startDate: "2025-04-16",
    time: "1:00 PM - 4:00 PM",
    location: "Lab B22, Second Floor",
    image: "/workshops/tinkerthon.jpg",
    tags: ["Hackathon", "Maker", "All Levels"],
    registrationLink: "https://example.com/register/tinkerthon" // ✅ Example
  },
  {
    id: 2,
    title: "Nex-IoT",
    description:
      "Step into the future with advanced IoT concepts and real-world smart device integration.",
    startDate: "2024-03-19",
    time: "2:30 PM - 5:00 PM",
    location: "B62, 2nd Floor",
    image: "/workshops/nexiot.jpg",
    tags: ["IoT", "Advanced"],
    // No registration link → will show "Registration Not Open Yet"
  },
  {
    id: 3,
    title: "IoT Workshop",
    description:
      "Explore the Internet of Things by connecting sensors and devices to the cloud.",
    startDate: "2024-09-25",
    time: "3:30 PM - 5:00 PM",
    location: "B52, 2nd Floor",
    image: "/workshops/iot2.jpg",
    tags: ["IoT", "Electronics", "Intermediate"],
    registrationLink: "https://example.com/register/iot"
  },
  {
    id: 4,
    title: "Arduino Workshop",
    description:
      "Learn to program Arduino boards and create interactive electronic projects from scratch.",
    startDate: "2024-09-19",
    time: "1:00 PM - 5:00 PM",
    location: "B21, 2nd Floor",
    image: "/workshops/arduino.jpg",
    tags: ["Electronics", "Arduino", "Beginner"]
  },
  {
    id: 5,
    title: "Electronics workshop'24",
    description:
      "Dive into the fundamentals of electronics with hands-on circuit building and real-world applications.",
    startDate: "2024-08-08",
    time: "3:00 PM - 5:00 PM",
    location: "B21, 2nd Floor",
    image: "/workshops/electronics.jpg",
    tags: ["Electronics", "Beginner"]
  },
  {
    id: 6,
    title: "Praxis ‘24: Robotics Event",
    description:
      "Praxis’ 24 showcased cutting-edge robotics through four dynamic challenges, from Robo Soccer to autonomous maze-solving. The event celebrated innovation, with Tinkerer’s Lab ECS honoring top performers for their skill and creativity.",
    startDate: "2024-03-06",
    time: "2:00 PM - 5:00 PM",
    location: "Amphitheater, 2nd Floor",
    image: "/workshops/praxis.jpg",
    tags: ["Electronics", "Beginner"]
  },
  {
    id: 7,
    title: "DevOps Fundamentals",
    description:
      "Master Git, CI/CD, and DevSecOps for modern software delivery. Explore cloud platforms (AWS/GCP/Azure) and infrastructure as code. Understand GitOps, SRE practices, and effective monitoring tools like Prometheus & Grafana.",
    startDate: "2025-07-21",
    endDate: "2025-07-25",
    time: "All 5 days, 8:30 PM onwards",
    location:
      "B61 (Second Floor), Vivekanand Education Society’s Institute of Technology",
    image: "/workshops/devops.jpg",
    tags: ["DevOps", "Cloud", "Intermediate"],
    registrationLink: "https://forms.gle/zkrySnZnKyDs3Fmq8"
  },
  {
    id: 8,
    title: "Fusion 2.0",
    description:
      "Build projects, launch websites, earn certificates and goodies, and get a chance to be a part of Tinkerer's Lab ECS this year.",
    startDate: "2025-07-21",
    endDate: "2025-07-25",
    time: "All 5 days, 1:00 PM onwards",
    location:
      "B21 (Second Floor), Vivekanand Education Society’s Institute of Technology",
    image: "/workshops/fusion2.jpg",
    tags: ["Web Development", "Projects", "Beginner"],
    registrationLink: "https://forms.gle/gatmUmy56CMfDAdS9"
  }
];
