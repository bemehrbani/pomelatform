
import { notFound } from 'next/navigation';
import { projects } from '@/lib/projects-data';
import { ArrowLeft, ExternalLink, Github, Users, Calendar, Code2, Globe, Activity } from 'lucide-react';
import Link from 'next/link';
import { use } from 'react';

// Next.js 16/React 19 params handling
export default function ProjectDetailPage({ params }: { params: Promise<{ id: string }> }) {
    const { id } = use(params);
    const project = projects.find(p => p.id === id);

    if (!project) {
        notFound();
    }

    return (
        <div className="max-w-5xl mx-auto space-y-8 p-6">
            {/* Back Link */}
            <Link href="/" className="inline-flex items-center text-sm text-gray-500 hover:text-gray-900 transition-colors">
                <ArrowLeft className="w-4 h-4 mr-1" />
                Back to Dashboard
            </Link>

            {/* Hero Section */}
            <div className="bg-white rounded-2xl border border-gray-200 p-8 shadow-sm relative overflow-hidden">
                <div className="absolute top-0 right-0 p-8 opacity-5 pointer-events-none">
                    <Globe className="w-96 h-96 text-gray-900" />
                </div>

                <div className="relative z-10">
                    <div className="flex items-center gap-3 mb-6">
                        <span className="px-3 py-1 rounded-full text-xs font-semibold bg-gray-900 text-white uppercase tracking-wider">
                            {project.type}
                        </span>
                        <span className="px-3 py-1 rounded-full text-xs font-medium bg-gray-100 text-gray-700 border border-gray-200">
                            {project.stage}
                        </span>
                        <span className="px-3 py-1 rounded-full text-xs font-medium bg-green-50 text-green-700 border border-green-200">
                            {project.status}
                        </span>
                    </div>

                    <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">{project.name}</h1>
                    <p className="text-lg md:text-xl text-gray-600 max-w-3xl leading-relaxed">
                        {project.fullDescription || project.description}
                    </p>

                    <div className="mt-8 flex flex-wrap gap-4">
                        {project.url && (
                            <a
                                href={project.url}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="inline-flex items-center px-6 py-3 rounded-xl bg-indigo-600 text-white font-medium hover:bg-indigo-700 transition-colors shadow-sm hover:shadow-md"
                            >
                                <ExternalLink className="w-4 h-4 mr-2" />
                                Visit {new URL(project.url).hostname}
                            </a>
                        )}
                        {project.path && (
                            <div className="inline-flex items-center px-4 py-3 rounded-xl bg-gray-50 border border-gray-200 text-gray-700 font-medium font-mono text-xs shadow-sm select-all">
                                <Code2 className="w-4 h-4 mr-2 text-gray-500" />
                                {project.path}
                            </div>
                        )}
                    </div>
                </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                {/* Main Content Column */}
                <div className="lg:col-span-2 space-y-8">
                    {/* Showcase Mockup Placeholder */}
                    <div className="bg-gray-100/50 rounded-2xl border border-gray-200 aspect-video flex items-center justify-center relative overflow-hidden group hover:shadow-md transition-shadow">
                        {project.showcaseImage ? (
                            // eslint-disable-next-line @next/next/no-img-element
                            <img src={project.showcaseImage} alt={`${project.name} showcase`} className="w-full h-full object-cover" />
                        ) : (
                            <div className="text-center p-8">
                                {project.url ? (
                                    <div className="space-y-4">
                                        <div className="w-20 h-20 bg-white rounded-full flex items-center justify-center mx-auto shadow-sm text-gray-400 group-hover:text-indigo-600 group-hover:scale-110 transition-all duration-300">
                                            <ExternalLink className="w-10 h-10" />
                                        </div>
                                        <div className="space-y-1">
                                            <p className="text-gray-500 font-medium">Live Preview</p>
                                            <p className="text-sm text-gray-400">Click the 'Visit' button to see it live</p>
                                        </div>
                                    </div>
                                ) : (
                                    <div className="text-center text-gray-400">
                                        <Code2 className="w-20 h-20 mx-auto mb-4 opacity-20" />
                                        <p className="font-medium">Internal Project</p>
                                        <p className="text-sm opacity-60">No public preview available</p>
                                    </div>
                                )}
                            </div>
                        )}
                    </div>

                    {/* Team Section */}
                    <div className="bg-white rounded-2xl border border-gray-200 p-8 shadow-sm">
                        <h2 className="text-xl font-bold text-gray-900 mb-6 flex items-center gap-2">
                            <Users className="w-5 h-5 text-indigo-600" />
                            Team Members
                        </h2>
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                            {project.team.map((member, i) => (
                                <div key={i} className="flex items-center gap-4 p-4 rounded-xl border border-gray-100 bg-gray-50/50 hover:bg-white hover:border-gray-200 transition-colors">
                                    <div className="w-12 h-12 rounded-full bg-indigo-100 flex items-center justify-center text-indigo-700 font-bold text-lg shadow-inner">
                                        {member.name.split(' ').map(n => n[0]).join('')}
                                    </div>
                                    <div>
                                        <div className="font-semibold text-gray-900">{member.name}</div>
                                        <div className="text-sm text-indigo-600 font-medium">{member.role}</div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>

                {/* Sidebar Column */}
                <div className="space-y-6">
                    {/* Tech Stack */}
                    <div className="bg-white rounded-2xl border border-gray-200 p-6 shadow-sm">
                        <h3 className="text-sm font-semibold text-gray-500 uppercase tracking-wider mb-4 flex items-center gap-2">
                            <Code2 className="w-4 h-4" /> Technology
                        </h3>
                        <div className="flex flex-wrap gap-2">
                            {project.tags.map(tag => (
                                <span key={tag} className="px-3 py-1.5 rounded-lg text-sm font-medium bg-gray-50 text-gray-700 border border-gray-200 hover:bg-gray-100 transition-colors cursor-default">
                                    {tag}
                                </span>
                            ))}
                        </div>
                    </div>

                    {/* Status Card */}
                    <div className="bg-white rounded-2xl border border-gray-200 p-6 shadow-sm">
                        <h3 className="text-sm font-semibold text-gray-500 uppercase tracking-wider mb-4 flex items-center gap-2">
                            <Activity className="w-4 h-4" /> Activity
                        </h3>

                        <div className="space-y-6">
                            <div>
                                <div className="text-xs text-gray-400 mb-1">Last Updated</div>
                                <div className="font-medium text-gray-900 flex items-center gap-2 bg-gray-50 p-3 rounded-lg border border-gray-100">
                                    <Calendar className="w-4 h-4 text-gray-500" />
                                    {new Date(project.lastUpdated).toLocaleDateString()}
                                </div>
                            </div>

                            {project.nextStep && (
                                <div className="pt-2 border-t border-gray-100">
                                    <div className="text-xs text-indigo-600 font-bold mb-2">IMMEDIATE NEXT STEP</div>
                                    <div className="text-sm text-gray-700 bg-indigo-50 p-4 rounded-xl border border-indigo-100 leading-relaxed relative">
                                        <div className="absolute -left-1 top-6 w-1 h-8 bg-indigo-400 rounded-full" />
                                        {project.nextStep}
                                    </div>
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
