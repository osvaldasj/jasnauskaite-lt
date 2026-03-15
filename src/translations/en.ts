export const en = {
  // Navbar
  nav: {
    portfolio: "Portfolio",
    ourWork: "Our Work",
    collaborate: "Collaborate",
    menuLabel: "Open menu",
  },

  // Hero
  hero: {
    subtitle: "Content Creator",
    firstName: "Inide",
    lastName: "Jasnauskaite",
    description:
      "Fashion, beauty & lifestyle content creator with 354K+ Instagram followers. Creating content that doesn't just look good — it delivers results.",
    cta: "Collaborate",
    portfolio: "Portfolio",
  },

  // About
  about: {
    label: "About me",
    title: "Creating content that",
    titleHighlight: "delivers",
    paragraph1:
      "I'm Inide Jasnauskaite — a content creator working with the biggest Lithuanian and international brands. Over 5+ years, I've created hundreds of reels, story series and campaigns that reached millions of people.",
    paragraph2:
      "My goal isn't just beautiful content — it's real results. Every project is measured by numbers: engagement rate, reach, conversions. Brands come back because the content works.",
    paragraph3Pre: "I work through",
    paragraph3Company: "Reelize",
    paragraph3Post:
      "— my company that ensures a professional process from the first idea to the final result and report.",
    handle: "@jasnauskaite",
  },

  // Services
  services: {
    label: "Our work",
    title: "What I",
    titleHighlight: "create",
    reels: {
      title: "Reels",
      description:
        "Scroll-stopping short-form video with storytelling, transitions, and full post-production.",
    },
    stories: {
      title: "Stories",
      description:
        "Engaging long-form story series that connect with the audience and organically introduce your brand.",
    },
    posts: {
      title: "Posts",
      description:
        "High-quality photo and carousel content for feed — styled, shot, and edited to match your brand.",
    },
    tiktoks: {
      title: "TikToks",
      description:
        "Native, authentic TikTok content. Reshare option for your brand's own channel included.",
    },
    metaAds: {
      title: "META Ads",
      description:
        "Performance-driven ad creatives for Instagram and Facebook — designed for conversions and reach.",
    },
    tvCommercial: {
      title: "TV Commercial",
      description:
        "Professional video content adapted for television broadcast and digital advertising campaigns.",
    },
    ambassador: {
      title: "Ambassador",
      description:
        "Long-term brand representation — consistent content flow, face usage, and authentic advocacy.",
    },
  },

  // Portfolio Highlight
  portfolio: {
    label: "Portfolio",
    title: "Selected",
    titleHighlight: "work",
    longTermPartner: "Long-term partner",
    campaign: "Campaign",
  },

  // Stats
  stats: {
    followers: "Instagram followers",
    engagement: "Engagement rate",
    brands: "Brands",
    experience: "Years experience",
  },

  // Testimonials
  testimonials: {
    label: "Testimonials",
    title: "What clients",
    titleHighlight: "say",
    items: [] as { quote: string; author: string; company: string }[],
  },

  // FAQ
  faq: {
    title: "Frequently asked",
    titleHighlight: "questions",
    items: [
      {
        question: "How does the collaboration process work?",
        answer:
          "After receiving your inquiry, I'll get back to you within 24 hours with a proposal. We'll discuss the concept, timeline, and budget. After approval, I create content according to the agreed brief with the option to review before publishing.",
      },
      {
        question: "What types of content do you create?",
        answer:
          "I create Instagram Reels, Story series, TikTok videos, product photo shoots, and long-term ambassador programs. Each format is tailored to your brand's goals.",
      },
      {
        question: "Can I see results from previous campaigns?",
        answer:
          "Yes! My media kit includes detailed campaign results with reach, engagement, and other metrics. Get in touch and I'll send it over.",
      },
      {
        question: "What's the minimum collaboration budget?",
        answer:
          "The budget depends on the content type and scope. Reach out through the form and I'll prepare an individual proposal based on your needs.",
      },
      {
        question: "Do you work with international brands?",
        answer:
          "Yes, I work with both Lithuanian and international brands. I can create content in Lithuanian and English.",
      },
    ],
  },

  // CTA
  cta: {
    title: "Let's create",
    titleHighlight: "together",
    description:
      "Looking for a content creator for your brand? Get in touch and let's discuss how I can help you reach your goals with authentic, effective content.",
    emailLabel: "osvaldas@reelize.lt",
    instagramLabel: "@jasnauskaite",
  },

  // Social Feed
  social: {
    title: "Follow",
    titleHighlight: "along",
    subtitle: "Stay connected and never miss new content",
    instagram: {
      description:
        "Daily fashion inspiration, behind-the-scenes, outfit ideas & lifestyle moments",
      cta: "Follow on Instagram",
    },
    tiktok: {
      description:
        "Trending content, quick styling tips, viral challenges & fun creative videos",
      cta: "Follow on TikTok",
    },
  },

  // Client Logos
  clients: {
    label: "Partners",
  },

  // Footer
  footer: {
    copyright: "@jasnauskaite",
  },

  // Floating CTA
  floatingCta: {
    label: "Collaborate — send inquiry",
    text: "Collaborate",
  },

  // Links page (page.tsx)
  links: {
    title: "Inide Jasnauskaite",
    subtitle: "Content Creator",
    inCloset: "Inide's Closet",
    inClosetSub: "Rent my wardrobe",
    portfolio: "Portfolio",
    portfolioSub: "My best work",
    collaborate: "Collaborate",
  },
};

// Recursive type that widens all string literals to `string`
type DeepStringify<T> = T extends string
  ? string
  : T extends readonly (infer U)[]
    ? DeepStringify<U>[]
    : T extends object
      ? { [K in keyof T]: DeepStringify<T[K]> }
      : T;

export type TranslationKeys = DeepStringify<typeof en>;
