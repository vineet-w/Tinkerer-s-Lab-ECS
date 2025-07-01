import { JSX } from 'react';
import { FiUsers, FiAward, FiCode } from 'react-icons/fi';

export interface UniqueFeature {
  title: string;
  description: string;
  icon: JSX.Element;
}

export const uniqueFeatures: UniqueFeature[] = [
  {
    title: "Student-Driven",
    description: "Our lab is primarily run by students, for students, ensuring that activities and resources meet actual student needs and interests.",
    icon: <FiUsers />
  },
  {
    title: "Project-Based Learning",
    description: "We emphasize learning by doing, with students working on real projects that solve practical problems.",
    icon: <FiAward />
  },
  {
    title: "Cutting-Edge Tech",
    description: "We provide access to the latest technologies and tools in electronics and computer science.",
    icon: <FiCode />
  }
];