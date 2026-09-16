# WordPress configuration exports

Import these files on the production WordPress site after installing and activating:

- Custom Post Type UI
- Secure Custom Fields
- Download Monitor

## Import order

1. In **CPT UI > Tools > Import**, import `cptui-post-types.json`.
2. In **CPT UI > Tools > Import**, import `cptui-taxonomies.json`.
3. In **SCF > Tools > Import Field Groups**, import `scf-field-groups.json`.
4. Flush permalinks from **Settings > Permalinks > Save Changes**.
5. Confirm the REST endpoints and custom fields described in `docs/WORDPRESS_SETUP.md`.

For contests, the `concurso_edital_pdf` SCF File field lets editors attach a PDF directly in WordPress. It accepts PDFs up to 20 MB in the CMS; the public form is limited to 3 MB by the hosting request limit. The file takes precedence over `concurso_edital_url` on the website. After updating an existing installation, import the updated field group or add that one field manually while preserving existing field keys and content.

Do not edit generated IDs or field keys unless the production site already uses the same identifiers for different content models.
