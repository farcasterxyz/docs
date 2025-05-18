---
title: 帧规范
---

# 帧规范

帧（Frame）是用于在 Farcaster 上创建交互式认证体验的标准，可嵌入任何 Farcaster 客户端。

帧是一组位于 HTML 页面 `<head>` 中的 `<meta>` 标签。如果页面包含所有必需的帧属性，Farcaster 应用会将该页面渲染为帧。帧的 `<meta>` 标签扩展了 [OpenGraph 协议](https://ogp.me/)。

帧可以相互链接，从而在 cast 中创建嵌入式动态应用。

## 帧应用的生命周期

帧应用始于初始帧，该帧会被应用缓存并展示给用户。帧必须包含图像，可以包含按钮，点击按钮会加载其他帧或将用户重定向到外部网站。

![帧应用](/assets/frame_app.png)

### 初始帧

帧是位于网络服务器 URL（如 foo.com/app）上的 HTML 网页应用。我们将此网络服务器称为“帧服务器”。

帧服务器：

- 必须在 HTML `<head>` 部分返回有效的帧。
- 应返回有效的 HTML `<body>`，以防用户在浏览器中点击进入帧。
- 不应在初始帧中包含动态内容，因为它会被 Farcaster 客户端缓存。
- 不应包含 `fc:frame:state` 标签。

### 响应帧

当用户点击帧上的按钮时，应用会向帧服务器发送带有[帧签名](#frame-signature)的 POST 请求，以证明请求来自用户。服务器必须返回一个新帧发送给用户。

当帧服务器收到 POST 请求时：

- 必须在 5 秒内响应。
- 对于 `post` 按钮点击，必须返回 200 OK 和另一个帧以表示成功。
- 对于 `post_redirect` 按钮点击，必须返回 302 OK 和 Location 标头以表示成功。
- 可以返回 4XX 状态码、`content-type: application/json` 标头和包含 `message` 属性（不超过 90 个字符）的 JSON 正文以表示应用级错误。
- 提供的 Location 标头必须包含以 `http://` 或 `https://` 开头的 URL。

### 渲染帧

当用户创建 cast 并在其中嵌入帧 URL 时，帧进入 Farcaster。支持帧的应用必须：

- 检查所有 cast 嵌入 URL 是否包含有效帧。
- 如果帧有效，则在查看 cast 时渲染该帧。
- 如果帧格式错误，则回退到将其视为 OpenGraph 嵌入。
- 遵循帧的[安全模型](#securing-frames)。

## 构建帧

帧必须包含必需属性，也可以包含可选属性。可以使用 Warpcast 提供的[帧验证工具](https://warpcast.com/~/developers/frames-legacy)验证帧。

### 属性

帧属性是具有属性名和内容值的 meta 标签。属性名始终以 `fc:frame` 为前缀。

```html
<!-- 声明帧和支持版本的示例 -->

<meta property="fc:frame" content="vNext" />
```

### 必需属性

| 键               | 描述                                                                                                                      |
| ---------------- | ------------------------------------------------------------------------------------------------------------------------- |
| `fc:frame`       | 有效的帧版本字符串。字符串必须是发布日期（如 2020-01-01）或 vNext。应用必须忽略不理解的版本。目前唯一有效的版本是 vNext。 |
| `fc:frame:image` | 图像，宽高比应为 1.91:1 或 1:1                                                                                            |
| `og:image`       | 图像，宽高比应为 1.91:1。用于不支持帧的客户端回退。                                                                       |

### 可选属性

| 键                              | 描述                                                                                                                                                                                     |
| ------------------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `fc:frame:post_url`             | 不超过 256 字节的字符串，包含发送签名数据包的有效 URL。                                                                                                                                  |
| `fc:frame:button:$idx`          | 不超过 256 字节的字符串，表示位置 $idx 处按钮的标签。页面可以包含 0 到 4 个按钮。如果存在多个按钮，索引值必须从 1 开始按顺序排列（如 1、2、3）。如果序列不连续（如 1、2、4），则帧无效。 |
| `fc:frame:button:$idx:action`   | 必须是 `post`、`post_redirect`、`link`、`mint` 或 `tx`。默认为 `post`。详见[按钮操作](#button-actions)。                                                                                 |
| `fc:frame:button:$idx:target`   | 不超过 256 字节的字符串，决定操作的目标。                                                                                                                                                |
| `fc:frame:button:$idx:post_url` | 不超过 256 字节的字符串，定义按钮特定的 URL 以发送签名数据包。如果设置，会覆盖 `fc:frame:post_url`。                                                                                     |
| `fc:frame:input:text`           | 添加此属性启用文本字段。内容是不超过 32 字节的标签，显示给用户（如“输入消息”）。                                                                                                         |
| `fc:frame:image:aspect_ratio`   | 必须是 `1.91:1` 或 `1:1`。默认为 `1.91:1`                                                                                                                                                |
| `fc:frame:state`                | 包含传递给帧服务器的序列化状态（如 JSON）的字符串。最多 4096 字节。                                                                                                                      |

## 按钮操作

### `post`

```html
<meta name="fc:frame:post_url" content="https://frame.example.com/start" />
<meta name="fc:frame:button:1" content="Start" />
```

`post` 操作向帧或按钮的 `post_url` 发送 HTTP POST 请求。这是默认按钮类型。

帧服务器在 POST 正文中接收签名数据包，其中包含点击的按钮、文本输入和 cast 上下文信息。帧服务器必须返回 200 OK 和另一个帧。

### `post_redirect`

```html
<meta name="fc:frame:post_url" content="https://frame.example.com/redirect" />
<meta name="fc:frame:button:1" content="Redirect" />
<meta name="fc:frame:button:1:action" content="post_redirect" />
```

`post_redirect` 操作向帧或按钮的 `post_url` 发送 HTTP POST 请求。可以使用此操作基于帧状态或用户输入重定向到 URL。

帧服务器在 POST 正文中接收签名数据包。帧服务器必须返回 302 Found 和以 `http://` 或 `https://` 开头的 Location 标头。

### `link`

```html
<meta name="fc:frame:button:1" content="Farcaster Docs" />
<meta name="fc:frame:button:1:action" content="link" />
<meta name="fc:frame:button:1:target" content="https://docs.farcaster.xyz" />
```

`link` 操作将用户重定向到外部 URL。可以使用此操作重定向到 URL，而无需向帧服务器处理 POST 请求。

客户端不会为 `link` 操作向帧服务器发送请求，而是直接将用户重定向到 `target` URL。

### `mint`

```html
<meta name="fc:frame:button:1" content="Mint" />
<meta name="fc:frame:button:1:action" content="mint" />
<meta
  name="fc:frame:button:1:target"
  content="eip155:8453:0xf5a3b6dee033ae5025e4332695931cadeb7f4d2b:1"
/>
```

`mint` 操作允许用户铸造 NFT。支持中继或发起链上交易的客户端可以通过中继交易或与用户钱包交互来增强铸造按钮功能。不支持的客户端会回退到链接到外部 URL。

`target` 属性必须是有效的 `CAIP-10` 地址，加上可选的代币 ID。

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

`tx` 操作允许帧请求用户在其连接的钱包中执行操作。与其他操作类型不同，`tx` 操作包含多个步骤。

首先，客户端向 `target` URL 发送 POST 请求以获取钱包操作数据。帧服务器在 POST 正文中接收签名数据包，包括连接的钱包地址。帧服务器必须返回 200 OK 和描述钱包操作的 JSON 响应：

```json
{
  method: "eth_sendTransaction",
  chainId: "eip155:10",
  params: {
    abi: [...], // 函数选择器和任何错误的 JSON ABI
    to: "0x00000000fcCe7f938e7aE6D3c335bD6a1a7c593D",
    data: "0x783a112b0000000000000000000000000000000000000000000000000000000000000e250000000000000000000000000000000000000000000000000000000000000001",
    value: "984316556204476",
  },
}
```

客户端使用此数据请求用户钱包中的操作。如果用户完成操作，客户端会向 `post_url` 发送 POST 请求，其中签名数据包包含 `transaction_id` 中的交易或签名哈希以及 `address` 中使用的地址。帧服务器必须返回 200 OK 和另一个帧。帧服务器可以监控交易哈希以确定交易是否成功、回滚或超时。

#### 钱包操作响应类型

钱包操作响应必须是以下之一：

##### EthSendTransactionAction

- `chainId`：标识交易网络的 CAIP-2 链 ID（如以太坊主网）。
- `method`：必须是 `"eth_sendTransaction"`。
- `attribution`：可选。返回 `false` 以省略[调用数据归属后缀](https://www.notion.so/Frame-Transactions-Public-9d9f9f4f527249519a41bd8d16165f73?pvs=21)。如果此值为 `undefined` 或 `true`，客户端会附加归属后缀。
- `params`：
  - `to`：交易目标地址。
  - `abi`：JSON ABI，**必须**包含编码的函数类型，**应**包含潜在错误类型。可以为空。
  - `value`：以 wei 为单位的交易发送的以太币值。可选。
  - `data`：交易调用数据。可选。

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

- `chainId`：标识交易网络的 CAIP-2 链 ID（如以太坊主网）。
- `method`：必须是 `"eth_signTypedData_v4"`。
- `params`：
  - `domain`：类型化域。
  - `types`：类型化数据的类型定义。
  - `primaryType`：从类型中提取并在值中使用的主要类型。
  - `message`：类型化消息。

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
- 图像源必须是带有内容标头的外部资源或数据 URI。

客户端可能会调整较大图像的尺寸或裁剪不符合其宽高比的图像。不允许使用 SVG 图像，因为它们可能包含脚本，客户端需要额外工作来清理它们。

帧服务器可以使用缓存标头刷新图像并提供更动态的初始帧体验：

- 帧服务器可以在 HTTP `Cache-Control` 标头中使用 `max-age` 指令确保初始帧中的图像自动刷新。较低的 `max-age` 确保图像无需用户交互即可定期更新。
- 应用开发者应尊重原始帧图像设置的缓存标头，其图像代理实现不应干扰持续时间。

## 在信息流中显示帧

Farcaster 应用负责向用户渲染帧，并代表用户将其交互代理回帧服务器。

### 解析帧

当 cast 中嵌入 URL 时：

1. 应用必须抓取标头以检查 URL 是否为帧。
2. 如果帧标签有效，应用必须渲染该帧。
3. 如果帧标签无效或不存在，应用必须回退到 OpenGraph 标签。
4. 如果 OpenGraph 标签也不存在，应用必须渲染占位错误消息。

### 渲染帧

应用可以在向查看者显示 cast 时随时渲染帧。以下规则适用于帧的渲染：

1. 按钮必须按升序索引顺序显示在图像下方。
2. 如果空间受限，按钮可以多行显示。
3. 文本输入必须显示在按钮上方和图像下方。
4. 文本输入标签必须显示在文本输入上方或内部。
5. 应用必须尊重 `fc:frame:image:aspect_ratio` 属性中设置的宽高比。

如果按钮是 `post_redirect` 或 `link` 操作：

1. 必须用重定向符号进行视觉标记。
2. 用户离开应用前往不受信任的站点时应收到警告。

如果按钮是 `mint` 操作：

1. 必须验证 `target` 属性中是否存在有效的 [CAIP-10](https://github.com/ChainAgnostic/CAIPs/blob/main/CAIPs/caip-10.md) URL。
2. 如果所有属性有效，必须将项目显示为 NFT。

如果按钮是 `tx` 操作：

1. 必须视觉指示 `tx` 按钮将请求钱包交易。
2. 必须显示帧提供的按钮标签。

### 处理点击

如果点击的按钮是 `post` 或 `post_redirect`，应用必须：

1. 构建帧签名数据包。
2. 如果存在 `fc:frame:button:$idx:target`，则向该目标 POST 数据包。
3. 如果目标不存在，则向 `fc:frame:post_url` POST 数据包。
4. 如果目标和操作都不存在，则向帧的嵌入 URL POST 数据包。
5. 至少等待 5 秒以获取帧服务器的响应。

如果点击的按钮是 `mint`，应用应：

1. 允许用户铸造 NFT 或打开允许此功能的外部页面。

### 处理响应

应用在提交 POST 请求后会收到帧服务器的响应。以下规则适用于这些响应的处理：

1. 如果按钮操作是 `post`，将所有非 200 响应视为错误。
2. 如果按钮操作是 `post_redirect`，将所有非 30X 响应视为错误。
3. 处理 30X 响应时，应用必须将用户重定向到 URL 位置值。
4. 处理 30X 响应时，应用必须确保 URL 以 `http://` 或 `https://` 开头。
5. 处理 30X 响应时，在将用户定向到不受信任的站点前发出警告。
6. 处理应用级错误响应时，向最终用户显示 `message`。

## 保护帧安全

帧开发者和实现帧的应用都必须解决重要的安全问题。

### 帧开发者

1. 清理从用户通过文本输入接收的所有输入。
2. 验证帧签名数据包的签名。
3. 验证帧签名数据包中的原始 URL。
4. 仅从受信任的来源加载交易调用数据。

### 应用开发者

1. 代理图像请求以防止帧服务器跟踪用户。
2. 清理重定向 URL 以确保它们以 `http://` 或 `https://` 开头。
3. 仅接受数据 URI 如果是图像。
4. 避免渲染 SVG，因为它们可能包含可执行代码。

应用应考虑以下机制保护用户免受恶意交易侵害：

1. 交易模拟。
2. 域名允许列表和禁止列表以阻止已知攻击者。
3. 社交图谱分析以检测潜在的不良或不受信任的参与者。
4. 教育用户交易的危险性并使用余额有限的钱包。

## 数据结构

### 帧签名

帧签名证明用户点击了帧按钮。它由 Farcaster 应用创建，由用户账户签名并发送到帧服务器。

当点击帧按钮时，Farcaster 应用必须生成 `FrameAction` protobuf。FrameAction 是一种新型的 [Farcaster 消息](https://github.com/farcasterxyz/protocol/blob/main/docs/SPECIFICATION.md#2-message-specifications)。与所有 FC 消息一样，它必须使用属于用户的活跃 Ed25519 账户密钥（即签名者）签名。

```proto
message FrameActionBody {
  bytes frame_url = 1;      // 帧应用的 URL
  bytes button_index = 2;   // 点击的按钮索引
  CastId cast_id = 3;       // 包含帧 URL 的 cast
```
