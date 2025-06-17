---
outline: [2, 3]
---

# Tier Registry

The Tier Registry allows Farcaster accounts to purchase or extend Farcaster Pro subscriptions.

Unlike other protocol contracts, the Tier Registry is deployed on Base Mainnet.

If you want to purchase a Pro subscription for a Farcaster account, use the Tier Registry.

## Active Tiers

| Tier ID | Description   | Payment Token | Min Days | Price/day         |
| ------- | ------------- | ------------- | -------- | ----------------- |
| 1       | Farcaster Pro | USDC          | 30       | `328767` wei USDC |

## Read

### price

Get the total price in payment token (`uint256`) to purchase a tier subscription for a given number of days.

| Param Name | type      | Description                               |
| ---------- | --------- | ----------------------------------------- |
| tier       | `uint256` | The tier ID to calculate price for        |
| forDays    | `uint256` | The number of days to calculate price for |

### tierInfo

Get information about a specific tier. Returns a `TierInfo` struct.

| Param Name | type      | Description |
| ---------- | --------- | ----------- |
| tier       | `uint256` | The tier ID |

`TierInfo` struct parameters:

| Param Name       | type      | Description                                          |
| ---------------- | --------- | ---------------------------------------------------- |
| minDays          | `uint256` | Minimum number of days required to purchase          |
| maxDays          | `uint256` | Maximum number of days per purchase                  |
| vault            | `address` | Payment destination address                          |
| paymentToken     | `IERC20`  | ERC20 payment token                                  |
| tokenPricePerDay | `uint256` | Price per day in fundamental units of `paymentToken` |
| isActive         | `bool`    | Whether tier is currently active                     |

## Write

### purchaseTier

Purchase a subscription tier for a given fid. If the account already has an active subscription, purchasing will extend
their total subscription time.

| Param Name | type      | Description                               |
| ---------- | --------- | ----------------------------------------- |
| fid        | `uint256` | The fid to credit the subscription to     |
| tier       | `uint256` | The tier ID to calculate price for        |
| forDays    | `uint256` | The number of days to calculate price for |

### batchRent

Rent storage for multiple fids in one transaction. The caller must send enough ether to cover the total cost of all units. Like single-unit rental, extra ether is returned and units are valid for 1 year.

| Param Name  | type        | Description                                                             |
| ----------- | ----------- | ----------------------------------------------------------------------- |
| `msg.value` | `wei`       | Total payment amount                                                    |
| fids        | `uint256[]` | Array of fids                                                           |
| forDays     | `uint256[]` | Array of unit quantities, corresponding to each fid in the `fids` array |

### batchPurchaseTier

Purchase a subscription tier for multiple fids in a single transaction. If an account already has an active subscription, purchasing will extend
their total subscription time.

| Param Name | type        | Description                                                  |
| ---------- | ----------- | ------------------------------------------------------------ |
| tier       | `uint256`   | The tier ID to calculate price for                           |
| fids       | `uint256[]` | Array of fids                                                |
| forDays    | `uint256[]` | Array of days, corresponding to each fid in the `fids` array |

## Events

### PurchasedTier

Emitted when a tier is purchased for a Farcaster account.

| Param Name | type              | Description                              |
| ---------- | ----------------- | ---------------------------------------- |
| fid        | `uint256 indexed` | Farcaster ID the tier was purchased for  |
| tier       | `uint256 indexed` | Tier ID that was purchased               |
| forDays    | `uint256`         | Number of days of subscription purchased |
| payer      | `address indexed` | Caller address that paid                 |

## Errors

| Error             | Selector   | Description                                                    |
| ----------------- | ---------- | -------------------------------------------------------------- |
| InvalidDuration   | `76166401` | The caller attempted to purchase an invalid number of days.    |
| InvalidTier       | `e1423617` | The caller attempted to purchase an invalid or inactive tier.  |
| InvalidBatchInput | `0a514b99` | The caller provided mismatched arrays of `fids` and `forDays`. |

## Source

[`TierRegistry.sol`](https://github.com/farcasterxyz/contracts/blob/d0af1b8148db713239f6ac19465efeadb713b58c/src/TierRegistry.sol)
