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
          <p className={styles.betaAlert}>
            An invite code is required to register a Farcaster username. You can
            sign up for the waitlist{" "}
            <a href="https://docs.google.com/forms/d/e/1FAIpQLSfxZGZpVF0Dd1ray5odAouwo0PazBy61LNdseY6cN1Dpl4YXA/viewform">
              here
            </a>
            . <strong>Please don't share this page publicly for now.</strong>
          </p>
        </div>

        <div className={styles.downloadButtonContainer}>
          <h3>Download</h3>
          <p>
            Farcaster is available for macOS and iOS; Windows, Linux and Android
            coming soon.
          </p>
        </div>

        <div className={styles.downloadButtonContainer}>
          <h5>Desktop</h5>
          <Link
            className={styles.downloadButton}
            to="https://downloads.farcaster.xyz/Farcaster-latest-universal.dmg"
          >
            macOS - Universal
          </Link>
          <div className={styles.downloadHelpLink}>
            You can also download <a href="https://downloads.farcaster.xyz/Farcaster-latest.dmg">Intel</a> or <a href="https://downloads.farcaster.xyz/Farcaster-latest-arm64.dmg">Apple Silicon</a> binaries directly.
          </div>
        </div>

        <div className={styles.downloadButtonContainer}>
          <h5 className={styles.h5collapse}>Mobile</h5>
          <p>Check your invite email for the iOS app download link.</p>
        </div>

        <hr />

        <div className={styles.downloadButtonContainer}>
          <h3>FAQ</h3>
        </div>

        <h4>I can't find my Farcaster recovery phrase—help?</h4>
        <ul>
          <li>
            <strong>macOS (in-app):</strong> if you still have access to a Mac
            where you are logged in to Farcaster, your recovery phrase is
            available in <strong>Settings &gt; Recovery phrase</strong>.
          </li>

          <li>
            <strong>macOS (Keychain):</strong> you can also check for your
            recovery phrase in your Mac's Keychain. Open{" "}
            <a href="https://support.apple.com/guide/keychain-access/what-is-keychain-access-kyca1083/mac">
              Keychain Access
            </a>{" "}
            and search for <strong>merkle-manufactory</strong>. Right click the
            result and select <strong>Copy Password to Clipboard</strong>.
            You'll be prompted for your Mac password to continue.
          </li>
          <li>
            <strong>iOS (in-app):</strong> coming soon
          </li>
        </ul>

        <h4>How can I connect my Ethereum address to Farcaster?</h4>
        <ul>
          <li>
            <strong>macOS:</strong> currently only{" "}
            <a href="https://metamask.io/">MetaMask</a> for Google Chrome is
            supported
          </li>
          <li>
            <strong>iOS:</strong> we support all{" "}
            <a href="https://walletconnect.com/">Wallet Connect</a> wallets.
            We've found{" "}
            <a href="https://apps.apple.com/us/app/metamask/id1438144202">
              MetaMask mobile
            </a>{" "}
            and{" "}
            <a href="https://apps.apple.com/us/app/rainbow-ethereum-wallet/id1457119021">
              Rainbow
            </a>{" "}
            to be the most reliable to connect.
          </li>
        </ul>

        <h4>Where can I learn more about how Farcaster works?</h4>
        <p>
          Here's a{" "}
          <a href="https://farcasterxyz.notion.site/Farcaster-overview-51bbbc5a855649099dce39bce77b3697">
            1-page overview
          </a>{" "}
          and <a href="https://www.farcaster.xyz/docs/intro">developer docs</a>.
        </p>

        <h4>Are you hiring?</h4>
        <p>
          <a href="https://farcasterxyz.notion.site/Farcaster-Open-Roles-27586d01276441b3802bfb0237c07ec3">
            Yes!
          </a>
        </p>
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
