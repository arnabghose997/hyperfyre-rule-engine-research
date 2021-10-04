# Rule-Engine Research

## Overview

The aim of the research is to identify whether a user holds any balance for a specified Token. The research was done on *Ethereum*, *Binance Smart Chain* and *Polygon* network, and on the tokens *ERC-20* and *BEP-20*.

About 2000 Blockchain Wallet addresses, downloaded from the above mentioned networks, were used as input.

<ul>
    <li><b>polkadot-token-2000-users.csv</b> - List of 2000 users holding PolkaDot token (BEP-20)</li>
    <li><b>theta-token-2000-users.csv</b> - List of 2000 users holding Theta Token (ERC-20)</li>
    <li><b>uniswap-token-2000-users.csv</b> -  List of 2000 users holding Uniswap token (ERC-20)</li>
</ul>

## Code Walkthrough

Following are the steps involved in the execution of the script `app.js`:

1. The necessary minimum ABI need and the required variables such as RPC endpoints and Contract Addresses are defined.

2. In order to process the requests in bulk, a instance of Web3.js Batch instance is defined

3. Iterating over User records, each request is added to the Batch Object for every wallet address.

4. Once added, `batch.execute()` runs the whole Batch to generate Token balance for every users.

## Observations

- Ethereum RPC took about 20 seconds to retrieve all the balances.
- It took BSC (Binance Smart Chain) about 3 seconds to retrieve all the balances.
- Polygon Network, on it's free tier plan, had a `40 requests/sec` limit on the public RPC endpoint, while the private RPC endpoint had a `100 requests/sec` limit. Hence, batch execution for 2000 users was not possible 