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
      <div className={styles.indexContainer}>
        <div className={styles.downloadButtonContainer}>
          <div className={styles.logoContainer}>
            <img src="/img/logo_48.png" alt="logo" width="48" height="48" />
            <h1>Farcaster</h1>
          </div>
          <p>
            Farcaster is a{" "}
            <a href="https://www.varunsrinivasan.com/2022/01/11/sufficient-decentralization-for-social-networks">
              sufficiently decentralized
            </a>{" "}
            social network. It is an open protocol that can support many
            clients, just like email.{" "}
          </p>
          <p>
            Users will always have the freedom to move their social identity
            between applications, and developers will always have the freedom to
            build applications with new features on the network.
          </p>
          <p>
            It is currently in private beta. You can sign up for the waitlist{" "}
            <a href="https://docs.google.com/forms/d/e/1FAIpQLSfxZGZpVF0Dd1ray5odAouwo0PazBy61LNdseY6cN1Dpl4YXA/viewform">
              here
            </a>
            .
          </p>
        </div>

        <div className={styles.downloadButtonContainer}>
          <Link
            className={styles.downloadButton}
            to="https://www.farcaster.xyz/docs/intro"
          >
            Learn more
          </Link>
        </div>
      </div>
    </div>
  );
}

export default function Home(): JSX.Element {
  const { siteConfig } = useDocusaurusContext();
  return (
    <div>
      <LayoutHead description="Farcaster, a decentralized social network" />
      <HomepageContent />
    </div>
  );
}
