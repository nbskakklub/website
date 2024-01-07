/** @type {import('next-sitemap').IConfig} */
module.exports = {
  siteUrl: process.env.SITE_URL || "https://nbskak.dk/",
  generateRobotsTxt: true,
  exclude: ["/_nuxt/*", "/admin"],
  robotsTxtOptions: {
    policies: [
      {
        userAgent: "*",
        disallow: ["/_nuxt", "/admin"],
      },
    ],
  },
};
