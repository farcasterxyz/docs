# 通过用户名查找账户

如果您知道用户的名称并希望查找其账户，需要根据用户名的类型选择以下方法之一。

## 链下 ENS 名称 (Fnames)

如果用户拥有类似 `@alice` 的链下 ENS 名称，您需要调用 [Fname 注册表](/zh/reference/fname/api#get-current-fname-or-fid)。

```bash
curl https://fnames.farcaster.xyz/transfers/current?name=farcaster | jq
{
  "transfers": [
    {
      "id": 1,
      "timestamp": 1628882891,
      "username": "farcaster",
      "owner": "0x8773442740c17c9d0f0b87022c722f9a136206ed",
      "from": 0,
      "to": 1,
      "user_signature": "0xa6fdd2a69deab5633636f32a30a54b21b27dff123e6481532746eadca18cd84048488a98ca4aaf90f4d29b7e181c4540b360ba0721b928e50ffcd495734ef8471b",
      "server_signature": "0xb7181760f14eda0028e0b647ff15f45235526ced3b4ae07fcce06141b73d32960d3253776e62f761363fb8137087192047763f4af838950a96f3885f3c2289c41b"
    }
  ]
}
```

如果名称已注册，此接口将返回与该名称关联的最新转移记录。请注意，Fname 的创建是从零地址到托管地址的转移。`to` 字段表示当前拥有该名称的 FID。

## 链上 ENS 名称

如果用户拥有类似 `@alice.eth` 的链上 ENS 名称，最简单的方法是使用 Hubble [复制器](../apps/replicate.md)。它会索引链上和链下数据，让您轻松找到所需信息。

设置完成后，在复制器数据库中查询 `fnames` 表以获取账户的 FID：

```sql
SELECT username, fid
FROM fnames
WHERE username = 'farcaster.eth'
order by updated_at desc
limit 1;
```

有关复制器表结构的更多详情，请参阅[此处](/zh/reference/replicator/schema#fnames)。
