# Counting signups by day

::: info Pre-requisites

- Read access to a replicator database

:::

To count the number of signups by day, we can use the `chain_events` table to query the number
of [`ID_REGISTER`](/reference/hubble/datatypes/events.html#onchaineventtype) events
and group by day.

```sql
SELECT DATE_TRUNC('day', created_at) AS day, COUNT(*) AS count
FROM chain_events
WHERE type = 3 -- ID_REGISTER (see event types reference page)
GROUP BY day
ORDER BY day desc;
```

For more information on the schema, see the [replicator schema](/reference/replicator/schema).