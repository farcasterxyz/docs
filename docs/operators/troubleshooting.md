# Hubble troubleshooting

## Fetch the hub logs

Using the hubble script, you can fetch the hub logs with the following command:

```bash
$ ./hubble logs
```

Or you can use docker-compose directly:

```bash
# sudo is required if you used the hubble script to install the hub
# You may need to use `docker-compose` instead of `docker compose` depending on your docker setup
$ sudo docker compose logs -f hubble
```

## Restart the hub

```bash
$ ./hubble down
$ ./hubble up
```

## Upgrade the hub

The hubble script sets up a crontab entry to automatically upgrade the hub every week, but
you can also upgrade the hub manually with the following command:

```bash
$ ./hubble upgrade
```

## Reset the db

The best way to reset the db is to delete the `.rocks` directory entirely, which is force the hub to fetch the latest
snapshot and re-sync from there.

```bash
$ ./hubble down # Ensure the hub is not running
$ rm -rf .rocks # make sure you are in the hub directory
```

## No peers or incoming gossip connections

If you're not seeing any peers or incoming gossip connections, it's likely that network issues are preventing the hub
with communicating with other hubs.

Check your firewall and NAT settings to ensure that ports 2282 (gossip) and 2283 (rpc, for sync) are accessible.

You could also try bootstrapping the hub with a non-default peer by adding the follwing line to your `.env` file:

```dotenv
BOOTSTRAP_NODE=/dns/hoyt.farcaster.xyz/tcp/2282
```

## Is my hub in sync?

Use the [grafana dashboard](/operators/monitoring) to monitor your hub. The Status tab will show the message sync
percent of your hub compared to it's peers. If this is less than 100%, try restarting the hub and waiting a while. If
this
persists, reach out on the [Hub Runners telegram group](https://t.me/farcasterdevchat) or file an issue on
the [hub repo](https://github.com/farcasterxyz/hub-monorepo/issues/new?assignees=&labels=&projects=&template=bug_report.md&title=bug%20%28hubble%29%3A).    