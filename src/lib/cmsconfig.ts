import type { Config } from "@staticcms/core";

interface SlugField {
  name: 'slug';
  label: string;
  widget: 'slug';
  hint?: string;
}


const config: Config<SlugField> = {
  backend: {
    name: 'github',
    branch: 'main',
    repo: 'nbskakklub/website',
    base_url: 'https://website-bw4.pages.dev/',
    auth_endpoint: '/api/auth'
  },
  base_url: 'https://website-bw4.pages.dev/',
  logo_url: '/icon.png',
  display_url: 'https://website-bw4.pages.dev/',
  site_url: '/admin',
  locale: 'da',
  theme: {
    include_built_in_themes: false,
    default_theme: 'Lys',
    themes: [
      {
        name: 'Lys',
        extends: 'light',
      },
      {
        name: 'Mørk',
        extends: 'dark',
      }
    ],
  },
  media_folder: 'public/images',
  public_folder: '/images',
  collections: [
    {
      name: 'config',
      label: 'Indstillinger',
      delete: false,
      editor: {
        preview: false
      },
      files: [
        {
          name: 'general',
          label: 'Generelle indstillinger',
          file: 'config.json',
          description: 'Generelle side indstillinger',
          fields: [
            {
              label: 'Hjemmeside URL',
              name: 'base_url',
              widget: 'string',
              hint: "Indtast ikke den efterfølgende skråstreg på URL'en"
            },
            {
              label: 'Webstedets titel',
              name: 'site_title',
              widget: 'string'
            },
            {
              label: 'Webside beskrivelse',
              name: 'site_description',
              widget: 'string'
            },
            {
              label: 'Webside søgeord',
              name: 'site_keywords',
              widget: 'list',
              summary: '{{fields.keyword.keyword}}',
              fields: [
                {
                label: 'Søgeord',
                name: 'keyword',
                widget: 'string',
                },
              ]
            },
          ]
        }
      ]
    },
    {
      name: 'pages',
      label: 'Sider',
      folder: 'content/pages/',
      extension: 'mdx',
      format: 'frontmatter',
      create: false,
      delete: false,
      fields: [
        {
          label: 'Titel',
          name: 'title',
          widget: 'string'
        },
        {
          label: 'Indhold',
          name: 'body',
          widget: 'markdown'
        }
      ]
    },
    {
      name: 'meta',
      label: 'Meta',
      delete: false,
      editor: {
        preview: false
      },
      files: [
        {
          name: 'authors',
          label: 'Forfattere',
          file: 'meta/authors.yml',
          description: 'Forfattere beskrivelser',
          fields: [
            {
              name: 'authors',
              label_singular: 'Forfatter',
              widget: 'list',
              fields: [
                {
                  label: 'URL',
                  name: 'slug',
                  widget: 'slug',
                  hint: 'Den del af en URL identificerer forfatteren'
                },
                {
                  label: 'Navn',
                  name: 'name',
                  widget: 'string',
                  hint: 'First and Last'
                },
                {
                  label: 'Introduktion',
                  name: 'introduction',
                  widget: 'text'
                }
              ]
            }
          ]
        },
        {
          name: 'tags',
          label: 'Tags',
          file: 'meta/tags.yml',
          fields: [
            {
              name: 'tags',
              label: 'Tags',
              label_singular: 'Tag',
              widget: 'list',
              fields: [
                {
                  label: 'URL',
                  name: 'slug',
                  widget: 'slug',
                  hint: 'Den del af en URL identificerer tagget'
                },
                {
                  label: 'Vist navn',
                  name: 'name',
                  widget: 'string',
                  hint: 'Tagnavn til visning på webstedet'
                }
              ]
            }
          ]
        }
      ]
    },
    {
      name: 'posts',
      label: 'Indlæg',
      folder: 'content/posts/',
      extension: 'mdx',
      format: 'frontmatter',
      create: true,
      slug: '{{slug}}',
      identifier_field: 'slug',
      summary: '{{title}}',
      fields: [
        {
          label: 'Url',
          name: 'slug',
          widget: 'slug'
        },
        {
          label: 'Titel',
          name: 'title',
          widget: 'string'
        },
        {
          label: 'Udgivelsesdato',
          name: 'date',
          widget: 'datetime',
          format: 'yyyy-mm-dd',
          date_format: 'yyyy-mm-dd',
          time_format: false
        },
        {
          label: 'Forfatter',
          name: 'author',
          widget: 'relation',
          collection: 'meta',
          file: 'authors',
          search_fields: ['authors.*.name'],
          display_fields: ['authors.*.name'],
          value_field: 'authors.*.slug'
        },
        {
          label: 'Tags',
          label_singular: 'Tag',
          name: 'tags',
          widget: 'list',
          summary: '{{fields.tag}}',
          fields: [{
            label: 'Tag',
            name: 'tag',
            widget: 'relation',
            collection: 'meta',
            file: 'tags',
            search_fields: ['tags.*.name'],
            display_fields: ['tags.*.name'],
            value_field: 'tags.*.slug'
          }],
        },
        {
          label: 'Indhold',
          name: 'body',
          widget: 'markdown'
        }
      ]
    }
  ]
};


export default config;