import TimelineBoard from "@/components/Planning/TimelineBoard";

export default function PlanningPage() {
    return (
        <div className="container">
            <div style={{ marginBottom: '3rem' }}>
                <h1 style={{ marginBottom: '0.5rem' }}>Strategic Roadmap</h1>
                <p style={{ color: 'hsl(var(--muted-foreground))' }}>Q1 2025 Master Plan</p>
            </div>

            <TimelineBoard />

            <div style={{ marginTop: '2rem', display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '2rem' }}>
                <div className="studio-card" style={{ padding: '2rem' }}>
                    <h3>Blockers & Risky Paths</h3>
                    <ul style={{ marginTop: '1rem', listStyle: 'disc', paddingLeft: '1.2rem', lineHeight: '1.8' }}>
                        <li>TonPals Audit delay may push Mainnet to Feb.</li>
                        <li>Hiring needs: Sr. Solidity Dev for SmartEscrow.</li>
                    </ul>
                </div>
                <div className="studio-card" style={{ padding: '2rem' }}>
                    <h3>Objectives (OKRs)</h3>
                    <ul style={{ marginTop: '1rem', listStyle: 'decimal', paddingLeft: '1.2rem', lineHeight: '1.8' }}>
                        <li>Validate 'Contingent Escrow' model with 3 beta clients.</li>
                        <li>Achieve €50k TVL (Total Value Locked) in contracts.</li>
                    </ul>
                </div>
            </div>
        </div>
    );
}
