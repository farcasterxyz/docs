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
        link: '/learn/'
      },
      {
        text: 'Build',
        items: [
          {
            text: 'Frames',
            link: '/frames/',
          },
          {
            text: 'Sign In with Farcaster',
            link: '/auth-kit/',
          },
          {
            text: 'Connect to Farcaster',
            link: '/reference/warpcast/signer-requests',
          },
          {
            text: 'Actions',
            link: '/actions/',
          },
          {
            text: 'Protocol',
            link: '/protocol/',
          },
        ],
      },
      {
        text: 'Reference',
        activeMatch: '/reference',
        items: [
          {
            text: 'Frames',
            link: '/reference/frames',
          },
          {
            text: 'AuthKit',
            link: '/auth-kit/',
          },
          { 
            text: 'Warpcast APIs', 
            link: '/warpcast/', 
          },
          { 
            text: 'Hubble', 
            link: '/hubble/', 
          },
          { 
            text: 'FName Server', 
            link: '/fname-server/', 
          },
          { 
            text: 'Contracts', 
            link: '/reference/contracts', 
          },
        ]
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
      '/actions/': [
        {
          text: 'Specification',
          link: '/actions/',
        },
      ],
      '/fname-server/': [
        {
          text: 'API Reference',
          link: '/fname-server/',
        },
      ],
      '/frames/': [
        {
          text: 'Overview',
          link: '/frames/',
        },
        {
          text: 'Tutorials',
          link: '/frames/tutorial',
          items: [
            { 
              text: "Basics",
              link: '/frames/basics',
            },
            { 
              text: "Minting",
              link: '/frames/minting',
            },
            { 
              text: "Transactions",
              link: '/frames/transactions',
            },
            { 
              text: "Signatures",
              link: '/frames/signatures',
            },
            { 
              text: "State",
              link: '/frames/state',
            },
          ]
        },
        {
          text: 'Reference',
          items: [
            {
              text: 'UI/UX Guidelines',
              link: '/frames/ui-ux-guidelines',
            },
            {
              text: 'Specification',
              link: '/frames/spec',
            },
            {
              text: 'Resources',
              link: '/frames/resources',
            },
          ]
        }
      ],
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
          items: [
            { 
              text: 'Introduction', 
              link: '/auth-kit/' 
            },
            {
              text: 'Examples',
              link: '/auth-kit/examples',
            },
          ],
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
            { text: 'Overview', link: '/hubble/' },
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
        {
          text: 'Documentation',
          items: [
            { text: 'Architecture', link: '/hubble/architecture' },
            {
              text: 'Data Types',
              collapsed: true,
              items: [
                {
                  text: 'Messages',
                  link: '/hubble/datatypes/messages',
                },
                { text: 'Events', link: '/hubble/datatypes/events' },
              ],
            },
            {
              text: 'GRPC API',
              collapsed: true,
              items: [
                {
                  text: 'Using GRPC APIs',
                  link: '/hubble/grpcapi/grpcapi',
                },
                { text: 'Casts API', link: '/hubble/grpcapi/casts' },
                {
                  text: 'Reactions API',
                  link: '/hubble/grpcapi/reactions',
                },
                { text: 'Links API', link: '/hubble/grpcapi/links' },
                {
                  text: 'UserData API',
                  link: '/hubble/grpcapi/userdata',
                },
                {
                  text: 'Username Proofs API',
                  link: '/hubble/grpcapi/usernameproof',
                },
                {
                  text: 'Verifications API',
                  link: '/hubble/grpcapi/verification',
                },
                {
                  text: 'Message API',
                  link: '/hubble/grpcapi/message',
                },
                { text: 'Fids API', link: '/hubble/grpcapi/fids' },
                {
                  text: 'Storage API',
                  link: '/hubble/grpcapi/storagelimits',
                },
                {
                  text: 'On Chain API',
                  link: '/hubble/grpcapi/onchain',
                },
                {
                  text: 'Events API',
                  link: '/hubble/grpcapi/events',
                },
                { text: 'Sync API', link: '/hubble/grpcapi/sync' },
              ],
            },
            {
              text: 'HTTP API',
              collapsed: true,
              items: [
                {
                  text: 'Using HTTP APIs',
                  link: '/hubble/httpapi/httpapi',
                },
                { text: 'Info API', link: '/hubble/httpapi/info' },
                { text: 'Casts API', link: '/hubble/httpapi/casts' },
                {
                  text: 'Reactions API',
                  link: '/hubble/httpapi/reactions',
                },
                { text: 'Links API', link: '/hubble/httpapi/links' },
                {
                  text: 'UserData API',
                  link: '/hubble/httpapi/userdata',
                },
                {
                  text: 'Username Proofs API',
                  link: '/hubble/httpapi/usernameproof',
                },
                {
                  text: 'Verifications API',
                  link: '/hubble/httpapi/verification',
                },
                {
                  text: 'Message API',
                  link: '/hubble/httpapi/message',
                },
                { text: 'Fids API', link: '/hubble/httpapi/fids' },
                {
                  text: 'Storage API',
                  link: '/hubble/httpapi/storagelimits',
                },
                {
                  text: 'On Chain API',
                  link: '/hubble/httpapi/onchain',
                },
                {
                  text: 'Events API',
                  link: '/hubble/httpapi/events',
                },
              ],
            },
            {
              text: 'Replicator Schema',
              link: '/reference/replicator/schema'
            },
          ],
        },
      ],
      '/reference/warpcast/': [
        { text: 'APIs', link: '/reference/warpcast/' },
        { text: 'Signers', link: '/reference/warpcast/signer-requests' },
        { text: 'Cast Intents', link: '/reference/warpcast/cast-composer-intents' },
        { text: 'Direct Casts', link: '/reference/warpcast/direct-casts' },
        { text: 'Embeds', link: '/reference/warpcast/embeds' },
      ],
      '/reference/contracts/': [
          { text: 'Overview', link: '/reference/contracts/index' },
          {
            text: 'Contracts',
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
    socialLinks: [
      { icon: 'github', link: 'https://github.com/farcasterxyz/protocol' },
      { icon: 'twitter', link: 'https://twitter.com/farcaster_xyz' },
      { icon: 'youtube', link: 'https://www.youtube.com/@farcasterxyz' },
    ],
  },
});
