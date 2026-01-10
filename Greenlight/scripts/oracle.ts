import { getHttpEndpoint } from "@orbs-network/ton-access";
import { TonClient, Address, WalletContractV4, toNano } from "@ton/ton";
import { KeyPair, mnemonicToPrivateKey } from "@ton/crypto";
import { Bounty } from "../wrappers/Bounty";

// Mock Playwright Test Runner
async function runTests(submissionUrl: string): Promise<boolean> {
    console.log(`Running tests for ${submissionUrl}...`);
    // In real implementation:
    // 1. git clone submissionUrl
    // 2. npm install && npx playwright test
    // 3. return true if exit code == 0
    await new Promise(r => setTimeout(r, 2000));
    return true;
}

export async function run() {
    // Configuration
    // In production, use process.env
    const ORACLE_MNEMONIC = process.env.ORACLE_MNEMONIC || "your mnemonic here";
    const CONTRACT_ADDRESS = process.env.CONTRACT_ADDRESS || "EQB-cvzzZwfqZHMvtJiAeBVqNHSmJ8rAazIkwT2oAVJCaKqN";

    if (!CONTRACT_ADDRESS) {
        console.error("Please set CONTRACT_ADDRESS env variable");
        return;
    }

    // Initialize TON Client
    const endpoint = await getHttpEndpoint({ network: "testnet" });
    const client = new TonClient({ endpoint });

    // Initialize Oracle Wallet
    const key: KeyPair = await mnemonicToPrivateKey(ORACLE_MNEMONIC.split(" "));
    const wallet = WalletContractV4.create({ publicKey: key.publicKey, workchain: 0 });
    const walletContract = client.open(wallet);

    // Initialize Bounty Contract
    const bountyAddress = Address.parse(CONTRACT_ADDRESS);
    const bounty = client.open(Bounty.fromAddress(bountyAddress));

    console.log("Oracle Service Started.");
    console.log(`Watching contract: ${bountyAddress}`);

    let lastLt = 0n; // Last logical time processed

    // Polling Loop
    setInterval(async () => {
        try {
            // Fetch recent transactions
            const transactions = await client.getTransactions(bountyAddress, {
                limit: 10,
            });

            for (const tx of transactions) {
                if (tx.lt <= lastLt) continue;
                lastLt = tx.lt > lastLt ? tx.lt : lastLt;

                const inMsg = tx.inMessage;
                if (!inMsg) continue;
                if (inMsg.info.type !== 'internal') continue;

                const body = inMsg.body.asSlice();
                // Check if it's a text comment
                if (body.remainingBits >= 32) {
                    const op = body.loadUint(32);
                    if (op === 0) { // 0 = Comment
                        const text = body.loadStringTail();
                        if (text.startsWith("Submit:")) {
                            // Robust trim: replace "Submit:" then remove leading/trailing whitespace
                            const url = text.replace("Submit:", "").trim();
                            const sender = inMsg.info.src;

                            console.log(`Found submission from ${sender}: ${url}`);

                            const passed = await runTests(url);

                            if (passed) {
                                console.log("Tests Passed! Payout in progress...");

                                // Send Payout
                                // Note: We need a sender (Wallet) to send the message.
                                // The 'bounty' contract wrapper usually expects a 'Sender' interface.
                                const senderWrapper = walletContract.sender(key.secretKey);

                                await bounty.send(
                                    senderWrapper,
                                    {
                                        value: toNano("0.1"), // Gas
                                    },
                                    {
                                        $$type: 'Payout',
                                        amount: toNano("9"), // Should read amount from contract or DB
                                        recipient: sender,
                                    }
                                );
                                console.log("Payout Sent.");
                            } else {
                                console.log("Tests Failed.");
                            }
                        }
                    }
                }
            }
        } catch (e) {
            console.error("Polling Error:", e);
        }
    }, 5000);
}
