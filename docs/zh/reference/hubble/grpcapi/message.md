# 消息 API

用于验证并向 Farcaster Hub 发送消息。有效消息会被接收并传播至网络中的其他 Hub。

## API

| 方法名称        | 请求类型 | 响应类型           | 描述                                      |
| --------------- | -------- | ------------------ | ----------------------------------------- |
| SubmitMessage   | Message  | Message            | 向 Hub 提交消息                           |
| ValidateMessage | Message  | ValidationResponse | 在 Hub 上验证消息（不执行合并和传播操作） |

## 验证响应

| 字段    | 类型    | 标签 | 描述                           |
| ------- | ------- | ---- | ------------------------------ |
| valid   | boolean |      | 消息是否有效                   |
| message | Message |      | 被验证的消息（与请求内容相同） |
