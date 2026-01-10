import { getProjectById } from '@/lib/projects';
import { notFound } from 'next/navigation';
import Link from 'next/link';
import { ArrowLeft, LayoutDashboard, Settings, Users } from 'lucide-react';

export default async function ProjectLayout({
    children,
    params,
}: {
    children: React.ReactNode;
    params: Promise<{ id: string }>;
}) {
    const { id } = await params;
    const project = await getProjectById(id);

    if (!project) {
        notFound();
    }

    return (
        <div className="space-y-6">
            <div className="flex items-center gap-4">
                <Link
                    href="/dashboard/projects"
                    className="p-2 hover:bg-gray-100 rounded-full text-gray-500 transition-colors"
                >
                    <ArrowLeft className="w-5 h-5" />
                </Link>
                <div>
                    <h1 className="text-2xl font-bold tracking-tight text-gray-900">{project.title}</h1>
                    <p className="text-sm text-muted-foreground">Project Dashboard</p>
                </div>
            </div>

            <div className="border-b border-gray-200">
                <nav className="-mb-px flex space-x-8" aria-label="Tabs">
                    <TabLink href={`/dashboard/projects/${id}`} icon={LayoutDashboard}>Overview</TabLink>
                    <TabLink href={`/dashboard/projects/${id}/team`} icon={Users}>Team</TabLink>
                    <TabLink href={`/dashboard/projects/${id}/settings`} icon={Settings}>Settings</TabLink>
                </nav>
            </div>

            <div className="py-2">
                {children}
            </div>
        </div>
    );
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
function TabLink({ href, children, icon: Icon }: { href: string; children: React.ReactNode; icon: any }) {
    return (
        <Link
            href={href}
            className="group inline-flex items-center border-b-2 border-transparent py-4 px-1 text-sm font-medium text-gray-500 hover:border-gray-300 hover:text-gray-700"
        >
            <Icon className="mr-2 -ml-0.5 h-4 w-4 text-gray-400 group-hover:text-gray-500" aria-hidden="true" />
            {children}
        </Link>
    )
}
