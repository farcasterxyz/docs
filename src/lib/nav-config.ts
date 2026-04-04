export type NavLink = {
  text: string;
  link: string;
  external?: boolean;
};

export type NavGroup = {
  text: string;
  collapsed?: boolean;
  items: SidebarItem[];
};

export type SidebarItem = NavLink | NavGroup;

export function isNavLink(item: SidebarItem): item is NavLink {
  return "link" in item;
}

export function isNavGroup(item: SidebarItem): item is NavGroup {
  return "items" in item;
}

export type SectionConfig = {
  text: string;
  link: string;
  pathPrefix: string;
  sidebar: SidebarItem[];
};

export const TOP_NAV: NavLink[] = [
  { text: "Learn", link: "/learn/" },
  { text: "Build apps", link: "/developers/" },
  { text: "AuthKit", link: "/auth-kit/" },
  { text: "Snaps", link: "/snap/" },
  {
    text: "Snapchain",
    link: "https://snapchain.farcaster.xyz/",
    external: true,
  },
  { text: "Reference", link: "/reference/" },
  {
    text: "Developer chat",
    link: "https://farcaster.xyz/~/group/X2P7HNc4PHTriCssYHNcmQ",
    external: true,
  },
];

export const SOCIAL_LINKS = [
  {
    icon: "farcaster" as const,
    link: "https://farcaster.xyz/~/channel/fc-devs",
  },
  {
    icon: "github" as const,
    link: "https://github.com/farcasterxyz/protocol",
  },
  { icon: "twitter" as const, link: "https://x.com/farcaster_xyz" },
  {
    icon: "youtube" as const,
    link: "https://www.youtube.com/@farcasterxyz",
  },
];

export const SECTIONS: SectionConfig[] = [
  {
    text: "Learn",
    link: "/learn/",
    pathPrefix: "/learn",
    sidebar: [
      {
        text: "Introduction",
        items: [{ text: "Getting Started", link: "/learn/" }],
      },
      {
        text: "Core Concepts",
        items: [
          {
            text: "Mini Apps",
            link: "https://miniapps.farcaster.xyz/",
            external: true,
          },
          { text: "Accounts", link: "/learn/what-is-farcaster/accounts" },
          { text: "Usernames", link: "/learn/what-is-farcaster/usernames" },
          { text: "Messages", link: "/learn/what-is-farcaster/messages" },
          { text: "Channels", link: "/learn/what-is-farcaster/channels" },
          { text: "Apps", link: "/learn/what-is-farcaster/apps" },
        ],
      },
      {
        text: "Architecture",
        items: [
          { text: "Overview", link: "/learn/architecture/overview" },
          { text: "Contracts", link: "/learn/architecture/contracts" },
          {
            text: "Snapchain",
            link: "https://snapchain.farcaster.xyz/",
            external: true,
          },
          { text: "ENS Names", link: "/learn/architecture/ens-names" },
        ],
      },
      {
        text: "Contributing",
        items: [
          { text: "Overview", link: "/learn/contributing/overview" },
          { text: "Governance", link: "/learn/contributing/governance" },
          { text: "FIPs", link: "/learn/contributing/fips" },
        ],
      },
    ],
  },
  {
    text: "Build apps",
    link: "/developers/",
    pathPrefix: "/developers",
    sidebar: [
      { text: "Overview", link: "/developers/" },
      { text: "Resources", link: "/developers/resources" },
      {
        text: "Mini Apps",
        items: [
          {
            text: "Introduction",
            link: "https://miniapps.farcaster.xyz",
            external: true,
          },
          {
            text: "Getting Started",
            link: "https://miniapps.farcaster.xyz/docs/getting-started",
            external: true,
          },
          {
            text: "Interacting with Wallets",
            link: "https://miniapps.farcaster.xyz/docs/guides/wallets",
            external: true,
          },
          {
            text: "Sending Notifications",
            link: "https://miniapps.farcaster.xyz/docs/guides/notifications",
            external: true,
          },
          {
            text: "Authenticating Users",
            link: "https://miniapps.farcaster.xyz/docs/guides/auth",
            external: true,
          },
          {
            text: "Specification",
            link: "https://miniapps.farcaster.xyz/docs/specification",
            external: true,
          },
          { text: "Rename from Frames v2", link: "/reference/frames-redirect" },
        ],
      },
      {
        text: "Sign In with Farcaster",
        items: [
          { text: "Introduction", link: "/developers/siwf/" },
          { text: "AuthKit", link: "/auth-kit/" },
        ],
      },
      {
        text: "Farcaster Protocol",
        items: [
          {
            text: "Managing accounts",
            collapsed: true,
            items: [
              {
                text: "Create an account",
                link: "/developers/guides/accounts/create-account",
              },
              {
                text: "Create an account key",
                link: "/developers/guides/accounts/create-account-key",
              },
              {
                text: "Find account by name",
                link: "/developers/guides/accounts/find-by-name",
              },
              {
                text: "Change farcaster name",
                link: "/developers/guides/accounts/change-fname",
              },
              {
                text: "Register ENS name",
                link: "/developers/guides/accounts/register-ens",
              },
              {
                text: "Change custody address",
                link: "/developers/guides/accounts/change-custody",
              },
              {
                text: "Change recovery address",
                link: "/developers/guides/accounts/change-recovery",
              },
            ],
          },
          {
            text: "Querying data",
            collapsed: true,
            items: [
              {
                text: "Get account messages",
                link: "/developers/guides/querying/fetch-casts",
              },
              {
                text: "Get account profile",
                link: "/developers/guides/querying/fetch-profile",
              },
              {
                text: "Fetch channel casts",
                link: "/developers/guides/querying/fetch-channel-casts",
              },
            ],
          },
          {
            text: "Writing data",
            collapsed: true,
            items: [
              {
                text: "Create an account",
                link: "/developers/guides/accounts/create-account",
              },
              {
                text: "Create messages",
                link: "/developers/guides/writing/messages",
              },
              {
                text: "Create casts",
                link: "/developers/guides/writing/casts",
              },
              {
                text: "Create verifications",
                link: "/developers/guides/writing/verify-address",
              },
              {
                text: "Submit messages",
                link: "/developers/guides/writing/submit-messages",
              },
            ],
          },
          {
            text: "Building apps",
            collapsed: true,
            items: [
              {
                text: "Replicate to Postgres",
                link: "https://snapchain.farcaster.xyz/guides/syncing-to-db",
                external: true,
              },
            ],
          },
          {
            text: "Advanced",
            collapsed: true,
            items: [
              {
                text: "Counting signups by day",
                link: "/developers/guides/advanced/query-signups",
              },
              {
                text: "Decode key metadata",
                link: "/developers/guides/advanced/decode-key-metadata",
              },
            ],
          },
        ],
      },
      {
        text: "Third party services",
        items: [
          { text: "Neynar", link: "/reference/third-party/neynar/" },
        ],
      },
    ],
  },
  {
    text: "AuthKit",
    link: "/auth-kit/",
    pathPrefix: "/auth-kit",
    sidebar: [
      {
        text: "Overview",
        items: [
          { text: "Introduction", link: "/auth-kit/" },
          { text: "Examples", link: "/auth-kit/examples" },
        ],
      },
      {
        text: "Quickstart",
        items: [
          { text: "Installation", link: "/auth-kit/installation" },
          { text: "SignIn Button", link: "/auth-kit/sign-in-button" },
          { text: "AuthKit Provider", link: "/auth-kit/auth-kit-provider" },
        ],
      },
      {
        text: "Advanced",
        items: [
          {
            text: "Hooks",
            collapsed: true,
            items: [
              { text: "useSignIn", link: "/auth-kit/hooks/use-sign-in" },
              {
                text: "useSignInMessage",
                link: "/auth-kit/hooks/use-sign-in-message",
              },
              { text: "useProfile", link: "/auth-kit/hooks/use-profile" },
            ],
          },
          {
            text: "Auth Client",
            collapsed: true,
            items: [
              {
                text: "Introduction",
                link: "/auth-kit/client/introduction",
              },
              {
                text: "App Actions",
                collapsed: true,
                items: [
                  {
                    text: "AppClient",
                    link: "/auth-kit/client/app/client",
                  },
                  {
                    text: "createChannel",
                    link: "/auth-kit/client/app/create-channel",
                  },
                  { text: "status", link: "/auth-kit/client/app/status" },
                  {
                    text: "watchStatus",
                    link: "/auth-kit/client/app/watch-status",
                  },
                  {
                    text: "verifySignInMessage",
                    link: "/auth-kit/client/app/verify-sign-in-message",
                  },
                ],
              },
              {
                text: "Wallet Actions",
                collapsed: true,
                items: [
                  {
                    text: "WalletClient",
                    link: "/auth-kit/client/wallet/client",
                  },
                  {
                    text: "parseSignInURI",
                    link: "/auth-kit/client/wallet/parse-sign-in-uri",
                  },
                  {
                    text: "buildSignInMessage",
                    link: "/auth-kit/client/wallet/build-sign-in-message",
                  },
                  {
                    text: "authenticate",
                    link: "/auth-kit/client/wallet/authenticate",
                  },
                ],
              },
            ],
          },
        ],
      },
    ],
  },
  {
    text: "Reference",
    link: "/reference/",
    pathPrefix: "/reference",
    sidebar: [
      {
        text: "Reference",
        items: [{ text: "Overview", link: "/reference/" }],
      },
      {
        text: "Mini Apps",
        items: [
          {
            text: "Specification",
            link: "https://miniapps.farcaster.xyz/docs/specification",
            external: true,
          },
          {
            text: "Rename from Frames v2",
            link: "/reference/frames-redirect",
          },
        ],
      },
      {
        text: "Farcaster Client",
        items: [
          { text: "APIs", link: "/reference/farcaster/api" },
          {
            text: "Signer Requests",
            link: "/reference/farcaster/signer-requests",
          },
          { text: "Intent URLs", link: "/reference/farcaster/intent-urls" },
          {
            text: "Direct Casts",
            link: "/reference/farcaster/direct-casts",
          },
          { text: "Embeds", link: "/reference/farcaster/embeds" },
        ],
      },
      {
        text: "Snapchain",
        items: [
          {
            text: "Whitepaper",
            link: "https://snapchain.farcaster.xyz/whitepaper",
            external: true,
          },
          {
            text: "Data Types",
            collapsed: true,
            items: [
              {
                text: "Messages",
                link: "https://snapchain.farcaster.xyz/reference/datatypes/messages",
                external: true,
              },
              {
                text: "Events",
                link: "https://snapchain.farcaster.xyz/reference/datatypes/events",
                external: true,
              },
            ],
          },
          {
            text: "GRPC API",
            collapsed: true,
            items: [
              {
                text: "Using GRPC APIs",
                link: "https://snapchain.farcaster.xyz/reference/grpcapi/grpcapi",
                external: true,
              },
              {
                text: "Casts API",
                link: "https://snapchain.farcaster.xyz/reference/grpcapi/casts",
                external: true,
              },
              {
                text: "Reactions API",
                link: "https://snapchain.farcaster.xyz/reference/grpcapi/reactions",
                external: true,
              },
              {
                text: "Links API",
                link: "https://snapchain.farcaster.xyz/reference/grpcapi/links",
                external: true,
              },
              {
                text: "UserData API",
                link: "https://snapchain.farcaster.xyz/reference/grpcapi/userdata",
                external: true,
              },
              {
                text: "Username Proofs API",
                link: "https://snapchain.farcaster.xyz/reference/grpcapi/usernameproof",
                external: true,
              },
              {
                text: "Verifications API",
                link: "https://snapchain.farcaster.xyz/reference/grpcapi/verification",
                external: true,
              },
              {
                text: "Message API",
                link: "https://snapchain.farcaster.xyz/reference/grpcapi/message",
                external: true,
              },
              {
                text: "Fids API",
                link: "https://snapchain.farcaster.xyz/reference/grpcapi/fids",
                external: true,
              },
              {
                text: "Storage API",
                link: "https://snapchain.farcaster.xyz/reference/grpcapi/storagelimits",
                external: true,
              },
              {
                text: "On Chain API",
                link: "https://snapchain.farcaster.xyz/reference/grpcapi/onchain",
                external: true,
              },
              {
                text: "Events API",
                link: "https://snapchain.farcaster.xyz/reference/grpcapi/events",
                external: true,
              },
              {
                text: "Sync API",
                link: "https://snapchain.farcaster.xyz/reference/grpcapi/sync",
                external: true,
              },
            ],
          },
          {
            text: "HTTP API",
            collapsed: true,
            items: [
              {
                text: "Using HTTP APIs",
                link: "https://snapchain.farcaster.xyz/reference/httpapi/httpapi",
                external: true,
              },
              {
                text: "Info API",
                link: "https://snapchain.farcaster.xyz/reference/httpapi/info",
                external: true,
              },
              {
                text: "Casts API",
                link: "https://snapchain.farcaster.xyz/reference/httpapi/casts",
                external: true,
              },
              {
                text: "Reactions API",
                link: "https://snapchain.farcaster.xyz/reference/httpapi/reactions",
                external: true,
              },
              {
                text: "Links API",
                link: "https://snapchain.farcaster.xyz/reference/httpapi/links",
                external: true,
              },
              {
                text: "UserData API",
                link: "https://snapchain.farcaster.xyz/reference/httpapi/userdata",
                external: true,
              },
              {
                text: "Username Proofs API",
                link: "https://snapchain.farcaster.xyz/reference/httpapi/usernameproof",
                external: true,
              },
              {
                text: "Verifications API",
                link: "https://snapchain.farcaster.xyz/reference/httpapi/verification",
                external: true,
              },
              {
                text: "Message API",
                link: "https://snapchain.farcaster.xyz/reference/httpapi/message",
                external: true,
              },
              {
                text: "Fids API",
                link: "https://snapchain.farcaster.xyz/reference/httpapi/fids",
                external: true,
              },
              {
                text: "Storage API",
                link: "https://snapchain.farcaster.xyz/reference/httpapi/storagelimits",
                external: true,
              },
              {
                text: "On Chain API",
                link: "https://snapchain.farcaster.xyz/reference/httpapi/onchain",
                external: true,
              },
              {
                text: "Events API",
                link: "https://snapchain.farcaster.xyz/reference/httpapi/events",
                external: true,
              },
            ],
          },
          {
            text: "Replicator Schema",
            link: "/reference/replicator/schema",
          },
        ],
      },
      {
        text: "Contracts",
        items: [
          { text: "Overview", link: "/reference/contracts/" },
          {
            text: "Reference",
            collapsed: true,
            items: [
              {
                text: "Id Gateway",
                link: "/reference/contracts/reference/id-gateway",
              },
              {
                text: "Id Registry",
                link: "/reference/contracts/reference/id-registry",
              },
              {
                text: "Key Gateway",
                link: "/reference/contracts/reference/key-gateway",
              },
              {
                text: "Key Registry",
                link: "/reference/contracts/reference/key-registry",
              },
              {
                text: "Storage Registry",
                link: "/reference/contracts/reference/storage-registry",
              },
              {
                text: "Bundler",
                link: "/reference/contracts/reference/bundler",
              },
              {
                text: "Signed Key Request Validator",
                link: "/reference/contracts/reference/signed-key-request-validator",
              },
              {
                text: "Tier Registry",
                link: "/reference/contracts/reference/tier-registry",
              },
            ],
          },
          { text: "Deployments", link: "/reference/contracts/deployments" },
          { text: "FAQ", link: "/reference/contracts/faq" },
        ],
      },
      {
        text: "FName Server",
        items: [{ text: "API Reference", link: "/reference/fname/api" }],
      },
      {
        text: "Third party services",
        items: [
          { text: "Neynar", link: "/reference/third-party/neynar/" },
        ],
      },
    ],
  },
  {
    text: "Snaps",
    link: "/snap/",
    pathPrefix: "/snap",
    sidebar: [
      {
        text: "Learn",
        items: [
          { text: "Introduction", link: "/snap/" },
          { text: "Examples", link: "/snap/examples" },
        ],
      },
      {
        text: "Create",
        items: [{ text: "Building a Snap", link: "/snap/building" }],
      },
      {
        text: "Integrate",
        items: [
          { text: "On existing website", link: "/snap/existing-site" },
        ],
      },
      {
        text: "Reference",
        items: [
          { text: "Elements", link: "/snap/elements" },
          { text: "Buttons", link: "/snap/buttons" },
          { text: "Actions", link: "/snap/actions" },
          { text: "Effects", link: "/snap/effects" },
          { text: "Constraints", link: "/snap/constraints" },
          { text: "Theme & Styling", link: "/snap/theme" },
          { text: "Color Palette", link: "/snap/colors" },
          { text: "Authentication", link: "/snap/auth" },
          { text: "Data Store", link: "/snap/data-store" },
        ],
      },
      {
        text: "Agents",
        items: [{ text: "Agents", link: "/snap/agents" }],
      },
    ],
  },
];

/** Find the section config for a given pathname */
export function getSectionForPathname(
  pathname: string
): SectionConfig | undefined {
  return SECTIONS.find((s) => pathname.startsWith(s.pathPrefix));
}

/** Check if a link is active, handling trailing slashes */
export function isLinkActive(pathname: string, link: string): boolean {
  const normalizedPathname = pathname.replace(/\/$/, "") || "/";
  const normalizedLink = link.replace(/\/$/, "") || "/";
  return normalizedPathname === normalizedLink;
}

/** Check if any link in a sidebar tree is active */
export function hasActiveLink(
  items: SidebarItem[],
  pathname: string
): boolean {
  for (const item of items) {
    if (isNavLink(item) && isLinkActive(pathname, item.link)) return true;
    if (isNavGroup(item) && hasActiveLink(item.items, pathname)) return true;
  }
  return false;
}
