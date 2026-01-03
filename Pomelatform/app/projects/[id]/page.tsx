
import { notFound } from 'next/navigation';
import { projects } from '@/lib/projects-data';
import { ArrowLeft, ExternalLink, Github, Users, Calendar, Code2, Globe } from 'lucide-react';
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
                <div className="absolute top-0 right-0 p-8 opacity-10">
                    <Globe className="w-64 h-64 text-gray-900" />
                </div>

                <div className="relative z-10">
                    <div className="flex items-center gap-3 mb-4">
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

                    <h1 className="text-4xl font-bold text-gray-900 mb-4">{project.name}</h1>
                    <p className="text-xl text-gray-600 max-w-2xl">{project.description}</p>

                    <div className="mt-8 flex flex-wrap gap-4">
                        {project.url && (
                            <a
                                href={project.url}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="inline-flex items-center px-5 py-2.5 rounded-lg bg-indigo-600 text-white font-medium hover:bg-indigo-700 transition-colors shadow-sm"
                            >
                                <ExternalLink className="w-4 h-4 mr-2" />
                                Visit Website
                            </a>
                        )}
                        {project.path && (
                            <div className="inline-flex items-center px-4 py-2.5 rounded-lg bg-white border border-gray-300 text-gray-700 font-medium font-mono text-xs shadow-sm">
                                <Code2 className="w-4 h-4 mr-2 text-gray-500" />
                                {project.path.split('/').pop()}
                            </div>
                        )}
                    </div>
                </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                {/* Main Content Column */}
                <div className="md:col-span-2 space-y-8">
                    {/* Showcase Mockup Placeholder */}
                    <div className="bg-gray-100 rounded-xl border border-gray-200 aspect-video flex items-center justify-center relative overflow-hidden group">
                        {project.url ? (
                            <div className="text-center">
                                <div className="w-16 h-16 bg-white rounded-full flex items-center justify-center mx-auto mb-4 shadow-sm text-gray-400 group-hover:text-indigo-600 transition-colors">
                                    <ExternalLink className="w-8 h-8" />
                                </div>
                                <p className="text-gray-500 font-medium">Preview available at</p>
                                <p className="text-indigo-600 font-semibold">{new URL(project.url).hostname}</p>
                            </div>
                        ) : (
                            <div className="text-center text-gray-400">
                                <Code2 className="w-16 h-16 mx-auto mb-4 opacity-50" />
                                <p>Internal MVP - No public preview</p>
                            </div>
                        )}
                    </div>

                    {/* Team Section */}
                    <div>
                        <h2 className="text-xl font-bold text-gray-900 mb-4 flex items-center gap-2">
                            <Users className="w-5 h-5" />
                            Team Members
                        </h2>
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                            {project.team.map((member, i) => (
                                <div key={i} className="flex items-center gap-4 p-4 rounded-xl border border-gray-200 bg-white hover:border-gray-300 transition-colors">
                                    <div className="w-10 h-10 rounded-full bg-indigo-50 flex items-center justify-center text-indigo-700 font-bold text-sm">
                                        {member.name.split(' ').map(n => n[0]).join('')}
                                    </div>
                                    <div>
                                        <div className="font-medium text-gray-900">{member.name}</div>
                                        <div className="text-xs text-gray-500">{member.role}</div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>

                {/* Sidebar Column */}
                <div className="space-y-6">
                    {/* Status Card */}
                    <div className="bg-white rounded-xl border border-gray-200 p-6 shadow-sm">
                        <h3 className="text-sm font-semibold text-gray-500 uppercase tracking-wider mb-4">Project Details</h3>

                        <div className="space-y-4">
                            <div>
                                <div className="text-xs text-gray-400 mb-0.5">Last Updated</div>
                                <div className="font-medium text-gray-900 flex items-center gap-2">
                                    <Calendar className="w-4 h-4 text-gray-400" />
                                    {new Date(project.lastUpdated).toLocaleDateString()}
                                </div>
                            </div>

                            {project.nextStep && (
                                <div className="pt-4 border-t border-gray-100">
                                    <div className="text-xs text-indigo-600 font-bold mb-1">IMMEDIATE NEXT STEP</div>
                                    <div className="text-sm text-gray-700 bg-indigo-50 p-3 rounded-lg border border-indigo-100">
                                        {project.nextStep}
                                    </div>
                                </div>
                            )}
                        </div>
                    </div>

                    {/* Tech Stack */}
                    <div className="bg-white rounded-xl border border-gray-200 p-6 shadow-sm">
                        <h3 className="text-sm font-semibold text-gray-500 uppercase tracking-wider mb-4">Technology</h3>
                        <div className="flex flex-wrap gap-2">
                            {project.tags.map(tag => (
                                <span key={tag} className="px-2.5 py-1 rounded-md text-xs font-medium bg-gray-50 text-gray-600 border border-gray-200">
                                    {tag}
                                </span>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
