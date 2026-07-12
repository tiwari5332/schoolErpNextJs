// features/landing/constants.ts
// All static data arrays live here — module-level, created once, never recreated on re-render.
import {
  GraduationCap, Users, BarChart3, MessageSquare, Calendar,
  TrendingUp, Shield, Zap, Clock, Award,
  Smartphone, Brain, Heart, BookOpen, DollarSign,
  Video, Bell, Camera, Wallet,
} from "lucide-react";
import type { Feature, Stat, PricingPlan, Testimonial, Benefit, PortalShowcase } from "@/types/landing";

export const FEATURES: Feature[] = [
  { icon: Users,        title: "Student Management",   description: "Complete student information system with attendance tracking, grade management, and performance analytics.", color: "indigo"  },
  { icon: GraduationCap,title: "Academic Excellence",  description: "Comprehensive test scoring, homework tracking, and curriculum management tools for better learning outcomes.", color: "purple"  },
  { icon: MessageSquare,title: "Parent Portal",        description: "Real-time communication between parents and teachers with instant notifications and progress updates.",       color: "emerald" },
  { icon: Brain,        title: "AI Analytics",         description: "Predictive insights, performance forecasting, and intelligent recommendations powered by advanced AI.",       color: "cyan"    },
  { icon: Wallet,       title: "Finance Management",   description: "Complete fee management, payment tracking, budget monitoring, and financial reporting system.",                color: "amber"   },
  { icon: Calendar,     title: "Timetable & Events",   description: "Automated timetable generation, event scheduling, and calendar management for entire institution.",           color: "rose"    },
  { icon: Video,        title: "Virtual Classrooms",   description: "Integrated video conferencing, online assignments, and digital learning resources.",                          color: "indigo"  },
  { icon: Camera,       title: "Photo Galleries",      description: "School event galleries, achievement showcases, and memory preservation system.",                              color: "purple"  },
  { icon: BarChart3,    title: "Advanced Reports",     description: "Comprehensive reporting suite with customizable dashboards and data export capabilities.",                    color: "emerald" },
  { icon: Smartphone,   title: "Mobile Apps",          description: "Native mobile applications for iOS and Android for teachers, parents, and students.",                        color: "cyan"    },
  { icon: Bell,         title: "Smart Notifications",  description: "Automated alerts for attendance, grades, fees, events, and important announcements.",                        color: "amber"   },
  { icon: Shield,       title: "Security & Privacy",   description: "Enterprise-grade security with data encryption, role-based access, and compliance management.",              color: "rose"    },
];

export const STATS: Stat[] = [
  { value: "1000+", label: "Schools",   icon: GraduationCap },
  { value: "500K+", label: "Students",  icon: Users          },
  { value: "50K+",  label: "Teachers",  icon: Award          },
  { value: "99.9%", label: "Uptime",    icon: Zap            },
];

export const PRICING_PLANS: PricingPlan[] = [
  {
    name: "Starter",
    price: { monthly: 99, yearly: 990 },
    description: "Perfect for small schools getting started",
    color: "indigo",
    popular: false,
    features: [
      { name: "Up to 500 students",     included: true  },
      { name: "Student management",     included: true  },
      { name: "Attendance tracking",    included: true  },
      { name: "Parent portal",          included: true  },
      { name: "Basic reporting",        included: true  },
      { name: "Email support",          included: true  },
      { name: "AI analytics",           included: false },
      { name: "Finance management",     included: false },
      { name: "Mobile apps",            included: false },
      { name: "Custom branding",        included: false },
      { name: "API access",             included: false },
      { name: "Dedicated support",      included: false },
    ],
  },
  {
    name: "Professional",
    price: { monthly: 249, yearly: 2490 },
    description: "Most popular for growing institutions",
    color: "emerald",
    popular: true,
    features: [
      { name: "Up to 2000 students",        included: true  },
      { name: "Student management",         included: true  },
      { name: "Attendance tracking",        included: true  },
      { name: "Parent portal",             included: true  },
      { name: "Advanced reporting",         included: true  },
      { name: "Priority email support",     included: true  },
      { name: "AI analytics",               included: true  },
      { name: "Finance management",         included: true  },
      { name: "Mobile apps",               included: true  },
      { name: "Custom branding",           included: true  },
      { name: "API access",                included: false },
      { name: "Dedicated support",         included: false },
    ],
  },
  {
    name: "Enterprise",
    price: null,
    description: "Custom solutions for large institutions",
    color: "purple",
    popular: false,
    features: [
      { name: "Unlimited students",              included: true },
      { name: "Student management",              included: true },
      { name: "Attendance tracking",             included: true },
      { name: "Parent portal",                  included: true },
      { name: "Custom reporting",               included: true },
      { name: "24/7 phone & email support",     included: true },
      { name: "AI analytics & insights",        included: true },
      { name: "Finance management",             included: true },
      { name: "Mobile apps (white-label)",      included: true },
      { name: "Full custom branding",           included: true },
      { name: "Full API access",               included: true },
      { name: "Dedicated account manager",      included: true },
    ],
  },
];

export const TESTIMONIALS: Testimonial[] = [
  {
    name: "Dr. Sarah Johnson",
    role: "Principal, Greenwood Academy",
    content: "EduTrio has transformed how we manage our school. The AI analytics help us identify at-risk students early, and parents love the real-time communication features.",
    rating: 5,
    image: "👩‍💼",
  },
  {
    name: "Michael Chen",
    role: "IT Director, Riverside School District",
    content: "Implementation was smooth, and the support team is outstanding. The finance module alone has saved us countless hours of manual work.",
    rating: 5,
    image: "👨‍💻",
  },
  {
    name: "Emily Rodriguez",
    role: "Teacher, Summit High School",
    content: "As a teacher, I appreciate how intuitive the platform is. Grading, attendance, and parent communication are now effortless.",
    rating: 5,
    image: "👩‍🏫",
  },
];

export const BENEFITS: Benefit[] = [
  { icon: Clock,      title: "Save 20+ Hours Weekly",       description: "Automate routine tasks and focus on what matters most - teaching and learning." },
  { icon: TrendingUp, title: "Improve Student Outcomes",    description: "Data-driven insights help identify and support struggling students early."          },
  { icon: Heart,      title: "Increase Parent Engagement",  description: "Real-time updates and easy communication strengthen school-home connections."       },
  { icon: DollarSign, title: "Reduce Administrative Costs", description: "Streamline operations and reduce manual paperwork by up to 70%."                    },
];

export const PORTAL_SHOWCASES: PortalShowcase[] = [
  {
    badge: "Admin Portal",
    badgeColor: "indigo",
    badgeIcon: Users,
    title: "Comprehensive Administrative Control",
    description: "Manage your entire institution from a single, powerful dashboard. Track student performance, monitor attendance, analyze trends, and make data-driven decisions with AI-powered insights.",
    items: [
      "Real-time analytics and reporting with customizable dashboards",
      "Complete student and staff management system",
      "AI-powered predictive insights and recommendations",
    ],
    ctaLabel: "Explore Admin Portal",
    ctaColor: "indigo",
    imageSrc: "https://images.unsplash.com/photo-1578070581071-d9b52bf80993?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtb2Rlcm4lMjBhZG1pbiUyMGRhc2hib2FyZCUyMGFuYWx5dGljcyUyMHNjcmVlbnxlbnwxfHx8fDE3NzIzNzI3OTJ8MA&ixlib=rb-4.1.0&q=80&w=1080",
    imageAlt: "Admin Dashboard",
    imageFirst: true,
  },
  {
    badge: "Teacher Portal",
    badgeColor: "purple",
    badgeIcon: BookOpen,
    title: "Streamlined Teaching Experience",
    description: "Empower educators with tools that save time and enhance learning. From smart grading to virtual classrooms, everything teachers need is at their fingertips.",
    items: [
      "One-click attendance tracking and automated reports",
      "Intelligent grading system with performance analytics",
      "Integrated virtual classroom with digital resources",
    ],
    ctaLabel: "Explore Teacher Portal",
    ctaColor: "purple",
    imageSrc: "https://images.unsplash.com/photo-1758685848174-e061c6486651?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx0ZWFjaGVyJTIwY2xhc3Nyb29tJTIwdGVjaG5vbG9neSUyMGxhcHRvcHxlbnwxfHx8fDE3NzIzNzI3OTN8MA&ixlib=rb-4.1.0&q=80&w=1080",
    imageAlt: "Teacher Portal",
    imageFirst: false,
  },
  {
    badge: "Student Portal",
    badgeColor: "cyan",
    badgeIcon: GraduationCap,
    title: "Engaging Learning Platform",
    description: "A gamified learning experience that motivates students. Access virtual classrooms, track progress, earn achievements, and get personalized AI recommendations.",
    items: [
      "Interactive virtual classrooms with live sessions",
      "Gamification with badges, points, and achievements",
      "AI study assistant for personalized learning paths",
    ],
    ctaLabel: "Explore Student Portal",
    ctaColor: "cyan",
    imageSrc: "https://images.unsplash.com/photo-1771408427146-09be9a1d4535?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxzdHVkZW50JTIwb25saW5lJTIwbGVhcm5pbmclMjBsYXB0b3B8ZW58MXx8fHwxNzcyMzQ5NDA4fDA&ixlib=rb-4.1.0&q=80&w=1080",
    imageAlt: "Student Portal",
    imageFirst: true,
  },
  {
    badge: "Parent Portal",
    badgeColor: "emerald",
    badgeIcon: Heart,
    title: "Stay Connected with Your Child's Education",
    description: "Real-time updates on your child's academic progress, attendance, and achievements. Direct communication with teachers and secure online fee payments.",
    items: [
      "Instant notifications for attendance and grades",
      "Direct messaging with teachers and school staff",
      "Photo galleries and achievement showcases",
    ],
    ctaLabel: "Explore Parent Portal",
    ctaColor: "emerald",
    imageSrc: "https://images.unsplash.com/photo-1758687126499-9ff30d1c5762?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxwYXJlbnQlMjBjaGlsZCUyMGhvbWV3b3JrJTIwZGlnaXRhbHxlbnwxfHx8fDE3NzIzNzI3OTN8MA&ixlib=rb-4.1.0&q=80&w=1080",
    imageAlt: "Parent Portal",
    imageFirst: false,
  },
];
