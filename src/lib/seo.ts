import type { Metadata } from 'next';
import { siteConfig } from '@/lib/constants';

type SocialPageType = 'website' | 'article' | 'profile';

interface PageMetadataOptions {
  title: string;
  description: string;
  path: string;
  image?: string;
  type?: SocialPageType;
  socialTitle?: string;
}

export function createPageMetadata({
  title,
  description,
  path,
  image = siteConfig.ogImage,
  type = 'website',
  socialTitle = `${title} | ${siteConfig.name}`,
}: PageMetadataOptions): Pick<Metadata, 'alternates' | 'openGraph' | 'twitter'> {
  return {
    alternates: { canonical: path },
    openGraph: {
      type,
      title: socialTitle,
      description,
      url: path,
      siteName: siteConfig.name,
      images: [{ url: image, alt: socialTitle }],
    },
    twitter: {
      card: 'summary_large_image',
      title: socialTitle,
      description,
      images: [image],
    },
  };
}

export function createBreadcrumbData(items: Array<{ name: string; path: string }>) {
  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: items.map((item, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      name: item.name,
      item: new URL(item.path, siteConfig.url).toString(),
    })),
  };
}
