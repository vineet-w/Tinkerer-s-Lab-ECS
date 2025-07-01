import { FiTool } from 'react-icons/fi';

interface BaseResourceItem {
  name: string;
  description: string;
  link: string;
  type: 'download' | 'external';
  icon: string;
}

interface HardwareResourceItem extends BaseResourceItem {
  available: number;
  location: string;
}

export type ResourceItem = BaseResourceItem | HardwareResourceItem;

export interface ResourceCategory {
  title: string;
  icon?: React.ReactNode;
  items: ResourceItem[];
}

export const resourceCategories: ResourceCategory[] = [
    {
      title: "Hardware Components",
      icon: <FiTool className="mr-2" />,
      items: [
        {
          name: "Arduino Starter Kit",
          description: "Complete kit with Uno board, sensors, and components",
          link: "/resources/arduino-kit-list.pdf",
          type: "download",
          icon: "/icons/arduino-kit.png",
          available: 15,
          location: "Cabinet A1"
        },
        {
          name: "Raspberry Pi 4",
          description: "Model B with 4GB RAM - perfect for IoT projects",
          link: "/resources/pi-specs.pdf",
          type: "download",
          icon: "/icons/raspberry-pi.png",
          available: 8,
          location: "Cabinet B2"
        },
        {
          name: "Sensor Collection",
          description: "Temperature, humidity, motion, and light sensors",
          link: "/resources/sensors-guide.pdf",
          type: "download",
          icon: "/icons/sensor-kit.png",
          available: 12,
          location: "Drawer C3"
        },
        {
          name: "3D Printer Filaments",
          description: "PLA, ABS, and PETG in various colors",
          link: "/resources/filament-chart.pdf",
          type: "download",
          icon: "/icons/filament-spool.png",
          available: 20,
          location: "Storage Room"
        },
        {
          name: "Basic Electronics Kit",
          description: "Resistors, capacitors, LEDs, and breadboards",
          link: "/resources/electronics-kit.pdf",
          type: "download",
          icon: "/icons/electronics-kit.png",
          available: 10,
          location: "Cabinet A2"
        },
        {
          name: "Motor & Driver Set",
          description: "DC motors, servos, and motor drivers",
          link: "/resources/motors-guide.pdf",
          type: "download",
          icon: "/icons/motor-kit.png",
          available: 6,
          location: "Cabinet B3"
        }
      ]
    },
    {
      title: "Software Tools",
      items: [
        {
          name: "Arduino IDE",
          description: "Official IDE for Arduino development",
          link: "https://www.arduino.cc/en/software",
          type: "external",
          icon: "/icons/arduino.png"
        },
        {
          name: "VS Code",
          description: "Popular code editor with extensive extensions",
          link: "https://code.visualstudio.com/download",
          type: "external",
          icon: "/icons/vscode.png"
        },
        {
          name: "Fusion 360",
          description: "Professional 3D CAD/CAM design tool",
          link: "https://www.autodesk.com/products/fusion-360",
          type: "external",
          icon: "/icons/fusion360.png"
        }
      ]
    },
    {
      title: "Learning Resources",
      items: [
        {
          name: "Python Crash Course",
          description: "Quick reference for Python programming",
          link: "/resources/python-guide.pdf",
          type: "download",
          icon: "/icons/python.png"
        },
        {
          name: "Electronics Fundamentals",
          description: "Basic circuits and components guide",
          link: "/resources/electronics.pdf",
          type: "download",
          icon: "/icons/electronics.png"
        },
        {
          name: "Git & GitHub Tutorial",
          description: "Version control for collaborative projects",
          link: "https://guides.github.com/activities/hello-world/",
          type: "external",
          icon: "/icons/github.png"
        }
      ]
    },
    {
      title: "Templates",
      items: [
        {
          name: "Project Proposal",
          description: "Template for new project submissions",
          link: "/resources/project-proposal.docx",
          type: "download",
          icon: "/icons/proposal.png"
        },
        {
          name: "Lab Report",
          description: "Standard format for experiment documentation",
          link: "/resources/lab-report.docx",
          type: "download",
          icon: "/icons/report.png"
        },
        {
          name: "Poster Template",
          description: "Conference poster design template",
          link: "/resources/poster-template.pptx",
          type: "download",
          icon: "/icons/poster.png"
        }
      ]
    }
];