import { defineConfig } from 'vitepress';

// refer https://vitepress.dev/reference/site-config for details
export default defineConfig({
  lang: 'fr',
  title: 'Thérapeutique du Cancer',
  description: 'Vite & Vue powered static site generator.',

  markdown: {
    container: {
      customQuote: {
        render: (tokens, idx) => {
          const token = tokens[idx]
          if (token.nesting === 1) {
            return '<div class="custom-quote">\n'
          } else {
            return '</div>\n'
          }
        }
      }
    }
  },

  themeConfig: {
    nav: [
      { text: 'Introduction', link: '/introduction' },
      { text: 'Terminologie', link: '/terminologie' }
    ],

    sidebar: [
      {
        items: [
          { text: 'Introduction', link: '/introduction' },
          { text: 'Terminologie', link: '/terminologie' }
        ],
      },
    ],

    docFooter: {
      prev: 'Page précédente',
      next: 'Page suivante'
    },

    outlineTitle: 'Sur cette page',
  },
});