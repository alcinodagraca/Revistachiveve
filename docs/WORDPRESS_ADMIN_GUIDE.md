# Guia de Configuração WordPress — Revista Chiveve

Passo a passo para configurar **Categorias**, **CPT UI** (Custom Post Types
e Taxonomias) e **SCF/ACF** (Campos Personalizados) no painel WordPress.

Todos os **labels** (rótulos) estão em **português** e prontos para colar
directamente nos formulários do CPT UI.

> Pré-requisitos: plugins **CPT UI** e **Secure Custom Fields (SCF)** ou
> **ACF** já instalados e activos.

---

## 1. Categorias de Artigos

Os artigos usam o tipo **Post** nativo do WordPress com **Categorias**
nativas. Vá a **Posts → Categorias** e crie/edite as seguintes:

| Nome | Slug | Descrição sugerida |
| --- | --- | --- |
| Economia | `economia` | Análises e indicadores da economia moçambicana. |
| Empreendedorismo | `empreendedorismo` | Histórias e práticas de empreendedores. |
| Opinião | `opiniao` | Artigos de opinião e colunas. |
| Inovação & Tecnologia | `inovacao-tecnologia` | Tendências de inovação e tecnologia. |
| Liderança | `lideranca` | Perfis e práticas de liderança. |
| Análise | `analise` | Análises aprofundadas e estudos. |
| Empresas | `empresas` | Notícias do mundo empresarial. |
| Entrevistas | `entrevistas` | Conversas com figuras de referência. |
| Editorial | `editorial` | Editoriais da redacção. |
| Destaques | `destaques` | Conteúdos em destaque. |
| Actualidade | `actualidade` | Notícias do dia. |

**Importante:**
- O **slug** deve corresponder exactamente ao indicado (em minúsculas, sem
  acentos, com hífen). É usado nos URLs do frontend.
- Preencher sempre o campo **Descrição** — aparece como subtítulo da
  página de categoria.
- Categorias novas aparecem automaticamente no menu e na grelha de
  `/artigos`.

---

## 2. Custom Post Types (CPT UI)

Aceder via **CPT UI → Add/Edit Post Types**.

Para **cada CPT** abaixo, em **Settings** confirmar:
- **Public:** True
- **Show UI:** True
- **Show in REST:** **True** ← obrigatório
- **REST API base slug:** valor indicado em cada secção
- **Has Archive:** True
- **Supports:** marcar exactamente os indicados

### 2.1 Eventos — `event`

**Basic settings:**
- Post Type Slug: `event`
- Plural Label: `Eventos`
- Singular Label: `Evento`

**Additional labels (todos em português):**

| Campo | Valor |
| --- | --- |
| Menu Name | Eventos |
| All Items | Todos os Eventos |
| Add New | Adicionar Novo |
| Add New Item | Adicionar Novo Evento |
| Edit Item | Editar Evento |
| New Item | Novo Evento |
| View Item | Ver Evento |
| View Items | Ver Eventos |
| Search Item | Procurar Eventos |
| Not Found | Nenhum evento encontrado |
| Not Found in Trash | Nenhum evento no lixo |
| Parent | Evento pai |
| Featured Image | Imagem em destaque |
| Set Featured Image | Definir imagem em destaque |
| Remove Featured Image | Remover imagem em destaque |
| Use Featured Image | Usar como imagem em destaque |
| Archives | Arquivo de eventos |
| Insert Into Item | Inserir no evento |
| Uploaded to This Item | Carregado para este evento |
| Filter Items List | Filtrar lista de eventos |
| Items List Navigation | Navegação da lista de eventos |
| Items List | Lista de eventos |
| Attributes | Atributos do evento |
| Name Admin Bar | Evento |
| Item Published | Evento publicado |
| Item Published Privately | Evento publicado privadamente |
| Item Reverted To Draft | Evento revertido para rascunho |
| Item Scheduled | Evento agendado |
| Item Updated | Evento actualizado |

**Settings:**
- Show in REST: **True**
- REST API base slug: `eventos`
- Menu Icon (dashicons): `dashicons-calendar-alt`
- Supports: `title`, `editor`, `thumbnail`, `custom-fields`

### 2.2 Edições Impressas — Download Monitor

A página `/edicao-impressa` é alimentada pelo plugin **Download Monitor**.
**Não é necessário criar um CPT `edicao` no CPT UI** — cada PDF carregado no
Download Monitor torna-se uma edição na página automaticamente.

**Pré-requisito:** plugin **Download Monitor** instalado e activo (a opção
"Show in REST" do CPT `dlm_download` já vem ligada por defeito no plugin).

**Fluxo de publicação (por edição):**

1. WP admin → **Downloads → Adicionar Novo**
2. **Título** — ex.: `Revista Chiveve — Junho 2026`
3. **Adicionar Ficheiro** → carregar o PDF
4. **Imagem em destaque** → carregar a capa (formato 3:4, ≥ 800px de largura
   recomendado)
5. Alternar **Featured: Sim** apenas na edição que deve aparecer como
   destaque ("Edição Atual") — só uma de cada vez
6. **Publicar**

A página `/edicao-impressa` mostra a nova edição em ~5 minutos (TTL de
cache). Os botões "Baixar PDF" apontam para `/download/<id>/`, o link
oficial do Download Monitor que regista as descargas.

**(Opcional) Campos adicionais via SCF.** Se quiser mostrar subtítulo,
data formatada ou destaques ("Nesta Edição") na edição actual, criar um
grupo SCF associado ao tipo de post **`dlm_download`** com Show-in-REST
ligado:

| Etiqueta | Field Name | Tipo |
| --- | --- | --- |
| Subtítulo | `edicao_subtitle` | Text |
| Data de capa | `edicao_date` | Date Picker ou Text |
| Destaques | `edicao_highlights` | Repeater ou Textarea (um por linha) |
| Link PDF alternativo | `edicao_pdf_url` | URL (sobrepõe o link DLM) |

O normalizador no frontend já lê estes campos com fallback — basta criar o
grupo, sem alterações de código.

### 2.3 Concursos Públicos — `concurso`

- Post Type Slug: `concurso`
- Plural Label: `Concursos Públicos`
- Singular Label: `Concurso`

| Campo | Valor |
| --- | --- |
| Menu Name | Concursos |
| All Items | Todos os Concursos |
| Add New | Adicionar Novo |
| Add New Item | Adicionar Novo Concurso |
| Edit Item | Editar Concurso |
| New Item | Novo Concurso |
| View Item | Ver Concurso |
| View Items | Ver Concursos |
| Search Item | Procurar Concursos |
| Not Found | Nenhum concurso encontrado |
| Not Found in Trash | Nenhum concurso no lixo |
| Archives | Arquivo de concursos |
| Filter Items List | Filtrar concursos |
| Items List | Lista de concursos |
| Item Published | Concurso publicado |
| Item Updated | Concurso actualizado |

**Settings:**
- Show in REST: **True**
- REST API base slug: `concurso`
- Menu Icon: `dashicons-megaphone`
- Supports: `title`, `editor`, `custom-fields`

### 2.4 Contactos Úteis — `contacto-util`

- Post Type Slug: `contacto-util`
- Plural Label: `Contactos Úteis`
- Singular Label: `Contacto Útil`

| Campo | Valor |
| --- | --- |
| Menu Name | Contactos |
| All Items | Todos os Contactos |
| Add New | Adicionar Novo |
| Add New Item | Adicionar Novo Contacto |
| Edit Item | Editar Contacto |
| New Item | Novo Contacto |
| View Item | Ver Contacto |
| View Items | Ver Contactos |
| Search Item | Procurar Contactos |
| Not Found | Nenhum contacto encontrado |
| Not Found in Trash | Nenhum contacto no lixo |
| Featured Image | Logótipo |
| Set Featured Image | Definir logótipo |
| Remove Featured Image | Remover logótipo |
| Use Featured Image | Usar como logótipo |
| Archives | Arquivo de contactos |
| Items List | Lista de contactos |
| Item Published | Contacto publicado |
| Item Updated | Contacto actualizado |

**Settings:**
- Show in REST: **True**
- REST API base slug: `contacto-util`
- Menu Icon: `dashicons-phone`
- Supports: `title`, `thumbnail`, `custom-fields`

### 2.5 Equipa — `team-member`

- Post Type Slug: `team-member`
- Plural Label: `Equipa`
- Singular Label: `Membro da Equipa`

| Campo | Valor |
| --- | --- |
| Menu Name | Equipa |
| All Items | Todos os Membros |
| Add New | Adicionar Novo |
| Add New Item | Adicionar Novo Membro |
| Edit Item | Editar Membro |
| New Item | Novo Membro |
| View Item | Ver Membro |
| View Items | Ver Membros |
| Search Item | Procurar Membros |
| Not Found | Nenhum membro encontrado |
| Not Found in Trash | Nenhum membro no lixo |
| Featured Image | Retrato |
| Set Featured Image | Definir retrato |
| Remove Featured Image | Remover retrato |
| Use Featured Image | Usar como retrato |
| Items List | Lista de membros |
| Attributes | Atributos do membro |
| Item Published | Membro publicado |
| Item Updated | Membro actualizado |

**Settings:**
- Show in REST: **True**
- REST API base slug: `team`
- Menu Icon: `dashicons-groups`
- Supports: `title`, `editor`, `thumbnail`, `custom-fields`, `page-attributes`

> `page-attributes` activa o campo **Ordem** (menu_order) — usar para
> controlar a ordem de apresentação dos membros.

---

## 3. Taxonomias (CPT UI)

Aceder via **CPT UI → Add/Edit Taxonomies**.

### 3.1 Categorias de Contactos — `contacto-categoria`

- Taxonomy Slug: `contacto-categoria`
- Plural Label: `Categorias de Contactos`
- Singular Label: `Categoria de Contacto`
- Attach to Post Type: **`contacto-util`**

| Campo | Valor |
| --- | --- |
| Menu Name | Categorias |
| All Items | Todas as Categorias |
| Edit Item | Editar Categoria |
| View Item | Ver Categoria |
| Update Item | Actualizar Categoria |
| Add New Item | Adicionar Nova Categoria |
| New Item Name | Nome da Nova Categoria |
| Parent Item | Categoria pai |
| Parent Item Colon | Categoria pai: |
| Search Items | Procurar Categorias |
| Popular Items | Categorias Populares |
| Separate Items With Commas | Separar categorias com vírgulas |
| Add Or Remove Items | Adicionar ou remover categorias |
| Choose From Most Used | Escolher entre as mais usadas |
| Not Found | Nenhuma categoria encontrada |
| Items List | Lista de categorias |
| No Terms | Sem categorias |

**Settings:**
- Public: True
- Hierarchical: **True** (comporta-se como categorias, não tags)
- Show in REST: **True**
- REST API base slug: `contacto-categorias`

**Termos sugeridos** (criar em **Contactos → Categorias** após criar a taxonomia):

- Emergência (`emergencia`)
- Saúde (`saude`)
- Polícia (`policia`)
- Bombeiros (`bombeiros`)
- Administração Pública (`administracao-publica`)
- Serviços Públicos (`servicos-publicos`)
- Transportes (`transportes`)
- Embaixadas (`embaixadas`)

---

## 4. Campos Personalizados (SCF / ACF)

Aceder via **SCF → Field Groups** (ou **ACF → Field Groups**).

> **Regra crítica:** ao criar o grupo, **marcar "Show in REST"** no grupo
> **e em cada campo individualmente** — o SCF não propaga essa opção
> automaticamente.

### 4.1 Grupo: "Detalhes do Evento"

- Location: Post Type **is equal to** `event`
- Show in REST: ✓

| Label | Field Name | Tipo | Notas |
| --- | --- | --- | --- |
| Data do Evento | `event_date` | Date Picker | Formato ISO (YYYY-MM-DD). |
| Local | `event_location` | Text | Nome do local + rua. |
| Cidade | `event_city` | Text | Ex.: "Maputo, Moçambique". |
| Preço | `event_price` | Text | "Entrada livre", "MZN 1500", etc. |
| Organizador | `event_organizer` | Text | Por defeito "Revista Chiveve". |
| Link de Inscrição | `event_registration_url` | URL | Link de registo. |

### 4.2 Grupo: "Edição" (opcional — para Download Monitor)

Apenas necessário se quiser mostrar subtítulo, data formatada ou destaques
nas edições. Sem este grupo, as edições mostram apenas título + capa +
botão de download.

- Location: Post Type **is equal to** `dlm_download`
- Show in REST: ✓

| Label | Field Name | Tipo | Notas |
| --- | --- | --- | --- |
| Subtítulo | `edicao_subtitle` | Text | Ex.: "Transformação Digital em Moçambique". |
| Data | `edicao_date` | Date Picker ou Text | Data de capa. |
| Destaques | `edicao_highlights` | Repeater (um campo Text `highlight`) **ou** Textarea (um por linha) | O normalizador aceita ambos. |
| PDF Alternativo | `edicao_pdf_url` | URL **ou** File (return: URL) | Sobrepõe o link DLM se preenchido. |

> A flag "Featured" do próprio Download Monitor controla qual edição aparece
> como destaque — não precisa de campo SCF para isso.

### 4.3 Grupo: "Concurso"

- Location: Post Type **is equal to** `concurso`
- Show in REST: ✓

| Label | Field Name | Tipo | Notas |
| --- | --- | --- | --- |
| Instituição | `concurso_institution` | Text | Ex.: "Ministério das Finanças". |
| Prazo | `concurso_deadline` | Date Picker | Data limite. |
| Tipo | `concurso_type` | Select | Opções: `Concurso Público`, `Concurso Limitado`, `Outros`. |
| Vagas | `concurso_vacancies` | Number | Inteiro. |
| Link do Edital | `concurso_edital_url` | URL | Link para o PDF do edital. |

### 4.4 Grupo: "Contacto"

- Location: Post Type **is equal to** `contacto-util`
- Show in REST: ✓

| Label | Field Name | Tipo |
| --- | --- | --- |
| Telefone | `contacto_phone` | Text |
| Email | `contacto_email` | Email |
| Endereço | `contacto_address` | Textarea |
| Website | `contacto_website` | URL |
| Descrição | `contacto_description` | Textarea (1–2 linhas) |

### 4.5 Grupo: "Equipa"

- Location: Post Type **is equal to** `team-member`
- Show in REST: ✓

| Label | Field Name | Tipo |
| --- | --- | --- |
| Cargo | `team_role` | Text — ex.: "Editor-Chefe" |
| Biografia | `team_bio` | Textarea — opcional, recorre ao `content` se vazio |

---

## 5. Checklist de Verificação

Para cada CPT, após registar e publicar **pelo menos um item**:

- [ ] **CPT UI → Edit Post Type → Show in REST = True** confirmado
- [ ] **REST API base slug** corresponde ao indicado (eventos, concurso, contacto-util, team). Para edições impressas a fonte é o CPT `dlm_download` do plugin Download Monitor — não há CPT próprio.
- [ ] **SCF Group → Show in REST = True** marcado no grupo
- [ ] **Show in REST = True** marcado em **cada campo** individualmente
- [ ] Pelo menos um item publicado (não rascunho)
- [ ] Imagem em destaque definida (quando aplicável)

**Teste rápido via REST:**

```bash
curl -s "https://alcinochivangue.me/wp-json/wp/v2/eventos?per_page=1&_embed=1" | jq '.[0].acf // .[0].meta'
```

Os campos personalizados devem aparecer no JSON. Se faltarem, rever
o **Show in REST** de cada campo individual.

---

## 6. Ordem Recomendada de Execução

1. **Categorias de artigos** (secção 1) — actualizar slugs e descrições.
2. **CPT `event`** + grupo SCF + publicar 1 evento de teste.
3. **CPT `edicao`** + grupo SCF + publicar 1 edição (marcar `edicao_featured`).
4. **CPT `concurso`** + grupo SCF + publicar 1 concurso.
5. **Taxonomia `contacto-categoria`** + termos.
6. **CPT `contacto-util`** + grupo SCF + publicar 2–3 contactos com termos atribuídos.
7. **CPT `team-member`** + grupo SCF + publicar membros com `menu_order` definido.

Após cada passo, visitar a rota correspondente no frontend para confirmar
o cutover automático de mock para dados reais (ver `WORDPRESS_SETUP.md`
para tabela de rotas e TTLs).
