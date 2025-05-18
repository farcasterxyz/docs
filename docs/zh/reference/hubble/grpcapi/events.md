# 事件 API

用于订阅来自 Farcaster Hub 的实时事件更新

## API

| 方法名称  | 请求类型         | 响应类型        | 描述                       |
| --------- | ---------------- | --------------- | -------------------------- |
| Subscribe | SubscribeRequest | stream HubEvent | 当新事件发生时进行流式传输 |
| GetEvent  | EventRequest     | HubEvent        | 当新事件发生时进行流式传输 |

## SubscribeRequest

| 字段        | 类型           | 标签     | 描述                         |
| ----------- | -------------- | -------- | ---------------------------- |
| event_types | [EventType](#) | repeated | 需要订阅的事件类型           |
| from_id     | uint64         | optional | 开始流式传输的事件 ID 起始点 |

## EventRequest

| 字段 | 类型              | 标签 | 描述 |
| ---- | ----------------- | ---- | ---- |
| id   | [uint64](#uint64) |      |      |
