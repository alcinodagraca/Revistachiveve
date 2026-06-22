export { isWPConfigured, getWPConfig, WPNotConfiguredError } from "./env";
export { wpGet, wpList, clearWPCache, WPError } from "./client";
export { getRegisteredRestBases, hasRestBase } from "./cpt-detect";
export {
  listArticles,
  getArticleBySlug,
  getRelatedArticles,
  getMaisLidos,
  normalizeArticle,
} from "./articles";
export type { Article, ArticleList, ListArticlesArgs } from "./articles";
export { listCategories, getCategoryBySlug } from "./categories";
export type { Category } from "./categories";
export { listEvents, getEventBySlug } from "./events";
export type { Event } from "./events";
export { listEditions } from "./editions";
export type { Edition } from "./editions";
export { listTenders } from "./tenders";
export type { Tender } from "./tenders";
export { listContacts } from "./contacts";
export type { UsefulContact } from "./contacts";
export { listTeam } from "./team";
export type { TeamMember } from "./team";
