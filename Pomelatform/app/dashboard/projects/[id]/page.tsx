import { getProjectById } from '@/lib/projects';
import { notFound } from 'next/navigation';
import { ExternalLink, Presentation, GraduationCap, Calendar, BarChart3 } from 'lucide-react';

export default async function ProjectOverviewPage({ params }: { params: Promise<{ id: string }> }) {
    const { id } = await params;
    const project = await getProjectById(id);

    if (!project) notFound();

    return (
        <div className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                {/* Main Content */}
                <div className="lg:col-span-2 space-y-6">
                    <div className="bg-white shadow-sm rounded-xl p-6 border border-gray-100">
                        <h3 className="text-sm font-bold uppercase tracking-widest text-gray-400 mb-4 flex items-center gap-2">
                            <BarChart3 className="w-4 h-4" /> About Project
                        </h3>
                        <p className="text-gray-600 leading-relaxed">
                            {project.description || 'No description provided.'}
                        </p>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <div className="bg-white p-4 rounded-xl border border-gray-100 shadow-sm flex items-center gap-3">
                            <div className="w-10 h-10 rounded-lg bg-indigo-50 flex items-center justify-center text-indigo-600">
                                <Calendar className="w-5 h-5" />
                            </div>
                            <div>
                                <p className="text-[10px] uppercase font-bold text-gray-400 tracking-tight">Created</p>
                                <p className="text-sm font-bold text-gray-900">{new Date(project.created_at).toLocaleDateString()}</p>
                            </div>
                        </div>
                        <div className="bg-white p-4 rounded-xl border border-gray-100 shadow-sm flex items-center gap-3">
                            <div className={`w-10 h-10 rounded-lg flex items-center justify-center ${project.status === 'Alumni' ? 'bg-amber-50 text-amber-600' : 'bg-green-50 text-green-600'}`}>
                                {project.status === 'Alumni' ? <GraduationCap className="w-5 h-5" /> : <BarChart3 className="w-5 h-5" />}
                            </div>
                            <div>
                                <p className="text-[10px] uppercase font-bold text-gray-400 tracking-tight">Status</p>
                                <p className="text-sm font-bold text-gray-900">{project.status}</p>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Sidebar / Investor Readiness */}
                <div className="space-y-6">
                    <div className="bg-indigo-600 rounded-xl p-6 text-white shadow-lg overflow-hidden relative">
                        <Presentation className="absolute -bottom-4 -right-4 w-24 h-24 opacity-10" />
                        <h3 className="text-lg font-bold mb-2 flex items-center gap-2">
                            Investor Ready
                        </h3>
                        <p className="text-indigo-100 text-xs mb-6 font-medium leading-relaxed">
                            Pitch decks and financial summaries are consolidated for investor review.
                        </p>

                        {project.pitch_url ? (
                            <a
                                href={project.pitch_url}
                                target="_blank"
                                className="w-full bg-white text-indigo-600 py-2 rounded-lg text-xs font-bold flex items-center justify-center gap-2 hover:bg-indigo-50 transition-colors shadow-sm"
                            >
                                <ExternalLink className="w-3.5 h-3.5" />
                                VIEW PITCH DECK
                            </a>
                        ) : (
                            <div className="w-full bg-indigo-500/50 text-indigo-200 py-2 rounded-lg text-xs font-bold flex items-center justify-center gap-2 cursor-not-allowed">
                                NO DECK UPLOADED
                            </div>
                        )}
                    </div>

                    <div className="bg-white shadow-sm rounded-xl p-6 border border-gray-100 italic text-center">
                        <p className="text-xs text-gray-400">Activity feed and progress metrics coming in the next release.</p>
                    </div>
                </div>
            </div>
        </div>
    )
}
