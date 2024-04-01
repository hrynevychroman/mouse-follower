import { defineConfig } from 'vitepress'

// https://vitepress.dev/reference/site-config
export default defineConfig({
  title: 'Mouse Follower',
  description: 'A simple mouse follower based on GSAP',
  base: '/mouse-follower/',

  themeConfig: {
    // https://vitepress.dev/reference/default-theme-config
    nav: [
      { text: 'Home', link: '/' },
      { text: 'Config', link: '/css-variables' },
    ],

    sidebar: [
      {
        text: 'Configuration',
        items: [
          { text: 'Default CSS Variables', link: '/css-variables' },
        ],
      },
    ],

    socialLinks: [
      { icon: 'github', link: 'https://github.com/vuejs/vitepress' },
    ],
  },
})
