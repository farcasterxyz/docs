# Frames

A Frame lets you turn any cast into an interactive app.

It’s a standard for creating interactive and authenticated experiences on Farcaster. Create polls, live feeds or interactive galleries inside Warpcast or any other FC client.

Frames extend the OpenGraph standard and turn static embeds into interactive experiences. The diagram below shows the difference between a standard OG and a Frame OG inside Warpcast.

![Frames vs OG](/assets/frame_og.png)

Creating a frame is simple — choose an image to show and add buttons the user can click on. If a button is clicked, you get a callback and can send another image with more buttons.

## Resources

A collection of the most popular utilities for creating and managing frames.

### Learning

- [Specification](../../reference/frames/spec.md) - A formal specification for the Frame standard.
- [Video: Frames 101](https://youtu.be/rp9X8rAPzPM?si=PWm3vBFCTtaoE_Ua) - A beginner's guide to frames.
- [Tutorial: Polls](../../developers/guides/frames/poll.md) - Create a simple poll with frames.

### Tools

- [Vercel OG](https://vercel.com/docs/functions/og-image-generation) - Use satori and resvg-js to generate PNG images from HTML and CSS.
- [Warpcast Frame Validator](https://warpcast.com/~/developers/frames) - A debugger for testing frames in Warpcast UI.
- [Neynar](https://docs.neynar.com/docs/how-to-build-farcaster-frames-with-neynar) - Infrastructure and tools for frame servers.

### Frameworks

- [onchainkit](https://github.com/coinbase/onchainkit) - A React toolkit to create frames
- [frames.js](https://framesjs.org/) - A Next.js template for building and debugging frames.
- [Simplest Frame](https://github.com/depatchedmode/simplest-frame) - a zero-framework frame template.
- [frog](https://frog.fm) - framework for frames.

### Examples

- [Linktree](https://replit.com/@soren/Linktree-Frame?v=1) - a simple frame that links to four other pages.
- [Onchain Cow](https://github.com/WillPapper/On-Chain-Cow-Farcaster-Frame) - a cow clicker-like game.
- [FC Polls](https://github.com/farcasterxyz/fc-polls) - create and run polls within frames.
- [Claim or Mint](https://github.com/horsefacts/base-mint-with-warps) - lets users claim an NFT if the meet certain criteria.

<br/>

A more detailed list of resources can be found at [awesome-frames](https://github.com/davidfurlong/awesome-frames).
