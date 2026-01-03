import { Project, ProjectStatus, ProjectStage } from '@/lib/projects-data';
import { Folder, ArrowRight, Activity, Construction, Lightbulb, MonitorCheck, PauseCircle, Clock } from 'lucide-react';

interface ProjectCardProps {
    project: Project;
}

const statusColors: Record<ProjectStatus, string> = {
    'Active': 'bg-green-100 text-green-700 border-green-200',
    'Planning': 'bg-blue-100 text-blue-700 border-blue-200',
    'Blocked': 'bg-red-100 text-red-700 border-red-200',
    'Completed': 'bg-purple-100 text-purple-700 border-purple-200',
};

const stageIcons: Record<ProjectStage, React.ReactNode> = {
    'Concept': <Lightbulb className="w-4 h-4" />,
    'MVP': <Construction className="w-4 h-4" />,
    'Alpha': <Activity className="w-4 h-4" />,
    'Beta': <Activity className="w-4 h-4" />,
    'Live': <MonitorCheck className="w-4 h-4" />,
    'Maintenance': <Clock className="w-4 h-4" />,
    'On Hold': <PauseCircle className="w-4 h-4" />,
};

export function ProjectCard({ project }: ProjectCardProps) {
    // Use the status directly as it matches the type
    const statusKey = project.status;
    const statusStyle = statusColors[statusKey] || 'bg-gray-100 text-gray-700 border-gray-200';

    return (
        <div className="group relative overflow-hidden rounded-xl border border-gray-200 bg-white p-6 shadow-sm transition-all hover:border-indigo-200 hover:shadow-md hover:-translate-y-1">
            {/* Decorative Gradient Blob (Subtle for light mode) */}
            <div className="absolute -top-10 -right-10 h-32 w-32 rounded-full bg-gradient-to-br from-indigo-50/50 to-purple-50/50 blur-2xl transition-all group-hover:scale-150" />

            <div className="relative z-10 flex flex-col h-full">
                {/* Header */}
                <div className="flex items-start justify-between mb-4">
                    <div className="flex items-center gap-3">
                        <div className="p-2 rounded-lg bg-gray-50 border border-gray-200 shadow-sm group-hover:bg-white transition-colors">
                            <Folder className="w-5 h-5 text-indigo-600" />
                        </div>
                        <div>
                            <h3 className="font-semibold text-lg tracking-tight text-gray-900 group-hover:text-indigo-600 transition-colors">
                                {project.name}
                            </h3>
                            <div className="flex items-center gap-2 text-xs text-muted-foreground mt-0.5">
                                <span className="flex items-center gap-1">
                                    {stageIcons[project.stage]}
                                    {project.stage}
                                </span>
                            </div>
                        </div>
                    </div>

                    <span className={`px-2.5 py-1 rounded-full text-xs font-medium border ${statusStyle} uppercase tracking-wider`}>
                        {project.status}
                    </span>
                </div>

                {/* Description */}
                <p className="text-sm text-gray-500 mb-6 line-clamp-2 min-h-[40px]">
                    {project.description}
                </p>

                {/* Next Step Section */}
                <div className="mt-auto pt-4 border-t border-gray-100">
                    <p className="text-xs font-medium text-indigo-600 mb-1 flex items-center gap-1">
                        <ArrowRight className="w-3 h-3" />
                        NEXT STEP
                    </p>
                    <p className="text-sm text-gray-700 line-clamp-2 font-medium">
                        {project.nextStep}
                    </p>
                </div>

                {/* Tags */}
                <div className="mt-4 flex flex-wrap gap-2">
                    {project.tags.map(tag => (
                        <span key={tag} className="px-2 py-0.5 rounded text-[10px] bg-gray-50 text-gray-500 border border-gray-100 font-medium">
                            {tag}
                        </span>
                    ))}
                </div>
            </div>
        </div>
    );
}
