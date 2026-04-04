import Link from "next/link";

export default function HomePage() {
  return (
    <main className="main-content">
      <div className="homepage">
        <div className="homepage-hero">
          <h1>Farcaster Docs</h1>
          <p>Permissionlessly build and distribute social apps</p>
          <div className="homepage-actions">
            <a href="https://miniapps.farcaster.xyz/docs/getting-started">
              Build a mini app
            </a>
            <Link href="/developers/siwf/">Explore Sign In with Farcaster</Link>
            <Link href="/learn/">Learn about the protocol</Link>
          </div>
        </div>

        <div className="homepage-section">
          <h3>Build a Mini App</h3>
          <p style={{ color: "var(--text-secondary)", fontSize: 15, margin: "0 0 12px" }}>
            Learn how to build Mini Apps (previously known as Frames v2) that
            run inside a Farcaster feed.
          </p>
          <ul>
            <li>
              <a href="https://miniapps.farcaster.xyz/">
                Introduction to Mini Apps
              </a>{" "}
              - Understand what a mini app is and how it works.
            </li>
            <li>
              <a href="https://miniapps.farcaster.xyz/docs/getting-started">
                Build your first Mini App
              </a>{" "}
              - Make mini apps that run inside Farcaster.
            </li>
          </ul>
        </div>

        <div className="homepage-section">
          <h3>Explore Sign In with Farcaster</h3>
          <p style={{ color: "var(--text-secondary)", fontSize: 15, margin: "0 0 12px" }}>
            Allow users to Sign In with Farcaster and leverage social data in
            your app.
          </p>
          <ul>
            <li>
              <Link href="/developers/siwf/">Introduction</Link> - Learn about
              Sign In with Farcaster.
            </li>
            <li>
              <Link href="/auth-kit/installation">
                Add SIWF using AuthKit
              </Link>{" "}
              - a React toolkit to add SIWF to your app.
            </li>
            <li>
              <Link href="/auth-kit/examples">Examples</Link> - see Sign In
              with Farcaster in action.
            </li>
          </ul>
        </div>

        <div className="homepage-section">
          <h3>Analyze Farcaster data</h3>
          <p style={{ color: "var(--text-secondary)", fontSize: 15, margin: "0 0 12px" }}>
            Sync the Farcaster network to a local machine so you can run queries
            on the data.
          </p>
          <ul>
            <li>
              <a href="https://snapchain.farcaster.xyz/getting-started#query-a-node">
                Write your first snapchain query
              </a>{" "}
              - get an account&apos;s casts from a snapchain node.
            </li>
            <li>
              <a href="https://snapchain.farcaster.xyz/guides/syncing-to-db">
                Set up the replicator
              </a>{" "}
              - sync a snapchain node to a postgres database.
            </li>
            <li>
              <a href="https://snapchain.farcaster.xyz/guides/running-a-node">
                Run a snapchain node
              </a>{" "}
              - get realtime access to Farcaster data.
            </li>
          </ul>
        </div>
      </div>
    </main>
  );
}
