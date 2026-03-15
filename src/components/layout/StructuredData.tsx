export function StructuredData() {
  const personSchema = {
    "@context": "https://schema.org",
    "@type": "Person",
    name: "Inide Jasnauskaite",
    alternateName: "@jasnauskaite",
    url: "https://jasnauskaite.lt",
    jobTitle: "Content Creator",
    worksFor: {
      "@type": "Organization",
      name: "Reelize",
    },
    sameAs: [
      "https://instagram.com/jasnauskaite",
      "https://tiktok.com/@jasnauskaite",
    ],
    knowsAbout: [
      "Fashion",
      "Beauty",
      "Lifestyle",
      "Content Creation",
      "Social Media Marketing",
    ],
    description:
      "Fashion, Beauty & Lifestyle Content Creator su 354K+ Instagram sekeju.",
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(personSchema) }}
    />
  );
}
