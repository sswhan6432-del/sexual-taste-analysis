import { notFound } from "next/navigation";
import Link from "next/link";
import { archetypeMap } from "@/lib/types";
import type { Metadata } from "next";

interface Props {
  params: Promise<{ id: string }>;
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { id } = await params;
  const archetype = archetypeMap[id];
  if (!archetype) return {};

  const title = `${archetype.nameEn} — Velvet Compass`;
  const description = archetype.descriptionEn;
  const url = `https://tastanalysis.com/share/${id}`;

  return {
    title,
    description,
    openGraph: {
      title,
      description,
      url,
      siteName: "Velvet Compass",
      type: "website",
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
    },
  };
}

export default async function SharePage({ params }: Props) {
  const { id } = await params;
  const archetype = archetypeMap[id];
  if (!archetype) notFound();

  return (
    <main className="flex min-h-[calc(100vh-3.5rem)] items-center justify-center px-4">
      <div className="mx-auto w-full max-w-md border border-gold/15 p-10 text-center"
           style={{ background: "#000000" }}>
        <p className="mb-3 text-[10px] font-normal uppercase tracking-[0.5em] text-gold/30">
          Type {archetype.numeral}
        </p>
        <h1 className="mb-1 text-3xl font-normal text-gold">
          {archetype.nameEn}
        </h1>
        <p className="mb-4 text-sm font-normal italic text-text-muted">
          {archetype.name}
        </p>
        <div className="mx-auto mb-6 h-px w-16 bg-gradient-to-r from-transparent via-gold/25 to-transparent" />
        <p className="mb-8 text-sm leading-relaxed text-text-secondary">
          {archetype.descriptionEn}
        </p>

        <Link
          href="/quiz"
          className="inline-block border border-gold/40 bg-gold/10 px-10 py-3 text-sm font-medium uppercase tracking-[0.2em] text-gold transition-all hover:bg-gold/20"
        >
          Take the Quiz
        </Link>

        <p className="mt-6 text-[9px] uppercase tracking-[0.4em] text-text-muted/25">
          tastanalysis.com
        </p>
      </div>
    </main>
  );
}
