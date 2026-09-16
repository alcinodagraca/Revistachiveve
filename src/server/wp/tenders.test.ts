import assert from "node:assert/strict";
import test from "node:test";
import { resolveTenderEditalUrl } from "./tenders";

test("uses the formatted CMS PDF URL before legacy edital links", () => {
  const post = {
    acf: { concurso_edital_pdf: "https://example.com/edital.pdf" },
    meta: {
      concurso_edital_pdf: 42,
      link_do_concurso: "https://example.com/old-link",
    },
  };
  assert.equal(resolveTenderEditalUrl(post), "https://example.com/edital.pdf");
});

test("accepts a formatted PDF object and falls back to an external link", () => {
  const file = {
    acf: { concurso_edital_pdf: { url: "https://example.com/file.pdf" } },
  };
  const link = {
    acf: { concurso_edital_pdf: false, concurso_edital_url: "https://example.com/notice" },
  };
  assert.equal(resolveTenderEditalUrl(file), "https://example.com/file.pdf");
  assert.equal(resolveTenderEditalUrl(link), "https://example.com/notice");
});
