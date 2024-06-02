import type { DefaultTheme, LocaleSpecificConfig } from 'vitepress'

export const frConfig: LocaleSpecificConfig<DefaultTheme.Config> = {
  themeConfig: {
    nav: [
      {
        text: 'Apprendre',
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
              text: 'Commencer',
              link: '/locales/fr/index',
            },
          ],
        },
        {
          text: 'Concepts de base',
          items: [
            {
              text: 'Comptes',
              link: '/locales/fr/learn/what-is-farcaster/accounts',
            },
            {
              text: 'Noms d\'utilisateur',
              link: '/locales/fr/learn/what-is-farcaster/usernames',
            },
            {
              text: 'Messages',
              link: '/locales/fr/learn/what-is-farcaster/messages',
            },
            {
              text: 'Cadres',
              link: '/locales/fr/learn/what-is-farcaster/frames',
            },
            {
              text: 'Canaux',
              link: '/locales/fr/learn/what-is-farcaster/channels',
            },
            {
              text: 'Applications',
              link: '/locales/fr/learn/what-is-farcaster/apps',
            },
          ],
        },
        {
          text: 'Architecture',
          items: [
            { text: 'Aperçu', link: '/locales/fr/learn/architecture/overview' },
            { text: 'Contrats', link: '/locales/fr/learn/architecture/contracts' },
            { text: 'Hubs', link: '/locales/fr/learn/architecture/hubs' },
            { text: 'Noms ENS', link: '/locales/fr/learn/architecture/ens-names' },
          ],
        },
        {
          text: 'Contribuer',
          items: [
            { text: 'Aperçu', link: '/locales/fr/learn/contributing/overview' },
            { text: 'Gouvernance', link: '/locales/fr/learn/contributing/governance' },
            { text: 'FIPs', link: '/locales/fr/learn/contributing/fips' },
          ],
        },
      ],
    },
    socialLinks: [
      { icon: 'github', link: 'https://github.com/farcasterxyz/protocol' },
      { icon: 'twitter', link: 'https://twitter.com/farcaster_xyz' },
      { icon: 'youtube', link: 'https://www.youtube.com/@farcasterxyz' },
    ],
  }
}
