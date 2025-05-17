# `SignInButton` 登录按钮组件

该组件为核心功能模块，会渲染一个"使用 Farcaster 登录"的按钮。在网页浏览器中会提示用户用手机扫描二维码，在移动设备上则会直接跳转。您可以通过 `onSuccess` 回调属性或 `useProfile` 钩子来获取用户的认证状态和个人资料信息。

**注意：** 使用 `SignInButton` 组件前，请确保您的应用已包裹在 [`AuthKitProvider`](./auth-kit-provider.md) 组件中。

```tsx
import { SignInButton } from '@farcaster/auth-kit';

export const Login = () => {
  return (
    <SignInButton
      onSuccess={({ fid, username }) =>
        console.log(`你好，${username}! 你的fid是${fid}。`)
      }
    />
  );
};
```

## 属性参数

| 属性名             | 类型       | 描述                                             | 默认值             |
| ------------------ | ---------- | ------------------------------------------------ | ------------------ |
| `timeout`          | `number`   | 轮询超时时长（毫秒），超时后将返回错误。         | `300_000` (5 分钟) |
| `interval`         | `number`   | 向中继服务器轮询更新的时间间隔（毫秒）。         | `1500` (1.5 秒)    |
| `nonce`            | `string`   | 包含在 Farcaster 登录消息中的随机数。            | 无                 |
| `notBefore`        | `string`   | 消息生效时间（ISO 8601 格式日期字符串）。        | 无                 |
| `expirationTime`   | `string`   | 消息过期时间（ISO 8601 格式日期字符串）。        | 无                 |
| `requestId`        | `string`   | 可选系统标识符，将包含在消息中。                 | 无                 |
| `onSuccess`        | `function` | 登录完成且用户认证成功时触发的回调函数。         | 无                 |
| `onStatusResponse` | `function` | 组件从中继服务器接收到状态更新时触发的回调函数。 | 无                 |
| `onError`          | `function` | 错误回调函数。                                   | 无                 |
| `onSignOut`        | `function` | 用户登出时触发的回调函数。                       | 无                 |
| `hideSignOut`      | `boolean`  | 是否隐藏登出按钮。                               | `false`            |
| `debug`            | `boolean`  | 是否渲染显示 auth-kit 内部状态的调试面板。       | `false`            |

## 使用示例

### 自定义随机数

```tsx
import { SignInButton } from '@farcaster/auth-kit';

export const Login = ({ nonce }: { nonce: string }) => {
  return (
    <SignInButton
      nonce={nonce}
      onSuccess={({ fid, username }) =>
        console.log(`你好，${username}! 你的fid是${fid}。`)
      }
    />
  );
};
```
