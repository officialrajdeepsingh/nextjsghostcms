import type { Metadata } from 'next';
import type { PostOrPage, Tag, Author, Settings } from '@tryghost/content-api';

export type GhostMetadataSource = PostOrPage | Tag | Author | Settings | null | undefined;

export interface SeoOptions {
  fallbackTitle?: string;
  fallbackDescription?: string;
  titleSuffix?: string;
  descriptionSuffix?: string;
  type?: 'website' | 'article' | 'profile';
  url?: string;
  keywords?: string[];
  siteName?: string;
  icon?: string;
}

function getStringProp(obj: object, key: string): string | undefined {
  if (key in obj) {
    const val = (obj as Record<string, unknown>)[key];
    if (typeof val === 'string' && val.trim().length > 0) {
      return val;
    }
  }
  return undefined;
}

/**
 * Reusable SEO helper to construct Next.js Metadata from Ghost CMS content
 * with full fallback hierarchy (meta_* -> og_* -> default title/excerpt/description).
 */
export function generateGhostMetadata(
  source: GhostMetadataSource,
  options?: SeoOptions
): Metadata {
  const fallbackTitle = options?.fallbackTitle || 'Ghost CMS';
  const fallbackDesc = options?.fallbackDescription || '';
  // const fallbackFavicon = options?.icon || 'favicon.ico';

  if (!source) {
    return {
      title: options?.titleSuffix ? `${fallbackTitle} - ${options.titleSuffix}` : fallbackTitle,
      description: fallbackDesc
    };
  }

  // Base title
  const rawTitle =
    getStringProp(source, 'meta_title') ||
    getStringProp(source, 'title') ||
    getStringProp(source, 'name') ||
    fallbackTitle;
  const title = options?.titleSuffix ? `${rawTitle} - ${options.titleSuffix}` : rawTitle;

  // Base description
  const rawDescription =
    getStringProp(source, 'meta_description') ||
    getStringProp(source, 'custom_excerpt') ||
    getStringProp(source, 'excerpt') ||
    getStringProp(source, 'description') ||
    getStringProp(source, 'bio') ||
    fallbackDesc;
  const description = options?.descriptionSuffix
    ? rawDescription
      ? `${rawDescription} ${options.descriptionSuffix}`
      : options.descriptionSuffix
    : rawDescription;

  // OpenGraph title & description
  const rawOgTitle =
    getStringProp(source, 'og_title') ||
    getStringProp(source, 'meta_title') ||
    getStringProp(source, 'title') ||
    getStringProp(source, 'name') ||
    fallbackTitle;
  const ogTitle = options?.titleSuffix ? `${rawOgTitle} - ${options.titleSuffix}` : rawOgTitle;

  const rawOgDescription =
    getStringProp(source, 'og_description') ||
    getStringProp(source, 'meta_description') ||
    getStringProp(source, 'custom_excerpt') ||
    getStringProp(source, 'excerpt') ||
    getStringProp(source, 'description') ||
    getStringProp(source, 'bio') ||
    fallbackDesc;
  const ogDescription = options?.descriptionSuffix
    ? rawOgDescription
      ? `${rawOgDescription} ${options.descriptionSuffix}`
      : options.descriptionSuffix
    : rawOgDescription;

  // OpenGraph image
  const ogImage =
    getStringProp(source, 'og_image') ||
    getStringProp(source, 'feature_image') ||
    getStringProp(source, 'cover_image') ||
    getStringProp(source, 'profile_image') ||
    getStringProp(source, 'icon') ||
    '';

  const imageAlt = getStringProp(source, 'feature_image_alt') || ogTitle;

  // Twitter cards
  const rawTwitterTitle = getStringProp(source, 'twitter_title') || rawOgTitle;
  const twitterTitle = options?.titleSuffix ? `${rawTwitterTitle} - ${options.titleSuffix}` : rawTwitterTitle;

  const rawTwitterDesc = getStringProp(source, 'twitter_description') || rawOgDescription;
  const twitterDescription = options?.descriptionSuffix
    ? rawTwitterDesc
      ? `${rawTwitterDesc} ${options.descriptionSuffix}`
      : options.descriptionSuffix
    : rawTwitterDesc;

  const twitterImage = getStringProp(source, 'twitter_image') || ogImage;

  // URL
  const url = options?.url || getStringProp(source, 'url') || undefined;

  // Tags & keywords
  const extractedTags =
    'tags' in source && Array.isArray(source.tags)
      ? (source.tags.map((t: Tag) => t?.name).filter(Boolean) as string[])
      : undefined;
  const keywords = options?.keywords || (extractedTags && extractedTags.length > 0 ? extractedTags : undefined);

  // Type
  const type = options?.type || 'website';
  const siteName = options?.siteName || getStringProp(source, 'title') || undefined;

  const baseOpenGraph = {
    title: ogTitle,
    description: ogDescription,
    url,
    siteName,
    images: ogImage ? [{ url: ogImage, alt: imageAlt }] : [],
  };

  const openGraphData: Metadata['openGraph'] =
    type === 'article' && 'published_at' in source
      ? {
          ...baseOpenGraph,
          type: 'article',
          publishedTime: (source as PostOrPage).published_at || undefined,
          modifiedTime: (source as PostOrPage).updated_at || undefined,
          authors: (source as PostOrPage).primary_author?.name
            ? [(source as PostOrPage).primary_author!.name!]
            : undefined,
          tags: extractedTags,
        }
      : type === 'profile'
      ? {
          ...baseOpenGraph,
          type: 'profile',
        }
      : {
          ...baseOpenGraph,
          type: 'website',
        };

  // Favicon / App Icon
  const ghostIcon = getStringProp(source, 'icon');
  const faviconUrl = options?.icon || ghostIcon || '/favicon.ico';

  const icons: Metadata['icons'] = {
    icon: [
      { url: faviconUrl, sizes: 'any' },
    ],
    shortcut: [faviconUrl],
    apple: [
      { url: faviconUrl },
    ],
  };

  return {
    title,
    description,
    keywords,
    icons,
    openGraph: openGraphData,
    twitter: {
      card: ogImage ? 'summary_large_image' : 'summary',
      title: twitterTitle,
      description: twitterDescription,
      images: twitterImage ? [twitterImage] : [],
    },
  };
}
