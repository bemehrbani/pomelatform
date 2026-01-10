import { mnemonicNew, mnemonicToWalletKey } from "@ton/crypto";
import { WalletContractV4 } from "@ton/ton";

async function main() {
    const mnemonic = await mnemonicNew();
    const key = await mnemonicToWalletKey(mnemonic);
    const wallet = WalletContractV4.create({ publicKey: key.publicKey, workchain: 0 });

    console.log("MNEMONIC=" + mnemonic.join(" "));
    console.log("ADDRESS=" + wallet.address.toString({ testOnly: true }));
}

main();
