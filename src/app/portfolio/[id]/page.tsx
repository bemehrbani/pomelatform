export default function ProjectDetail({ params }: { params: { id: string } }) {
    // In a real app, fetch data based on params.id
    return (
        <div className="container">
            <div style={{ marginBottom: '2rem' }}>
                <h1 style={{ marginBottom: '0.5rem' }}>TonPals (MOCK)</h1>
                <p style={{ color: 'hsl(var(--muted-foreground))' }}>Project ID: {params.id}</p>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: '2fr 1fr', gap: '2rem' }}>
                <div className="studio-card" style={{ padding: '2rem', height: '400px' }}>
                    <h3>Roadmap & Timeline</h3>
                    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', height: '100%', opacity: 0.5 }}>
                        Gantt Chart Placeholder
                    </div>
                </div>

                <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
                    <div className="studio-card" style={{ padding: '2rem' }}>
                        <h3>Team Allocation</h3>
                        <ul style={{ marginTop: '1rem', display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                            <li style={{ display: 'flex', justifyContent: 'space-between' }}>
                                <span>Mojtaba (Lead)</span> <span style={{ opacity: 0.6 }}>50%</span>
                            </li>
                            <li style={{ display: 'flex', justifyContent: 'space-between' }}>
                                <span>Designer A</span> <span style={{ opacity: 0.6 }}>25%</span>
                            </li>
                        </ul>
                    </div>

                    <div className="studio-card" style={{ padding: '2rem', borderColor: '#eab308' }}>
                        <h3 style={{ color: '#eab308' }}>Active Risks</h3>
                        <ul style={{ marginTop: '1rem', listStyle: 'disc', paddingLeft: '1.2rem' }}>
                            <li>Smart Contract Audit pending</li>
                            <li>User retention low in beta</li>
                        </ul>
                    </div>
                </div>
            </div>
        </div>
    );
}
