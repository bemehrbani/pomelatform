'use client';

import { Project } from '@/lib/projects';
import { Folder } from 'lucide-react';
import Link from 'next/link';

export function ProjectCardDB({ project }: { project: Project }) {
    return (
        <Link href={`/dashboard/projects/${project.id}`} className="block h-full">
            <div className="group relative overflow-hidden rounded-xl border border-gray-200 bg-white p-6 shadow-sm transition-all hover:border-indigo-300 hover:shadow-lg hover:-translate-y-1 h-full flex flex-col">
                <div className="flex items-start justify-between mb-4">
                    <div className="flex items-center gap-3">
                        <div className="p-2 rounded-lg bg-gray-50 border border-gray-200 shadow-sm group-hover:bg-white transition-colors flex items-center justify-center">
                            <Folder className="w-5 h-5 text-indigo-600" />
                        </div>
                        <div>
                            <h3 className="font-semibold text-lg tracking-tight text-gray-900 group-hover:text-indigo-600 transition-colors">
                                {project.title}
                            </h3>
                            <p className="text-xs text-muted-foreground mt-0.5">
                                Created on {new Date(project.created_at).toLocaleDateString()}
                            </p>
                        </div>
                    </div>
                    <span className="px-2.5 py-1 rounded-full text-xs font-medium border bg-gray-100 text-gray-700 border-gray-200 uppercase tracking-wider">
                        {project.status}
                    </span>
                </div>

                <p className="text-sm text-gray-500 line-clamp-3">
                    {project.description || 'No description provided.'}
                </p>
            </div>
        </Link>
    );
}
