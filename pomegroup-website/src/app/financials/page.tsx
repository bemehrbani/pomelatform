export default function FinancialsPage() {
    const burnHistory = [8000, 9500, 11000, 10500, 11000]; // Last 5 months
    const maxBurn = Math.max(...burnHistory) * 1.2;

    const vesting = [
        { project: "TonPals", vested: 15, total: 20 },
        { project: "AlphaBet", vested: 100, total: 100 }, // Full internal
        { project: "SmartEscrow", vested: 0, total: 100 }, // Idea stage
    ];

    return (
        <div className="container">
            <h1 style={{ marginBottom: '0.5rem' }}>Treasury & Health</h1>
            <p style={{ color: 'hsl(var(--muted-foreground))', marginBottom: '3rem' }}>Financial overview of the portfolio.</p>

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(400px, 1fr))', gap: '2rem' }}>

                {/* BURN RATE CHART */}
                <div className="studio-card" style={{ padding: '2rem' }}>
                    <h3>Monthly Burn Rate</h3>
                    <div style={{ display: 'flex', alignItems: 'flex-end', height: '200px', gap: '1rem', marginTop: '2rem' }}>
                        {burnHistory.map((val, i) => (
                            <div key={i} style={{ flex: 1, display: 'flex', flexDirection: 'column', justifyContent: 'flex-end', alignItems: 'center', gap: '0.5rem' }}>
                                <div style={{
                                    width: '100%',
                                    height: `${(val / maxBurn) * 100}%`,
                                    backgroundColor: '#ef4444',
                                    borderRadius: '4px',
                                    opacity: 0.8
                                }}></div>
                                <span style={{ fontSize: '0.75rem', color: 'hsl(var(--muted-foreground))' }}>M-{5 - i}</span>
                            </div>
                        ))}
                    </div>
                    <div style={{ textAlign: 'center', marginTop: '1rem', fontWeight: 600 }}>
                        Current: €{burnHistory[burnHistory.length - 1].toLocaleString()}
                    </div>
                </div>

                {/* EQUITY VESTING */}
                <div className="studio-card" style={{ padding: '2rem' }}>
                    <h3>Equity Vested</h3>
                    <div style={{ marginTop: '2rem', display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
                        {vesting.map(v => (
                            <div key={v.project}>
                                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.5rem', fontSize: '0.9rem', fontWeight: 500 }}>
                                    <span>{v.project}</span>
                                    <span>{v.vested}% / {v.total}%</span>
                                </div>
                                <div style={{ width: '100%', height: '8px', backgroundColor: 'hsl(var(--secondary))', borderRadius: '4px', overflow: 'hidden' }}>
                                    <div style={{
                                        width: `${(v.vested / v.total) * 100}%`,
                                        height: '100%',
                                        backgroundColor: 'hsl(var(--foreground))'
                                    }}></div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

            </div>
        </div>
    );
}
