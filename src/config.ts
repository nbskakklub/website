import type { Config } from "@staticcms/core";

const config: Config = {
    backend: {
    name: 'github',
    branch: 'nextjs-decap',
    repo: 'arctixdev/NBWebsite',
    base_url: 'https://worker-super-fog-c155.jonathan-e16.workers.dev'
  },
  logo_url: '/icon.png',
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
              field: {
                label: 'Søgeord',
                name: 'keyword',
                widget: 'string'
              }
            },
            {
              label: 'Twitter account',
              name: 'twitter_account',
              widget: 'string'
            }
          ]
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
            },
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
          dateFormat: 'yyyy-mm-dd',
          timeFormat: false
        },
        {
          label: 'Forfatter',
          name: 'author',
          widget: 'relation',
          collection: 'meta',
          file: 'authors',
          searchFields: ['authors.*.name'],
          displayFields: ['authors.*.name'],
          valueField: 'authors.*.slug'
        },
        {
          label: 'Tags',
          label_singular: 'Tag',
          name: 'tags',
          widget: 'list',
          summary: '{{fields.tag}}',
          field: {
            label: 'Tag',
            name: 'tag',
            widget: 'relation',
            collection: 'meta',
            file: 'tags',
            searchFields: ['tags.*.name'],
            displayFields: ['tags.*.name'],
            valueField: 'tags.*.slug'
          }
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