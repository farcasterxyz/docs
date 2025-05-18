# 概述

Farcaster 合约部署在以太坊二层网络 Optimism 上，包含三个核心合约：
ID 注册表（Id Registry）、密钥注册表（Key Registry）和存储注册表（Storage Registry）。对 ID 和密钥注册表的写入权限通过网关合约（Gateway）进行管控。此外还提供了 Bundler 辅助合约，支持在单笔交易中完成 fid 注册、密钥添加和存储租赁操作。

![合约架构图](/assets/contracts.png)

## ID 注册表

ID 注册表合约用于管理 Farcaster ID，将 fid 映射到对应的以太坊地址。所有者还可设置"恢复地址"，当注册地址访问权限丢失时可通过该地址恢复 fid。首次注册 fid 必须通过 [ID 网关](#idgateway) 完成。

## 密钥注册表

密钥注册表将 Farcaster ID 与零个或多个 ed2559 公钥关联。只有通过此处注册密钥签名的消息才会被 hub 节点视为有效。fid 所有者可撤销已注册密钥，但被撤销的密钥无法再次添加到该 fid。同一密钥可注册至多个 fid。添加密钥必须通过 [密钥网关](#keygateway) 完成。

## 存储注册表

存储注册表允许 fid 在 Farcaster 网络上租赁一个或多个存储"单元"。当前存储价格为每单元 7 美元/年，需使用 ETH 支付费用。该合约通过 ETH 价格预言机获取当前 ETH 计价金额，并提供查询接口。超额支付部分将退还调用方。

## ID 网关

ID 网关处理首次注册 fid 所需的附加逻辑。为防止垃圾注册，网关同时要求租赁 1 个存储单元。

## 密钥网关

类似地，密钥网关作为密钥注册表的接入点，所有密钥添加操作必须通过该网关完成。

## 聚合器

聚合器（Bundler）通过单次函数调用即可完成 fid 注册、密钥添加和存储租赁，大幅简化首次注册流程。

## 源代码

合约源代码仓库详见[此处](https://github.com/farcasterxyz/contracts)，更底层的技术文档可参考[此文档](https://github.com/farcasterxyz/contracts/blob/main/docs/docs.md)。
