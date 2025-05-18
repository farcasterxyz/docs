---
title: 使用 Farcaster 登录
---

# 简介

使用 Farcaster 登录（SIWF）是一种让用户通过其 Farcaster 身份登录任何应用的方式。

当用户通过 Farcaster 登录您的应用程序时，您将能够利用其公开的社交数据（如社交图谱和个人资料信息）来提供简化的注册流程和社交驱动的功能。

### 工作原理

1. 向用户展示“使用 Farcaster 登录”按钮。
2. 等待用户点击按钮，扫描二维码并在 Warpcast 中批准请求。
3. 接收并验证来自 Warpcast 的签名。
4. 显示已登录用户的头像和用户名。

![使用 Farcaster 登录演示](./siwf_demo.avifs)

## 后续步骤

- 立即通过 [AuthKit](/zh/auth-kit/) 将 SIWF 集成到您的应用中。
- 阅读底层标准 [FIP-11: 使用 Farcaster 登录](https://github.com/farcasterxyz/protocol/discussions/110)。
