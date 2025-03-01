# Read data with Farcaster Auth

This guide will show you how to read data from the Farcaster network after authenticating a user with Farcaster Auth. We'll build a simple application that displays a user's profile information after they sign in.

## Prerequisites

- Basic knowledge of React
- Node.js and npm/yarn installed
- A Farcaster account for testing

## Setup

First, create a new React application:

```bash
npx create-react-app farcaster-auth-reader
cd farcaster-auth-reader
```

Install the required dependencies:

```bash
npm install @farcaster/auth-kit @farcaster/hub-nodejs ethers@5.7.2 viem
```

## 1. Set up the AuthKitProvider

Create a new file called `App.jsx` with the following content:

```jsx
import React, { useState } from 'react';
import { AuthKitProvider, SignInButton, useAuth } from '@farcaster/auth-kit';
import '@farcaster/auth-kit/styles.css';

const config = {
  domain: 'example.com',
  siweUri: 'https://example.com/login',
  rpcUrl: 'https://mainnet.optimism.io',
  relay: 'https://relay.farcaster.xyz',
};

function UserProfile() {
  const { user, isAuthenticated } = useAuth();
  
  if (!isAuthenticated) {
    return <p>Please sign in to view your profile</p>;
  }
  
  return (
    <div>
      <h2>User Profile</h2>
      <p><strong>FID:</strong> {user.fid}</p>
      <p><strong>Username:</strong> {user.username}</p>
      <p><strong>Display Name:</strong> {user.displayName}</p>
      <p><strong>Connected Address:</strong> {user.custody_address}</p>
      <img 
        src={user.pfp.url} 
        alt="Profile" 
        style={{ width: '100px', height: '100px', borderRadius: '50%' }} 
      />
    </div>
  );
}

function App() {
  return (
    <AuthKitProvider config={config}>
      <div className="App">
        <header className="App-header">
          <h1>Farcaster Auth Reader</h1>
          <SignInButton />
          <UserProfile />
        </header>
      </div>
    </AuthKitProvider>
  );
}

export default App;
```

## 2. Fetch additional user data from the Hub

Now, let's enhance our application to fetch additional data from the Farcaster Hub after authentication. Create a new component called `UserCasts.jsx`:

```jsx
import React, { useEffect, useState } from 'react';
import { useAuth } from '@farcaster/auth-kit';
import { getSSLHubRpcClient, CastAddMessage, isCastAddMessage } from '@farcaster/hub-nodejs';

function UserCasts() {
  const { user, isAuthenticated } = useAuth();
  const [casts, setCasts] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (isAuthenticated && user) {
      fetchUserCasts();
    }
  }, [isAuthenticated, user]);

  const fetchUserCasts = async () => {
    setLoading(true);
    try {
      // Connect to a Hub
      const HUB_URL = 'nemes.farcaster.xyz:2283'; // Public hub URL
      const client = getSSLHubRpcClient(HUB_URL);
      
      // Fetch the user's recent casts
      const result = await client.getCastsByFid({
        fid: user.fid,
        pageSize: 10,
        reverse: true,
      });
      
      if (result.isOk()) {
        // Filter to only CastAddMessages
        const userCasts = result.value.messages.filter(isCastAddMessage);
        setCasts(userCasts);
      } else {
        console.error('Error fetching casts:', result.error);
      }
    } catch (error) {
      console.error('Error:', error);
    } finally {
      setLoading(false);
    }
  };

  if (!isAuthenticated) {
    return null;
  }

  return (
    <div>
      <h2>Recent Casts</h2>
      {loading ? (
        <p>Loading casts...</p>
      ) : (
        <div>
          {casts.length === 0 ? (
            <p>No casts found</p>
          ) : (
            <ul style={{ listStyleType: 'none', padding: 0 }}>
              {casts.map((cast) => (
                <li key={cast.hash} style={{ marginBottom: '20px', borderBottom: '1px solid #eee', paddingBottom: '10px' }}>
                  <p>{cast.data.castAddBody.text}</p>
                  <small>
                    {new Date(Number(cast.data.timestamp) * 1000).toLocaleString()}
                  </small>
                </li>
              ))}
            </ul>
          )}
        </div>
      )}
    </div>
  );
}

export default UserCasts;
```

## 3. Update the main App component

Now, update your `App.jsx` to include the UserCasts component:

```jsx
import React from 'react';
import { AuthKitProvider, SignInButton, useAuth } from '@farcaster/auth-kit';
import '@farcaster/auth-kit/styles.css';
import UserCasts from './UserCasts';

// ... existing code ...

function App() {
  return (
    <AuthKitProvider config={config}>
      <div className="App">
        <header className="App-header">
          <h1>Farcaster Auth Reader</h1>
          <SignInButton />
          <UserProfile />
          <UserCasts />
        </header>
      </div>
    </AuthKitProvider>
  );
}

export default App;
```

## 4. Run the application

Start your application:

```bash
npm start
```

Visit `http://localhost:3000` in your browser. You should see a "Sign in with Farcaster" button. After signing in, your profile information and recent casts will be displayed.

## How it works

1. The `AuthKitProvider` sets up the authentication context for your application
2. The `SignInButton` component provides a pre-styled button that handles the Farcaster Auth flow
3. After authentication, the `useAuth` hook gives you access to the user's information
4. We use the `hub-nodejs` client to connect to a Farcaster Hub and fetch additional data
5. The user's profile information and recent casts are displayed in the UI

## Next steps

You can extend this application to:

- Fetch and display the user's followers or following
- Show casts the user has liked
- Display channels the user is a member of
- Implement pagination for casts

For more information, check out the [Farcaster Auth Kit documentation](/auth-kit/) and the [Hub API reference](/reference/hubble/httpapi/). 
