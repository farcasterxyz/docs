import type { DefaultTheme, LocaleSpecificConfig } from 'vitepress'

export const enConfig: LocaleSpecificConfig<DefaultTheme.Config> = {
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
                  link: '/locales/en/index',
                },
              ],
            },
            {
              text: 'Core Concepts',
              items: [
                {
                  text: 'Accounts',
                  link: '/locales/en/learn/what-is-farcaster/accounts',
                },
                {
                  text: 'Usernames',
                  link: '/locales/en/learn/what-is-farcaster/usernames',
                },
                {
                  text: 'Messages',
                  link: '/locales/en/learn/what-is-farcaster/messages',
                },
                {
                  text: 'Frames',
                  link: '/locales/en/learn/what-is-farcaster/frames',
                },
                {
                  text: 'Channels',
                  link: '/locales/en/learn/what-is-farcaster/channels',
                },
                {
                  text: 'Apps',
                  link: '/locales/en/learn/what-is-farcaster/apps',
                },
              ],
            },
            {
              text: 'Architecture',
              items: [
                { text: 'Overview', link: '/locales/en/learn/architecture/overview' },
                { text: 'Contracts', link: '/locales/en/learn/architecture/contracts' },
                { text: 'Hubs', link: '/locales/en/learn/architecture/hubs' },
                { text: 'ENS Names', link: '/locales/en/learn/architecture/ens-names' },
              ],
            },
            {
              text: 'Contributing',
              items: [
                { text: 'Overview', link: '/locales/en/learn/contributing/overview' },
                { text: 'Governance', link: '/locales/en/learn/contributing/governance' },
                { text: 'FIPs', link: '/locales/en/learn/contributing/fips' },
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