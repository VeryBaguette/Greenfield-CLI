# Greenfield-CLI

This CLI application is for transactions and balance checks on the Greenfield blockchain. 

## Installation

1. Clone this repo by running `git clone https://github.com/YOUR_USERNAME/YOUR_REPOSITORY.git`

2. Go to the project folder by typing `cd YOUR_REPOSITORY`

3. Install the necessary packages with `npm install`

## How to Use

We got two main commands you can use here:

### Transfer Command

You can simulate a BNB transfer from one account to another using this command:

```bash
node main.js --grpcUrl "YOUR_GRPC_URL" --chainId "YOUR_CHAIN_ID" transfer "source_address" "destination_address" "amount"
```

### Balance Command

The balance command displays the current balance of an account in BNB. Here's how you can use it:

```bash
node main.js --grpcUrl "YOUR_GRPC_URL" --chainId "YOUR_CHAIN_ID" balance "address"
```

## File Interaction

This CLI application interacts with a balances.json file to store and update account balances. This file has to be in project root directory with a structure like this:

```bash
{
  "address1": 1000,
  "address2": 2000,
  ...
}
```
## Error Handling

This application uses chalk to colorize output, including error messages. If a transfer operation cannot be completed due to insufficient balance, the program will output an error message in red. If a balance request is made for an address not found in balances.json, an error message will be displayed.

## Color-coded Messages

The application uses color-coded console messages to make output easier to understand. Successful transactions and balance inquiries are displayed in green, updated balances in yellow, and error messages in red.
