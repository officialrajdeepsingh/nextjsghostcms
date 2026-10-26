import "@/globals.css";
import BlogLayout from '@/BlogLayout'
import { getSettings } from "@/ghost-client"
import type { Settings } from "@tryghost/content-api"
import type { Metadata } from "next"
import { Geist } from "next/font/google";
import { cn } from "@/lib/utils";
import { generateGhostMetadata } from "@/seo";

const geist = Geist({subsets:['latin'],variable:'--font-sans'});

interface UpdateSettings extends Settings {
  accent_color?: string;
}

export async function generateMetadata(): Promise<Metadata> {
  const settings = await getSettings();
  return generateGhostMetadata(settings, {
    fallbackTitle: "Ghost CMS",
  });
}

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const settings = (await getSettings()) as UpdateSettings | null;

  return (
    <html className={cn("font-sans", geist.variable)} lang="en" suppressHydrationWarning>
      <body
        style={{
          '--ghost-accent': settings?.accent_color ? settings.accent_color : "var(--primary)",
        } as React.CSSProperties}
        className="min-h-screen bg-background text-foreground antialiased selection:bg-primary/10 selection:text-primary">
        <BlogLayout setting={settings || undefined}>
          {children}
        </BlogLayout>
      </body>
    </html>
  )
}
