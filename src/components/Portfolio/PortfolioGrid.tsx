import VentureCard, { Venture } from "./VentureCard";

interface PortfolioGridProps {
    ventures: Venture[];
}

export default function PortfolioGrid({ ventures }: PortfolioGridProps) {
    return (
        <div>
            <div style={{ display: 'flex', gap: '1rem', marginBottom: '2rem', flexWrap: 'wrap' }}>
                {['All', 'Internal', 'Co-Founding', 'Client'].map((filter) => (
                    <button key={filter} style={{
                        padding: '0.5rem 1rem',
                        borderRadius: '9999px',
                        border: '1px solid hsl(var(--border))',
                        background: filter === 'All' ? 'hsl(var(--foreground))' : 'transparent',
                        color: filter === 'All' ? 'hsl(var(--background))' : 'hsl(var(--foreground))',
                        fontSize: '0.875rem',
                        fontWeight: 500,
                        cursor: 'pointer'
                    }}>
                        {filter}
                    </button>
                ))}
            </div>

            <div style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fill, minmax(340px, 1fr))',
                gap: '2rem'
            }}>
                {ventures.map((v) => (
                    <VentureCard key={v.id} venture={v} />
                ))}
            </div>
        </div>
    );
}
