import React from "react";
import clsx from "clsx";
import LayoutHead from "@theme/LayoutHead";
import Link from "@docusaurus/Link";
import useDocusaurusContext from "@docusaurus/useDocusaurusContext";
import styles from "./index.module.css";

function HomepageContent() {
  const { siteConfig } = useDocusaurusContext();
  return (
    <div className={styles.container}>
      <h1>Farcaster</h1>
      <h2>A decentralized social network</h2>
      <p>
        Get started with our <a href="/docs/intro">developer docs</a>.
      </p>
    </div>
  );
}

export default function Home(): JSX.Element {
  const { siteConfig } = useDocusaurusContext();
  return (
    <div>
      <LayoutHead
        title={`Home`}
        description="Farcaster, a decentralized social network"
      />
        <HomepageContent />
    </div>
  );
}
