/** @type {import('next-sitemap').IConfig} */
module.exports = {
  siteUrl: process.env.SITE_URL || 'https://nbskak.arctix.dev/',
  generateRobotsTxt: true,
  exclude: ['/_nuxt/*', '/admin'],
  robotsTxtOptions: {
    policies: [
        {
            userAgent: '*',
            disallow: ['/_nuxt', '/admin']
        },
    ]
  }
}