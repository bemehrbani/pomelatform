"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { LayoutGrid, Map, Users, Wallet, Settings, Terminal } from "lucide-react";

const navItems = [
    { name: "Portfolio", href: "/", icon: LayoutGrid },
    { name: "Planning", href: "/planning", icon: Map },
    { name: "Treasury", href: "/financials", icon: Wallet },
    { name: "Resources", href: "/resources", icon: Users },
];

export default function Sidebar() {
    const pathname = usePathname();

    return (
        <aside style={{
            width: '260px',
            height: '100vh',
            position: 'fixed',
            left: 0,
            top: 0,
            padding: '2rem',
            borderRight: '1px solid hsl(var(--border))',
            backgroundColor: 'hsl(var(--background))',
            display: 'flex',
            flexDirection: 'column',
            zIndex: 50
        }}>
            <div style={{ marginBottom: '4rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                <div style={{ width: '24px', height: '24px', background: 'hsl(var(--foreground))', borderRadius: '4px' }}></div>
                <span style={{ fontSize: '1.2rem', fontWeight: 700, letterSpacing: '-0.03em' }}>
                    Pomegroup
                </span>
            </div>

            <nav style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                <div style={{ fontSize: '0.75rem', color: 'hsl(var(--muted-foreground))', marginBottom: '0.5rem', paddingLeft: '0.75rem' }}>MENU</div>
                {navItems.map((item) => {
                    const isActive = pathname === item.href;
                    return (
                        <Link
                            key={item.href}
                            href={item.href}
                            style={{
                                display: 'flex',
                                alignItems: 'center',
                                gap: '0.75rem',
                                padding: '0.75rem',
                                borderRadius: 'var(--radius)',
                                backgroundColor: isActive ? 'hsl(var(--secondary))' : 'transparent',
                                color: isActive ? 'hsl(var(--foreground))' : 'hsl(var(--muted-foreground))',
                                fontWeight: isActive ? 500 : 400,
                                transition: 'all 0.2s ease',
                            }}
                        >
                            <item.icon size={18} />
                            {item.name}
                        </Link>
                    );
                })}
            </nav>

            <div style={{ marginTop: 'auto' }}>
                <div style={{ fontSize: '0.75rem', color: 'hsl(var(--muted-foreground))', marginBottom: '0.5rem', paddingLeft: '0.75rem' }}>SYSTEM</div>
                <Link href="/settings" style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', padding: '0.75rem', color: 'hsl(var(--muted-foreground))' }}>
                    <Settings size={18} /> Settings
                </Link>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', padding: '0.75rem', color: 'hsl(var(--muted-foreground))', opacity: 0.5, fontSize: '0.8rem' }}>
                    <Terminal size={18} /> v2.0.0
                </div>
            </div>
        </aside>
    );
}
