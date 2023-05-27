const yargs = require("yargs/yargs");
const { hideBin } = require("yargs/helpers");
const { Client } = require("@bnb-chain/greenfield-chain-sdk");
const ethers = require("ethers");

let client;

// Парсинг аргументов командной строки
const argv = yargs(hideBin(process.argv))
  .option("grpcUrl", {
    alias: "g",
    type: "string",
    description: "Set the GRPC_URL",
    demandOption: true,
  })
  .option("chainId", {
    alias: "c",
    type: "string",
    description: "Set the GREEN_CHAIN_ID",
    demandOption: true,
  })
  .command(
    "transfer [from] [to] [amount]",
    "transfer BNB to another account",
    (yargs) => {
      yargs
        .positional("from", {
          describe: "Source address",
          type: "string",
        })
        .positional("to", {
          describe: "Destination address",
          type: "string",
        })
        .positional("amount", {
          describe: "Amount to transfer",
          type: "string",
        });
    },
    async (argv) => {
      client = Client.create(argv.grpcUrl, argv.chainId);
      const transferTx = await client.account.transfer({
        fromAddress: argv.from,
        toAddress: argv.to,
        amount: [
          {
            denom: "BNB",
            amount: ethers.utils.parseEther(argv.amount).toString(),
          },
        ],
      });
      const simulateInfo = await transferTx.simulate({ denom: "BNB" });
      const broadcastRes = await transferTx.broadcast({
        denom: "BNB",
        gasLimit: Number(simulateInfo.gasLimit),
        gasPrice: simulateInfo.gasPrice,
        payer: argv.from,
        granter: "",
      });
      console.log(`Transaction broadcasted: ${broadcastRes}`);
    }
  )
  .command(
    "balance [address]",
    "get the balance of an account",
    (yargs) => {
      yargs.positional("address", {
        describe: "address to get balance for",
        type: "string",
      });
    },
    async (argv) => {
      client = Client.create(argv.grpcUrl, argv.chainId);
      const accountInfo = await client.account.getAccount(argv.address);
      console.log(`Account balance: ${accountInfo.balance}`);
    }
  ).argv;
