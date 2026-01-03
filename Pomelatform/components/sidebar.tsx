'use client';

import {
    Users,
    LayoutDashboard,
    Settings,
    Code2,
    Palette,
    Briefcase,
    LineChart,
    GraduationCap,
    ShieldCheck
} from 'lucide-react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { cn } from '@/lib/utils';
import { useState } from 'react';

// Mock Roles
export type Role = 'Partner' | 'Founder' | 'Developer' | 'Investor' | 'Intern' | 'Designer' | 'Domain Expert';

const roles: Role[] = ['Partner', 'Founder', 'Developer', 'Investor', 'Intern', 'Designer', 'Domain Expert'];

// Mock Links Configuration
const roleLinks: Record<Role, { label: string; href: string; icon: any }[]> = {
    Partner: [
        { label: 'Overview', href: '/dashboard', icon: LayoutDashboard },
        { label: 'Portfolio', href: '/portfolio', icon: Briefcase },
        { label: 'Governance', href: '/governance', icon: ShieldCheck },
    ],
    Founder: [
        { label: 'My Studio', href: '/studio', icon: LayoutDashboard },
        { label: 'Team', href: '/team', icon: Users },
        { label: 'Funding', href: '/funding', icon: LineChart },
    ],
    Developer: [
        { label: 'Tickets', href: '/tickets', icon: LayoutDashboard },
        { label: 'Repositories', href: '/repos', icon: Code2 },
        { label: 'CI/CD', href: '/cicd', icon: Settings },
    ],
    Investor: [
        { label: 'Deal Flow', href: '/deals', icon: LineChart },
        { label: 'Reports', href: '/reports', icon: Briefcase },
    ],
    Intern: [
        { label: 'Learning Path', href: '/learning', icon: GraduationCap },
        { label: 'Tasks', href: '/tasks', icon: LayoutDashboard },
    ],
    Designer: [
        { label: 'Assets', href: '/assets', icon: Palette },
        { label: 'Projects', href: '/projects', icon: LayoutDashboard },
    ],
    'Domain Expert': [
        { label: 'Consultations', href: '/consultations', icon: Users },
        { label: 'Resources', href: '/resources', icon: Briefcase },
    ]
};

export function Sidebar() {
    const pathname = usePathname();
    // Mock State for Role Switching
    const [currentRole, setCurrentRole] = useState<Role>('Founder');

    return (
        <aside className="w-64 border-r bg-card min-h-screen flex flex-col">
            <div className="p-6 border-b">
                <h1 className="text-xl font-bold bg-gradient-to-r from-orange-500 to-red-600 bg-clip-text text-transparent">
                    Pomelatform
                </h1>
                <p className="text-xs text-muted-foreground mt-1">Studio Management</p>
            </div>

            <div className="p-4">
                <label className="text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-2 block">
                    Mock Mock Role:
                </label>
                <select
                    className="w-full text-sm border rounded p-2 bg-background"
                    value={currentRole}
                    onChange={(e) => setCurrentRole(e.target.value as Role)}
                >
                    {roles.map(r => <option key={r} value={r}>{r}</option>)}
                </select>
            </div>

            <nav className="flex-1 p-4 space-y-1">
                {roleLinks[currentRole].map((link) => {
                    const Icon = link.icon;
                    const isActive = pathname === link.href;
                    return (
                        <Link
                            key={link.href}
                            href={link.href}
                            className={cn(
                                "flex items-center gap-3 px-3 py-2 text-sm font-medium rounded-md transition-colors",
                                isActive
                                    ? "bg-primary/10 text-primary"
                                    : "text-muted-foreground hover:bg-accent hover:text-accent-foreground"
                            )}
                        >
                            <Icon className="h-4 w-4" />
                            {link.label}
                        </Link>
                    );
                })}
            </nav>

            <div className="p-4 border-t">
                <div className="flex items-center gap-3">
                    <div className="h-8 w-8 rounded-full bg-primary/20 flex items-center justify-center text-primary font-bold">
                        U
                    </div>
                    <div className="text-sm">
                        <p className="font-medium">User Name</p>
                        <p className="text-xs text-muted-foreground">user@example.com</p>
                    </div>
                </div>
            </div>
        </aside>
    );
}
