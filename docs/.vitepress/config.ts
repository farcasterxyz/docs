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
      { text: 'Learn', link: '/learn/what-is-farcaster/overview', activeMatch: '/learn/' },
      { text: 'Developers', link: '/developers/index', activeMatch: '/developers/' },
      { text: 'Hubble', link: '/hubble/hubble', activeMatch: '/hubble/' },
      { text: 'Reference', link: '/reference/index', activeMatch: '/reference/' },
      { text: 'Website', link: 'http://www.farcaster.xyz' },
    ],
    search: {
      provider: 'local',
    },
    sidebar: {
      '/': [
        {
          text: 'Introduction?',
          items: [
            {
              text: 'Getting Started',
              link: '/index',
            },
            {
              text: 'Create Your Account',
              link: '/intro/create-account',
            },
          ],
        },
        {
          text: 'What is Farcaster?',
          items: [
            {
              text: 'Overview',
              link: '/learn/what-is-farcaster/overview',
            },
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
                  text: 'Connecting to Hubble',
                  link: '/developers/guides/basics/setting-up',
                },
                { text: 'Replicate to postgres', link: '/developers/guides/basics/replicate' },
                { text: 'Create an Account', link: '/developers/guides/basics/account' },
              ],
            },
            // {
            //   text: 'Applications',
            //   collapsed: false,
            //   items: [
            //     { text: 'Generate a chronological feed for a user', link: '/developers/guides/applications/feed' },
            //     { text: 'Create a bot to post messages to the hub', link: '/developers/guides/applications/bot' },
            //     // { text: 'Build a farcaster client', link: '/developers/guides/applications/client' },
            //     // { text: 'Read data with Farcaster Connect', link: '/developers/guides/applications/todo' },
            //     // { text: 'Write data with Farcaster Connect', link: '/developers/guides/applications/todo' },
            //   ],
            // },
            {
              text: 'Advanced',
              collapsed: false,
              items: [
                { text: 'Create casts with embedded content', link: '/developers/guides/advanced/adv-casts' },
                { text: 'Create a cast in a channel', link: '/developers/guides/advanced/create-channel-casts' },
                { text: 'Change your custody address', link: '/developers/guides/advanced/transfer-fid' },
                { text: 'Change your farcaster name', link: '/developers/guides/advanced/transfer-fname' },
                { text: 'Change your recovery address', link: '/developers/guides/advanced/change-recovery' },
                { text: 'Fetch casts from a channel', link: '/developers/guides/advanced/fetch-channel-casts' },
                {
                  text: 'Counting signups by day',
                  link: '/developers/guides/advanced/query-signups',
                },
                { text: 'Decode key metadata', link: '/developers/guides/advanced/decode-key-metadata' },
                // { text: 'How do I roll a signer?', link: '/developers/guides/applications/todo' },
              ],
            },
            {
              text: 'Hub Scripts',
              items: [{ text: 'Submit casts to the hub', link: '/developers/guides/hub-scripts/casts' }],
            },
          ],
        },
        {
          text: 'Resources',
          items: [{ text: 'Community', link: '/developers/community' }],
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
          text: 'Contracts',
          items: [
            { text: 'Overview', link: '/reference/contracts/index' },
            {
              text: 'Contract Reference',
              collapsed: true,
              items: [
                { text: 'ID Gateway', link: '/reference/contracts/reference/id-gateway' },
                { text: 'ID Registry', link: '/reference/contracts/reference/id-registry' },
                { text: 'Key Gateway', link: '/reference/contracts/reference/key-gateway' },
                { text: 'Key Registry', link: '/reference/contracts/reference/key-registry' },
                { text: 'Storage Registry', link: '/reference/contracts/reference/storage-registry' },
                { text: 'Bundler', link: '/reference/contracts/reference/bundler' },
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

        { text: 'Replicator', items: [{ text: 'Schema', link: '/reference/replicator/schema' }] },
      ],
    },
    socialLinks: [
      { icon: 'github', link: 'https://github.com/farcasterxyz/protocol' },
      { icon: 'twitter', link: 'https://twitter.com/farcaster_xyz' },
      { icon: 'youtube', link: 'https://www.youtube.com/@farcasterxyz' },
    ],
  },
});
