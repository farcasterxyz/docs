# `SignInButton`

核心组件。渲染一个"使用 Farcaster 登录"按钮，提示用户在网页浏览器中用手机扫描二维码或在移动设备上重定向。您可以使用 `onSuccess` 回调属性或 `useProfile` 钩子来获取用户的认证状态和个人资料信息。

**注意：** 请确保您的应用已包裹在 [`AuthKitProvider`](./auth-kit-provider.md) 中才能使用 `SignInButton` 组件。

```tsx
import { SignInButton } from '@farcaster/auth-kit';

export const Login = () => {
  return (
    <SignInButton
      onSuccess={({ fid, username }) =>
        console.log(`你好，${username}！你的 fid 是 ${fid}。`)
      }
    />
  );
};
```

## 属性

| 属性               | 类型       | 描述                                             | 默认值             |
| ------------------ | ---------- | ------------------------------------------------ | ------------------ |
| `timeout`          | `number`   | 轮询超时时长，超过该时间将返回错误。             | `300_000` (5 分钟) |
| `interval`         | `number`   | 轮询中继服务器更新状态的时间间隔。               | `1500` (1.5 秒)    |
| `nonce`            | `string`   | 包含在"使用 Farcaster 登录"消息中的随机数。      | 无                 |
| `notBefore`        | `string`   | 消息生效时间。ISO 8601 日期时间字符串。          | 无                 |
| `expirationTime`   | `string`   | 消息过期时间。ISO 8601 日期时间字符串。          | 无                 |
| `requestId`        | `string`   | 可选的消息中包含的系统特定 ID。                  | 无                 |
| `onSuccess`        | `function` | 登录完成且用户认证成功时触发的回调函数。         | 无                 |
| `onStatusResponse` | `function` | 组件从中继服务器接收到状态更新时触发的回调函数。 | 无                 |
| `onError`          | `function` | 错误回调函数。                                   | 无                 |
| `onSignOut`        | `function` | 用户登出时触发的回调函数。                       | 无                 |
| `hideSignOut`      | `function` | 隐藏登出按钮。                                   | `false`            |
| `debug`            | `boolean`  | 渲染显示 auth-kit 内部状态的调试面板。           | `false`            |

## 示例

### 自定义随机数

```tsx
import { SignInButton } from '@farcaster/auth-kit';

export const Login = ({ nonce }: { nonce: string }) => {
  return (
    <SignInButton
      nonce={nonce}
      onSuccess={({ fid, username }) =>
        console.log(`你好，${username}！你的 fid 是 ${fid}。`)
      }
    />
  );
};
```
