import { notFound } from "next/navigation";
import Link from "next/link";
import type { Metadata } from "next";
import { archetypes, archetypeMap } from "@/lib/types";
import { dimensions } from "@/lib/dimensions";

interface Props {
  params: Promise<{ id: string }>;
}

export async function generateStaticParams() {
  return archetypes.map((a) => ({ id: a.id }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { id } = await params;
  const archetype = archetypeMap[id];
  if (!archetype) return {};
  return {
    title: `${archetype.nameEn} (${archetype.name}) — Velvet Compass`,
    description: archetype.detailDescriptionEn,
    openGraph: {
      title: `${archetype.nameEn} — Velvet Compass`,
      description: archetype.descriptionEn,
      url: `https://velvettest.space/type/${id}`,
      siteName: "Velvet Compass",
    },
    twitter: {
      card: "summary_large_image",
      title: `${archetype.nameEn} — Velvet Compass`,
      description: archetype.descriptionEn,
    },
  };
}

export default async function TypeDetailPage({ params }: Props) {
  const { id } = await params;
  const archetype = archetypeMap[id];
  if (!archetype) notFound();

  const compatibleArchetypes = archetype.compatibleTypes
    .map((cid) => archetypeMap[cid])
    .filter(Boolean);

  return (
    <main className="min-h-screen pb-20">
      <div className="mx-auto max-w-2xl px-4 pt-10">

        {/* Back */}
        <div className="mb-8">
          <Link href="/" className="text-xs tracking-widest text-text-muted hover:text-gold transition-colors">
            ← Velvet Compass
          </Link>
        </div>

        {/* Header */}
        <div className="mb-10 text-center">
          <p className="mb-3 text-[10px] font-normal uppercase tracking-[0.5em] text-gold/40">
            Type {archetype.numeral}
          </p>
          <h1 className="mb-1 font-serif text-4xl font-normal text-gold">{archetype.nameEn}</h1>
          <p className="mb-5 text-sm italic text-text-muted">{archetype.name}</p>
          <div className="mx-auto mb-6 h-px w-16 bg-gradient-to-r from-transparent via-gold/30 to-transparent" />
          <p className="text-sm leading-relaxed tracking-wide text-text-secondary">{archetype.descriptionEn}</p>
        </div>

        {/* Detail Description */}
        <section className="mb-6 border border-gold/10 p-6" style={{ background: "rgba(201,169,110,0.03)" }}>
          <h2 className="mb-3 text-[10px] uppercase tracking-[0.3em] text-gold/50">About This Archetype</h2>
          <p className="mb-3 text-sm leading-relaxed text-text-secondary">{archetype.detailDescriptionEn}</p>
          <p className="text-sm leading-relaxed text-text-secondary">{archetype.detailDescription}</p>
        </section>

        {/* Profile Bars */}
        <section className="mb-6 border border-gold/10 p-6" style={{ background: "rgba(201,169,110,0.03)" }}>
          <h2 className="mb-5 text-[10px] uppercase tracking-[0.3em] text-gold/50">Relationship Profile</h2>
          <div className="space-y-5">
            {dimensions.map((dim) => {
              const value = archetype.profile[dim.key as keyof typeof archetype.profile];
              return (
                <div key={dim.key}>
                  <div className="mb-1.5 flex items-center justify-between">
                    <span className="text-xs tracking-wider text-text-secondary">{dim.nameEn}</span>
                    <span className="text-xs text-gold/70">{value}%</span>
                  </div>
                  <div className="h-px w-full bg-white/[0.06]">
                    <div
                      className="h-px transition-all"
                      style={{
                        width: `${value}%`,
                        background: `linear-gradient(90deg, ${archetype.color}, ${archetype.color}88)`,
                      }}
                    />
                  </div>
                  <div className="mt-1 flex justify-between text-[10px] text-text-muted/40">
                    <span>{dim.lowLabelEn}</span>
                    <span>{dim.highLabelEn}</span>
                  </div>
                </div>
              );
            })}
          </div>
        </section>

        {/* Compatible Types */}
        {compatibleArchetypes.length > 0 && (
          <section className="mb-6">
            <h2 className="mb-4 text-[10px] uppercase tracking-[0.3em] text-gold/50">Compatible Archetypes</h2>
            <div className="grid grid-cols-1 gap-3 sm:grid-cols-3">
              {compatibleArchetypes.map((ca) => (
                <Link
                  key={ca.id}
                  href={`/type/${ca.id}`}
                  className="border border-gold/10 p-4 text-center transition-all hover:border-gold/30"
                  style={{ background: "rgba(201,169,110,0.03)" }}
                >
                  <p className="mb-0.5 text-[10px] tracking-widest text-gold/40">Type {ca.numeral}</p>
                  <p className="font-serif text-sm text-gold">{ca.nameEn}</p>
                  <p className="text-[10px] italic text-text-muted">{ca.name}</p>
                </Link>
              ))}
            </div>
          </section>
        )}

        {/* All 12 Types */}
        <section className="mb-10">
          <h2 className="mb-4 text-[10px] uppercase tracking-[0.3em] text-gold/50">All 12 Archetypes</h2>
          <div className="grid grid-cols-2 gap-2 sm:grid-cols-3">
            {archetypes.map((a) => (
              <Link
                key={a.id}
                href={`/type/${a.id}`}
                className={`border p-3 text-center text-xs tracking-wider transition-all ${
                  a.id === id
                    ? "border-gold/40 text-gold"
                    : "border-white/[0.05] text-text-muted hover:border-gold/20 hover:text-gold/70"
                }`}
                style={a.id === id ? { background: "rgba(201,169,110,0.08)" } : {}}
              >
                <span className="block text-[9px] tracking-widest text-gold/30">Type {a.numeral}</span>
                {a.nameEn}
              </Link>
            ))}
          </div>
        </section>

        {/* CTA */}
        <div className="border border-gold/15 p-8 text-center" style={{ background: "rgba(201,169,110,0.04)" }}>
          <p className="mb-5 text-xs tracking-widest text-text-muted">Discover your relationship archetype</p>
          <Link
            href="/quiz"
            className="inline-block border border-gold/40 bg-gold/10 px-10 py-3 text-xs font-medium uppercase tracking-[0.2em] text-gold transition-all hover:bg-gold/20"
          >
            Take the Quiz
          </Link>
          <p className="mt-4 text-[10px] uppercase tracking-[0.3em] text-text-muted/40">
            72 questions · 8 dimensions · 12 archetypes
          </p>
        </div>

      </div>
    </main>
  );
}
