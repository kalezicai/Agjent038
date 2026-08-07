export const articleSlugs = [
  "cost-of-missed-calls-kosovo-call-centers",
  "ai-receptionist-vs-hiring-receptionist",
  "gdpr-call-recording-kosovo",
] as const;

export type ArticleSlug = (typeof articleSlugs)[number];
