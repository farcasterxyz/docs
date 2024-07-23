# Set up Hubble on EC2 [Public]

## Launch EC2 Instance

*You should expect to pay roughly $100 / month for an EC2 instance that can run Hubble.*

1. In AWS, go to EC2 > **Instances** > **Launch Instances**

<figure><img src="../assets/aws_instances.png" /></figure>

2. Give it a name and select ***Ubuntu Server 22.04 LTS (HVM), SSD Volume Type*** and ***64-bit (x86)***

<figure><img src="../assets/aws_ubuntu_server.png" /></figure>

3. Choose **m5.xlarge** for instance type (~$70/mo)

<figure><img src="../assets/aws_m5_xlarge.png" /></figure>

4. In **Key pair (login)**, select **Create a new key pair** , then select RSA and *.pem* format, and save it

<figure><img src="../assets/aws_key_pair.png" /></figure>

5. In **Network settings**, select **Allow SSH traffic** from **Anywhere**

<figure><img src="../assets/aws_allow_ssh.png" /></figure>

6. In **Configure storage**, select **20 GiB** of gp3 storage ($30/mo)

<figure><img src="../assets/aws_storage.png" /></figure>

7. Click **Launch Instance** on the righthand side menu

<figure><img src="../assets/aws_launch_instance.png" /></figure>

## Configure Network Permissions

1. Go to **EC2 → Instances** and  Click on the **Instance ID**

<figure><img src="../assets/aws_instance_id.png" /></figure>

2. Click on **Security** > **Security groups** > (**Security Group ID**)

<figure><img src="../assets/aws_security_groups.png" /></figure>

3. Click on **Edit inbound rules** and **Edit outbound rules** on the group page

<figure><img src="../assets/aws_click_edit.png" /></figure>

4. Add rules until they match the screenshot below

<figure><img src="../assets/aws_inbound rules.png" /></figure>

5. Add port 2281 to the inbound rules if you wish to use the HTTP API

<figure><img src="../assets/aws_ports.png" /></figure>

## Connect to your Instance

1. Find your *.pem* file from earlier and run `chmod 400 key.pem`
2. Go to EC2 → Instances, click on the Instance ID and copy the IPv4 Address
3. Connect with `ssh ubuntu@<ipv4 address> -i key.pem`

## Setup and run Hubble

Follow the remaining instructions on [installing Hubble](http://localhost:5173/operators/install.html)

