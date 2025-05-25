// src/landings.ts

interface Landing {
  country: string;
  language: string;
  article: string;
  variant: string;
  layout: string;
  contentPath: string;
}

export const landings: Landing[] = [
  {
    country: 'us',
    language: 'en',
    article: 'article1',
    variant: 'a',
    layout: 'BaseLayout',
    contentPath: '/us/en/article1/a.mdx',
  },
  {
    country: 'us',
    language: 'en',
    article: 'article1',
    variant: 'a',
    layout: 'NewsLayout',
    contentPath: '/us/en/article1/a.mdx',
  },
  {
    country: 'us',
    language: 'en',
    article: 'article1',
    variant: 'b',
    layout: 'NewsLayout',
    contentPath: '/us/en/article1/b.mdx',
  },
  {
    country: 'uk',
    language: 'en',
    article: 'article2',
    variant: 'a',
    layout: 'BaseLayout',
    contentPath: '/uk/en/article2/a.mdx',
  },
  {
    country: 'de',
    language: 'de',
    article: 'article3',
    variant: 'a',
    layout: 'NewsLayout',
    contentPath: '/de/de/article3/a.mdx',
  },
  {
    country: 'ar',
    language: 'ar',
    article: 'article1',
    variant: 'a',
    layout: 'NewsLayout',
    contentPath: '/ar/ar/article1/a.mdx',
  },
  // Bengali adult content landing page
  {
    country: 'bd',
    language: 'bn',
    article: 'stories',
    variant: 'premium',
    layout: 'BaseLayout',
    contentPath: '/bd/bn/stories/premium.mdx',
  },
  // Additional variants for Bengali adult content
  {
    country: 'bd',
    language: 'bn',
    article: 'stories',
    variant: 'free',
    layout: 'BaseLayout',
    contentPath: '/bd/bn/stories/free.mdx',
  }, // UltraHot product landing page
  {
    country: 'bd',
    language: 'bn',
    article: 'products',
    variant: 'ultrahot',
    layout: 'BaseLayout',
    contentPath: '/bd/bn/products/ultrahot.mdx',
  },
  // Universal Adult Layout - Nigeria potency page (LTR)
  {
    country: 'ng',
    language: 'en',
    article: 'potency',
    variant: 'womencheating',
    layout: 'UniversalAdultLayout',
    contentPath: '/ng/en/potency/womencheating.mdx',
  },

  // Universal Adult Layout - Iraq potency page (RTL)
  {
    country: 'iq',
    language: 'ar',
    article: 'potency',
    variant: 'killerimpotence',
    layout: 'UniversalAdultLayout',
    contentPath: '/iq/ar/potency/killerimpotence.mdx',
  },
  // Additional combinations can be added as needed
];
