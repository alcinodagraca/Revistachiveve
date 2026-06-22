import type { ReactNode } from "react";

/**
 * Editorial prose container. Styles BOTH the bare children passed in (e.g.
 * <p> elements) and the HTML rendered via `dangerouslySetInnerHTML` from WP's
 * `content.rendered`. Selectors target descendants so WP output gets the same
 * treatment as hand-written JSX.
 */
export function Prose({ children }: { children: ReactNode }) {
  return (
    <div
      className={[
        "prose-chiveve max-w-[680px] mx-auto",
        "font-sans text-base md:text-lg leading-relaxed text-foreground",
        // Paragraphs
        "[&_p]:mb-6 [&_p]:last:mb-0",
        // Headings inside prose use the editorial serif but at smaller sizes
        "[&_h2]:font-serif [&_h2]:font-semibold [&_h2]:text-2xl md:[&_h2]:text-3xl [&_h2]:leading-tight [&_h2]:tracking-tight [&_h2]:mt-10 [&_h2]:mb-4 [&_h2]:text-foreground",
        "[&_h3]:font-serif [&_h3]:font-semibold [&_h3]:text-xl md:[&_h3]:text-2xl [&_h3]:leading-snug [&_h3]:mt-8 [&_h3]:mb-3 [&_h3]:text-foreground",
        "[&_h4]:font-serif [&_h4]:font-semibold [&_h4]:text-lg [&_h4]:leading-snug [&_h4]:mt-6 [&_h4]:mb-2 [&_h4]:text-foreground",
        // Lists
        "[&_ul]:list-disc [&_ul]:pl-6 [&_ul]:mb-6 [&_ul_li]:mb-2",
        "[&_ol]:list-decimal [&_ol]:pl-6 [&_ol]:mb-6 [&_ol_li]:mb-2",
        // Links
        "[&_a]:text-primary [&_a]:underline [&_a]:underline-offset-2 [&_a]:decoration-primary/40 hover:[&_a]:decoration-primary",
        // Blockquote — pull-quote style
        "[&_blockquote]:my-8 [&_blockquote]:pl-5 [&_blockquote]:border-l-4 [&_blockquote]:border-primary [&_blockquote]:font-serif [&_blockquote]:text-xl md:[&_blockquote]:text-2xl [&_blockquote]:leading-snug [&_blockquote]:text-foreground [&_blockquote]:italic",
        "[&_blockquote_p]:mb-2",
        // Figures / images
        "[&_figure]:my-8 [&_figure]:flex [&_figure]:flex-col [&_figure]:gap-2",
        "[&_figure_img]:w-full [&_figure_img]:h-auto [&_figure_img]:block [&_figure_img]:rounded",
        "[&_figcaption]:font-sans [&_figcaption]:text-sm [&_figcaption]:text-muted-foreground [&_figcaption]:italic",
        "[&_img]:w-full [&_img]:h-auto [&_img]:my-8 [&_img]:rounded",
        // Inline code + code blocks
        "[&_code]:font-mono [&_code]:text-[0.9em] [&_code]:bg-secondary [&_code]:px-1.5 [&_code]:py-0.5 [&_code]:rounded",
        "[&_pre]:bg-secondary [&_pre]:p-4 [&_pre]:rounded-md [&_pre]:overflow-x-auto [&_pre]:my-6",
        "[&_pre_code]:bg-transparent [&_pre_code]:p-0 [&_pre_code]:text-sm",
        // Tables
        "[&_table]:w-full [&_table]:border-collapse [&_table]:my-6 [&_table]:text-sm",
        "[&_th]:text-left [&_th]:font-semibold [&_th]:bg-secondary [&_th]:px-3 [&_th]:py-2 [&_th]:border-b [&_th]:border-border",
        "[&_td]:px-3 [&_td]:py-2 [&_td]:border-b [&_td]:border-border",
        // Horizontal rule
        "[&_hr]:my-10 [&_hr]:border-border",
        // Strong / em
        "[&_strong]:font-semibold [&_strong]:text-foreground",
        "[&_em]:italic",
      ].join(" ")}
    >
      {children}
    </div>
  );
}
