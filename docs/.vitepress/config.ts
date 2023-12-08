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
    ['meta', { property: 'og:image', content: 'https://farcaster.xyz/og-image.png' }],
    ['meta', { property: 'og:url', content: 'https://farcaster.xyz' }],
    [
      'meta',
      { property: 'og:description', content: 'A protocol for building sufficiently decentralized social networks.' },
    ],
    ['meta', { name: 'twitter:site', content: '@farcaster_xyz' }],
  ],
  themeConfig: {
    nav: [
      { text: 'Learn', link: '/learn/index', activeMatch: '/learn/' },
      // { text: 'Developers', link: '/developers/index', activeMatch: '/developers/' },
      { text: 'Hub Runners', link: '/operators/hubble', activeMatch: '/operators/' },
      { text: 'Reference', link: '/reference/index', activeMatch: '/reference/' },
      { text: 'Website', link: 'http://www.farcaster.xyz' },
    ],
    search: {
      provider: 'local',
    },
    sidebar: {
      '/': [
        { text: 'Getting Started', link: '/learn/' },
        {
          text: 'What is Farcaster?',
          items: [
            {
              text: 'Overview',
              link: '/learn/what-is-farcaster',
            },
            {
              text: 'Sign Up',
              link: '/learn/sign-up',
            },
            {
              text: 'Accounts',
              link: '/learn/accounts',
            },
            {
              text: 'Usernames',
              link: '/learn/usernames',
            },
            {
              text: 'Account Data',
              link: '/learn/account-data',
            },
          ],
        },
        {
          text: 'Architecture',
          items: [
            { text: 'Overview', link: '/learn/architecture/' },
            { text: 'Contracts', link: '/learn/architecture/contracts' },
            { text: 'FName Registry', link: '/learn/architecture/fname-registry' },
            { text: 'Hubs', link: '/learn/architecture/hubs' },
          ],
        },
        {
          text: 'Development',
          items: [
            { text: 'Repositories', link: '/learn/repos' },
            { text: 'Governance', link: '/learn/governance' },
            { text: 'FIPs', link: '/learn/fips' },
          ],
        },
        { text: 'Ecosystem', link: '/learn/ecosystem' },
      ],
      '/developers/': [
        { text: 'Overview', link: '/developers/index' },
        {
          text: 'Guides',
          collapsed: false,
          items: [
            {
              text: 'Getting Started',
              collapsed: false,
              items: [
                {
                  text: 'Set up your local environment',
                  link: '/developers/guides/basics/setting-up',
                },
                {
                  text: 'Querying Hubble HTTP APIs',
                  link: '/developers/guides/basics/hubble-api',
                },
                {
                  text: 'Querying FName APIs',
                  link: '/developers/guides/basics/fname-api',
                },
                { text: 'Replicate hubble data to postgres', link: '/developers/guides/basics/replicate' },
              ],
            },
            {
              text: 'Applications',
              collapsed: false,
              items: [
                { text: 'Bot to respond to messages', link: '/developers/guides/applications/todo' },
                { text: 'Sign up with ethereum wallet', link: '/developers/guides/applications/todo' },
                { text: 'Read data with Farcaster Connect', link: '/developers/guides/applications/todo' },
                { text: 'Write data with Farcaster Connect', link: '/developers/guides/applications/todo' },
              ],
            },
            {
              text: 'Advanced',
              collapsed: false,
              items: [
                { text: 'Transfer account to another address', link: '/developers/guides/applications/todo' },
                { text: 'Transfer an fname to another account', link: '/developers/guides/applications/todo' },
                { text: 'Create casts with embeds, mentions, etc', link: '/developers/guides/applications/todo' },
                { text: 'How do I roll a signer?', link: '/developers/guides/applications/todo' },
              ],
            },
          ],
        },
        {
          text: 'Resources',
          items: [
            {
              text: 'Utilities',
              link: '/developers/utilities',
            },
            { text: 'Community', link: '/developers/community' },
          ],
        },
      ],
      '/operators/': [
        {
          text: 'Get Started',
          items: [
            { text: 'Hubble', link: '/operators/hubble' },
            { text: 'Installation', link: '/operators/install' },
            { text: 'Networks', link: '/operators/networks' },
            { text: 'Monitoring', link: '/operators/monitoring' },
            { text: 'Tutorials', link: '/operators/tutorials' },
            {
              text: 'Troubleshooting',
              link: '/operators/troubleshooting',
            },
          ],
        },
        // {
        //   text: 'Replicator',
        //   items: [{ text: 'Overview', link: '/operators/replicator' }],
        // },
      ],
      '/reference/': [
        { text: 'Reference', items: [{ text: 'Overview', link: '/reference/index' }] },
        {
          text: 'Hubble',
          items: [
            { text: 'Architecture', link: '/reference/hubble/architecture' },
            {
              text: 'Data Types',
              collapsed: true,
              items: [
                { text: 'Messages', link: '/reference/hubble/datatypes/messages' },
                { text: 'Events', link: '/reference/hubble/datatypes/events' },
              ],
            },
            {
              text: 'GRPC API',
              collapsed: true,
              items: [
                { text: 'Using GRPC APIs', link: '/reference/hubble/grpcapi/grpcapi' },
                { text: 'Casts API', link: '/reference/hubble/grpcapi/casts' },
                { text: 'Reactions API', link: '/reference/hubble/grpcapi/reactions' },
                { text: 'Links API', link: '/reference/hubble/grpcapi/links' },
                { text: 'UserData API', link: '/reference/hubble/grpcapi/userdata' },
                { text: 'Username Proofs API', link: '/reference/hubble/grpcapi/usernameproof' },
                { text: 'Verifications API', link: '/reference/hubble/grpcapi/verification' },
                { text: 'SubmitMessage API', link: '/reference/hubble/grpcapi/submitmessage' },
                { text: 'Fids API', link: '/reference/hubble/grpcapi/fids' },
                { text: 'Storage API', link: '/reference/hubble/grpcapi/storagelimits' },
                { text: 'On Chain API', link: '/reference/hubble/grpcapi/onchain' },
                { text: 'Events API', link: '/reference/hubble/grpcapi/events' },
                { text: 'Sync API', link: '/reference/hubble/grpcapi/sync' },
              ],
            },
            {
              text: 'HTTP API',
              collapsed: true,
              items: [
                { text: 'Using HTTP APIs', link: '/reference/hubble/httpapi/httpapi' },
                { text: 'Info API', link: '/reference/hubble/httpapi/info' },
                { text: 'Casts API', link: '/reference/hubble/httpapi/casts' },
                { text: 'Reactions API', link: '/reference/hubble/httpapi/reactions' },
                { text: 'Links API', link: '/reference/hubble/httpapi/links' },
                { text: 'UserData API', link: '/reference/hubble/httpapi/userdata' },
                { text: 'Username Proofs API', link: '/reference/hubble/httpapi/usernameproof' },
                { text: 'Verifications API', link: '/reference/hubble/httpapi/verification' },
                { text: 'SubmitMessage API', link: '/reference/hubble/httpapi/submitmessage' },
                { text: 'Fids API', link: '/reference/hubble/httpapi/fids' },
                { text: 'Storage API', link: '/reference/hubble/httpapi/storagelimits' },
                { text: 'On Chain API', link: '/reference/hubble/httpapi/onchain' },
                { text: 'Events API', link: '/reference/hubble/httpapi/events' },
              ],
            },
          ],
        },
        {
          text: 'Smart Contracts',
          items: [
            { text: 'Overview', link: '/reference/contracts/index' },
            { text: 'ID Gateway', link: '/reference/contracts/id-gateway' },
            { text: 'ID Registry', link: '/reference/contracts/id-registry' },
            { text: 'Key Gateway', link: '/reference/contracts/key-gateway' },
            { text: 'Key Registry', link: '/reference/contracts/key-registry' },
            { text: 'Storage Registry', link: '/reference/contracts/storage-registry' },
          ],
        },
        {
          text: 'FName Server',
          items: [
            {
              text: 'API Reference',
              link: '/reference/fname/api',
            },
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

        // { text: 'Replicator', items: [{ text: 'Overview', link: '/reference/replicator/index' }] },
      ],
    },
    socialLinks: [
      { icon: 'github', link: 'https://github.com/farcasterxyz/protocol' },
      { icon: 'twitter', link: 'https://twitter.com/farcaster_xyz' },
      { icon: 'youtube', link: 'https://www.youtube.com/@farcasterxyz' },
    ],
  },
});
