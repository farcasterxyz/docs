# AuthKit

[![NPM 版本](https://img.shields.io/npm/v/@farcaster/auth-kit)](https://www.npmjs.com/package/@farcaster/auth-kit)

AuthKit 是一个 React 库，允许用户通过 Farcaster 账户登录您的应用。

<iframe src="https://farcaster-auth-kit-vite-demo.replit.app/" width="700" height="500" />

点击上方的"使用 Farcaster 登录"按钮在网页端体验，或点击[此处](https://sign-in-with-farcaster-demo.replit.app/)进入移动端演示。

### 工作原理

底层采用 [Sign In With Farcaster](#sign-in-with-farcaster-siwf)（SIWF）标准实现，其概念类似于"使用 Google 登录"。集成后，AuthKit 将：

1. 向用户显示"使用 Farcaster 登录"按钮
2. 等待用户点击按钮，扫描二维码并在 Warpcast 中授权请求
3. 接收并验证来自 Warpcast 的签名
4. 显示已登录用户的头像和用户名
