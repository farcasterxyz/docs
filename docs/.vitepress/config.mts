import { defineConfig } from 'vitepress';

export default defineConfig({
  title: 'Farcaster',
  description: 'Protocol homepage',
  head: [
    ['link', { rel: 'icon', type: 'image/png', href: '/icon.png' }],
    ['meta', { property: 'og:type', content: 'website' }],
    ['meta', { property: 'og:title', content: 'Farcaster' }],
    ['meta', { property: 'og:image', content: 'https://farcaster.xyz/og-image.png' }],
    ['meta', { property: 'og:url', content: 'https://farcaster.xyz' }],
    ['meta', { property: 'og:description', content: 'A protocol for building sufficiently decentralized social networks.' }],
    ['meta', { name: 'twitter:site', content: '@farcaster_xyz' }],
    ['script', { async: '', src: 'https://www.googletagmanager.com/gtag/js?id=G-DF7PJS3WBD' }],
    ['script', {}, `window.dataLayer = window.dataLayer || []; function gtag(){dataLayer.push(arguments);} gtag('js', new Date()); gtag('config', 'G-DF7PJS3WBD');`]
  ],
  cleanUrls: true,
  themeConfig: {
    locales: {
      '/': {
        lang: 'en',
        title: 'Farcaster Documentation',
        description: 'Farcaster Documentation',
        label: 'English',
        nav: [
          { text: 'Learn', link: '/locales/en/learn/', activeMatch: '/locales/en/learn/' }
        ],
        sidebar: [
          {
            text: 'Introduction',
            items: [
              { text: 'Getting Started', link: '/locales/en/index' }
            ]
          },
          {
            text: 'Core Concepts',
            items: [
              { text: 'Accounts', link: '/locales/en/learn/what-is-farcaster/accounts' },
              { text: 'Usernames', link: '/locales/en/learn/what-is-farcaster/usernames' },
              { text: 'Messages', link: '/locales/en/learn/what-is-farcaster/messages' },
              { text: 'Frames', link: '/locales/en/learn/what-is-farcaster/frames' },
              { text: 'Channels', link: '/locales/en/learn/what-is-farcaster/channels' },
              { text: 'Apps', link: '/locales/en/learn/what-is-farcaster/apps' }
            ]
          },
          {
            text: 'Architecture',
            items: [
              { text: 'Overview', link: '/locales/en/learn/architecture/overview' },
              { text: 'Contracts', link: '/locales/en/learn/architecture/contracts' },
              { text: 'Hubs', link: '/locales/en/learn/architecture/hubs' },
              { text: 'ENS Names', link: '/locales/en/learn/architecture/ens-names' }
            ]
          },
          {
            text: 'Contributing',
            items: [
              { text: 'Overview', link: '/locales/en/learn/contributing/overview' },
              { text: 'Governance', link: '/locales/en/learn/contributing/governance' },
              { text: 'FIPs', link: '/locales/en/learn/contributing/fips' }
            ]
          }
        ]
      },
      '/ja/': {
        lang: 'ja',
        title: 'Farcaster ドキュメント',
        description: 'Farcasterのドキュメント',
        label: '日本語',
        nav: [
          { text: '学ぶ', link: '/locales/ja/learn/', activeMatch: '/locales/ja/learn/' }
        ],
        sidebar: [
          {
            text: '導入',
            items: [
              { text: '開始する', link: '/locales/ja/index' }
            ]
          },
          {
            text: 'コアコンセプト',
            items: [
              { text: 'アカウント', link: '/locales/ja/learn/what-is-farcaster/accounts' },
              { text: 'ユーザーネーム', link: '/locales/ja/learn/what-is-farcaster/usernames' },
              { text: 'メッセージ', link: '/locales/ja/learn/what-is-farcaster/messages' },
              { text: 'フレーム', link: '/locales/ja/learn/what-is-farcaster/frames' },
              { text: 'チャンネル', link: '/locales/ja/learn/what-is-farcaster/channels' },
              { text: 'アプリ', link: '/locales/ja/learn/what-is-farcaster/apps' }
            ]
          },
          {
            text: 'アーキテクチャ',
            items: [
              { text: '概要', link: '/locales/ja/learn/architecture/overview' },
              { text: '契約', link: '/locales/ja/learn/architecture/contracts' },
              { text: 'ハブ', link: '/locales/ja/learn/architecture/hubs' },
              { text: 'ENS 名', link: '/locales/ja/learn/architecture/ens-names' }
            ]
          },
          {
            text: '貢献',
            items: [
              { text: '概要', link: '/locales/ja/learn/contributing/overview' },
              { text: 'ガバナンス', link: '/locales/ja/learn/contributing/governance' },
              { text: 'FIP', link: '/locales/ja/learn/contributing/fips' }
            ]
          }
        ]
      },
      '/es/': {
        lang: 'es',
        title: 'Documentación de Farcaster',
        description: 'Documentación de Farcaster',
        label: 'Español',
        nav: [
          { text: 'Aprender', link: '/locales/es/learn/', activeMatch: '/locales/es/learn/' }
        ],
        sidebar: [
          {
            text: 'Introducción',
            items: [
              { text: 'Empezar', link: '/locales/es/index' }
            ]
          },
          {
            text: 'Conceptos básicos',
            items: [
              { text: 'Cuentas', link: '/locales/es/learn/what-is-farcaster/accounts' },
              { text: 'Nombres de usuario', link: '/locales/es/learn/what-is-farcaster/usernames' },
              { text: 'Mensajes', link: '/locales/es/learn/what-is-farcaster/messages' },
              { text: 'Marcos', link: '/locales/es/learn/what-is-farcaster/frames' },
              { text: 'Canales', link: '/locales/es/learn/what-is-farcaster/channels' },
              { text: 'Aplicaciones', link: '/locales/es/learn/what-is-farcaster/apps' }
            ]
          },
          {
            text: 'Arquitectura',
            items: [
              { text: 'Visión general', link: '/locales/es/learn/architecture/overview' },
              { text: 'Contratos', link: '/locales/es/learn/architecture/contracts' },
              { text: 'Hubs', link: '/locales/es/learn/architecture/hubs' },
              { text: 'Nombres ENS', link: '/locales/es/learn/architecture/ens-names' }
            ]
          },
          {
            text: 'Contribuyendo',
            items: [
              { text: 'Visión general', link: '/locales/es/learn/contributing/overview' },
              { text: 'Gobernanza', link: '/locales/es/learn/contributing/governance' },
              { text: 'FIPs', link: '/locales/es/learn/contributing/fips' }
            ]
          }
        ]
      },
      '/zh/': {
        lang: 'zh-CN',
        title: 'Farcaster 文档',
        description: 'Farcaster 的文档',
        label: '简体中文',
        nav: [
          { text: '学习', link: '/locales/zh/learn/', activeMatch: '/locales/zh/learn/' }
        ],
        sidebar: [
          {
            text: '介绍',
            items: [
              { text: '开始', link: '/locales/zh/index' }
            ]
          },
          {
            text: '核心概念',
            items: [
              { text: '账户', link: '/locales/zh/learn/what-is-farcaster/accounts' },
              { text: '用户名', link: '/locales/zh/learn/what-is-farcaster/usernames' },
              { text: '消息', link: '/locales/zh/learn/what-is-farcaster/messages' },
              { text: '框架', link: '/locales/zh/learn/what-is-farcaster/frames' },
              { text: '频道', link: '/locales/zh/learn/what-is-farcaster/channels' },
              { text: '应用程序', link: '/locales/zh/learn/what-is-farcaster/apps' }
            ]
          },
          {
            text: '架构',
            items: [
              { text: '概述', link: '/locales/zh/learn/architecture/overview' },
              { text: '合同', link: '/locales/zh/learn/architecture/contracts' },
              { text: 'Hubs', link: '/locales/zh/learn/architecture/hubs' },
              { text: 'ENS 名称', link: '/locales/zh/learn/architecture/ens-names' }
            ]
          },
          {
            text: '贡献',
            items: [
              { text: '概述', link: '/locales/zh/learn/contributing/overview' },
              { text: '治理', link: '/locales/zh/learn/contributing/governance' },
              { text: 'FIP', link: '/locales/zh/learn/contributing/fips' }
            ]
          }
        ]
      },
      '/fr/': {
        lang: 'fr',
        title: 'Documentation de Farcaster',
        description: 'Documentation de Farcaster',
        label: 'Français',
        nav: [
          { text: 'Apprendre', link: '/locales/fr/learn/', activeMatch: '/locales/fr/learn/' }
        ],
        sidebar: [
          {
            text: 'Introduction',
            items: [
              { text: 'Commencer', link: '/locales/fr/index' }
            ]
          },
          {
            text: 'Concepts de base',
            items: [
              { text: 'Comptes', link: '/locales/fr/learn/what-is-farcaster/accounts' },
              { text: 'Noms d\'utilisateur', link: '/locales/fr/learn/what-is-farcaster/usernames' },
              { text: 'Messages', link: '/locales/fr/learn/what-is-farcaster/messages' },
              { text: 'Cadres', link: '/locales/fr/learn/what-is-farcaster/frames' },
              { text: 'Canaux', link: '/locales/fr/learn/what-is-farcaster/channels' },
              { text: 'Applications', link: '/locales/fr/learn/what-is-farcaster/apps' }
            ]
          },
          {
            text: 'Architecture',
            items: [
              { text: 'Vue d\'ensemble', link: '/locales/fr/learn/architecture/overview' },
              { text: 'Contrats', link: '/locales/fr/learn/architecture/contracts' },
              { text: 'Hubs', link: '/locales/fr/learn/architecture/hubs' },
              { text: 'Noms ENS', link: '/locales/fr/learn/architecture/ens-names' }
            ]
          },
          {
            text: 'Contribuer',
            items: [
              { text: 'Vue d\'ensemble', link: '/locales/fr/learn/contributing/overview' },
              { text: 'Gouvernance', link: '/locales/fr/learn/contributing/governance' },
              { text: 'FIPs', link: '/locales/fr/learn/contributing/fips' }
            ]
          }
        ]
      }
    },
    search: {
      provider: 'algolia',
      options: {
        appId: 'ADFEMXTYRR',
        apiKey: '53a9b47bf4d93ee8fa655fec4274538b',
        indexName: 'farcaster',
        insights: true,
      }
    },
    socialLinks: [
      { icon: 'github', link: 'https://github.com/farcasterxyz/protocol' },
      { icon: 'twitter', link: 'https://twitter.com/farcaster_xyz' },
      { icon: 'youtube', link: 'https://www.youtube.com/@farcasterxyz' }
    ]
  }
});
