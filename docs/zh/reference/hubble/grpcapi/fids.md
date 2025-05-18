# Fids API

用于获取所有 fids 的列表

## API

| 方法名称 | 请求类型    | 响应类型     | 描述                     |
| -------- | ----------- | ------------ | ------------------------ |
| GetFids  | FidsRequest | FidsResponse | 返回所有 fids 的分页列表 |

## FidsRequest

| 字段       | 类型              | 标签     | 描述         |
| ---------- | ----------------- | -------- | ------------ |
| page_size  | [uint32](#uint32) | optional | 每页大小     |
| page_token | [bytes](#bytes)   | optional | 分页令牌     |
| reverse    | [bool](#bool)     | optional | 是否反向排序 |

## Fids Response

| 字段            | 类型            | 标签     | 描述       |
| --------------- | --------------- | -------- | ---------- |
| fids            | [uint64](#)     | repeated | fid 数组   |
| next_page_token | [bytes](#bytes) | optional | 下一页令牌 |
