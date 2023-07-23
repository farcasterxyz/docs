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
      { text: 'Examples', link: '/developers/examples' }
    ],
    search: {
      provider: 'local'
    },
    sidebar: [
      {
        text: 'Introduction',
        items: [
          { text: 'What is Farcaster?', link: '/intro/what-is-farcaster' },
          { text: 'Use Farcaster', link: '/intro/use-farcaster' },
          { text: 'FAQ', link: '/intro/faq' },
        ]
      },
      {
        text: 'Protocol',
        items: [
          { text: 'Overview', link: '/protocol/overview' },
          {
            text: 'Concepts',
            collapsed: true,
            items: [
              { text: 'Identity', link: '/protocol/concepts/identity' },
              { text: 'Messages', link: '/protocol/concepts/messages' },
              { text: 'Authentication', link: '/protocol/concepts/authentication' },
              { text: 'Message Graph', link: '/protocol/concepts/message-graph' },
              { text: 'Applications', link: '/protocol/concepts/applications' },
            ]
          },
          { text: 'Specification', link: '/protocol/specification' },
          { text: 'Governance', link: '/protocol/governance' },
          { text: 'Contracts', link: '/protocol/contracts' },
          { text: 'FIPs', link: '/protocol/fips' },
        ]
      },
      {
        text: 'Developers',
        items: [
          { text: 'Hubs', link: '/developers/hubs' },
          { text: 'Community', link: '/developers/community' },
          { text: 'Examples', link: '/developers/examples' },
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
