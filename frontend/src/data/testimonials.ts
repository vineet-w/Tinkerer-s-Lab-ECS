export type Testimonial = {
  id: number;
  name: string;
  role: string;
  content: string;
  avatar: string;
};

export const testimonials: Testimonial[] = [
  {
    id: 1,
    name: "Alex Johnson",
    role: "Robotics Team Lead",
    content: "Tinkerer's Lab gave me the resources and mentorship to turn my prototype into a market-ready product. The community here is unparalleled!",
    avatar: "/avatar1.jpg"
  },
  {
    id: 2,
    name: "Priya Sharma",
    role: "AI Research Intern",
    content: "The workshops here transformed my understanding of machine learning. I went from beginner to building complex models in just 3 months.",
    avatar: "/avatar2.jpg"
  },
  {
    id: 3,
    name: "Sukanya Pingle",
    role: "Operations Head (2024-25)",
    content: "Serving as Operations Head of the Tinkerers' Lab ECS Council was an enriching experience, where I organized technical workshops on IoT, Arduino, and core electronics, and helped lead Tinkerthon—a hands-on hackathon tackling real-world challenges.",
    avatar: "/avatar3.jpg"
  }
];