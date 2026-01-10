import { useState } from 'react';
import { TonConnectButton, useTonConnectUI, useTonWallet, SendTransactionRequest } from '@tonconnect/ui-react';
import { beginCell } from '@ton/core';
import { Buffer } from 'buffer';

// Polyfill Buffer for browser environment if needed, usually handled by vite plugins or explicit import
// But simplest is to just ensure 'buffer' is installed.
if (typeof window !== 'undefined') {
    window.Buffer = window.Buffer || Buffer;
}

const BOUNTY_CONTRACT_ADDRESS = "EQB-cvzzZwfqZHMvtJiAeBVqNHSmJ8rAazIkwT2oAVJCaKqN";

function App() {
    const [tonConnectUI] = useTonConnectUI();
    const wallet = useTonWallet();
    const [repoUrl, setRepoUrl] = useState('');
    const [isLoading, setIsLoading] = useState(false);

    const handleSubmit = async () => {
        if (!wallet || !repoUrl) return;
        setIsLoading(true);

        try {
            // Construct the body: OpCode 0 (comment) + String
            // "Submit: " + repoUrl
            const comment = `Submit: ${repoUrl}`;
            const body = beginCell()
                .storeUint(0, 32) // OpCode 0 for text comment
                .storeStringTail(comment)
                .endCell();

            const payload = body.toBoc().toString('base64');

            const transaction: SendTransactionRequest = {
                validUntil: Math.floor(Date.now() / 1000) + 600,
                messages: [
                    {
                        address: BOUNTY_CONTRACT_ADDRESS,
                        amount: "50000000", // 0.05 TON
                        payload: payload
                    }
                ]
            };

            await tonConnectUI.sendTransaction(transaction);
            alert('Transaction submitted! Watch the console for Oracle confirmation.');
        } catch (e) {
            console.error(e);
            alert('Transaction failed or rejected.');
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div style={{ padding: '20px', fontFamily: 'Arial, sans-serif' }}>
            <header style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '40px' }}>
                <h1>Greenlight Bounties</h1>
                <TonConnectButton />
            </header>

            <main>
                <div style={{ border: '1px solid #ccc', padding: '20px', borderRadius: '8px', maxWidth: '600px', margin: '0 auto' }}>
                    <h2>Fix Critical Replay Bug in Bounty Contract</h2>
                    <p><strong>Reward:</strong> 9 TON</p>
                    <p><strong>Status:</strong> Open</p>
                    <hr style={{ margin: '20px 0' }} />

                    {wallet ? (
                        <div>
                            <label style={{ display: 'block', marginBottom: '10px' }}>
                                GitHub Solution URL:
                                <input
                                    type="text"
                                    value={repoUrl}
                                    onChange={(e) => setRepoUrl(e.target.value)}
                                    placeholder="https://github.com/my/repo"
                                    style={{ width: '100%', padding: '8px', marginTop: '5px' }}
                                />
                            </label>
                            <button
                                onClick={handleSubmit}
                                disabled={isLoading || !repoUrl}
                                style={{
                                    backgroundColor: '#0088CC',
                                    color: 'white',
                                    padding: '10px 20px',
                                    border: 'none',
                                    borderRadius: '4px',
                                    cursor: 'pointer',
                                    opacity: isLoading ? 0.7 : 1
                                }}
                            >
                                {isLoading ? 'Confirming in Wallet...' : 'Submit Solution'}
                            </button>
                        </div>
                    ) : (
                        <p>Please connect your wallet to submit a solution.</p>
                    )}
                </div>
            </main>
        </div>
    )
}

export default App
