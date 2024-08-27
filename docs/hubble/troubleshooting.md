# Hubble troubleshooting

## Fetch Hubble logs

From the hubble folder, fetch logs with the following command:

```bash
$ ./hubble.sh logs
```

Or you can use docker-compose directly:

```bash
# sudo is required if you used the hubble script to install the hub
# You may need to use `docker-compose` instead of `docker compose` depending on your docker setup
$ sudo docker compose logs -f hubble
```

## Restart Hubble

From the hubble folder, spin up and down the instance with the following commands

```bash
$ ./hubble.sh down
$ ./hubble.sh up
```

## Reset the db

The best way to reset the db is to delete the `.rocks` directory entirely, which forces the hub to fetch the latest
snapshot and re-sync from there.

```bash
$ ./hubble.sh down # Ensure the hub is not running
$ rm -rf .rocks # make sure you are in the hub directory
```

## No peers or incoming gossip connections

If you're not seeing any peers or incoming gossip connections, it's likely that network issues are preventing the hub
with communicating with other hubs.

Check your firewall and NAT settings to ensure that ports 2282 (gossip) and 2283 (rpc, for sync) are accessible.

You could also try bootstrapping the hub with a non-default peer by adding the following line to your `.env` file:

```dotenv
BOOTSTRAP_NODE=/dns/hoyt.farcaster.xyz/tcp/2282
```

## Is my hub in sync?

Use the [grafana dashboard](/hubble/monitoring) to monitor your hub. The Status tab will show the message sync
percent of your hub compared to its peers. If this is less than 100%, try restarting the hub and waiting a while. If
this persists, file an issue on the [hub repo](https://github.com/farcasterxyz/hub-monorepo/issues/new?assignees=&labels=&projects=&template=bug_report.md&title=bug%20%28hubble%29%3A).

## Managing your Peer ID

Hubble has a key pair that it uses to sign peer-to-peer messages, which is stored in the `.hub` directory as a `...._id.protobuf` file. The name of the file contains the public key or Peer ID, while the contents contain the private key.
