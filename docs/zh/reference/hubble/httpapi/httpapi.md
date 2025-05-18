# HTTP API

Hubble 默认在 2281 端口提供 HTTP API 服务。

## 使用 API

该 API 可通过常规 HTTP 请求从任何编程语言或浏览器调用。

**在浏览器中查看 API 响应**

直接在浏览器中打开 URL

```url
http://127.0.0.1:2281/v1/castsByFid?fid=2
```

**使用 curl 调用 API**

```bash
curl http://127.0.0.1:2281/v1/castsByFid?fid=2
```

**通过 Javascript 调用 API（使用 axios 库）**

```Javascript
import axios from "axios";

const fid = 2;
const server = "http://127.0.0.1:2281";

try {
    const response = await axios.get(`${server}/v1/castsByFid?fid=${fid}`);

    console.log(`API 返回 HTTP 状态码 ${response.status}`);
    console.log(`第一条 Cast 的文本内容是 ${response.messages[0].data.castAddBody.text}`);
} catch (e) {
    // 错误处理
    console.log(response);
}
```

**OpenAPI 规范**

Hubble REST API 提供了 OpenAPI 规范，可[在此处](https://redocly.github.io/redoc/?url=https://raw.githubusercontent.com/farcasterxyz/hub-monorepo/main/packages/hub-nodejs/spec.yaml)查看。

## 响应编码

API 响应以 `application/json` 格式编码，可按常规 JSON 对象解析。

1. 哈希值、ETH 地址、密钥等均以 `0x` 开头的十六进制字符串编码
2. 签名和其他二进制字段以 base64 编码
3. 常量编码为其字符串类型。例如，`hashScheme` 编码为 `HASH_SCHEME_BLAKE3`，对应 protobuf 模式中的 `HASH_SCHEME_BLAKE3 = 1`

## 时间戳

消息中的时间戳表示自 Farcaster 纪元（2021 年 1 月 1 日 00:00:00 UTC）以来的秒数。

## 分页

大多数端点支持分页以获取大量响应。

**分页查询参数**

| 参数      | 描述                                                               | 示例                                |
| --------- | ------------------------------------------------------------------ | ----------------------------------- |
| pageSize  | 单次响应返回的最大消息数量                                         | `pageSize=100`                      |
| reverse   | 反转排序顺序，优先返回最新消息                                     | `reverse=1`                         |
| pageToken | 前一查询返回的分页令牌，用于获取下一页。若该参数为空，则获取第一页 | `pageToken=AuzO1V0Dta...fStlynsGWT` |

若 `nextPageToken` 返回为空，则表示没有更多页面可返回。

分页查询参数可与端点支持的其他查询参数组合使用。例如 `/v1/casts?fid=2&pageSize=3`。

**示例**

获取 FID `2` 的所有 Casts，每页最多获取 3 条

```bash
# 获取第一页
http://127.0.0.1:2281/v1/castsByFid?fid=2&pageSize=3

# 获取下一页。pageToken 来自前一响应(`response.nextPageToken`)
http://127.0.0.1:2281/v1/castsByFid?fid=2&pageSize=3&pageToken=AuzO1V0DtaItCwwa10X6YsfStlynsGWT
```

**Javascript 示例**

```Javascript
import axios from "axios";

const fid = 2;
const server = "http://127.0.0.1:2281";

let nextPageToken = "";
do {
    const response = await axios.get(`${server}/v1/castsByFid?fid=${fid}&pageSize=100&nextPageToken=${nextPageToken}`);
    // 处理响应...
    nextPageToken = response.nextPageToken;
} while (nextPageToken !== "")
```

## 错误处理

若 API 出错，HTTP 状态码将设为 `400` 或 `500`（视情况而定）。响应为包含 `detail`、`errCode` 和 `metadata` 字段的 JSON 对象，用于识别和调试错误。

**示例**

```bash
$ curl "http://127.0.0.1:2281/v1/castById?fid=invalid"
{
  "errCode": "bad_request.validation_failure",
  "presentable": false,
  "name": "HubError",
  "code": 3,
  "details": "fid 必须为整数",
  "metadata": {
    "errcode": [
      "bad_request.validation_failure",
    ],
  },
}
```

## CORS

运行 Hubble 实例时，可通过 `--http-cors-origin` 参数设置自定义 CORS 头。设为 `*` 将允许来自任何源的请求。

## 限制

当前 HTTP API 不支持 gRPC 版本中可用的任何同步 API。当 Hub 之间相互同步时，将使用 gRPC API 而非 HTTP API。
