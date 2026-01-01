import Card from "@/components/UI/Card";

export default function ResourceWidget() {
    const resources = [
        { name: "Dev Team A", project: "Project Pome", status: "Active", load: 80 },
        { name: "Design Studio", project: "Marketing Assets", status: "Active", load: 60 },
        { name: "Consultants", project: "-", status: "Available", load: 0 },
    ];

    return (
        <Card title="Resource Allocation">
            <ul style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                {resources.map((res, idx) => (
                    <li key={idx} style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', fontSize: '0.9rem' }}>
                        <div style={{ display: 'flex', flexDirection: 'column' }}>
                            <span style={{ fontWeight: 600 }}>{res.name}</span>
                            <span style={{ fontSize: '0.75rem', opacity: 0.7 }}>{res.project}</span>
                        </div>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                            <div style={{
                                height: '8px', width: '60px',
                                background: 'hsla(var(--foreground)/0.1)',
                                borderRadius: '4px',
                                overflow: 'hidden'
                            }}>
                                <div style={{
                                    height: '100%',
                                    width: `${res.load}%`,
                                    background: res.load > 75 ? '#eab308' : res.load > 0 ? 'hsl(var(--primary))' : 'gray'
                                }}></div>
                            </div>
                            <span style={{ minWidth: '30px', textAlign: 'right' }}>{res.load}%</span>
                        </div>
                    </li>
                ))}
            </ul>
        </Card>
    );
}
