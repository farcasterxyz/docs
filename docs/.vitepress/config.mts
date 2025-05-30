import { HeadConfig, defineConfig } from 'vitepress';

// https://vitepress.dev/reference/site-config
export default defineConfig({
  title: 'Farcaster Docs',
  titleTemplate: ':title / Farcaster Docs',
  description: 'Documentation for the Farcaster protocol',
  head: [
    ['link', { rel: 'icon', type: 'image/png', href: '/icon.png' }],
    ['meta', { property: 'og:type', content: 'website' }],
    ['meta', { property: 'og:image', content: '/og-image.png' }],
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
      {
        async: '',
        src: 'https://www.googletagmanager.com/gtag/js?id=G-DF7PJS3WBD',
      },
    ],
    [
      'script',
      {},
      `window.dataLayer = window.dataLayer || [];
      function gtag(){dataLayer.push(arguments);}
      gtag('js', new Date());
      gtag('config', 'G-DF7PJS3WBD');`,
    ],
  ],
  transformHead(context) {
    const extras: HeadConfig[] = [
      [
        'meta',
        {
          name: 'og:title',
          content:
            context.pageData.frontmatter.layout === 'home'
              ? `Farcaster Docs`
              : `${context.pageData.title} / Farcaster Docs`,
        },
      ],
    ];

    if (context.pageData.description !== '') {
      extras.push([
        'meta',
        {
          name: 'og:description',
          content: context.pageData.description,
        },
      ]);
    }

    return extras;
  },
  cleanUrls: true,
  themeConfig: {
    nav: [
      {
        text: 'Learn',
        link: '/learn/',
      },
      {
        text: 'Build apps',
        link: '/developers/',
      },
      {
        text: 'AuthKit',
        link: '/auth-kit/',
      },
      { text: 'Hubble', link: '/hubble/hubble', activeMatch: '/hubble/' },
      {
        text: 'Reference',
        link: '/reference/',
      },
      {
        text: 'Developer chat',
        link: 'https://farcaster.xyz/~/group/X2P7HNc4PHTriCssYHNcmQ',
      },
    ],
    search: {
      provider: 'algolia',
      options: {
        appId: 'ADFEMXTYRR',
        apiKey: '53a9b47bf4d93ee8fa655fec4274538b',
        indexName: 'farcaster',
        insights: true,
      },
    },
    sidebar: {
      '/learn/': [
        {
          text: 'Introduction',
          items: [
            {
              text: 'Getting Started',
              link: '/learn/',
            },
          ],
        },
        {
          text: 'Core Concepts',
          items: [
            {
              text: 'Mini Apps',
              link: 'https://miniapps.farcaster.xyz/',
              target: '_self',
            },
            {
              text: 'Accounts',
              link: '/learn/what-is-farcaster/accounts',
              target: '_self',
            },
            {
              text: 'Usernames',
              link: '/learn/what-is-farcaster/usernames',
              target: '_self',
            },
            {
              text: 'Messages',
              link: '/learn/what-is-farcaster/messages',
              target: '_self',
            },
            {
              text: 'Channels',
              link: '/learn/what-is-farcaster/channels',
              target: '_self',
            },
            {
              text: 'Apps',
              link: '/learn/what-is-farcaster/apps',
              target: '_self',
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
      '/developers/': [
        { text: 'Overview', link: '/developers/' },
        { text: 'Resources', link: '/developers/resources' },
        {
          text: 'Mini Apps',
          items: [
            {
              text: 'Introduction',
              link: 'https://miniapps.farcaster.xyz',
              target: '_self',
            },
            {
              text: 'Getting Started',
              link: 'https://miniapps.farcaster.xyz/docs/getting-started',
              target: '_self',
            },
            {
              text: 'Interacting with Wallets',
              link: 'https://miniapps.farcaster.xyz/docs/guides/wallets',
              target: '_self',
            },
            {
              text: 'Sending Notifications',
              link: 'https://miniapps.farcaster.xyz/docs/guides/notifications',
              target: '_self',
            },
            {
              text: 'Authenticating Users',
              link: 'https://miniapps.farcaster.xyz/docs/guides/auth',
              target: '_self',
            },
            {
              text: 'Specification',
              link: 'https://miniapps.farcaster.xyz/docs/specification',
              target: '_self',
            },
            {
              text: 'Rename from Frames v2',
              link: '/reference/frames-redirect',
            }
          ],
        },
        {
          text: 'Legacy Frames',
          items: [
            {
              text: 'Introduction',
              link: '/developers/frames/',
            },
            {
              text: 'Getting Started',
              link: '/developers/frames/getting-started',
            },
            {
              text: 'Specification',
              link: '/developers/frames/spec',
            },
            {
              text: 'Best Practices',
              link: '/developers/frames/best-practices',
            },
            {
              text: 'Advanced',
              link: '/developers/frames/advanced',
            },
            {
              text: 'Resources',
              link: '/developers/frames/resources',
            },
          ],
        },
        {
          text: 'Sign In with Farcaster',
          items: [
            {
              text: 'Introduction',
              link: '/developers/siwf/',
            },
            {
              text: 'AuthKit',
              link: '/auth-kit/',
            },
          ],
        },
        {
          text: 'Farcaster Protocol',
          items: [
            {
              text: 'Managing accounts',
              collapsed: true,
              items: [
                {
                  text: 'Create an account',
                  link: '/developers/guides/accounts/create-account',
                },
                {
                  text: 'Create an account key',
                  link: '/developers/guides/accounts/create-account-key',
                },
                {
                  text: 'Find account by name',
                  link: '/developers/guides/accounts/find-by-name',
                },
                {
                  text: 'Change farcaster name',
                  link: '/developers/guides/accounts/change-fname',
                },
                {
                  text: 'Change custody address',
                  link: '/developers/guides/accounts/change-custody',
                },
                {
                  text: 'Change recovery address',
                  link: '/developers/guides/accounts/change-recovery',
                },
              ],
            },
            {
              text: 'Querying data',
              collapsed: true,
              items: [
                {
                  text: 'Get account messages',
                  link: '/developers/guides/querying/fetch-casts',
                },
                {
                  text: 'Get account profile',
                  link: '/developers/guides/querying/fetch-profile',
                },
                {
                  text: 'Fetch channel casts',
                  link: '/developers/guides/querying/fetch-channel-casts',
                },
              ],
            },
            {
              text: 'Writing data',
              collapsed: true,
              items: [
                {
                  text: 'Create an account',
                  link: '/developers/guides/accounts/create-account',
                },
                {
                  text: 'Create messages',
                  link: '/developers/guides/writing/messages',
                },
                {
                  text: 'Create casts',
                  link: '/developers/guides/writing/casts',
                },
                {
                  text: 'Create verifications ',
                  link: '/developers/guides/writing/verify-address',
                },
                {
                  text: 'Submit messages',
                  link: '/developers/guides/writing/submit-messages',
                },
              ],
            },
            {
              text: 'Building apps',
              collapsed: true,
              items: [
                {
                  text: 'Replicate to Postgres',
                  link: '/developers/guides/apps/replicate',
                },
                // { text: 'Generate a chronological feed for a user', link: '/developers/guides/applications/feed' },
                // { text: 'Create a bot to post messages to the hub', link: '/developers/guides/applications/bot' },
                // { text: 'Build a farcaster client', link: '/developers/guides/applications/client' },
                // { text: 'Read data with Farcaster Auth', link: '/developers/guides/applications/todo' },
                // { text: 'Write data with Farcaster Auth', link: '/developers/guides/applications/todo' },
              ],
            },
            {
              text: 'Advanced',
              collapsed: true,
              items: [
                {
                  text: 'Counting signups by day',
                  link: '/developers/guides/advanced/query-signups',
                },
                {
                  text: 'Decode key metadata',
                  link: '/developers/guides/advanced/decode-key-metadata',
                },
                // { text: 'Compact links', link: '/developers/guides/advanced/todo' },
                // { text: 'Check storage usage', link: '/developers/guides/advanced/todo' },
                // { text: 'Deploy contracts locally', link: '/developers/guides/advanced/todo' },
                // { text: 'Rotate an account key', link: '/developers/guides/applications/todo' },
              ],
            },
          ],
        },
        {
          text: 'Third party services',
          items: [
            {
              text: 'Neynar',
              link: '/reference/third-party/neynar/index',
            },
          ],
        },
      ],
      '/auth-kit/': [
        {
          text: 'Overview',
          items: [
            { text: 'Introduction', link: '/auth-kit/' },
            {
              text: 'Examples',
              link: '/auth-kit/examples',
            },
          ],
        },
        {
          text: 'Quickstart',
          items: [
            { text: 'Installation', link: '/auth-kit/installation' },
            { text: 'SignIn Button', link: '/auth-kit/sign-in-button' },
            {
              text: 'AuthKit Provider',
              link: '/auth-kit/auth-kit-provider',
            },
          ],
        },
        {
          text: 'Advanced',
          items: [
            {
              text: 'Hooks',
              collapsed: true,
              items: [
                { text: 'useSignIn', link: '/auth-kit/hooks/use-sign-in' },
                {
                  text: 'useSignInMessage',
                  link: '/auth-kit/hooks/use-sign-in-message',
                },
                {
                  text: 'useProfile',
                  link: '/auth-kit/hooks/use-profile',
                },
              ],
            },
            {
              text: 'Auth Client',
              collapsed: true,
              items: [
                {
                  text: 'Introduction',
                  link: '/auth-kit/client/introduction',
                },
                {
                  text: 'App Actions',
                  collapsed: true,
                  items: [
                    {
                      text: 'AppClient',
                      link: '/auth-kit/client/app/client',
                    },
                    {
                      text: 'createChannel',
                      link: '/auth-kit/client/app/create-channel',
                    },
                    {
                      text: 'status',
                      link: '/auth-kit/client/app/status',
                    },
                    {
                      text: 'watchStatus',
                      link: '/auth-kit/client/app/watch-status',
                    },
                    {
                      text: 'verifySignInMessage',
                      link: '/auth-kit/client/app/verify-sign-in-message',
                    },
                  ],
                },
                {
                  text: 'Wallet Actions',
                  collapsed: true,
                  items: [
                    {
                      text: 'WalletClient',
                      link: '/auth-kit/client/wallet/client',
                    },
                    {
                      text: 'parseSignInURI',
                      link: '/auth-kit/client/wallet/parse-sign-in-uri',
                    },
                    {
                      text: 'buildSignInMessage',
                      link: '/auth-kit/client/wallet/build-sign-in-message',
                    },
                    {
                      text: 'authenticate',
                      link: '/auth-kit/client/wallet/authenticate',
                    },
                  ],
                },
              ],
            },
          ],
        },
      ],
      '/hubble/': [
        {
          text: 'Get Started',
          items: [
            { text: 'Hubble', link: '/hubble/hubble' },
            { text: 'Migrating to Snapchain', link: '/hubble/migrating' },
            { text: 'Installation', link: '/hubble/install' },
            { text: 'Networks', link: '/hubble/networks' },
            { text: 'Monitoring', link: '/hubble/monitoring' },
            { text: 'Tutorials', link: '/hubble/tutorials' },
            {
              text: 'Troubleshooting',
              link: '/hubble/troubleshooting',
            },
          ],
        },
        // {
        //   text: 'Replicator',
        //   items: [{ text: 'Overview', link: '/hubble/replicator' }],
        // },
      ],
      '/reference/': [
        {
          text: 'Reference',
          items: [{ text: 'Overview', link: '/reference/index' }],
        },
        {
          text: 'Mini Apps',
          items: [
            { text: 'Specification', link: 'https://miniapps.farcaster.xyz/docs/specification', target: '_self' },
            { text: 'Rename from Frames v2', link: '/reference/frames-redirect'}
          ],
        },
        {
          text: 'Actions',
          items: [{ text: 'Specification', link: '/reference/actions/spec' }],
        },
        {
          text: 'Farcaster Client',
          items: [
            { text: 'APIs', link: '/reference/warpcast/api' },
            {
              text: 'Signer Requests',
              link: '/reference/warpcast/signer-requests',
            },
            {
              text: 'Intent URLs',
              link: '/reference/warpcast/cast-composer-intents',
            },
            { text: 'Direct Casts', link: '/reference/warpcast/direct-casts' },
            { text: 'Embeds', link: '/reference/warpcast/embeds' },
            { text: 'Videos', link: '/reference/warpcast/videos' },
          ],
        },
        {
          text: 'Hubble',
          items: [
            { text: 'Architecture', link: '/reference/hubble/architecture' },
            {
              text: 'Data Types',
              collapsed: true,
              items: [
                {
                  text: 'Messages',
                  link: '/reference/hubble/datatypes/messages',
                },
                { text: 'Events', link: '/reference/hubble/datatypes/events' },
              ],
            },
            {
              text: 'GRPC API',
              collapsed: true,
              items: [
                {
                  text: 'Using GRPC APIs',
                  link: '/reference/hubble/grpcapi/grpcapi',
                },
                { text: 'Casts API', link: '/reference/hubble/grpcapi/casts' },
                {
                  text: 'Reactions API',
                  link: '/reference/hubble/grpcapi/reactions',
                },
                { text: 'Links API', link: '/reference/hubble/grpcapi/links' },
                {
                  text: 'UserData API',
                  link: '/reference/hubble/grpcapi/userdata',
                },
                {
                  text: 'Username Proofs API',
                  link: '/reference/hubble/grpcapi/usernameproof',
                },
                {
                  text: 'Verifications API',
                  link: '/reference/hubble/grpcapi/verification',
                },
                {
                  text: 'Message API',
                  link: '/reference/hubble/grpcapi/message',
                },
                { text: 'Fids API', link: '/reference/hubble/grpcapi/fids' },
                {
                  text: 'Storage API',
                  link: '/reference/hubble/grpcapi/storagelimits',
                },
                {
                  text: 'On Chain API',
                  link: '/reference/hubble/grpcapi/onchain',
                },
                {
                  text: 'Events API',
                  link: '/reference/hubble/grpcapi/events',
                },
                { text: 'Sync API', link: '/reference/hubble/grpcapi/sync' },
              ],
            },
            {
              text: 'HTTP API',
              collapsed: true,
              items: [
                {
                  text: 'Using HTTP APIs',
                  link: '/reference/hubble/httpapi/httpapi',
                },
                { text: 'Info API', link: '/reference/hubble/httpapi/info' },
                { text: 'Casts API', link: '/reference/hubble/httpapi/casts' },
                {
                  text: 'Reactions API',
                  link: '/reference/hubble/httpapi/reactions',
                },
                { text: 'Links API', link: '/reference/hubble/httpapi/links' },
                {
                  text: 'UserData API',
                  link: '/reference/hubble/httpapi/userdata',
                },
                {
                  text: 'Username Proofs API',
                  link: '/reference/hubble/httpapi/usernameproof',
                },
                {
                  text: 'Verifications API',
                  link: '/reference/hubble/httpapi/verification',
                },
                {
                  text: 'Message API',
                  link: '/reference/hubble/httpapi/message',
                },
                { text: 'Fids API', link: '/reference/hubble/httpapi/fids' },
                {
                  text: 'Storage API',
                  link: '/reference/hubble/httpapi/storagelimits',
                },
                {
                  text: 'On Chain API',
                  link: '/reference/hubble/httpapi/onchain',
                },
                {
                  text: 'Events API',
                  link: '/reference/hubble/httpapi/events',
                },
              ],
            },
            {
              text: 'Replicator Schema',
              link: '/reference/replicator/schema',
            },
          ],
        },
        // {
        // text: 'Hubble Replicator',
        // items: [
        // { text: 'Index', link: '/reference/replicator/TODO' },
        // ],
        // },

        {
          text: 'Contracts',
          items: [
            { text: 'Overview', link: '/reference/contracts/index' },
            {
              text: 'Reference',
              collapsed: true,
              items: [
                {
                  text: 'Id Gateway',
                  link: '/reference/contracts/reference/id-gateway',
                },
                {
                  text: 'Id Registry',
                  link: '/reference/contracts/reference/id-registry',
                },
                {
                  text: 'Key Gateway',
                  link: '/reference/contracts/reference/key-gateway',
                },
                {
                  text: 'Key Registry',
                  link: '/reference/contracts/reference/key-registry',
                },
                {
                  text: 'Storage Registry',
                  link: '/reference/contracts/reference/storage-registry',
                },
                {
                  text: 'Bundler',
                  link: '/reference/contracts/reference/bundler',
                },
                {
                  text: 'Signed Key Request Validator',
                  link: '/reference/contracts/reference/signed-key-request-validator',
                },
              ],
            },
            { text: 'Deployments', link: '/reference/contracts/deployments' },
            { text: 'FAQ', link: '/reference/contracts/faq' },
          ],
        },
        {
          text: 'FName Server',
          items: [
            {
              text: 'API Reference',
              link: '/reference/fname/api',
            },
            // {
            //   text: 'Using the API',
            //   link: '/reference/fname/todo',
            // },
          ],
        },
        {
          text: 'Third party services',
          items: [
            {
              text: 'Neynar',
              link: '/reference/third-party/neynar/index',
            },
          ],
        },
      ],
    },
    socialLinks: [
      {
        icon: {
          svg: '<svg width="24" height="24" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path d="M4.11841 1H19.5982V4.09052H24L23.0775 7.18179H22.2964V19.6873C22.6881 19.6873 23.0061 20.0012 23.0061 20.3892V21.2321H23.1481C23.5406 21.2321 23.8587 21.5468 23.8587 21.9348V22.7778H15.9053V21.9348C15.9053 21.5468 16.2233 21.2321 16.6157 21.2321H16.7578V20.3892C16.7578 20.0519 16.9984 19.7702 17.3187 19.7024L17.3037 12.8021C17.0526 10.0451 14.7107 7.88443 11.8583 7.88443C9.00593 7.88443 6.66403 10.0451 6.41293 12.8021L6.3979 19.6963C6.7768 19.7521 7.24293 20.0412 7.24293 20.3892V21.2321H7.38502C7.77671 21.2321 8.09473 21.5468 8.09473 21.9348V22.7778H0.142092V21.9348C0.142092 21.5468 0.460107 21.2321 0.8518 21.2321H0.993892V20.3892C0.993892 20.0012 1.31191 19.6873 1.70436 19.6873V7.18179H0.923221L0 4.09052H4.11841V1Z" /></svg>',
        },
        link: 'https://farcaster.xyz/~/channel/fc-devs',
      },
      { icon: 'github', link: 'https://github.com/farcasterxyz/protocol' },
      { icon: 'twitter', link: 'https://x.com/farcaster_xyz' },
      { icon: 'youtube', link: 'https://www.youtube.com/@farcasterxyz' },
    ],
  },
  vite: {
    assetsInclude: ['**/*.avifs'],
  }
});
