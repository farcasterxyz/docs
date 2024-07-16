import { defineConfig } from 'vitepress';

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
      },
      {
        text: 'Developers',
        link: '/developers/index',
        activeMatch: '/developers/',
      },
      {
        text: 'AuthKit',
        link: '/auth-kit/introduction',
        activeMatch: '/auth-kit/',
      },
      { text: 'Hubble', link: '/hubble/hubble', activeMatch: '/hubble/' },
      {
        text: 'Reference',
        link: '/reference/index',
        activeMatch: '/reference/',
      },
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
      '/developers/': [
        {
          text: 'Introduction',
          items: [
            { text: 'Overview', link: '/developers/index' },
            { text: 'Resources', link: '/developers/resources' },
          ],
        },
        {
          text: 'Guides',
          items: [
            {
              text: 'Basics',
              collapsed: true,
              items: [
                {
                  text: 'Hello World',
                  link: '/developers/guides/basics/hello-world',
                },
              ],
            },

            {
              text: 'Creating frames',
              collapsed: true,
              items: [
                {
                  text: 'Create a poll frame',
                  link: '/developers/guides/frames/poll',
                },
              ],
            },
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
      ],
      '/auth-kit/': [
        {
          text: 'Overview',
          items: [{ text: 'Introduction', link: '/auth-kit/introduction' },{
            text: 'Examples',
            link: '/auth-kit/examples',
          },],
        },
        {
          text: 'Getting Started',
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
                    ,
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
          text: 'Frames',
          items: [
            { text: 'Specification', link: '/reference/frames/spec' },
          ],
        },
        {
          text: 'Actions',
          items: [
            { text: 'Specification', link: '/reference/actions/spec' },
          ],
        },
        {
          text: 'Warpcast',
          items: [
            { text: 'APIs', link: '/reference/warpcast/api' },
            { text: 'Signer Requests', link: '/reference/warpcast/signer-requests' },
            { text: 'Intent URLs', link: '/reference/warpcast/cast-composer-intents' },
            { text: 'Direct Casts', link: '/reference/warpcast/direct-casts' },
            { text: 'Embeds', link: '/reference/warpcast/embeds' },
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
              link: '/reference/replicator/schema'
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
        // {
        //   text: 'Protocol Specification',
        //   collapsed: true,
        //   items: [
        //     { text: 'Overview', link: '/reference/protocol/overview' },
        //     {
        //       text: 'Specification',
        //       link: '/reference/protocol/specification',
        //     },
        //   ],
        // },
      ],
    },
    socialLinks: [
      { 
        icon: {
          svg: '<svg width="163" height="147" viewBox="0 0 163 147" fill="none" xmlns="http://www.w3.org/2000/svg"> <g clip-path="url(#clip0_591_6431)"> <rect width="163" height="147" fill="white"/> <path d="M27.7993 0H132.288V20.861H162L155.773 41.7271H150.501V126.139C153.145 126.139 155.291 128.258 155.291 130.877V136.567H156.25C158.899 136.567 161.046 138.691 161.046 141.31V147H107.361V141.31C107.361 138.691 109.507 136.567 112.156 136.567H113.115V130.877C113.115 128.6 114.739 126.699 116.901 126.241L116.8 79.6641C115.105 61.0547 99.2969 46.4699 80.0434 46.4699C60.79 46.4699 44.9822 61.0547 43.2873 79.6641L43.1858 126.2C45.7434 126.577 48.8898 128.528 48.8898 130.877V136.567H49.8489C52.4928 136.567 54.6394 138.691 54.6394 141.31V147H0.95912V141.31C0.95912 138.691 3.10572 136.567 5.74965 136.567H6.70877V130.877C6.70877 128.258 8.85537 126.139 11.5044 126.139V41.7271H6.23174L0 20.861H27.7993V0Z" fill="#3C3C43" fill-opacity="0.78"/> </g> <defs> <clipPath id="clip0_591_6431"> <rect width="163" height="147" fill="white"/> </clipPath> </defs> </svg>',
        },
        link: 'https://warpcast.com/~/channel/fc-devs' 
      },
      { icon: 'github', link: 'https://github.com/farcasterxyz/protocol' },
      { icon: 'twitter', link: 'https://twitter.com/farcaster_xyz' },
      { icon: 'youtube', link: 'https://www.youtube.com/@farcasterxyz' },
    ],
  },
});
