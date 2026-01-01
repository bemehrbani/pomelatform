import Card from "@/components/UI/Card";
import { TrendingUp, TrendingDown, DollarSign } from "lucide-react";

export default function FinancialWidget() {
    return (
        <Card title="Financial Overview">
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '1rem' }}>
                <div>
                    <span style={{ fontSize: '0.8rem', opacity: 0.7 }}>Total Revenue (Dec)</span>
                    <div style={{ fontSize: '1.8rem', fontWeight: 'bold', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                        €12,450
                        <span style={{ fontSize: '0.9rem', color: '#22c55e', display: 'flex', alignItems: 'center', padding: '2px 6px', background: 'rgba(34, 197, 94, 0.1)', borderRadius: '1rem' }}>
                            <TrendingUp size={14} style={{ marginRight: '4px' }} /> +12%
                        </span>
                    </div>
                </div>
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.9rem' }}>
                    <span>Expenses</span>
                    <span style={{ fontWeight: 600 }}>€4,200</span>
                </div>
                <div style={{ height: '8px', background: 'hsla(var(--foreground)/0.1)', borderRadius: '4px', overflow: 'hidden' }}>
                    <div style={{ height: '100%', width: '35%', background: '#ef4444' }}></div>
                </div>

                <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.9rem' }}>
                    <span>Profit Margin</span>
                    <span style={{ fontWeight: 600 }}>66%</span>
                </div>
                <div style={{ height: '8px', background: 'hsla(var(--foreground)/0.1)', borderRadius: '4px', overflow: 'hidden' }}>
                    <div style={{ height: '100%', width: '66%', background: '#22c55e' }}></div>
                </div>
            </div>
        </Card>
    );
}
