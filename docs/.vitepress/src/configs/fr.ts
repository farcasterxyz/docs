import type { DefaultTheme, LocaleSpecificConfig } from 'vitepress'

export const frConfig: LocaleSpecificConfig<DefaultTheme.Config> = {
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
                  link: '/locales/fr/index',
                },
              ],
            },
            {
              text: 'Core Concepts',
              items: [
                {
                  text: 'Accounts',
                  link: '/locales/fr/learn/what-is-farcaster/accounts',
                },
                {
                  text: 'Usernames',
                  link: '/locales/fr/learn/what-is-farcaster/usernames',
                },
                {
                  text: 'Messages',
                  link: '/locales/fr/learn/what-is-farcaster/messages',
                },
                {
                  text: 'Frames',
                  link: '/locales/fr/learn/what-is-farcaster/frames',
                },
                {
                  text: 'Channels',
                  link: '/locales/fr/learn/what-is-farcaster/channels',
                },
                {
                  text: 'Apps',
                  link: '/locales/fr/learn/what-is-farcaster/apps',
                },
              ],
            },
            {
              text: 'Architecture',
              items: [
                { text: 'Overview', link: '/locales/fr/learn/architecture/overview' },
                { text: 'Contracts', link: '/locales/fr/learn/architecture/contracts' },
                { text: 'Hubs', link: '/locales/fr/learn/architecture/hubs' },
                { text: 'ENS Names', link: '/locales/fr/learn/architecture/ens-names' },
              ],
            },
            {
              text: 'Contributing',
              items: [
                { text: 'Overview', link: '/locales/fr/learn/contributing/overview' },
                { text: 'Governance', link: '/locales/fr/learn/contributing/governance' },
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