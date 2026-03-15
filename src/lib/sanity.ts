import { createClient } from "@sanity/client";

// Sanity client configuration
// After setting up Sanity Studio, replace these with your project values
const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID || "";
const dataset = process.env.NEXT_PUBLIC_SANITY_DATASET || "production";

export const sanityClient = createClient({
  projectId,
  dataset,
  apiVersion: "2024-03-14",
  useCdn: true, // CDN for faster reads
});

// Check if Sanity is configured
export const isSanityConfigured = (): boolean => {
  return !!projectId && projectId !== "YOUR_PROJECT_ID";
};

// GROQ queries
export const queries = {
  portfolioItems: `*[_type == "portfolio"] | order(order asc) {
    _id,
    title,
    type,
    client,
    "imageUrl": image.asset->url,
    videoUrl,
    description,
    stats,
    longterm,
    featured,
    order
  }`,

  testimonials: `*[_type == "testimonial"] | order(order asc) {
    _id,
    quote,
    author,
    role,
    company,
    "avatarUrl": avatar.asset->url
  }`,

  services: `*[_type == "service"] | order(order asc) {
    _id,
    title,
    description,
    iconType
  }`,

  socialPosts: (platform: string) => `*[_type == "socialPost" && platform == "${platform}"] | order(order asc) [0...6] {
    _id,
    platform,
    postUrl,
    "thumbnailUrl": thumbnail.asset->url,
    caption,
    publishedAt
  }`,

  siteSettings: `*[_type == "siteSettings"][0] {
    name,
    tagline,
    bio,
    "profileImageUrl": profileImage.asset->url,
    heroVideoUrl,
    stats,
    socialLinks,
    contactEmail,
    clients
  }`,

  faqItems: `*[_type == "faq"] | order(order asc) {
    _id,
    question,
    answer
  }`,
};
