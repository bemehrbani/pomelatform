import { Project, ProjectStatus, ProjectStage } from '@/lib/projects-data';
import { Folder, ArrowRight, Activity, Construction, Lightbulb, MonitorCheck, PauseCircle, Clock } from 'lucide-react';

interface ProjectCardProps {
    project: Project;
}

const statusColors: Record<ProjectStatus, string> = {
    'Active': 'bg-green-500/10 text-green-500 border-green-500/20',
    'Planning': 'bg-blue-500/10 text-blue-500 border-blue-500/20',
    'Blocked': 'bg-red-500/10 text-red-500 border-red-500/20',
    'Completed': 'bg-purple-500/10 text-purple-500 border-purple-500/20',
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
    const statusStyle = statusColors[statusKey] || 'bg-gray-500/10 text-gray-500 border-gray-500/20';

    return (
        <div className="group relative overflow-hidden rounded-xl border border-white/10 bg-white/5 p-6 backdrop-blur-md transition-all hover:bg-white/10 hover:shadow-2xl hover:-translate-y-1">
            {/* Decorative Gradient Blob */}
            <div className="absolute -top-10 -right-10 h-32 w-32 rounded-full bg-gradient-to-br from-indigo-500/20 to-purple-500/20 blur-2xl transition-all group-hover:scale-150" />

            <div className="relative z-10 flex flex-col h-full">
                {/* Header */}
                <div className="flex items-start justify-between mb-4">
                    <div className="flex items-center gap-3">
                        <div className="p-2 rounded-lg bg-gradient-to-br from-gray-800 to-gray-900 border border-white/10 shadow-inner">
                            <Folder className="w-5 h-5 text-indigo-400" />
                        </div>
                        <div>
                            <h3 className="font-semibold text-lg tracking-tight text-white/90 group-hover:text-white transition-colors">
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
                <p className="text-sm text-muted-foreground mb-6 line-clamp-2 min-h-[40px]">
                    {project.description}
                </p>

                {/* Next Step Section */}
                <div className="mt-auto pt-4 border-t border-white/5">
                    <p className="text-xs font-medium text-indigo-300 mb-1 flex items-center gap-1">
                        <ArrowRight className="w-3 h-3" />
                        NEXT STEP
                    </p>
                    <p className="text-sm text-white/80 line-clamp-2">
                        {project.nextStep}
                    </p>
                </div>

                {/* Tags */}
                <div className="mt-4 flex flex-wrap gap-2">
                    {project.tags.map(tag => (
                        <span key={tag} className="px-2 py-0.5 rounded text-[10px] bg-white/5 text-white/40 border border-white/5">
                            {tag}
                        </span>
                    ))}
                </div>
            </div>
        </div>
    );
}
