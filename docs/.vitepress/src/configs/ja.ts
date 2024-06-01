import type { DefaultTheme, LocaleSpecificConfig } from 'vitepress'

export const jaConfig: LocaleSpecificConfig<DefaultTheme.Config> = {
  themeConfig: {
    nav: [
      {
        text: '学ぶ',
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
          text: 'イントロダクション',
          items: [
            {
              text: '始めに',
              link: '/locales/ja/index',
            },
          ],
        },
        {
          text: 'コアコンセプト',
          items: [
            {
              text: 'アカウント',
              link: '/locales/ja/learn/what-is-farcaster/accounts',
            },
            {
              text: 'ユーザーネーム',
              link: '/locales/ja/learn/what-is-farcaster/usernames',
            },
            {
              text: 'メッセージ',
              link: '/locales/ja/learn/what-is-farcaster/messages',
            },
            {
              text: 'フレーム',
              link: '/locales/ja/learn/what-is-farcaster/frames',
            },
            {
              text: 'チャンネル',
              link: '/locales/ja/learn/what-is-farcaster/channels',
            },
            {
              text: 'アプリ',
              link: '/locales/ja/learn/what-is-farcaster/apps',
            },
          ],
        },
        {
          text: 'アーキテクチャ',
          items: [
            { text: '概要', link: '/locales/ja/learn/architecture/overview' },
            { text: '契約', link: '/locales/ja/learn/architecture/contracts' },
            { text: 'ハブ', link: '/locales/ja/learn/architecture/hubs' },
            { text: 'ENS 名前', link: '/locales/ja/learn/architecture/ens-names' },
          ],
        },
        {
          text: '貢献する',
          items: [
            { text: '概要', link: '/locales/ja/learn/contributing/overview' },
            { text: 'ガバナンス', link: '/locales/ja/learn/contributing/governance' },
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
