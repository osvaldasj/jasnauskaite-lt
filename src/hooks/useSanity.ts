"use client";

import { useState, useEffect } from "react";
import { sanityClient, isSanityConfigured, queries } from "@/lib/sanity";

// Generic Sanity data fetcher with fallback
function useSanityData<T>(query: string, fallback: T): { data: T; loading: boolean } {
  const [data, setData] = useState<T>(fallback);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!isSanityConfigured()) {
      setLoading(false);
      return;
    }

    sanityClient
      .fetch<T>(query)
      .then((result) => {
        if (result && (Array.isArray(result) ? result.length > 0 : true)) {
          setData(result);
        }
      })
      .catch((err) => {
        console.warn("Sanity fetch failed, using fallback data:", err.message);
      })
      .finally(() => setLoading(false));
  }, [query]);

  return { data, loading };
}

// Portfolio items
export interface PortfolioItem {
  _id?: string;
  title: string;
  type: string;
  client?: string;
  imageUrl?: string;
  videoUrl?: string;
  description?: string;
  stats?: { reach?: number; engagement?: number; views?: number };
  longterm: boolean;
  featured?: boolean;
  order?: number;
  // For existing hardcoded items
  color?: string;
  span?: string;
  height?: string;
}

export function usePortfolio(fallback: PortfolioItem[]) {
  return useSanityData<PortfolioItem[]>(queries.portfolioItems, fallback);
}

// Testimonials
export interface Testimonial {
  _id?: string;
  quote: string;
  author: string;
  role?: string;
  company: string;
  avatarUrl?: string;
}

export function useTestimonials(fallback: Testimonial[]) {
  return useSanityData<Testimonial[]>(queries.testimonials, fallback);
}

// Services
export interface Service {
  _id?: string;
  title: string;
  description: string;
  iconType?: string;
}

export function useServices(fallback: Service[]) {
  return useSanityData<Service[]>(queries.services, fallback);
}

// Social posts
export interface SocialPost {
  _id?: string;
  platform: "instagram" | "tiktok";
  postUrl: string;
  thumbnailUrl?: string;
  caption?: string;
  publishedAt?: string;
}

export function useSocialPosts(platform: "instagram" | "tiktok", fallback: SocialPost[]) {
  return useSanityData<SocialPost[]>(queries.socialPosts(platform), fallback);
}

// Site settings
export interface SiteSettings {
  name: string;
  tagline: string;
  bio: string;
  profileImageUrl?: string;
  heroVideoUrl?: string;
  stats: Array<{ label: string; value: number; suffix: string }>;
  socialLinks: Array<{ platform: string; url: string; handle: string }>;
  contactEmail: string;
  clients: Array<{ name: string; longterm: boolean }>;
}

export function useSiteSettings(fallback: SiteSettings) {
  return useSanityData<SiteSettings>(queries.siteSettings, fallback);
}

// FAQ items
export interface FAQItem {
  _id?: string;
  question: string;
  answer: string;
}

export function useFAQ(fallback: FAQItem[]) {
  return useSanityData<FAQItem[]>(queries.faqItems, fallback);
}
