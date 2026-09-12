export {
  isWPConfigured,
  getWPConfig,
  getWPSubmissionConfig,
  WPNotConfiguredError,
} from "./env";
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
export type { Tender, TenderList } from "./tenders";
export { listContactCategories, listContacts } from "./contacts";
export type { ContactCategory, UsefulContact } from "./contacts";
export { listTeam } from "./team";
export type { TeamMember } from "./team";
