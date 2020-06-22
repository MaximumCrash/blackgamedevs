const path = require("path")

module.exports = {
  siteMetadata: {
    title: `Black Game Devs`,
    description: `A list of black game developers, designers, artists, and more. Here they are. Hire them. Buy their stuff.`,
    author: `Arthur Ward, Jr, Catt Small, Chris Algoo, Réjon Taylor-Foster`,
  },
  plugins: [
    `gatsby-plugin-react-helmet`,
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        name: `pages`,
        path: `${__dirname}/src/pages/`,
      },
    },
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        name: `layouts`,
        path: `${__dirname}/src/modules/layouts/`,
      },
    },
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        name: `directory`,
        path: `${__dirname}/directory/`,
      },
    },
    {
      resolve: "gatsby-plugin-theme-ui",
      options: {
        prismPreset: "night-owl",
        preset: "@theme-ui/preset-funk",
      },
    },
    `gatsby-transformer-sharp`,
    `gatsby-plugin-sharp`,
    `gatsby-remark-images`,
    "gatsby-remark-unwrap-images",
    {
      resolve: `gatsby-plugin-mdx`,
      options: {
        extensions: [`.mdx`, `.md`],
        defaultLayouts: {
          default: require.resolve("./src/modules/layouts/default_layout.js"),
        },
        gatsbyRemarkPlugins: [
          {
            resolve: `gatsby-remark-images`,
            options: {
              backgroundColor: "none",
              disableBgImage: true,
              maxWidth: 1000,
              wrapperStyle: result => `width: 100%;margin-left: 0;`,
            },
          },
          {
            resolve: "gatsby-remark-unwrap-images",
          },
        ],
      },
    },
    {
      resolve: `gatsby-plugin-layout`,
      options: {
        component: require.resolve(`./src/modules/layouts/site_layout.js`),
      },
    },

    {
      resolve: `gatsby-plugin-manifest`,
      options: {
        name: `gatsby-starter-default`,
        short_name: `starter`,
        start_url: `/`,
        background_color: `#663399`,
        theme_color: `#663399`,
        display: `minimal-ui`,
      },
    },
    {
      resolve: `gatsby-plugin-google-fonts`,
      options: {
        fonts: [`Martel\:400,700`, `Poppins\:300,400,700`],
        display: "swap",
      },
    },
    {
      //NOTE(Rejon): This is what allows us to do aliased imports like "@modules/ect..."
      resolve: `gatsby-plugin-alias-imports`,
      options: {
        alias: {
          "@src": path.resolve(__dirname, "src"),
          "@modules": path.resolve(__dirname, "src/modules"),
          "@layouts": path.resolve(__dirname, "src/modules/layouts"),
          "@ui": path.resolve(__dirname, "src/modules/ui"),
          "@utils": path.resolve(__dirname, "src/utils.js"),
          "@search": path.resolve(__dirname, "src/modules/search"),
          "@pages": path.resolve(__dirname, "src/pages"),
          "@public": path.resolve(__dirname, "public"),
          "@dir": path.resolve(__dirname, "directory"),
        },
        extensions: [
          //NOTE(Rejon): You don't have to write .js at the end of js files now.
          "js",
        ],
      },
    },
    {
      resolve: "gatsby-plugin-lunr",
      options: {
        languages: [
          {
            name: "en",
            filterNodes: node =>
              node.frontmatter !== undefined &&
              node.fileAbsolutePath &&
              node.fileAbsolutePath.match(/(\/directories\/).+/) !== null,
          },
        ],
        fields: [
          { name: "name", store: true, attributes: { boost: 20 } },
          { name: "location", store: true, attributes: { boost: 10 } },
          { name: "skills", store: true, attributes: { boost: 15 } },
          { name: "id", store: true },
          { name: "type", store: true },
        ],
        resolvers: {
          Mdx: {
            name: ({ rawBody }) => {
              return rawBody
                ? rawBody
                    .split("\n")
                    .find(n => n[0] === "#")
                    .replace(/^#\s/, "")
                : null
            },
            location: ({ rawBody }) => {
              return rawBody
                ? rawBody
                    .substring(
                      rawBody.lastIndexOf("<Location>") + 11,
                      rawBody.lastIndexOf("</Location>")
                    )
                    .split("\n")
                    .filter(n => n !== "")
                : null
            },
            skills: ({ rawBody }) => {
              return rawBody
                ? rawBody
                    .substring(
                      rawBody.lastIndexOf("<Skills>") + 9,
                      rawBody.lastIndexOf("</Skills>")
                    )
                    .split("\n")
                    .filter(n => n !== "")
                : null
            },
            id: ({ id }) => id,
            type: ({ frontmatter: { isCompany } }) =>
              isCompany ? "companies" : "people",
          },
        },
        filename: "search_index.json",
        fetchOptions: {
          credentials: "same-origin",
        },
      },
    },
    // this (optional) plugin enables Progressive Web App + Offline functionality
    // To learn more, visit: https://gatsby.dev/offline
    // `gatsby-plugin-offline`,
  ],
}
