import { JSX } from 'react';
import { FiCpu, FiCode, FiBookOpen, FiAward, FiMessageSquare } from 'react-icons/fi';

export type Section = {
  title: string;
  href: string;
  icon: JSX.Element;
  description: string;
  color: string;
};

export const sections: Section[] = [
  { 
    title: "Workshops", 
    href: "/workshops", 
    icon: <FiCpu size={28} />,
    description: "Hands-on sessions to boost your skills",
    color: "from-purple-500 to-pink-500"
  },
  { 
    title: "Resources", 
    href: "/resources", 
    icon: <FiCode size={28} />,
    description: "Curated tools and references",
    color: "from-blue-500 to-teal-500"
  },
  { 
    title: "Study Materials", 
    href: "/materials", 
    icon: <FiBookOpen size={28} />,
    description: "Learning resources for all levels",
    color: "from-green-500 to-emerald-500"
  },
  { 
    title: "About Us", 
    href: "/about-us", 
    icon: <FiBookOpen size={28} />,
    description: "Get to know us",
    color: "from-green-500 to-emerald-500"
  },
  // { 
  //   title: "Projects", 
  //   href: "/projects", 
  //   icon: <FiAward size={28} />,
  //   description: "Innovative creations from our community",
  //   color: "from-yellow-500 to-orange-500"
  // },
  { 
    title: "Competitions", 
    href: "/competitions", 
    icon: <FiMessageSquare size={28} />,
    description: "Upcoming challenges and events",
    color: "from-red-500 to-pink-500"
  },
];