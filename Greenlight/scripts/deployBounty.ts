import { toNano } from '@ton/core';
import { Bounty } from '../wrappers/Bounty';
import { compile, NetworkProvider } from '@ton/blueprint';

export async function run(provider: NetworkProvider) {
    // For MVP, we use the deployer as both Owner and Oracle.
    // In production, these should be separate.
    const owner = provider.sender().address;
    const oracle = owner;

    const bounty = provider.open(await Bounty.fromInit(
        owner!,
        oracle!
    ));

    await bounty.send(
        provider.sender(),
        {
            value: toNano('0.05'),
        },
        {
            $$type: 'Deploy',
            queryId: 0n,
        }
    );

    await provider.waitForDeploy(bounty.address);
    console.log('Bounty contract deployed at:', bounty.address);
}
