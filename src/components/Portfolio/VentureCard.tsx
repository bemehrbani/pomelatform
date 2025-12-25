import Link from "next/link";
import { ArrowUpRight, Activity, TrendingDown, Clock } from "lucide-react";

export type VentureStage = "Idea" | "Validation" | "MVP" | "Growth" | "Scale";
export type VentureStatus = "Healthy" | "At Risk" | "Critical";

export interface Venture {
    id: string;
    name: string;
    description: string;
    type: "Internal" | "Client" | "Co-Founding";
    stage: VentureStage;
    status: VentureStatus;
    equity: number; // Percentage
    monthlyBurn: number; // EUR
    nextMilestone: string;
    nextMilestoneDate: string;
}

interface VentureCardProps {
    venture: Venture;
}

export default function VentureCard({ venture }: VentureCardProps) {
    const getStatusColor = (s: VentureStatus) => {
        switch (s) {
            case "Healthy": return "#22c55e"; // Green
            case "At Risk": return "#eab308"; // Yellow
            case "Critical": return "#ef4444"; // Red
            default: return "gray";
        }
    };

    return (
        <div className="studio-card" style={{ padding: '1.5rem', display: 'flex', flexDirection: 'column', gap: '1rem', position: 'relative' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                <div>
                    <span style={{
                        fontSize: '0.75rem',
                        textTransform: 'uppercase',
                        letterSpacing: '0.05em',
                        color: 'hsl(var(--muted-foreground))',
                        fontWeight: 600
                    }}>
                        {venture.type}
                    </span>
                    <h3 style={{ fontSize: '1.25rem', fontWeight: 600, marginTop: '0.25rem' }}>{venture.name}</h3>
                </div>
                <div style={{
                    width: '10px',
                    height: '10px',
                    borderRadius: '50%',
                    backgroundColor: getStatusColor(venture.status),
                    boxShadow: `0 0 10px ${getStatusColor(venture.status)}`
                }} title={`Status: ${venture.status}`} />
            </div>

            <p style={{ fontSize: '0.875rem', color: 'hsl(var(--muted-foreground))', lineHeight: '1.5' }}>
                {venture.description}
            </p>

            <div style={{
                display: 'grid',
                gridTemplateColumns: '1fr 1fr',
                gap: '1rem',
                borderTop: '1px solid hsl(var(--border))',
                borderBottom: '1px solid hsl(var(--border))',
                padding: '1rem 0'
            }}>
                <div>
                    <span style={{ fontSize: '0.75rem', opacity: 0.6 }}>Stage</span>
                    <div style={{ fontWeight: 500 }}>{venture.stage}</div>
                </div>
                <div>
                    <span style={{ fontSize: '0.75rem', opacity: 0.6 }}>Equity</span>
                    <div style={{ fontWeight: 500 }}>{venture.equity}%</div>
                </div>
                <div>
                    <span style={{ fontSize: '0.75rem', opacity: 0.6 }}>Burn Rate</span>
                    <div style={{ fontWeight: 500 }}>€{venture.monthlyBurn.toLocaleString()}/mo</div>
                </div>
                <div>
                    <span style={{ fontSize: '0.75rem', opacity: 0.6 }}>Next Milestone</span>
                    <div style={{ fontWeight: 500, fontSize: '0.85rem' }}>{venture.nextMilestoneDate}</div>
                </div>
            </div>

            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginTop: 'auto' }}>
                <span style={{ fontSize: '0.8rem', display: 'flex', alignItems: 'center', gap: '0.4rem', opacity: 0.7 }}>
                    <Activity size={14} /> {venture.nextMilestone}
                </span>
                <Link href={`/portfolio/${venture.id}`} style={{
                    display: 'inline-flex',
                    alignItems: 'center',
                    gap: '0.25rem',
                    fontSize: '0.875rem',
                    fontWeight: 600,
                    color: 'hsl(var(--foreground))'
                }}>
                    Details <ArrowUpRight size={16} />
                </Link>
            </div>
        </div>
    );
}
