---
title: 帧规范
---

# 帧规范

帧（Frames）是 Farcaster 上创建交互式认证体验的标准，可嵌入任何 Farcaster 客户端。

帧是一组位于 HTML 页面 `<head>` 中的 `<meta>` 标签。如果页面包含所有必需的帧属性，Farcaster 应用会将该页面渲染为帧。帧的 `<meta>` 标签扩展了 [OpenGraph 协议](https://ogp.me/)。

帧可以相互链接，从而在 Cast 消息中嵌入动态应用。

## 帧应用的生命周期

帧应用始于初始帧，由应用缓存并展示给用户。帧必须包含图像，可包含按钮，点击按钮会加载其他帧或将用户重定向到外部网站。

![帧应用](/assets/frame_app.png)

### 初始帧

帧是位于网络服务器 URL（如 foo.com/app）上的 HTML 网页应用。我们将此网络服务器称为“帧服务器”。

帧服务器：

- 必须在 HTML `<head>` 部分返回有效的帧。
- 应返回有效的 HTML `<body>`，以防用户在浏览器中点击进入帧。
- 不应在初始帧中包含动态内容，因为它会被 Farcaster 客户端缓存。
- 不应包含 `fc:frame:state` 标签。

### 响应帧

当用户点击帧上的按钮时，应用会向帧服务器发送带有[帧签名](#frame-signature)的 POST 请求，证明请求来自用户。服务器必须返回一个新帧发送给用户。

当帧服务器收到 POST 请求时：

- 必须在 5 秒内响应。
- 对于 `post` 按钮点击，必须以 200 OK 和另一个帧响应以表示成功。
- 对于 `post_redirect` 按钮点击，必须以 302 OK 和 Location 头部响应以表示成功。
- 可以以 4XX 状态码、`content-type: application/json` 头部和包含 `message` 属性（不超过 90 字符）的 JSON 体响应，表示应用级错误。
- 提供的 Location 头部必须包含以 `http://` 或 `https://` 开头的 URL。

### 渲染帧

当用户创建 Cast 并在其中嵌入帧 URL 时，帧进入 Farcaster。支持帧的应用必须：

- 检查所有 Cast 嵌入 URL 是否为有效帧。
- 如果帧有效，在查看 Cast 时渲染该帧。
- 如果帧格式错误，回退为 OpenGraph 嵌入。
- 遵循帧的[安全模型](#securing-frames)。

## 构建帧

帧必须包含必需属性，并可包含可选属性。可以使用 Warpcast 提供的[帧验证工具](https://warpcast.com/~/developers/frames-legacy)验证帧。

### 属性

帧属性是具有属性名和内容值的 meta 标签。属性名始终以 `fc:frame` 为前缀。

```html
<!-- 声明帧和支持版本的示例 -->

<meta property="fc:frame" content="vNext" />
```

### 必需属性

| 键               | 描述                                                                                                                    |
| ---------------- | ----------------------------------------------------------------------------------------------------------------------- |
| `fc:frame`       | 有效的帧版本字符串。字符串必须是发布日期（如 2020-01-01）或 vNext。应用必须忽略不理解的版本。目前唯一有效版本是 vNext。 |
| `fc:frame:image` | 图像，宽高比应为 1.91:1 或 1:1                                                                                          |
| `og:image`       | 图像，宽高比应为 1.91:1。用于不支持帧的客户端回退。                                                                     |

### 可选属性

| 键                              | 描述                                                                                                                                                                      |
| ------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `fc:frame:post_url`             | 不超过 256 字节的字符串，包含发送签名包的有效 URL。                                                                                                                       |
| `fc:frame:button:$idx`          | 不超过 256 字节的字符串，表示位置 $idx 的按钮标签。页面可包含 0 到 4 个按钮。如果有多个按钮，$idx 必须从 1 开始连续（如 1, 2, 3）。如果序列不连续（如 1, 2, 4），帧无效。 |
| `fc:frame:button:$idx:action`   | 必须是 `post`、`post_redirect`、`link`、`mint` 或 `tx`。默认为 `post`。详见[按钮动作](#button-actions)。                                                                  |
| `fc:frame:button:$idx:target`   | 不超过 256 字节的字符串，决定动作的目标。                                                                                                                                 |
| `fc:frame:button:$idx:post_url` | 不超过 256 字节的字符串，定义按钮特定的发送签名包的 URL。如果设置，会覆盖 `fc:frame:post_url`。                                                                           |
| `fc:frame:input:text`           | 添加此属性启用文本输入框。内容是不超过 32 字节的标签，展示给用户（如“输入消息”）。                                                                                        |
| `fc:frame:image:aspect_ratio`   | 必须是 `1.91:1` 或 `1:1`。默认为 `1.91:1`                                                                                                                                 |
| `fc:frame:state`                | 包含序列化状态（如 JSON）的字符串，传递给帧服务器。不超过 4096 字节。                                                                                                     |

## 按钮动作

### `post`

```html
<meta name="fc:frame:post_url" content="https://frame.example.com/start" />
<meta name="fc:frame:button:1" content="Start" />
```

`post` 动作向帧或按钮的 `post_url` 发送 HTTP POST 请求。这是默认按钮类型。

帧服务器在 POST 请求体中接收签名包，包含点击的按钮、文本输入和 Cast 上下文信息。帧服务器必须以 200 OK 和另一个帧响应。

### `post_redirect`

```html
<meta name="fc:frame:post_url" content="https://frame.example.com/redirect" />
<meta name="fc:frame:button:1" content="Redirect" />
<meta name="fc:frame:button:1:action" content="post_redirect" />
```

`post_redirect` 动作向帧或按钮的 `post_url` 发送 HTTP POST 请求。可用于基于帧状态或用户输入重定向到 URL。

帧服务器在 POST 请求体中接收签名包。帧服务器必须以 302 Found 和以 `http://` 或 `https://` 开头的 Location 头部响应。

### `link`

```html
<meta name="fc:frame:button:1" content="Farcaster Docs" />
<meta name="fc:frame:button:1:action" content="link" />
<meta name="fc:frame:button:1:target" content="https://docs.farcaster.xyz" />
```

`link` 动作将用户重定向到外部 URL。可用于无需向帧服务器发送 POST 请求的重定向。

客户端不会为 `link` 动作向帧服务器发送请求，而是直接将用户重定向到 `target` URL。

### `mint`

```html
<meta name="fc:frame:button:1" content="Mint" />
<meta name="fc:frame:button:1:action" content="mint" />
<meta
  name="fc:frame:button:1:target"
  content="eip155:8453:0xf5a3b6dee033ae5025e4332695931cadeb7f4d2b:1"
/>
```

`mint` 动作允许用户铸造 NFT。支持中继或发起链上交易的客户端可通过中继交易或与用户钱包交互增强此按钮。不支持的客户端回退到打开外部 URL。

`target` 属性必须是有效的 `CAIP-10` 地址，可附加代币 ID。

### `tx`

```html
<meta property="fc:frame:button:1" content="Transaction" />
<meta property="fc:frame:button:1:action" content="tx" />
<meta
  property="fc:frame:button:1:target"
  content="https://frame.example.com/get_tx_data"
/>
<meta
  property="fc:frame:button:1:post_url"
  content="https://frame.example.com/tx_callback"
/>
```

`tx` 动作允许帧请求用户在连接的钱包中执行操作。与其他动作类型不同，`tx` 动作包含多个步骤。

首先，客户端向 `target` URL 发送 POST 请求以获取钱包操作数据。帧服务器在 POST 请求体中接收签名包，包括连接的钱包地址。帧服务器必须以 200 OK 和描述钱包操作的 JSON 响应：

```json
{
  method: "eth_sendTransaction",
  chainId: "eip155:10",
  params: {
    abi: [...], // 函数选择器和错误的 JSON ABI
    to: "0x00000000fcCe7f938e7aE6D3c335bD6a1a7c593D",
    data: "0x783a112b0000000000000000000000000000000000000000000000000000000000000e250000000000000000000000000000000000000000000000000000000000000001",
    value: "984316556204476",
  },
}
```

客户端使用此数据请求用户钱包中的操作。如果用户完成操作，客户端向 `post_url` 发送 POST 请求，签名包中包含 `transaction_id` 中的交易或签名哈希及 `address` 中的地址。帧服务器必须以 200 OK 和另一个帧响应。帧服务器可监控交易哈希以确定交易成功、回滚或超时。

#### 钱包操作响应类型

钱包操作响应必须是以下之一：

##### EthSendTransactionAction

- `chainId`: CAIP-2 链 ID，标识交易网络（如以太坊主网）
- `method`: 必须是 `"eth_sendTransaction"`
- `attribution`: 可选。返回 `false` 以省略[调用数据归属后缀](https://www.notion.so/Frame-Transactions-Public-9d9f9f4f527249519a41bd8d16165f73?pvs=21)。如果未定义或为 `true`，客户端会附加归属后缀。
- `params`:
  - `to`: 交易目标地址
  - `abi`: JSON ABI，**必须**包含编码的函数类型，**应**包含潜在错误类型。可为空。
  - `value`: 以 wei 为单位的交易发送的以太值。可选。
  - `data`: 交易调用数据。可选。

```ts
type EthSendTransactionAction = {
  chainId: string;
  method: 'eth_sendTransaction';
  attribution?: boolean;
  params: {
    abi: Abi | [];
    to: string;
    value?: string;
    data?: string;
  };
};
```

##### EthSignTypedDataV4

参见 [EIP-712](https://eips.ethereum.org/EIPS/eip-712)。

- `chainId`: CAIP-2 链 ID，标识交易网络（如以太坊主网）
- `method`: 必须是 `"eth_signTypedData_v4"`
- `params`:
  - `domain`: 类型化域
  - `types`: 类型化数据的类型定义
  - `primaryType`: 从类型中提取的主要类型并在值中使用。
  - `message`: 类型化消息

```ts
type EthSignTypedDataV4Action = {
  chainId: string;
  method: 'eth_signTypedData_v4';
  params: {
    domain: {
      name?: string;
      version?: string;
      chainId?: number;
      verifyingContract?: string;
    };
    types: Record<string, unknown>;
    primaryType: string;
    message: Record<string, unknown>;
  };
};
```

**支持的链**

| 网络     | 链 ID              |
| -------- | ------------------ |
| 以太坊   | `eip155:1`         |
| Arbitrum | `eip155:42161`     |
| Base     | `eip155:8453`      |
| Degen    | `eip155:666666666` |
| Gnosis   | `eip155:100`       |
| Optimism | `eip155:10`        |
| Zora     | `eip155:7777777`   |
| Polygon  | `eip155:137`       |

| 测试网           | 链 ID             |
| ---------------- | ----------------- |
| Sepolia          | `eip155:11155111` |
| Arbitrum Sepolia | `eip155:421614`   |
| Base Sepolia     | `eip155:84532`    |
| Optimism Sepolia | `eip155:11155420` |

### 图像

`fc:frame:image` 标签中的图像需遵循以下规则：

- 图像大小必须 < 10 MB。
- 图像类型必须是 jpg、png 或 gif。
- 图像源必须是带有内容头部的外部资源或数据 URI。

客户端可能调整较大图像尺寸或裁剪不符合其宽高比的图像。不允许使用 SVG 图像，因为它们可能包含脚本，客户端需额外工作来清理它们。

帧服务器可使用缓存头部刷新图像，提供更动态的初始帧体验：

- 帧服务器可在 HTTP `Cache-Control` 头部使用 `max-age` 指令确保初始帧图像自动刷新。较低的 `max-age` 确保图像无需用户交互即可定期更新。
- 应用开发者应尊重原始帧图像设置的缓存头部，其图像代理实现不应干扰持续时间。

## 在信息流中显示帧

Farcaster 应用负责向用户渲染帧，并代表用户将交互代理回帧服务器。

### 解析帧

当 Cast 中嵌入 URL 时：

1. 应用必须抓取头部检查 URL 是否为帧。
2. 如果帧标签有效，应用必须渲染该帧。
3. 如果帧标签无效或缺失，应用必须回退到 OpenGraph 标签。
4. 如果 OG 标签也缺失，应用必须渲染占位错误消息。

### 渲染帧

应用可在向查看者展示 Cast 时随时渲染帧。以下规则适用于帧的渲染：

1. 按钮必须按升序索引顺序显示在图像下方。
2. 如果空间有限，按钮可多行显示。
3. 文本输入必须显示在按钮上方和图像下方。
4. 文本输入标签必须显示在文本输入上方或内部。
5. 应用必须尊重 `fc:frame:image:aspect_ratio` 属性设置的宽高比。

如果按钮是 `post_redirect` 或 `link` 动作：

1. 必须用重定向符号视觉标记。
2. 用户离开应用前往不受信任的站点时应收到警告。

如果按钮是 `mint` 动作：

1. 必须验证 `target` 属性中存在有效的 [CAIP-10](https://github.com/ChainAgnostic/CAIPs/blob/main/CAIPs/caip-10.md) URL。
2. 如果所有属性有效，必须将项目显示为 NFT。

如果按钮是 `tx` 动作：

1. 必须视觉指示 `tx` 按钮将请求钱包交易。
2. 必须显示帧提供的按钮标签。

### 处理点击

如果点击的按钮是 `post` 或 `post_redirect`，应用必须：

1. 构建帧签名包。
2. 如果存在，向 `fc:frame:button:$idx:target` 发送 POST 请求。
3. 如果目标不存在，向 `fc:frame:post_url` 发送 POST 请求。
4. 如果目标和动作都不存在，向帧的嵌入 URL 发送 POST 请求。
5. 等待帧服务器响应至少 5 秒。

如果点击的按钮是 `mint`，应用应：

1. 允许用户铸造 NFT 或打开允许此功能的外部页面。

### 处理响应

应用在提交 POST 请求后会收到帧服务器的响应。以下规则适用于这些响应的处理：

1. 如果按钮动作是 `post`，将所有非 200 响应视为错误。
2. 如果按钮动作是 `post_redirect`，将所有非 30X 响应视为错误。
3. 处理 30X 响应时，应用必须将用户重定向到 URL 位置值。
4. 处理 30X 响应时，应用必须确保 URL 以 `http://` 或 `https://` 开头。
5. 处理 30X 响应时，在引导用户前往不受信任的站点前警告用户。
6. 处理应用级错误响应时，向最终用户显示 `message`。

## 保护帧安全

帧开发者和实现帧的应用都必须解决重要的安全问题。

### 帧开发者

1. 清理通过文本输入从用户接收的所有输入。
2. 验证帧签名包的签名。
3. 验证帧签名包中的原始 URL。
4. 仅从受信任的来源加载交易调用数据。

### 应用开发者

1. 代理图像请求以防止帧服务器跟踪用户。
2. 清理重定向 URL，确保它们以 `http://` 或 `https://` 开头。
3. 仅接受数据 URI 如果是图像。
4. 避免渲染 SVG，因为它们可能包含可执行代码。

应用应考虑以下机制保护用户免受恶意交易侵害：

1. 交易模拟。
2. 域名允许列表和禁止列表以阻止已知攻击者。
3. 社交图谱分析检测潜在不良或不受信任的行为者。
4. 教育用户交易潜在危险并使用余额有限的钱包。

## 数据结构

### 帧签名

帧签名证明用户点击了帧按钮。由 Farcaster 应用创建，用户账户签名并发送到帧服务器。

当点击帧按钮时，Farcaster 应用必须生成 `FrameAction` protobuf。FrameAction 是一种新的 [Farcaster 消息](https://github.com/farcasterxyz/protocol/blob/main/docs/SPECIFICATION.md#2-message-specifications)类型。像所有 FC 消息一样，必须使用属于用户的活跃 Ed25519 账户密钥（即签名者）签名。

```proto
message FrameActionBody {
  bytes frame_url = 1;      // 帧应用的 URL
  bytes button_index = 2;   // 点击的按钮索引
  CastId cast_id = 3;       // 包含帧 URL 的 Cast
  bytes input_text = 4;     // 用户输入的文本（如有）
  bytes state = 5;          // 序列化的帧状态值
  bytes transaction_id = 6; // 交易 ID
  bytes address = 7;        // 用户连接的地址
}

// MessageType 和 MessageData
```
