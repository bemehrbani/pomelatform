
import { projects, Project, ProjectType } from '@/lib/projects-data';
import { ProjectCard } from '@/components/ui/project-card';
import { LayoutGrid, AlertCircle, Layers, Zap, History } from 'lucide-react';

export default function DashboardPage() {
  const currentProjects = projects.filter(p => p.type === 'Current');
  const mvpProjects = projects.filter(p => p.type === 'MVP');
  const pastProjects = projects.filter(p => p.type === 'Past');

  const Section = ({ title, icon: Icon, items, description }: { title: string, icon: any, items: Project[], description: string }) => (
    <div className="space-y-4">
      <div className="flex items-center gap-2 border-b border-gray-100 pb-2">
        <Icon className="w-5 h-5 text-gray-400" />
        <div>
          <h2 className="text-xl font-semibold text-gray-900">{title}</h2>
          <p className="text-xs text-gray-500">{description}</p>
        </div>
        <span className="ml-auto text-xs font-medium bg-gray-100 text-gray-600 px-2 py-0.5 rounded-full">
          {items.length}
        </span>
      </div>

      {items.length > 0 ? (
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {items.map((project) => (
            <ProjectCard key={project.id} project={project} />
          ))}
        </div>
      ) : (
        <div className="text-sm text-gray-400 italic py-4">No projects in this category.</div>
      )}
    </div>
  );

  return (
    <div className="space-y-12 p-4 pb-20">
      {/* Header Section */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-4 border-b border-gray-200 pb-6">
        <div>
          <h1 className="text-3xl font-bold tracking-tight text-gray-900">
            Projects Dashboard
          </h1>
          <p className="text-muted-foreground mt-2 max-w-2xl">
            A comprehensive overview of the entire Pomegroup ecosystem, spanning live services, MVPs in flight, and archived ventures.
          </p>
        </div>
      </div>

      <Section
        title="Current Live Projects"
        icon={Zap}
        items={currentProjects}
        description="Active SaaS and platforms currently serving users."
      />

      <Section
        title="New MVP Projects"
        icon={Layers}
        items={mvpProjects}
        description="Incubator projects in development or early alpha stages."
      />

      <Section
        title="Past Projects"
        icon={History}
        items={pastProjects}
        description="Archived websites, successful exits, and legacy works."
      />

      {/* Footer Info */}
      <div className="rounded-lg bg-blue-50 border border-blue-100 p-4 flex gap-3 items-start mt-12">
        <AlertCircle className="w-5 h-5 text-blue-600 shrink-0 mt-0.5" />
        <div className="text-sm text-blue-700">
          <p className="font-medium text-blue-900 mb-1">Data Source</p>
          Project data is currently static. Future updates will pull live team availability and GitHub metrics.
        </div>
      </div>
    </div>
  );
}
