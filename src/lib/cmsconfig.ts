import type { CmsConfig } from 'decap-cms-core';

const config: CmsConfig = {
  load_config_file: false,
  backend: {
    name: "github",
    branch: "main",
    repo: "nbskakklub/website",
    base_url: "https://nbskak.dk",
    auth_endpoint: "/api/auth",
  },
  logo_url: "/icon.png",
  display_url: "https://nbskak.dk",
  site_url: "https://nbskak.dk",
  locale: "da",
  media_folder: "public/images",
  public_folder: "/images",
  collections: [
    {
      name: "config",
      label: "Indstillinger",
      delete: false,
      editor: {
        preview: false,
      },
      files: [
        {
          name: "general",
          label: "Generelle indstillinger",
          file: "config.json",
          description: "Generelle side indstillinger",
          fields: [
            {
              label: "Hjemmeside URL",
              name: "base_url",
              widget: "string",
              hint: "Indtast ikke den efterfølgende skråstreg på URL'en",
            },
            {
              label: "Webstedets titel",
              name: "site_title",
              widget: "string",
            },
            {
              label: "Webside beskrivelse",
              name: "site_description",
              widget: "string",
            },
            {
              label: "Webside søgeord",
              name: "site_keywords",
              widget: "list",
              summary: "{{fields.keyword.keyword}}",
              fields: [
                {
                  label: "Søgeord",
                  name: "keyword",
                  widget: "string",
                },
              ],
            },
          ],
        },
      ],
    },
    {
      name: "pages",
      label: "Sider",
      extension: "mdx",
      format: "frontmatter",
      create: false,
      delete: false,
      files: [
        {
          file: "content/pages/index.mdx",
          label: "Forside",
          name: "home",
          description: "Forside indhold",
          fields: [
            {
              label: "Titel",
              name: "title",
              widget: "string",
            },
            {
              name: "cards",
              label: "Cards",
              label_singular: "Card",
              widget: "list",
              fields: [
                {
                  label: "Titel",
                  name: "title",
                  widget: "string",
                },
                {
                  label: "Indhold",
                  name: "description",
                  widget: "markdown",
                },
                {
                  label: "Billede",
                  name: "image",
                  widget: "image",
                },
                {
                  label: "Link",
                  name: "link",
                  widget: "string",
                },
              ],
            },
            {
              label: "Subtitel",
              name: "subtitle",
              widget: "string",
            },
            {
              label: "Description",
              name: "description",
              widget: "string",
            },
            {
              label: "Indhold",
              name: "body",
              widget: "markdown",
            },
          ],
        },
        {
          file: "content/pages/hall-of-fame.mdx",
          label: "Hall of Fame",
          name: "hall_of_fame",
          description: "Forside indhold",
          fields: [
            {
              label: "Titel",
              name: "title",
              widget: "string",
            },
            {
              label: "Indhold",
              name: "body",
              widget: "markdown",
            },
          ],
        },
      ],
    },
    {
      name: "Footer",
      label: "Footer",
      delete: false,
      editor: {
        preview: true,
      },
      files: [
        {
          name: "footer",
          label: "Footer",
          file: "meta/footer.yml",
          description: "Footer indhold",
          fields: [
            {
              label: "Beskrivelse",
              name: "description",
              widget: "text",
            },
            {
              label: "Adresse",
              name: "adress",
              widget: "string",
              hint: "Skal være i formatet: Gade Gadenummer, Postnummer By",
            },
          ],
        },
      ],
    },
    {
      name: "meta",
      label: "Meta",
      delete: false,
      editor: {
        preview: false,
      },
      files: [
        {
          name: "authors",
          label: "Forfattere",
          file: "meta/authors.yml",
          description: "Forfattere beskrivelser",
          fields: [
            {
              name: "authors",
              label_singular: "Forfatter",
              widget: "list",
              fields: [
                {
                  label: "URL",
                  name: "slug",
                  widget: "string",
                  hint: "Den del af en URL identificerer forfatteren",
                },
                {
                  label: "Navn",
                  name: "name",
                  widget: "string",
                  hint: "First and Last",
                },
                {
                  label: "Introduktion",
                  name: "introduction",
                  widget: "text",
                },
              ],
            },
          ],
        },
        {
          name: "tags",
          label: "Tags",
          file: "meta/tags.yml",
          fields: [
            {
              name: "tags",
              label: "Tags",
              label_singular: "Tag",
              widget: "list",
              fields: [
                {
                  label: "URL",
                  name: "slug",
                  widget: "string",
                  hint: "Den del af en URL identificerer tagget",
                },
                {
                  label: "Vist navn",
                  name: "name",
                  widget: "string",
                  hint: "Tagnavn til visning på webstedet",
                },
              ],
            },
          ],
        },
      ],
    },
    {
      name: "posts",
      label: "Indlæg",
      label_singular: "Indlæg",
      description: "Nyhedder / Indlæg",
      folder: "content/posts/",
      extension: "mdx",
      format: "frontmatter",
      create: true,
      sortable_fields: ["date", "title"],
      slug: "{{date}}-{{title}}",
      summary: "{{title}} - {{date}}",
      fields: [
        {
          label: "Titel",
          name: "title",
          widget: "string",
        },
        {
          label: "Udgivelsesdato",
          name: "date",
          widget: "datetime",
          date_format: "yyyy-MM-dd",
          time_format: false,
          format: "yyyy-MM-dd",
        },
        {
          label: "Forfatter",
          name: "author",
          widget: "relation",
          collection: "meta",
          file: "authors",
          search_fields: ["authors.*.name"],
          display_fields: ["authors.*.name"],
          value_field: "authors.*.slug",
        },
        {
          label: "Tags",
          label_singular: "Tag",
          name: "tags",
          widget: "list",
          summary: "{{fields.tag}}",
          fields: [
            {
              label: "Tag",
              name: "tag",
              widget: "relation",
              collection: "meta",
              file: "tags",
              search_fields: ["tags.*.name"],
              display_fields: ["tags.*.name"],
              value_field: "tags.*.slug",
            },
          ],
        },
        {
          label: "Indhold",
          name: "body",
          widget: "markdown",
        },
      ],
    },
  ],
};


export default config;