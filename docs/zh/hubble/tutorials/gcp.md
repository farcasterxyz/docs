# 在 GCP 上运行 Hubble

## 简介

这是一份在 GCP 上搭建 Hubble 的逐步指南。通常整个流程可在 30 分钟内完成。

### 前提条件

- [GCP](https://console.cloud.google.com/) 账户
- [Alchemy](https://www.alchemy.com/) 账户

### 费用说明

- 本教程推荐的 GCP 配置每月费用约为 70 美元
- Alchemy 使用量应保持在免费额度内

## 创建 GCP 虚拟机

打开 **Google Cloud Shell** 并执行以下命令：

<figure><img src="/assets/google_cloud_shell.png" alt=""><figcaption><p>点击 Google Cloud Shell 图标</p></figcaption></figure>

在 Cloud Shell 中执行以下命令：

<pre><code><strong>mkdir farcaster-hub
</strong>cd farcaster-hub
nano main.tf
</code></pre>

将以下内容粘贴到 main.tf 文件中\
请将 "$YOUR_PROJECT_ID" 替换为您的个人项目 ID。

<figure><img src="/assets/gcp_project_id.png" /></figure>

这是将要创建的 GCP 虚拟机配置：

```
provider "google" {
  project = "$YOUR_PROJECT_ID"
  region  = "us-central1"
}

resource "google_compute_instance" "farcaster-hub-vm" {
  name         = "farcaster-hub-vm"
  machine_type = "e2-standard-4"  # 4 个 vCPU，16 GB 内存
  zone         = "us-central1-a"  # 指定可用区


  boot_disk {
    initialize_params {
      image = "ubuntu-2004-focal-v20231213"  # Ubuntu 20.04 LTS 镜像
      size = 160  # 160 GB 磁盘大小
    }
  }

  network_interface {
    network = "default"
    access_config {
      // 这将为实例分配公共 IP 地址
    }
  }

  tags = ["allow-farcaster-p2p-ports"]  # 用于防火墙规则

  metadata = {
    # 如需可在此添加额外元数据
  }
}

resource "google_compute_firewall" "farcaster-p2p-ports" {
  name    = "farcaster-p2p-ports"
  network = "default"

  # 允许 2282-2285 端口的入站流量
  allow {
    protocol = "tcp"
    ports    = ["2282-2285"]
  }

  source_ranges = ["0.0.0.0/0"]
}
```

执行以下命令：

```
terraform init # 在 farcaster-hub 文件夹中初始化 terraform
```

执行以下命令：

```
terraform plan # 将模拟您的 terraform 配置并检查是否正确
```

示例输出：

<figure><img src="/assets/gcp_terraform_plan.png" alt=""><figcaption><p>terraform plan 示例输出</p></figcaption></figure>

启用 Compute Engine API

<figure><img src="/assets/gcp_compute_engine_api.png" /></figure>

现在执行以下命令：

```bash
terraform apply
```

<figure><img src="/assets/gcp_terraform_apply.png" alt=""><figcaption><p>Terraform apply 示例输出</p></figcaption></figure>

虚拟机创建需要几分钟时间。现在可以享受您的 :coffee: 了

<figure><img src="/assets/gcp_vm_overview.png" alt=""><figcaption></figcaption></figure>

现在您可以通过点击 **SSH** 按钮连接到虚拟机。

\
按照 [https://docs.docker.com/engine/install/ubuntu/](https://docs.docker.com/engine/install/ubuntu/) 说明安装 Docker

然后按照 [安装页面](../install.md) 的步骤操作\
\
当您看到以下内容时，表示 Hubble 已成功运行 :white_check_mark:

<figure><img src="/assets/gcp_hubble_running.png" alt=""><figcaption></figcaption></figure>
