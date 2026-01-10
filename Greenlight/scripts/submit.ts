import { toNano } from '@ton/core';
import { Bounty } from '../wrappers/Bounty';
import { NetworkProvider } from '@ton/blueprint';

export async function run(provider: NetworkProvider) {
    // 1. Get Contract Address (assume deployed and known)
    // For local testing, this is hard without finding the deployed address.
    // We'll ask user for it.
    const ui = provider.ui();
    const address = await ui.input('Bounty Contract Address');

    const bounty = provider.open(Bounty.fromAddress(address));

    const submissionUrl = "https://github.com/my-repo/solution";

    await provider.sender().send({
        to: bounty.address,
        value: toNano('0.05'),
        body: `Submit: ${submissionUrl}`, // Simple comment
    });

    console.log('Submission sent!');
}
