// config/site.ts — centralised site-wide configuration
export const siteConfig = {
  name: "EduTrio",
  tagline: "The Complete School Management Platform",
  description:
    "EduTrio is a comprehensive school ERP platform that streamlines student management, academics, finance, communication, and more — all in one place.",
  url: "https://edutrio.com",
  ogImage: "/og-image.jpg",
  contact: {
    email: "contact@edutrio.com",
    phone: "+1 (234) 567-890",
    address: "123 Education Street\nSan Francisco, CA 94102",
  },
  social: {
    twitter: "https://twitter.com/edutrio",
    facebook: "https://facebook.com/edutrio",
    linkedin: "https://linkedin.com/company/edutrio",
    instagram: "https://instagram.com/edutrio",
  },
} as const;
