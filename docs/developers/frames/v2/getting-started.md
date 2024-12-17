---
title: Getting Started with Frames v2
---

# Getting Started with Frames v2

::: info Not ready to build?
If you'd prefer to learn more about the new spec before building a frame, jump ahead to the [Specification](./spec).
:::

## Video demo

::: info Heads up!
This video is slightly outdated. The text tutorial below removes a few steps.
:::

Here's a full walkthrough of creating a frames v2 app:

<iframe width="560" height="315" src="https://www.youtube.com/embed/5wAbo_YsuC4?si=-dOyKXgouz60ElmW" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerpolicy="strict-origin-when-cross-origin" allowfullscreen></iframe>

## Tutorial

The following tutorial is based on the [Frames v2 Demo](https://github.com/farcasterxyz/frames-v2-demo) repo on Github.

### Setup and dependencies

We'll start with a fresh NextJS app, and accept all the default config options.

```bash
$ yarn create next-app
✔ What is your project named? … (frames-v2-demo)
✔ Would you like to use TypeScript? … (Yes)
✔ Would you like to use ESLint? … (No)
✔ Would you like to use Tailwind CSS? … (Yes)
✔ Would you like your code inside a src directory? … (Yes)
✔ Would you like to use App Router? … (Yes)
✔ Would you like to use Turbopack for next dev? … (No)
✔ Would you like to customize the import alias? … (No)
```

Next, install frame related dependencies.

```bash
$ yarn add @farcaster/frame-sdk @farcaster/frame-react
```

We'll also need [Wagmi](https://wagmi.sh/) to handle wallet interactions. Let's install it and its dependencies.

```bash
$ yarn add wagmi viem@2.x @tanstack/react-query
```

OK, we're ready to get started!

### Configuring providers

We'll need to set up a custom Wagmi connector in order to interact with the user's Farcaster wallet.

First, let's create a custom connector component at `lib/connector.ts`. We'll use this to connect to the user's Farcaster wallet from our app.

> [!NOTE]
> We plan to move this connector into the frames SDK so you don't have to worry about it. But you'll need to copy-paste it for now.

```ts
import sdk from '@farcaster/frame-sdk';
import { SwitchChainError, fromHex, getAddress, numberToHex } from 'viem';
import { ChainNotConfiguredError, createConnector } from 'wagmi';

frameConnector.type = 'frameConnector' as const;

export function frameConnector() {
  let connected = true;

  return createConnector<typeof sdk.wallet.ethProvider>((config) => ({
    id: 'farcaster',
    name: 'Farcaster Wallet',
    type: frameConnector.type,

    async setup() {
      this.connect({ chainId: config.chains[0].id });
    },
    async connect({ chainId } = {}) {
      const provider = await this.getProvider();
      const accounts = await provider.request({
        method: 'eth_requestAccounts',
      });

      let currentChainId = await this.getChainId();
      if (chainId && currentChainId !== chainId) {
        const chain = await this.switchChain!({ chainId });
        currentChainId = chain.id;
      }

      connected = true;

      return {
        accounts: accounts.map((x) => getAddress(x)),
        chainId: currentChainId,
      };
    },
    async disconnect() {
      connected = false;
    },
    async getAccounts() {
      if (!connected) throw new Error('Not connected');
      const provider = await this.getProvider();
      const accounts = await provider.request({
        method: 'eth_requestAccounts',
      });
      return accounts.map((x) => getAddress(x));
    },
    async getChainId() {
      const provider = await this.getProvider();
      const hexChainId = await provider.request({ method: 'eth_chainId' });
      return fromHex(hexChainId, 'number');
    },
    async isAuthorized() {
      if (!connected) {
        return false;
      }

      const accounts = await this.getAccounts();
      return !!accounts.length;
    },
    async switchChain({ chainId }) {
      const provider = await this.getProvider();
      const chain = config.chains.find((x) => x.id === chainId);
      if (!chain) throw new SwitchChainError(new ChainNotConfiguredError());

      await provider.request({
        method: 'wallet_switchEthereumChain',
        params: [{ chainId: numberToHex(chainId) }],
      });
      return chain;
    },
    onAccountsChanged(accounts) {
      if (accounts.length === 0) this.onDisconnect();
      else
        config.emitter.emit('change', {
          accounts: accounts.map((x) => getAddress(x)),
        });
    },
    onChainChanged(chain) {
      const chainId = Number(chain);
      config.emitter.emit('change', { chainId });
    },
    async onDisconnect() {
      config.emitter.emit('disconnect');
      connected = false;
    },
    async getProvider() {
      return sdk.wallet.ethProvider;
    },
  }));
}
```

Next, let's create a provider component that handles our Wagmi and Frame SDK configuration. Create `components/ClientProviders.tsx`.

We'll configure our client with Base as the network and use the `frameConnector` that we just created:

```tsx
'use client';

import { FrameProvider } from '@farcaster/frame-react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { WagmiProvider, createConfig, http } from 'wagmi';
import { base } from 'wagmi/chains';

import { frameConnector } from '@/lib/connector';

export const wagmiConfig = createConfig({
  chains: [base],
  transports: {
    [base.id]: http(),
  },
  connectors: [frameConnector()],
});

const queryClient = new QueryClient();

export function ClientProviders({ children }: { children: React.ReactNode }) {
  return (
    <WagmiProvider config={wagmiConfig}>
      <QueryClientProvider client={queryClient}>
        <FrameProvider>{children}</FrameProvider>
      </QueryClientProvider>
    </WagmiProvider>
  );
}
```

The reason we need to create a separate `ClientProviders` component is because the Frame SDK relies on the browser `window` object, which is not available on the server. This is why we need `'use client'` at the top of the file.

Finally, let's add this providers component to our app layout. Edit `app/layout.tsx`:

```tsx
import type { Metadata } from 'next';

import '@/app/globals.css';
import { ClientProviders } from '@/components/ClientProviders';

export const metadata: Metadata = {
  title: 'Farcaster Frames v2 Demo',
  description: 'A Farcaster Frames v2 demo app',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        <ClientProviders>{children}</ClientProviders>
      </body>
    </html>
  );
}
```

OK, setup is all done, let's do something more interesting...

### Creating the app

Let's create a simple page for our app's `homeUrl`. Navigate to `src/app/page.tsx`.

For now, let's just put in a placeholder, Since our frame app will be rendering at mobile width, we'll give it a fixed width and center the content:

```tsx
export default function Home() {
  return (
    <div className="mx-auto w-[300px] px-2 py-4">
      <h1 className="mb-4 text-2xl font-bold">Frames v2 Demo</h1>
    </div>
  );
}
```

Since we're going to import the frames-react package in this component, we'll need to make the page into a client component.

```tsx
'use client';

import { useFrame } from '@farcaster/frame-react';

export default function Home() {
  const context = useFrame();

  return (
    <div className="mx-auto w-[300px] px-2 py-4">
      <h1 className="mb-4 text-2xl font-bold">Frames v2 Demo</h1>
      <p>Hello {context?.user.username}</p>
    </div>
  );
}
```

OK, we're all set up! Now is a good time to try out our frames app in the developer playground. To do so, we'll use ngrok to access our local dev server over the internet.

First, run the dev server:

```bash
$ yarn dev
```

Next, start ngrok:

```bash
$ ngrok http 3000
```

::: info Tunneling gotchas
Some tunneling tools, like the ngrok free tier, insert an click-through interstitial between your dev server and the tunnel endpoint. Use a paid ngrok account or a different tool, like Tailscale funnel.
:::

Now open the Frame Playground on Warpcast mobile, by visiting [https://warpcast.com/~/developers/frame](https://warpcast.com/~/developers/frames).

Enter your ngrok URL:

<img src="https://raw.githubusercontent.com/farcasterxyz/frames-v2-demo/refs/heads/main/docs/img/1_playground.png" width="200" alt="Frames Playground" />

..and tap "Launch" to open your app. You should see your Farcaster username, which is part of the context that Frames inject into your app!

### Viewing context

When your frame loads, the parent Farcaster app provides it with context information.

```ts
type FrameContext = {
  user: {
    fid: number;
    username?: string;
    displayName?: string;
    pfpUrl?: string;
  };
  location?: FrameLocationContext;
  client: {
    clientFid: number;
    added: boolean;
    notificationDetails?: FrameNotificationDetails;
  };
};
```

> [!WARNING]
> In the current developer preview, context data is unauthenticated. Assume this data is spoofable and don't use it to grant privileged access to the user! Future frame SDK releases will include a mechanism fo verify context data.

Previously, we only showed the injected username. Let's replace that with a section including all of the available context data.

```tsx
'use client';

import { useFrame } from '@farcaster/frame-react';

export default function Home() {
  const context = useFrame();

  return (
    <div className="mx-auto max-w-lg space-y-6 p-4">
      <h1 className="mb-4 text-2xl font-bold">Frames v2 Demo</h1>

      <div>
        <h2 className="font-2xl font-bold">Context</h2>
        <pre className="overflow-x-auto whitespace-pre-wrap break-words rounded-lg bg-gray-100 p-4 font-mono text-xs">
          {JSON.stringify(context, null, 2)}
        </pre>
      </div>
    </div>
  );
}
```

<img src="https://raw.githubusercontent.com/farcasterxyz/frames-v2-demo/refs/heads/main/docs/img/6_context.PNG" width="200" alt="Context" />

### Invoking actions

Now let's make our frame do something. We can invoke actions by calling the functions on `sdk.actions`. We can call functions like `sdk.actions.openUrl` and `sdk.actions.close` to send commands back to the Farcaster client app.

Let's start by opening an external URL. Add an `openUrl` callback that calls `sdk.actions.openUrl` and a button that calls it:

```tsx
'use client';

import { useFrame } from '@farcaster/frame-react';
import sdk from '@farcaster/frame-sdk';
import { useCallback } from 'react';

export default function Home() {
  const context = useFrame();

  const openUrl = useCallback(() => {
    sdk.actions.openUrl('https://www.youtube.com/watch?v=dQw4w9WgXcQ');
  }, []);

  if (!context) {
    return <div>Loading...</div>;
  }

  return (
    <div className="mx-auto max-w-lg space-y-6 p-4">
      <h1 className="mb-4 text-2xl font-bold">Frames v2 Demo</h1>

      <div className="space-y-2">
        <h2 className="font-2xl font-bold">Context</h2>
        <details>
          <summary>Tap to expand</summary>
          <pre className="overflow-x-auto whitespace-pre-wrap break-words rounded-lg bg-gray-100 p-4 font-mono text-xs">
            {JSON.stringify(context, null, 2)}
          </pre>
        </details>
      </div>

      <div className="space-y-2">
        <h2 className="font-2xl font-bold">Actions</h2>
        <div className="rounded-lg bg-gray-100 p-2">
          <pre className="overflow-x- max-w-[260px] whitespace-pre-wrap break-words font-mono text-xs">
            sdk.actions.openUrl
          </pre>
        </div>
        <button
          onClick={openUrl}
          className="w-full rounded bg-purple-700 p-2 text-white"
        >
          Open Link
        </button>
      </div>
    </div>
  );
}
```

<img src="https://raw.githubusercontent.com/farcasterxyz/frames-v2-demo/refs/heads/main/docs/img/8_actions.png" width="200" alt="Actions" />

Tap the button and you'll be directed to an external URL.

<img src="https://raw.githubusercontent.com/farcasterxyz/frames-v2-demo/refs/heads/main/docs/img/9_url.png" width="200" alt="URL" />

Let's add another button to call `close()`:

```tsx
'use client';

import { useFrame } from '@farcaster/frame-react';
import sdk from '@farcaster/frame-sdk';
import { useCallback } from 'react';

export default function Home() {
  const context = useFrame();

  const openUrl = useCallback(() => {
    sdk.actions.openUrl('https://www.youtube.com/watch?v=dQw4w9WgXcQ');
  }, []);

  const close = useCallback(() => {
    sdk.actions.close();
  }, []);

  if (!context) {
    return <div>Loading...</div>;
  }

  return (
    <div className="mx-auto max-w-lg space-y-6 p-4">
      <h1 className="mb-4 text-2xl font-bold">Frames v2 Demo</h1>

      {/* Context omitted */}

      <div className="space-y-2">
        <h2 className="font-2xl font-bold">Actions</h2>
        <div className="space-y-4">
          {[
            {
              action: 'openUrl',
              label: 'Open Link',
              onClick: openUrl,
            },
            {
              action: 'close',
              label: 'Close Frame',
              onClick: close,
            },
          ].map((item) => {
            return (
              <div className="space-y-2" key={item.action}>
                <div className="rounded-lg bg-gray-100 p-2">
                  <pre className="overflow-x- max-w-[260px] whitespace-pre-wrap break-words font-mono text-xs">
                    sdk.actions.{item.action}
                  </pre>
                </div>
                <button
                  onClick={item.onClick}
                  className="w-full rounded bg-purple-700 p-2 text-white"
                >
                  {item.label}
                </button>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
```

<img src="https://raw.githubusercontent.com/farcasterxyz/frames-v2-demo/refs/heads/main/docs/img/10_close.png" width="200" alt="URL" />

When you tap this, the frame should close.

### Wallet interactions

Finally, let's interact with the user's connected wallet. To do so, we can use the wallet connector and Wagmi hooks we set up earlier. To start, let's read the user's connected wallet address, using `useAccount`:

```tsx
'use client';

import { useFrame } from '@farcaster/frame-react';
import { useAccount } from 'wagmi';

export default function Home() {
  const context = useFrame();
  const { address } = useAccount();

  if (!context) {
    return <div>Loading...</div>;
  }

  return (
    <div className="mx-auto max-w-lg space-y-6 p-4">
      <h1 className="mb-4 text-2xl font-bold">Frames v2 Demo</h1>

      {/* Context and action buttons omitted */}

      <div className="space-y-2">
        <h2 className="font-2xl font-bold">Wallet</h2>

        {address && (
          <div className="my-2 text-xs">
            Address: <pre className="inline">{address}</pre>
          </div>
        )}
      </div>
    </div>
  );
}
```

If your wallet is connected to Warpcast, you should see its address. In case it's not, let's add a connect/disconnect button. Note that we'll need to import our Wagmi config to `connect`:

```tsx
'use client';

import { useFrame } from '@farcaster/frame-react';
import { useAccount, useConnect, useDisconnect } from 'wagmi';

import { wagmiConfig } from '@/components/ClientProviders';

export default function Home() {
  const context = useFrame();
  const { address, isConnected } = useAccount();
  const { connect } = useConnect();
  const { disconnect } = useDisconnect();

  if (!context) {
    return <div>Loading...</div>;
  }

  return (
    <div className="mx-auto max-w-lg space-y-6 p-4">
      <h1 className="mb-4 text-2xl font-bold">Frames v2 Demo</h1>

      {/* Context and action buttons omitted */}

      <div className="space-y-2">
        <h2 className="font-2xl font-bold">Wallet</h2>

        {address && (
          <div className="my-2 text-xs">
            Address: <pre className="inline">{address}</pre>
          </div>
        )}

        <button
          className="w-full rounded bg-purple-700 p-2 text-white"
          onClick={() =>
            isConnected
              ? disconnect()
              : connect({ connector: wagmiConfig.connectors[0] })
          }
        >
          {isConnected ? 'Disconnect' : 'Connect'}
        </button>
      </div>
    </div>
  );
}
```

Now let's request a transaction. We'll use the Wagmi `useSendTransaction` hook to call the Yoink contract and `useWaitForTransactionReceipt` to watch its status.

> [!NOTE]
> In a more complex app, you'll probably want to use Wagmi's [useWriteContract](https://wagmi.sh/react/api/hooks/useWriteContract) hook instead. This provides better type safety and automatic encoding/decoding of calldata based on the contract ABI.

```tsx
'use client';

import { useFrame } from '@farcaster/frame-react';
import { useCallback } from 'react';
import {
  useAccount,
  useConnect,
  useDisconnect,
  useSendTransaction,
  useWaitForTransactionReceipt,
} from 'wagmi';

import { wagmiConfig } from '@/components/ClientProviders';

const btnClasses = 'w-full rounded bg-purple-700 p-2 text-white';

export default function Home() {
  const context = useFrame();
  const { connect } = useConnect();
  const { disconnect } = useDisconnect();
  const { address, isConnected } = useAccount();

  const transaction = useSendTransaction();
  const receipt = useWaitForTransactionReceipt({ hash: transaction.data });

  const sendTx = useCallback(() => {
    transaction.sendTransaction({
      to: '0x4bBFD120d9f352A0BEd7a014bd67913a2007a878',
      data: '0x9846cd9efc000023c0',
    });
  }, [transaction.sendTransaction]);

  const renderError = (error: Error | null) => {
    if (!error) return null;
    return <div className="mt-1 text-xs text-red-500">{error.message}</div>;
  };

  if (!context) {
    return <div>Loading...</div>;
  }

  return (
    <div className="mx-auto max-w-lg space-y-6 p-4">
      <h1 className="mb-4 text-2xl font-bold">Frames v2 Demo</h1>

      {/* Context and action buttons omitted */}

      <div className="space-y-2">
        <h2 className="font-2xl font-bold">Wallet</h2>

        {address && (
          <div className="my-2 text-xs">
            Address: <pre className="inline">{address}</pre>
          </div>
        )}

        <button
          onClick={() =>
            isConnected
              ? disconnect()
              : connect({ connector: wagmiConfig.connectors[0] })
          }
          className={btnClasses}
        >
          {isConnected ? 'Disconnect' : 'Connect'}
        </button>

        {isConnected && (
          <>
            <button
              onClick={sendTx}
              disabled={!isConnected || transaction.isPending}
              className={btnClasses}
            >
              Send Transaction
            </button>
            {transaction.isError && renderError(transaction.error)}
            {transaction.data && (
              <div className="text-xs">
                <div>Hash: {transaction.data}</div>
                <div>
                  Status:{' '}
                  {receipt.isLoading
                    ? 'Confirming...'
                    : receipt.isSuccess
                    ? 'Confirmed!'
                    : 'Pending'}
                </div>
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
}
```

<img src="https://raw.githubusercontent.com/farcasterxyz/frames-v2-demo/refs/heads/main/docs/img/10_tx.png" width="200" alt="Tx" />

Tap "Send Transaction" and you'll be directed to your wallet.

<img src="https://raw.githubusercontent.com/farcasterxyz/frames-v2-demo/refs/heads/main/docs/img/12_yoink.png" width="200" alt="Yoink" />

### Signatures

Finally, let's add two new helpers for wallet signature methods. Below is the full `page.tsx`:

```tsx
'use client';

import { useFrame } from '@farcaster/frame-react';
import sdk from '@farcaster/frame-sdk';
import { useCallback } from 'react';
import {
  useAccount,
  useConnect,
  useDisconnect,
  useSendTransaction,
  useSignMessage,
  useSignTypedData,
  useWaitForTransactionReceipt,
} from 'wagmi';

import { wagmiConfig } from '@/components/ClientProviders';

const btnClasses = 'w-full rounded bg-purple-700 p-2 text-white';

export default function Home() {
  const context = useFrame();
  const { connect } = useConnect();
  const { disconnect } = useDisconnect();
  const { address, isConnected } = useAccount();

  const openUrl = useCallback(() => {
    sdk.actions.openUrl('https://www.youtube.com/watch?v=dQw4w9WgXcQ');
  }, []);

  const close = useCallback(() => {
    sdk.actions.close();
  }, []);

  const transaction = useSendTransaction();
  const receipt = useWaitForTransactionReceipt({ hash: transaction.data });
  const message = useSignMessage();
  const typedData = useSignTypedData();

  const sendTx = useCallback(() => {
    transaction.sendTransaction({
      to: '0x4bBFD120d9f352A0BEd7a014bd67913a2007a878',
      data: '0x9846cd9efc000023c0',
    });
  }, [transaction.sendTransaction]);

  const sign = useCallback(() => {
    message.signMessage({ message: 'Hello from Frames v2!' });
  }, [message.signMessage]);

  const signTyped = useCallback(() => {
    typedData.signTypedData({
      domain: {
        name: 'Frames v2 Demo',
        version: '1',
        chainId: 8453,
      },
      types: {
        Message: [{ name: 'content', type: 'string' }],
      },
      message: {
        content: 'Hello from Frames v2!',
      },
      primaryType: 'Message',
    });
  }, [typedData.signTypedData]);

  const renderError = (error: Error | null) => {
    if (!error) return null;
    return <div className="mt-1 text-xs text-red-500">{error.message}</div>;
  };

  if (!context) {
    return <div>Loading...</div>;
  }

  return (
    <div className="mx-auto max-w-lg space-y-6 p-4">
      <h1 className="mb-4 text-2xl font-bold">Frames v2 Demo</h1>

      <div className="space-y-2">
        <h2 className="font-2xl font-bold">Context</h2>
        <details>
          <summary>Tap to expand</summary>
          <pre className="overflow-x-auto whitespace-pre-wrap break-words rounded-lg bg-gray-100 p-4 font-mono text-xs">
            {JSON.stringify(context, null, 2)}
          </pre>
        </details>
      </div>

      <div className="space-y-2">
        <h2 className="font-2xl font-bold">Actions</h2>

        <div className="space-y-4">
          {[
            {
              action: 'openUrl',
              label: 'Open Link',
              onClick: openUrl,
            },
            {
              action: 'close',
              label: 'Close Frame',
              onClick: close,
            },
          ].map((item) => {
            return (
              <div className="space-y-2" key={item.action}>
                <div className="rounded-lg bg-gray-100 p-2">
                  <pre className="overflow-x- max-w-[260px] whitespace-pre-wrap break-words font-mono text-xs">
                    sdk.actions.{item.action}
                  </pre>
                </div>
                <button onClick={item.onClick} className={btnClasses}>
                  {item.label}
                </button>
              </div>
            );
          })}
        </div>
      </div>

      <div className="space-y-2">
        <h2 className="font-2xl font-bold">Wallet</h2>

        {address && (
          <div className="my-2 text-xs">
            Address: <pre className="inline">{address}</pre>
          </div>
        )}

        <button
          className={btnClasses}
          onClick={() =>
            isConnected
              ? disconnect()
              : connect({ connector: wagmiConfig.connectors[0] })
          }
        >
          {isConnected ? 'Disconnect' : 'Connect'}
        </button>

        {isConnected && (
          <div className="space-y-2">
            <div>
              <button
                onClick={sendTx}
                disabled={!isConnected || transaction.isPending}
                className={btnClasses}
              >
                Send Transaction
              </button>
              {transaction.isError && renderError(transaction.error)}
              {transaction.data && (
                <div className="text-xs">
                  <div>Hash: {transaction.data}</div>
                  <div>
                    Status:{' '}
                    {receipt.isLoading
                      ? 'Confirming...'
                      : receipt.isSuccess
                      ? 'Confirmed!'
                      : 'Pending'}
                  </div>
                </div>
              )}
            </div>

            <div>
              <button
                onClick={sign}
                disabled={!isConnected || message.isPending}
                className={btnClasses}
              >
                Sign Message
              </button>
              {message.isError && renderError(message.error)}
            </div>

            <div>
              <button
                onClick={signTyped}
                disabled={!isConnected || typedData.isPending}
                className={btnClasses}
              >
                Sign Typed Data
              </button>
              {typedData.isError && renderError(typedData.error)}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
```

We've build a simple v2 frame by:

1. Setting up a NextJS web app
2. Importing @farcaster/frame-sdk and @farcaster/frame-react
3. Reading the user context from `useFrame()`
4. Invoking actions using `sdk.actions`
5. Connecting to the user's wallet using Wagmi and `sdk.wallet.ethProvider`
