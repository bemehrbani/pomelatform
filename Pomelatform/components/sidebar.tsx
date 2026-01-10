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
    ShieldCheck,
    LogOut
} from 'lucide-react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { cn } from '@/lib/utils';
import { signout } from '@/app/login/actions';
import { User } from '@supabase/supabase-js';

// Mock Mock Roles - in real app this matches DB
export type Role = 'Partner' | 'Founder' | 'Developer' | 'Investor' | 'Intern' | 'Designer' | 'Domain Expert';

// Mock Links Configuration
// eslint-disable-next-line @typescript-eslint/no-explicit-any
const roleLinks: Record<string, { label: string; href: string; icon: any }[]> = {
    Partner: [
        { label: 'Overview', href: '/dashboard', icon: LayoutDashboard },
        { label: 'Portfolio', href: '/portfolio', icon: Briefcase },
        { label: 'Governance', href: '/governance', icon: ShieldCheck },
    ],
    Founder: [
        { label: 'Overview', href: '/', icon: LayoutDashboard },
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

interface SidebarProps {
    user: User | null;
    role: string | null;
}

export function Sidebar({ user, role }: SidebarProps) {
    const pathname = usePathname();

    // Fallback to 'Founder' links if role not found or null, or maybe empty?
    // Project plan said "adapts to user state".
    const currentRoleLinks = (role && roleLinks[role]) ? roleLinks[role] : roleLinks['Founder'];
    const roleLabel = role || 'No Role';

    return (
        <aside className="w-64 border-r bg-card min-h-screen flex flex-col">
            <div className="p-6 border-b">
                <h1 className="text-xl font-bold bg-gradient-to-r from-orange-500 to-red-600 bg-clip-text text-transparent">
                    Pomelatform
                </h1>
                <p className="text-xs text-muted-foreground mt-1">Studio Management</p>
            </div>

            <div className="p-4">
                <div className="text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-2">
                    Current Role
                </div>
                <div className="w-full text-sm border rounded p-2 bg-secondary/50 font-medium">
                    {roleLabel}
                </div>
            </div>

            <nav className="flex-1 p-4 space-y-1">
                {currentRoleLinks.map((link) => {
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

            <div className="p-4 border-t space-y-4">
                <div className="flex items-center gap-3">
                    <div className="h-8 w-8 rounded-full bg-primary/20 flex items-center justify-center text-primary font-bold overflow-hidden">
                        {user?.user_metadata?.avatar_url ? (
                            /* eslint-disable-next-line @next/next/no-img-element */
                            <img src={user.user_metadata.avatar_url} alt="Avatar" className="w-full h-full object-cover" />
                        ) : (
                            <span>{user?.email?.charAt(0).toUpperCase() || 'U'}</span>
                        )}
                    </div>
                    <div className="text-sm overflow-hidden">
                        <p className="font-medium truncate">{user?.user_metadata?.full_name || 'User'}</p>
                        <p className="text-xs text-muted-foreground truncate">{user?.email}</p>
                    </div>
                </div>

                <button
                    onClick={() => signout()}
                    className="flex items-center gap-2 w-full px-3 py-2 text-sm font-medium text-red-600 hover:bg-red-50 rounded-md transition-colors"
                >
                    <LogOut className="h-4 w-4" />
                    Sign Out
                </button>
            </div>
        </aside>
    );
}
