# AuthKit

[![NPM Version](https://img.shields.io/npm/v/@farcaster/auth-kit)](https://www.npmjs.com/package/@farcaster/auth-kit)

AuthKit is a React library that lets users log in to your app with a Farcaster account.

<iframe src="https://farcaster-auth-kit-vite-demo.replit.app/" width="700" height="500" />

Click "Sign in With Farcaster" above to try it out on web or click [here](https://sign-in-with-farcaster-demo.replit.app/) for mobile.

### How does it work?

It uses the [Sign In With Farcaster](#sign-in-with-farcaster-siwf) standard under the hood, which is conceptually like "Sign in with Google". When integrated, AuthKit will:

1. Show a "Sign in with Farcaster" button to the user.
2. Wait for the user to click, scan a QR code and approve the request in Warpcast.
3. Receive and verify a signature from Warpcast.
4. Show the logged in user's profile picture and username.
