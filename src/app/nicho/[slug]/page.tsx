import { notFound } from "next/navigation";
import { Metadata } from "next";
import { getNichePage, getAllNicheSlugs } from "@/lib/niche-pages";
import NichePageContent from "./NichePageContent";

interface Props {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  return getAllNicheSlugs().map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const niche = getNichePage(slug);
  if (!niche) return {};
  return {
    title: `${niche.title} | gerapropostas`,
    description: niche.description,
  };
}

export default async function NicheLandingPage({ params }: Props) {
  const { slug } = await params;
  const niche = getNichePage(slug);
  if (!niche) notFound();
  return <NichePageContent niche={niche} />;
}
