
export const featureFlags = {
  showStats: false,
  showTestimonials: true,
  showFAQs: true,
  showAbout: true,
  showServices: true,
  showContact: true,
  showHero: true,
} as const;

export type FeatureFlag = keyof typeof featureFlags;
