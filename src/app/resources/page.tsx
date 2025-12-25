import ResourceMatrix from "@/components/Resources/ResourceMatrix";

export default function ResourcesPage() {
    return (
        <div className="container">
            <div style={{ marginBottom: '3rem', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <div>
                    <h1 style={{ marginBottom: '0.5rem' }}>Resource Matrix</h1>
                    <p style={{ color: 'hsl(var(--muted-foreground))' }}>Team availability and utilization.</p>
                </div>
                <button style={{
                    padding: '0.75rem 1.5rem',
                    borderRadius: 'var(--radius)',
                    background: 'hsl(var(--foreground))',
                    color: 'hsl(var(--background))',
                    fontWeight: 600
                }}>
                    + Add Member
                </button>
            </div>

            <ResourceMatrix />

            <div style={{ marginTop: '2rem', padding: '1rem', border: '1px dashed hsl(var(--border))', borderRadius: 'var(--radius)', color: 'hsl(var(--muted-foreground))', fontSize: '0.875rem' }}>
                * <strong>Overbooked</strong> members (&gt;100%) are highlighted in red. Please redistribute load.
            </div>
        </div>
    );
}
