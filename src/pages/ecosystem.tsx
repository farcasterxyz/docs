import React from "react";
import clsx from "clsx";
import LayoutHead from "@theme/LayoutHead";
import Link from "@docusaurus/Link";
import useDocusaurusContext from "@docusaurus/useDocusaurusContext";
import styles from "./download.module.css";

function EcosystemPage() {
  const { siteConfig } = useDocusaurusContext();
  return (
    <div>   
      <div className={styles.container}>
        <div className={styles.downloadContainer}>
          <div className={styles.downloadButtonContainer}>
   

          <h3 id="developer-docs">Dev docs</h3>

          <ul>
            <li>
              <a href="https://github.com/farcasterxyz/protocol">
                Farcaster v2 protocol spec
              </a>
              <ul>
                <li>
                  Recently completed Phase 1 of the v2 migration to Görli.
                </li>
                <li>Phase 2 and Phase 3 will happen in Oct / Nov 2022</li>
                <li>
                  Farcaster Hubs (
                  <a href="https://github.com/farcasterxyz/protocol#24-hubs">
                    description
                  </a>
                  ; <a href="https://github.com/farcasterxyz/hub">repo</a>) will
                  be available in Q4
                </li>
              </ul>
            </li>
            <li>
              <a href="https://github.com/farcasterxyz/hub/blob/main/CONTRIBUTING.md">
                Opportunities to contribute
              </a>{" "}
              open source code to the protocol
            </li>
          </ul>
          <h3 id="apps">Apps</h3>

          <ul>
            <li>
              <a href="https://searchcaster.xyz/">https://searchcaster.xyz</a>
            </li>
            <li>
              <a href="https://farapps.farcase.xyz/">
                https://farapps.farcase.xyz
              </a>
            </li>
            <li>
              <a href="https://castrss.xyz/">https://castrss.xyz</a>
            </li>
            <li>
              <a href="https://instacaster.xyz/">https://instacaster.xyz</a>
            </li>
            <li>
              <a href="https://pincaster.xyz/">https://pincaster.xyz</a>
            </li>
            <li>
              <a href="https://bebcaster.xyz/">https://bebcaster.xyz</a>
            </li>
            <li>
              <a href="https://farcarte.xyz/">https://farcarte.xyz</a>
            </li>
            <li>
              <a href="https://farcasternews.xyz">https://farcasternews.xyz</a>
            </li>
            <li>
              <a href="https://perl.xyz/">https://perl.xyz</a>
            </li>
            <li>
              <a href="https://app.yup.io/feed/farcaster">
                https://app.yup.io/feed/farcaster
              </a>
            </li>
            <li>
              <a href="https://www.farcaster.events/">
                https://www.farcaster.events
              </a>
            </li>
            <li>
              <a href="https://www.trendcaster.xyz/">
                https://www.trendcaster.xyz
              </a>
            </li>
            <li>
              <a href="https://castalytics.farcase.xyz/">
                https://castalytics.farcase.xyz
              </a>
            </li>
            <li>
              <a href="https://www.requestcaster.xyz/">
                https://www.requestcaster.xyz
              </a>
            </li>
            <li>
              <a href="https://www.stochaster.xyz/">
                https://www.stochaster.xyz
              </a>
            </li>
            <li>
              <a href="https://farcaster.vercel.app/?username=dwr">
                https://farcaster.vercel.app
              </a>
            </li>
            <li>
              <a href="https://www.farcaster.network/">
                https://www.farcaster.network
              </a>
            </li>
            <li>
              <a href="https://t.co/ZOvNlikdPn">https://sqlcaster.xyz</a>
            </li>
            <li>
              <a href="https://www.citycaster.xyz/">
                https://www.citycaster.xyz
              </a>
            </li>
            <li>
              <a href="https://www.raycast.com/gregskril/searchcaster">
                https://www.raycast.com/gregskril/searchcaster
              </a>
            </li>
            <li>
              <a href="https://unlonely.app">https://unlonely.app</a>
            </li>
            <li>
              <a href="https://sealcaster.xyz">https://sealcaster.xyz</a>
            </li>
            <li>
              <a href="https://paragraph.xyz/@blog/farcaster-comments">
                https://paragraph.xyz/@blog/farcaster-comments
              </a>
            </li>
          </ul>
          <h3 id="github-radicle-repos-dev-tools">Repos and dev tools</h3>

          <ul>
            <li>
              <a href="https://github.com/gskril/farcaster-indexer">
                https://github.com/gskril/farcaster-indexer
              </a>
            </li>
            <li>
              <a href="https://github.com/lfglabs/farcaster-indexer">
                https://github.com/lfglabs/farcaster-indexer
              </a>
            </li>
            <li>
              <a href="https://github.com/zachterrell57/farcaster-auth">
                https://github.com/zachterrell57/farcaster-auth
              </a>
            </li>
            <li>
              <a href="https://github.com/gskril/farcaster-search">
                https://github.com/gskril/farcaster-search
              </a>
            </li>
            <li>
              <a href="https://github.com/farcase/farapps">
                https://github.com/farcase/farapps
              </a>
            </li>
            <li>
              <a href="https://github.com/standard-crypto/farcaster-js">
                https://github.com/standard-crypto/farcaster-js
              </a>
            </li>
            <li>
              <a href="https://github.com/mattdesl/fc-bot-color-names">
                https://github.com/mattdesl/fc-bot-color-names
              </a>
            </li>
            <li>
              <a href="https://github.com/ShawkiS/Dango">
                https://github.com/ShawkiS/Dango
              </a>
            </li>
            <li>
              <a href="https://github.com/ShawkiS/farcaster-users">
                https://github.com/ShawkiS/farcaster-users
              </a>
            </li>
            <li>
              <a href="https://github.com/shrimalmadhur/tweetcaster">
                https://github.com/shrimalmadhur/tweetcaster
              </a>
            </li>
            <li>
              <a href="https://github.com/ShawkiS/mycasts">
                https://github.com/ShawkiS/mycasts
              </a>
            </li>
            <li>
              <a href="https://github.com/ShawkiS/farcaster-ipfs">
                https://github.com/ShawkiS/farcaster-ipfs
              </a>
            </li>
            <li>
              <a href="https://github.com/whatrocks/farcaster-feed">
                https://github.com/whatrocks/farcaster-feed
              </a>
            </li>
            <li>
              <a href="https://github.com/markusbug/farcaster-api-js">
                https://github.com/markusbug/farcaster-api-js
              </a>
            </li>
            <li>
              <a href="https://github.com/goksu/farcaster-python">
                https://github.com/goksu/farcaster-python
              </a>
            </li>
            <li>
              <a href="https://github.com/shrimalmadhur/trendcaster">
                https://github.com/shrimalmadhur/trendcaster
              </a>
            </li>
            <li>
              <a href="https://github.com/yashkarthik/friendcaster">
                https://github.com/yashkarthik/friendcaster
              </a>
            </li>
            <li>
              <a href="https://github.com/TheLDB/farcaster-rs">
                https://github.com/TheLDB/farcaster-rs
              </a>
            </li>
            <li>
              <a href="https://github.com/Airstack-xyz/farcaster-subgraph">
                https://github.com/Airstack-xyz/farcaster-subgraph
              </a>
            </li>
            <li>
              <a href="https://thegraph.com/hosted-service/subgraph/airstack-xyz/farcaster-goerli">
                https://thegraph.com/hosted-service/subgraph/0xsarvesh/farcaster-goerli
              </a>
            </li>
            <li>
              <a href="https://github.com/BigWhaleLabs/sealcaster-frontend">
                https://github.com/BigWhaleLabs/sealcaster-frontend
              </a>
            </li>
            <li>
              <a href="https://replit.com/@whatrocks/farcaster-ens-drop#index.js">
                https://replit.com/@whatrocks/farcaster-ens-drop#index.js
              </a>
            </li>
            <li>
              <a href="https://replit.com/@dlm/FarcasterUsers">
                https://replit.com/@dlm/FarcasterUsers
              </a>
            </li>
          </ul>
        
        </div>
       </div>
      </div>
    </div>
  );
}

export default function Home(): JSX.Element {
  const { siteConfig } = useDocusaurusContext();
  return (
    <div>
      <LayoutHead
        title="Ecosystem"
        description="Farcaster"
      />
      <EcosystemPage />
    </div>
  );
}
