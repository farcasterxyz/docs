# 事件 API

事件 API 返回合并到 Hub 的事件，可用于监听 Hub 活动。

## eventById

通过事件 ID 获取单个事件

**查询参数**
| 参数 | 描述 | 示例 |
| --------- | ----------- | ------- |
| event_id | 事件的 Hub ID | `event_id=350909155450880` |

**示例**

```bash
curl http://127.0.0.1:2281/v1/eventById?id=350909155450880

```

**响应**

```json
{
  "type": "HUB_EVENT_TYPE_MERGE_USERNAME_PROOF",
  "id": 350909155450880,
  "mergeUsernameProofBody": {
    "usernameProof": {
      "timestamp": 1695049760,
      "name": "nftonyp",
      "owner": "0x23b3c29900762a70def5dc8890e09dc9019eb553",
      "signature": "xp41PgeO...hJpNshw=",
      "fid": 20114,
      "type": "USERNAME_TYPE_FNAME"
    }
  }
}
```

## events

获取 Hub 事件的分页数据

**查询参数**
| 参数 | 描述 | 示例 |
| --------- | ----------- | ------- |
| from_event_id | 可选参数，指定从哪个 Hub ID 开始获取事件。API 会返回 `nextPageEventId` 字段，可用于遍历所有 Hub 事件。设为 `0` 表示从第一个事件开始获取 | `from_event_id=350909155450880` |

**注意**
Hub 会清理超过 3 天的事件，因此无法通过此 API 获取所有历史事件

**示例**

```bash
curl http://127.0.0.1:2281/v1/events?from_event_id=350909155450880

```

**响应**

```json
{
  "nextPageEventId": 350909170294785,
  "events": [
    {
      "type": "HUB_EVENT_TYPE_MERGE_USERNAME_PROOF",
      "id": 350909155450880,
      "mergeUsernameProofBody": {
        "usernameProof": {
          "timestamp": 1695049760,
          "name": "nftonyp",
          "owner": "0x23b3c29900762a70def5dc8890e09dc9019eb553",
          "signature": "xp41PgeOz...9Jw5vT/eLnGphJpNshw=",
          "fid": 20114,
          "type": "USERNAME_TYPE_FNAME"
        }
      }
    },
    ...
  ]
}
```
