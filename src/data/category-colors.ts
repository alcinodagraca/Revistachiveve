/**
 * Static brand colors per category slug. Kept on the frontend because
 * SCF on taxonomies is fiddly to expose via REST. Move to WP later if
 * editors need control. Slug must match WP category slug.
 */
export const CATEGORY_COLORS: Record<string, string> = {
  economia: "#1E4ED8",
  empreendedorismo: "#059669",
  "inovacao-tecnologia": "#DC2626",
  lideranca: "#7C3AED",
  opiniao: "#EA580C",
  analise: "#0891B2",
  destaques: "#1E4ED8",
  actualidade: "#1E4ED8",
  empresas: "#059669",
  entrevistas: "#7C3AED",
  editorial: "#0891B2",
};
