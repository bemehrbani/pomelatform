
import { projects } from '@/lib/projects-data';
import { ProjectCard } from '@/components/ui/project-card';
import { LayoutGrid, AlertCircle } from 'lucide-react';

export default function DashboardPage() {
  const activeProjects = projects.filter(p => p.status === 'Active' || p.status === 'Planning');

  return (
    <div className="space-y-8 p-4">
      {/* Header Section */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-4 border-b border-gray-200 pb-6">
        <div>
          <h1 className="text-3xl font-bold tracking-tight text-gray-900">
            Projects Dashboard
          </h1>
          <p className="text-muted-foreground mt-2 max-w-2xl">
            Overview of all active development across the Pomegroup ecosystem.
            Track status, stages, and immediate next steps.
          </p>
        </div>

        <div className="flex gap-4">
          <div className="text-right">
            <span className="block text-2xl font-bold text-gray-900">{activeProjects.length}</span>
            <span className="text-xs text-muted-foreground uppercase tracking-wider">Active Projects</span>
          </div>
        </div>
      </div>

      {/* Projects Grid */}
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        {projects.map((project) => (
          <ProjectCard key={project.id} project={project} />
        ))}
      </div>

      {/* Empty State / Info */}
      {projects.length === 0 && (
        <div className="flex flex-col items-center justify-center p-12 border border-dashed border-gray-200 rounded-xl bg-gray-50/50">
          <LayoutGrid className="w-12 h-12 text-muted-foreground mb-4" />
          <h3 className="text-lg font-medium text-gray-900">No Projects Found</h3>
          <p className="text-muted-foreground">Check your data configuration.</p>
        </div>
      )}

      {/* Footer Info */}
      <div className="rounded-lg bg-blue-50 border border-blue-100 p-4 flex gap-3 items-start">
        <AlertCircle className="w-5 h-5 text-blue-600 shrink-0 mt-0.5" />
        <div className="text-sm text-blue-700">
          <p className="font-medium text-blue-900 mb-1">System Status</p>
          Currently displaying static project snapshots. Real-time integration with project `task.md` files is planned for Phase 2.
        </div>
      </div>
    </div>
  );
}
