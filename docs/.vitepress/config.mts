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
          { text: 'Learn', link: '/learn/', activeMatch: '/learn/' }
        ],
        sidebar: [
          {
            text: 'Introduction',
            items: [
              { text: 'Getting Started', link: '/index' }
            ]
          },
          {
            text: 'Core Concepts',
            items: [
              { text: 'Accounts', link: '/learn/what-is-farcaster/accounts' },
              { text: 'Usernames', link: '/learn/what-is-farcaster/usernames' },
              { text: 'Messages', link: '/learn/what-is-farcaster/messages' },
              { text: 'Frames', link: '/learn/what-is-farcaster/frames' },
              { text: 'Channels', link: '/learn/what-is-farcaster/channels' },
              { text: 'Apps', link: '/learn/what-is-farcaster/apps' }
            ]
          },
          {
            text: 'Architecture',
            items: [
              { text: 'Overview', link: '/learn/architecture/overview' },
              { text: 'Contracts', link: '/learn/architecture/contracts' },
              { text: 'Hubs', link: '/learn/architecture/hubs' },
              { text: 'ENS Names', link: '/learn/architecture/ens-names' }
            ]
          },
          {
            text: 'Contributing',
            items: [
              { text: 'Overview', link: '/learn/contributing/overview' },
              { text: 'Governance', link: '/learn/contributing/governance' },
              { text: 'FIPs', link: '/learn/contributing/fips' }
            ]
          }
        ]
      },
      // '/ja/': {
      //   lang: 'ja',
      //   title: 'Farcaster ドキュメント',
      //   description: 'Farcasterのドキュメント',
      //   label: '日本語',
      //   nav: [
      //     { text: '学ぶ', link: '/ja/learn/', activeMatch: '/ja/learn/' }
      //   ],
      //   sidebar: [
      //     {
      //       text: '導入',
      //       items: [
      //         { text: '開始する', link: '/ja/index' }
      //       ]
      //     },
      //     {
      //       text: 'コアコンセプト',
      //       items: [
      //         { text: 'アカウント', link: '/ja/learn/what-is-farcaster/accounts' },
      //         { text: 'ユーザーネーム', link: '/ja/learn/what-is-farcaster/usernames' },
      //         { text: 'メッセージ', link: '/ja/learn/what-is-farcaster/messages' },
      //         { text: 'フレーム', link: '/ja/learn/what-is-farcaster/frames' },
      //         { text: 'チャンネル', link: '/ja/learn/what-is-farcaster/channels' },
      //         { text: 'アプリ', link: '/ja/learn/what-is-farcaster/apps' }
      //       ]
      //     },
      //     {
      //       text: 'アーキテクチャ',
      //       items: [
      //         { text: '概要', link: '/ja/learn/architecture/overview' },
      //         { text: '契約', link: '/ja/learn/architecture/contracts' },
      //         { text: 'ハブ', link: '/ja/learn/architecture/hubs' },
      //         { text: 'ENS 名', link: '/ja/learn/architecture/ens-names' }
      //       ]
      //     },
      //     {
      //       text: '貢献',
      //       items: [
      //         { text: '概要', link: '/ja/learn/contributing/overview' },
      //         { text: 'ガバナンス', link: '/ja/learn/contributing/governance' },
      //         { text: 'FIP', link: '/ja/learn/contributing/fips' }
      //       ]
      //     }
      //   ]
      // },
      // '/es/': {
      //   lang: 'es',
      //   title: 'Documentación de Farcaster',
      //   description: 'Documentación de Farcaster',
      //   label: 'Español',
      //   nav: [
      //     { text: 'Aprender', link: '/es/learn/', activeMatch: '/es/learn/' }
      //   ],
      //   sidebar: [
      //     {
      //       text: 'Introducción',
      //       items: [
      //         { text: 'Empezar', link: '/es/index' }
      //       ]
      //     },
      //     {
      //       text: 'Conceptos básicos',
      //       items: [
      //         { text: 'Cuentas', link: '/es/learn/what-is-farcaster/accounts' },
      //         { text: 'Nombres de usuario', link: '/es/learn/what-is-farcaster/usernames' },
      //         { text: 'Mensajes', link: '/es/learn/what-is-farcaster/messages' },
      //         { text: 'Marcos', link: '/es/learn/what-is-farcaster/frames' },
      //         { text: 'Canales', link: '/es/learn/what-is-farcaster/channels' },
      //         { text: 'Aplicaciones', link: '/es/learn/what-is-farcaster/apps' }
      //       ]
      //     },
      //     {
      //       text: 'Arquitectura',
      //       items: [
      //         { text: 'Visión general', link: '/es/learn/architecture/overview' },
      //         { text: 'Contratos', link: '/es/learn/architecture/contracts' },
      //         { text: 'Hubs', link: '/es/learn/architecture/hubs' },
      //         { text: 'Nombres ENS', link: '/es/learn/architecture/ens-names' }
      //       ]
      //     },
      //     {
      //       text: 'Contribuyendo',
      //       items: [
      //         { text: 'Visión general', link: '/es/learn/contributing/overview' },
      //         { text: 'Gobernanza', link: '/es/learn/contributing/governance' },
      //         { text: 'FIPs', link: '/es/learn/contributing/fips' }
      //       ]
      //     }
      //   ]
      // },
      // '/zh/': {
      //   lang: 'zh-CN',
      //   title: 'Farcaster 文档',
      //   description: 'Farcaster 的文档',
      //   label: '简体中文',
      //   nav: [
      //     { text: '学习', link: '/zh/learn/', activeMatch: '/zh/learn/' }
      //   ],
      //   sidebar: [
      //     {
      //       text: '介绍',
      //       items: [
      //         { text: '开始', link: '/zh/index' }
      //       ]
      //     },
      //     {
      //       text: '核心概念',
      //       items: [
      //         { text: '账户', link: '/zh/learn/what-is-farcaster/accounts' },
      //         { text: '用户名', link: '/zh/learn/what-is-farcaster/usernames' },
      //         { text: '消息', link: '/zh/learn/what-is-farcaster/messages' },
      //         { text: '框架', link: '/zh/learn/what-is-farcaster/frames' },
      //         { text: '频道', link: '/zh/learn/what-is-farcaster/channels' },
      //         { text: '应用程序', link: '/zh/learn/what-is-farcaster/apps' }
      //       ]
      //     },
      //     {
      //       text: '架构',
      //       items: [
      //         { text: '概述', link: '/zh/learn/architecture/overview' },
      //         { text: '合同', link: '/zh/learn/architecture/contracts' },
      //         { text: 'Hubs', link: '/zh/learn/architecture/hubs' },
      //         { text: 'ENS 名称', link: '/zh/learn/architecture/ens-names' }
      //       ]
      //     },
      //     {
      //       text: '贡献',
      //       items: [
      //         { text: '概述', link: '/zh/learn/contributing/overview' },
      //         { text: '治理', link: '/zh/learn/contributing/governance' },
      //         { text: 'FIP', link: '/zh/learn/contributing/fips' }
      //       ]
      //     }
      //   ]
      // },
      '/fr/': {
        lang: 'fr',
        title: 'Documentation de Farcaster',
        description: 'Documentation de Farcaster',
        label: 'Français',
        nav: [
          { text: 'Apprendre', link: '/fr/learn/', activeMatch: '/fr/learn/' }
        ],
        sidebar: [
          {
            text: 'Introduction',
            items: [
              { text: 'Commencer', link: '/fr/index' }
            ]
          },
          {
            text: 'Concepts de base',
            items: [
              { text: 'Comptes', link: '/fr/learn/what-is-farcaster/accounts' },
              { text: 'Noms d\'utilisateur', link: '/fr/learn/what-is-farcaster/usernames' },
              { text: 'Messages', link: '/fr/learn/what-is-farcaster/messages' },
              { text: 'Cadres', link: '/fr/learn/what-is-farcaster/frames' },
              { text: 'Canaux', link: '/fr/learn/what-is-farcaster/channels' },
              { text: 'Applications', link: '/fr/learn/what-is-farcaster/apps' }
            ]
          },
          {
            text: 'Architecture',
            items: [
              { text: 'Vue d\'ensemble', link: '/fr/learn/architecture/overview' },
              { text: 'Contrats', link: '/fr/learn/architecture/contracts' },
              { text: 'Hubs', link: '/fr/learn/architecture/hubs' },
              { text: 'Noms ENS', link: '/fr/learn/architecture/ens-names' }
            ]
          },
          {
            text: 'Contribuer',
            items: [
              { text: 'Vue d\'ensemble', link: '/fr/learn/contributing/overview' },
              { text: 'Gouvernance', link: '/fr/learn/contributing/governance' },
              { text: 'FIPs', link: '/fr/learn/contributing/fips' }
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
