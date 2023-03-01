import React from "react";
import clsx from "clsx";
import LayoutHead from "@theme/LayoutHead";
import Link from "@docusaurus/Link";
import useDocusaurusContext from "@docusaurus/useDocusaurusContext";
import styles from "./download.module.css";

function DownloadPage() {
  const { siteConfig } = useDocusaurusContext();
  return (
    <div>
      <div className={styles.container}>
        <div className={styles.downloadContainer}>

          <div className={styles.downloadButtonContainer}>
            <h3>Download</h3>
            <p>
              The original Farcaster app has been rebranded to Warpcast.</p>
            <p>If you are visiting this page from a Farcaster invite email or search result, please visit warpcast.com to download the mobile or desktop apps.
            </p>
          </div>

          <div className={styles.downloadButtonContainer}>
            <Link
              className={styles.downloadButton}
              to="https://warpcast.com/~/download"
            >
              Download on Warpcast
            </Link>
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
        title="Download"
        description="Farcaster, a decentralized social network"
      />
      <DownloadPage />
    </div>
  );
}
