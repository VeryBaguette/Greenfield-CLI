const yargs = require("yargs/yargs");
const { hideBin } = require("yargs/helpers");
const { Client } = require("@bnb-chain/greenfield-chain-sdk");
const ethers = require("ethers");
const fs = require("fs");

// Import chalk as ESM module
let chalk;
async function loadChalk() {
  chalk = await import("chalk");
}
loadChalk();

// Loadin' the balances from the file
let mockAccountBalance;
try {
  mockAccountBalance = JSON.parse(fs.readFileSync("balances.json"));
} catch (err) {
  console.log("Could not read balances.json, make sure it exists!");
  process.exit(1);
}

// Helper function to pause for a bit
function delay(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

// Breaking down them command line arguments
const argv = yargs(hideBin(process.argv))
  // ... rest of your code ...
  .command(
    "transfer [from] [to] [amount]",
    "transfer BNB to another account",
    (yargs) => {
      // ...
    },
    async (argv) => {
      // Ensure chalk is loaded
      if (!chalk) {
        await loadChalk();
      }

      const fromAddress = argv.from;
      const toAddress = argv.to;
      const amount = parseFloat(argv.amount);

      // Check the rest of your transfer command handler...
      if (
        mockAccountBalance[fromAddress] &&
        mockAccountBalance[fromAddress] >= amount
      ) {
        mockAccountBalance[fromAddress] -= amount;
        mockAccountBalance[toAddress] =
          (mockAccountBalance[toAddress] || 0) + amount;

        // Stashin' the new balances back to the file
        fs.writeFileSync("balances.json", JSON.stringify(mockAccountBalance));

        console.log(
          chalk.default.green(
            "\nSuccessfully transferred " +
              chalk.default.bold(amount) +
              " BNB from " +
              chalk.default.cyan(fromAddress) +
              " to " +
              chalk.default.cyan(toAddress) +
              "."
          )
        );
        console.log(chalk.default.yellow(`\nUpdated balances:`));
        console.log(
          chalk.default.yellow(
            `${fromAddress}: ${mockAccountBalance[fromAddress]} BNB`
          )
        );
        console.log(
          chalk.default.yellow(
            `${toAddress}: ${mockAccountBalance[toAddress]} BNB\n`
          )
        );
      } else {
        console.log(
          chalk.default.red(
            `\nInsufficient balance for address ${fromAddress}. Transfer failed.\n`
          )
        );
      }
    }
  )
  .command(
    "balance [address]",
    "get the balance of an account",
    (yargs) => {
      // ...
    },
    async (argv) => {
      // Ensure chalk is loaded
      if (!chalk) {
        await loadChalk();
      }

      const address = argv.address.toLowerCase();
      const balance = mockAccountBalance[address];

      // Use chalk.default.method to print
      if (balance !== undefined) {
        console.log(
          chalk.default.green(
            `\nAccount balance for address ${chalk.default.cyan(
              address
            )}: ${chalk.default.bold(balance)} BNB\n`
          )
        );
      } else {
        console.log(
          chalk.default.red(`\nAccount not found for address ${address}.\n`)
        );
      }
    }
  ).argv;
