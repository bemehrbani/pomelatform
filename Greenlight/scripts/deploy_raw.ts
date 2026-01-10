import { mnemonicToWalletKey } from "@ton/crypto";
import { WalletContractV4, TonClient, fromNano, toNano } from "@ton/ton";
import { getHttpEndpoint } from "@orbs-network/ton-access";
import { Bounty } from "../wrappers/Bounty";

async function main() {
    // 1. Initialize Client
    const endpoint = await getHttpEndpoint({ network: "testnet" });
    const client = new TonClient({ endpoint });

    // 2. Setup Wallet
    const mnemonic = "drill mobile material bicycle congress online jewel height crew detail tourist rail today powder ridge develop tunnel appear media siren flat fork dinosaur combine";
    const key = await mnemonicToWalletKey(mnemonic.split(" "));
    const wallet = WalletContractV4.create({ workchain: 0, publicKey: key.publicKey });

    // Check balance
    const balance = await client.getBalance(wallet.address);
    console.log("Wallet Balance:", fromNano(balance));

    if (balance === 0n) {
        throw new Error("Wallet has 0 balance. Please fund it.");
    }

    const walletContract = client.open(wallet);
    const walletSender = walletContract.sender(key.secretKey);

    // 3. Initialize Bounty Contract
    // Owner = Oracle = Wallet Address for MVP
    const owner = wallet.address;
    const oracle = wallet.address;

    const bounty = client.open(await Bounty.fromInit(owner, oracle));

    console.log("Deploying Bounty Contract to:", bounty.address.toString());

    // 4. Send Deploy Transaction
    await bounty.send(
        walletSender,
        {
            value: toNano("0.05"), // 0.05 TON
        },
        {
            $$type: 'Deploy',
            queryId: 0n,
        }
    );

    // 5. Wait for deployment
    console.log("Waiting for deployment...");
    let seqno = await walletContract.getSeqno();

    // Simple wait loop checking contract state
    let attempts = 0;
    while (attempts < 20) {
        await new Promise(r => setTimeout(r, 2000));
        const isDeployed = await client.isContractDeployed(bounty.address);
        if (isDeployed) {
            console.log("DEPLOY_SUCCESS: " + bounty.address.toString());
            return;
        }
        attempts++;
    }
    console.log("Deployment timed out (check explorer).");
}

main();
