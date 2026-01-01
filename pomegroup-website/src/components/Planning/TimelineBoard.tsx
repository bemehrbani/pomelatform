"use client";

import { useState } from "react";

interface ProjectTimeline {
    id: string;
    name: string;
    startMonth: number; // 0-based index from Jan
    durationMonths: number;
    color: string;
}

export default function TimelineBoard() {
    const months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun"];
    const projects: ProjectTimeline[] = [
        { id: "1", name: "TonPals: Mainnet", startMonth: 0, durationMonths: 2, color: "#a855f7" }, // Jan-Feb
        { id: "2", name: "AlphaBet: User Acq", startMonth: 1, durationMonths: 3, color: "#ef4444" }, // Feb-Apr
        { id: "3", name: "Nordic Health: Proto", startMonth: 0, durationMonths: 1, color: "#22c55e" }, // Jan
        { id: "4", name: "SmartEscrow: Whitepaper", startMonth: 0, durationMonths: 1, color: "#3b82f6" }, // Jan
        { id: "5", name: "SmartEscrow: MVP", startMonth: 2, durationMonths: 3, color: "#3b82f6" }, // Mar-May
    ];

    return (
        <div className="studio-card" style={{ padding: '2rem', overflowX: 'auto' }}>
            <div style={{ display: 'grid', gridTemplateColumns: `200px repeat(${months.length}, 1fr)`, gap: '1px', minWidth: '800px' }}>
                {/* Header Row */}
                <div style={{ fontWeight: 600, padding: '1rem', borderBottom: '1px solid hsl(var(--border))' }}>Project / Phase</div>
                {months.map(m => (
                    <div key={m} style={{ fontWeight: 600, padding: '1rem', borderBottom: '1px solid hsl(var(--border))', textAlign: 'center', backgroundColor: 'hsl(var(--muted)/0.3)' }}>
                        {m}
                    </div>
                ))}

                {/* Project Rows (Mocking chart feel, but simplified list for clarity first) 
            Actually, let's just place bars on a relative grid.
        */}
            </div>

            <div style={{ position: 'relative', marginTop: '1rem', minWidth: '800px', display: 'grid', gridTemplateColumns: `200px repeat(${months.length}, 1fr)` }}>
                {/* Background Grid Lines */}
                {Array.from({ length: 1 }).map((_, i) => (
                    <>
                        <div style={{ borderRight: '1px solid hsl(var(--border))' }}></div>
                        {months.map((_, idx) => (
                            <div key={idx} style={{ borderRight: '1px solid hsl(var(--border))', height: `${projects.length * 60}px` }}></div>
                        ))}
                    </>
                ))}

                {/* Bars Overlay */}
                <div style={{ position: 'absolute', top: 0, left: 0, right: 0, display: 'flex', flexDirection: 'column', gap: '1rem', paddingTop: '1rem' }}>
                    {projects.map((p) => (
                        <div key={p.id} style={{ display: 'grid', gridTemplateColumns: `200px repeat(${months.length}, 1fr)`, alignItems: 'center' }}>
                            <div style={{ paddingLeft: '1rem', fontWeight: 500, fontSize: '0.9rem' }}>{p.name}</div>
                            <div style={{
                                gridColumn: `${p.startMonth + 2} / span ${p.durationMonths}`,
                                height: '32px',
                                backgroundColor: p.color,
                                opacity: 0.8,
                                borderRadius: '6px',
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                                color: 'white',
                                fontSize: '0.75rem',
                                fontWeight: 600,
                                boxShadow: '0 2px 4px rgba(0,0,0,0.1)'
                            }}>
                                {p.durationMonths} mo
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}
