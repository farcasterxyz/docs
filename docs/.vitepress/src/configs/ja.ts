import type { DefaultTheme, LocaleSpecificConfig } from 'vitepress'

export const jaConfig: LocaleSpecificConfig<DefaultTheme.Config> = {
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
                  link: '/locales/ja/index',
                },
              ],
            },
            {
              text: 'Core Concepts',
              items: [
                {
                  text: 'Accounts',
                  link: '/locales/ja/learn/what-is-farcaster/accounts',
                },
                {
                  text: 'Usernames',
                  link: '/locales/ja/learn/what-is-farcaster/usernames',
                },
                {
                  text: 'Messages',
                  link: '/locales/ja/learn/what-is-farcaster/messages',
                },
                {
                  text: 'Frames',
                  link: '/locales/ja/learn/what-is-farcaster/frames',
                },
                {
                  text: 'Channels',
                  link: '/locales/ja/learn/what-is-farcaster/channels',
                },
                {
                  text: 'Apps',
                  link: '/locales/ja/learn/what-is-farcaster/apps',
                },
              ],
            },
            {
              text: 'Architecture',
              items: [
                { text: 'Overview', link: '/locales/ja/learn/architecture/overview' },
                { text: 'Contracts', link: '/locales/ja/learn/architecture/contracts' },
                { text: 'Hubs', link: '/locales/ja/learn/architecture/hubs' },
                { text: 'ENS Names', link: '/locales/ja/learn/architecture/ens-names' },
              ],
            },
            {
              text: 'Contributing',
              items: [
                { text: 'Overview', link: '/locales/ja/learn/contributing/overview' },
                { text: 'Governance', link: '/locales/ja/learn/contributing/governance' },
                { text: 'FIPs', link: '/locales/ja/learn/contributing/fips' },
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