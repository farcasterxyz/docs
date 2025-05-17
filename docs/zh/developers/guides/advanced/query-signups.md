# 按日统计注册量

::: info 前提条件

- 对 replicator 数据库的读取权限

:::

要按日统计注册数量，我们可以使用 `chain_events` 表查询 [`ID_REGISTER`](/reference/hubble/datatypes/events#onchaineventtype) 事件的数量，并按日分组。

```sql
SELECT DATE_TRUNC('day', created_at) AS day, COUNT(*) AS count
FROM chain_events
WHERE type = 3 -- ID_REGISTER (参见事件类型参考页面)
GROUP BY day
ORDER BY day desc;
```

有关数据库模式的更多信息，请参阅 [replicator 模式](/reference/replicator/schema)。
