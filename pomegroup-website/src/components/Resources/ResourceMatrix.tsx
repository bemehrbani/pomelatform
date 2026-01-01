export default function ResourceMatrix() {
    const team = [
        { name: "Mahdi (CEO/Prod)", role: "Product", capacity: 100 },
        { name: "Mojtaba (Lead)", role: "Eng", capacity: 100 },
        { name: "Designer A", role: "Design", capacity: 100 },
        { name: "Dev B", role: "Eng", capacity: 50 }, // Part-time
    ];

    const allocations = [
        { name: "Mahdi (CEO/Prod)", tonpals: 30, alphabet: 20, nordic: 10, escrow: 40 },
        { name: "Mojtaba (Lead)", tonpals: 80, alphabet: 0, nordic: 0, escrow: 20 },
        { name: "Designer A", tonpals: 20, alphabet: 50, nordic: 30, escrow: 0 },
        { name: "Dev B", tonpals: 0, alphabet: 0, nordic: 50, escrow: 0 },
    ];

    const getUtilizationColor = (percent: number) => {
        if (percent > 100) return "#ef4444"; // Overbooked
        if (percent >= 80) return "#22c55e"; // Optimal
        return "#eab308"; // Underutilized
    };

    return (
        <div className="studio-card" style={{ padding: '0', overflow: 'hidden' }}>
            <table style={{ width: '100%', borderCollapse: 'collapse' }}>
                <thead style={{ backgroundColor: 'hsl(var(--muted))' }}>
                    <tr>
                        <th style={{ textAlign: 'left', padding: '1rem', borderBottom: '1px solid hsl(var(--border))' }}>Team Member</th>
                        <th style={{ textAlign: 'center', padding: '1rem', borderBottom: '1px solid hsl(var(--border))' }}>TonPals</th>
                        <th style={{ textAlign: 'center', padding: '1rem', borderBottom: '1px solid hsl(var(--border))' }}>AlphaBet</th>
                        <th style={{ textAlign: 'center', padding: '1rem', borderBottom: '1px solid hsl(var(--border))' }}>Nordic Health</th>
                        <th style={{ textAlign: 'center', padding: '1rem', borderBottom: '1px solid hsl(var(--border))' }}>Smart Escrow</th>
                        <th style={{ textAlign: 'right', padding: '1rem', borderBottom: '1px solid hsl(var(--border))' }}>Total</th>
                    </tr>
                </thead>
                <tbody>
                    {team.map((member, i) => {
                        const alloc = allocations.find(a => a.name === member.name);
                        const total = (alloc?.tonpals || 0) + (alloc?.alphabet || 0) + (alloc?.nordic || 0) + (alloc?.escrow || 0);

                        return (
                            <tr key={i} style={{ borderBottom: '1px solid hsl(var(--border))' }}>
                                <td style={{ padding: '1rem' }}>
                                    <div style={{ fontWeight: 600 }}>{member.name}</div>
                                    <div style={{ fontSize: '0.75rem', color: 'hsl(var(--muted-foreground))' }}>{member.role}</div>
                                </td>
                                <td style={{ padding: '1rem', textAlign: 'center', opacity: alloc?.tonpals ? 1 : 0.3 }}>{alloc?.tonpals}%</td>
                                <td style={{ padding: '1rem', textAlign: 'center', opacity: alloc?.alphabet ? 1 : 0.3 }}>{alloc?.alphabet}%</td>
                                <td style={{ padding: '1rem', textAlign: 'center', opacity: alloc?.nordic ? 1 : 0.3 }}>{alloc?.nordic}%</td>
                                <td style={{ padding: '1rem', textAlign: 'center', opacity: alloc?.escrow ? 1 : 0.3 }}>{alloc?.escrow}%</td>
                                <td style={{ padding: '1rem', textAlign: 'right', fontWeight: 700, color: getUtilizationColor(total) }}>
                                    {total}%
                                </td>
                            </tr>
                        );
                    })}
                </tbody>
            </table>
        </div>
    );
}
