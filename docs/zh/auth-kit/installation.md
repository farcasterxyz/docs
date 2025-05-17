# 安装指南

安装 auth-kit 及其依赖库 [viem](https://viem.sh/)。

```sh
npm install @farcaster/auth-kit viem
```

**注意：** auth-kit 是一个 [React](https://react.dev/) 库。如果您使用其他框架，请参考 [客户端库](./client/introduction.md)。

### 1. 导入库文件

导入 auth-kit 和 CSS 样式文件。

```tsx
import '@farcaster/auth-kit/styles.css';
import { AuthKitProvider } from '@farcaster/auth-kit';
import { SignInButton } from '@farcaster/auth-kit';
```

### 2. 配置 Provider

使用 Optimism RPC 地址、应用域名和登录地址配置 Provider，并将您的应用包裹在其中。

```tsx
const config = {
  rpcUrl: 'https://mainnet.optimism.io',
  domain: 'example.com',
  siweUri: 'https://example.com/login',
};

const App = () => {
  return (
    <AuthKitProvider config={config}>{/*   您的应用   */}</AuthKitProvider>
  );
};
```

### 3. 添加连接按钮

渲染 `SignInButton` 组件。当用户点击此按钮时，系统将提示他们使用 Farcaster 钱包应用完成登录。

```tsx
export const Login = () => {
  return <SignInButton />;
};
```

### 4. 读取用户资料

可选操作：在应用任意位置使用 `useProfile` 获取已登录用户的详细信息。

```tsx
import { useProfile } from '@farcaster/auth-kit';

export const UserProfile = () => {
  const {
    isAuthenticated,
    profile: { username, fid },
  } = useProfile();
  return (
    <div>
      {isAuthenticated ? (
        <p>
          您好，{username}！您的 fid 是：{fid}
        </p>
      ) : (
        <p>您尚未登录。</p>
      )}
    </div>
  );
};
```
