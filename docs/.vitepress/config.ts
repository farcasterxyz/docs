import { defineConfig } from 'vitepress'

// https://vitepress.dev/reference/site-config
export default defineConfig({
  title: 'Farcaster',
  description: 'Protocol homepage',
  head: [
    ['link', { rel: 'icon', type: 'image/png', href: '/icon.png' }],
    ['meta', { property: 'og:type', content: 'website' }],
    [
      'meta',
      {
        property: 'og:title',
        content: `Farcaster`,
      },
    ],
    ['meta', { property: 'og:image', content: 'https://farcaster.xyz/og-image.png' }],
    ['meta', { property: 'og:url', content: 'https://farcaster.xyz' }],
    [
      'meta',
      { property: 'og:description', content: 'A protocol for building sufficiently decentralized social networks.' },
    ],
    ['meta', { name: 'twitter:site', content: '@farcaster_xyz' }]
  ],
  themeConfig: {
    nav: [
      { text: 'Home', link: '/' },
      { text: 'Website', link: 'http://www.farcaster.xyz' }
    ],
    search: {
      provider: 'local'
    },
    sidebar: [
      {
        text: 'Introduction',
        items: [
          { text: 'What is Farcaster?', link: '/intro/what-is-farcaster' },
          { text: 'Community', link: '/intro/community' },
          { text: 'Examples', link: '/developers/examples' },
          { text: 'FAQ', link: '/intro/faq' },
        ]
      },
      {
        text: 'Protocol',
        items: [
          { text: 'Overview', link: '/protocol/overview' },
          { text: 'Concepts', link: '/protocol/concepts' },
          { text: 'Messages', link: '/protocol/messages' },
          { text: 'Hubs', link: '/protocol/hubs' },
          { text: 'Contracts', link: '/protocol/contracts' },
          { text: 'Specification', link: '/protocol/specification' },
          { text: 'Proposals', link: '/protocol/fips' },
          { text: 'Governance', link: '/protocol/governance' },
        ]
      }
    ],
    socialLinks: [
      { icon: 'github', link: 'https://github.com/farcasterxyz/protocol' },
      { icon: 'twitter', link: 'https://twitter.com/farcaster_xyz' },
      { icon: 'youtube', link: 'https://www.youtube.com/@farcasterxyz' },
    ]
  }
})
