import { defineConfig } from 'vitepress';
import { enConfig } from './src/configs/en'
import { frConfig } from './src/configs/fr'

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
        content: 'Farcaster',
      },
    ],
    [
      'meta',
      { property: 'og:image', content: 'https://farcaster.xyz/og-image.png' },
    ],
    ['meta', { property: 'og:url', content: 'https://farcaster.xyz' }],
    [
      'meta',
      {
        property: 'og:description',
        content:
          'A protocol for building sufficiently decentralized social networks.',
      },
    ],
    ['meta', { name: 'twitter:site', content: '@farcaster_xyz' }],
    [
      'script',
      { async: '', src: 'https://www.googletagmanager.com/gtag/js?id=G-DF7PJS3WBD' }
    ],
    [
      'script',
      {},
      `window.dataLayer = window.dataLayer || [];
      function gtag(){dataLayer.push(arguments);}
      gtag('js', new Date());
      gtag('config', 'G-DF7PJS3WBD');`
    ],
  ],
  cleanUrls: true,
  themeConfig: {
    nav: [
      {
        text: 'Learn',
        link: '/',
        activeMatch: '/learn/',
      }
    ],
    search: {
      provider: 'algolia',
      options: {
        appId: 'ADFEMXTYRR',
        apiKey: '53a9b47bf4d93ee8fa655fec4274538b',
        indexName: 'farcaster',
        insights: true,
      }
    },
    sidebar: {
      '/': [
        {
          text: 'Introduction',
          items: [
            {
              text: 'Getting Started',
              link: '/index',
            },
          ],
        },
        {
          text: 'Core Concepts',
          items: [
            {
              text: 'Accounts',
              link: '/learn/what-is-farcaster/accounts',
            },
            {
              text: 'Usernames',
              link: '/learn/what-is-farcaster/usernames',
            },
            {
              text: 'Messages',
              link: '/learn/what-is-farcaster/messages',
            },
            {
              text: 'Frames',
              link: '/learn/what-is-farcaster/frames',
            },
            {
              text: 'Channels',
              link: '/learn/what-is-farcaster/channels',
            },
            {
              text: 'Apps',
              link: '/learn/what-is-farcaster/apps',
            },
          ],
        },
        {
          text: 'Architecture',
          items: [
            { text: 'Overview', link: '/learn/architecture/overview' },
            { text: 'Contracts', link: '/learn/architecture/contracts' },
            { text: 'Hubs', link: '/learn/architecture/hubs' },
            { text: 'ENS Names', link: '/learn/architecture/ens-names' },
          ],
        },
        {
          text: 'Contributing',
          items: [
            { text: 'Overview', link: '/learn/contributing/overview' },
            { text: 'Governance', link: '/learn/contributing/governance' },
            { text: 'FIPs', link: '/learn/contributing/fips' },
          ],
        },
      ],
    },
    socialLinks: [
      { icon: 'github', link: 'https://github.com/farcasterxyz/protocol' },
      { icon: 'twitter', link: 'https://twitter.com/farcaster_xyz' },
      { icon: 'youtube', link: 'https://www.youtube.com/@farcasterxyz' },
    ],
  },
  locales: {
    root: { label: 'English', lang: 'en', link: '/locales/en/', ...enConfig },
    fr: { label: 'French', lang: 'fr', link: '/locales/fr/', ...frConfig },
},
});