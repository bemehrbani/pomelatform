import { getProjectById } from '@/lib/projects';
import { notFound } from 'next/navigation';
import { updateProjectSettings, deleteProject } from './actions';
import { AlertTriangle, Save, Trash2, Presentation, LayoutGrid, Info } from 'lucide-react';

export default async function ProjectSettingsPage({ params }: { params: Promise<{ id: string }> }) {
    const { id } = await params;
    const project = await getProjectById(id);

    if (!project) notFound();

    return (
        <div className="space-y-8 max-w-4xl">
            {/* General Settings */}
            <div className="bg-white shadow-sm rounded-xl border border-gray-100 p-8">
                <div className="flex items-center gap-3 mb-8 border-b border-gray-50 pb-4">
                    <LayoutGrid className="w-5 h-5 text-indigo-600" />
                    <div>
                        <h3 className="text-lg font-bold text-gray-900">General Settings</h3>
                        <p className="text-xs text-gray-400">Core identity and project mission</p>
                    </div>
                </div>

                <form action={async (formData) => {
                    'use server';
                    await updateProjectSettings(id, formData);
                }} className="space-y-6">
                    <div className="grid grid-cols-1 gap-y-6 sm:grid-cols-6 gap-x-6">
                        <div className="sm:col-span-4">
                            <label className="block text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-1.5">Project Title</label>
                            <input
                                type="text"
                                name="title"
                                defaultValue={project.title}
                                className="w-full text-sm border-gray-200 rounded-lg p-3 border focus:ring-2 focus:ring-indigo-500 transition-all font-medium"
                            />
                        </div>

                        <div className="sm:col-span-2">
                            <label className="block text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-1.5">Status</label>
                            <select
                                name="status"
                                defaultValue={project.status}
                                className="w-full text-sm border-gray-200 rounded-lg p-3 border bg-white focus:ring-2 focus:ring-indigo-500 transition-all font-medium"
                            >
                                <option>Active</option>
                                <option>On Hold</option>
                                <option>Completed</option>
                                <option>Alumni</option>
                            </select>
                        </div>

                        <div className="sm:col-span-6">
                            <label className="block text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-1.5">Description</label>
                            <textarea
                                name="description"
                                rows={4}
                                defaultValue={project.description || ''}
                                className="w-full text-sm border-gray-200 rounded-lg p-3 border focus:ring-2 focus:ring-indigo-500 transition-all font-medium"
                            />
                        </div>

                        <div className="sm:col-span-6 border-t border-gray-50 pt-6">
                            <div className="flex items-center gap-2 mb-4">
                                <Presentation className="w-4 h-4 text-indigo-600" />
                                <h4 className="text-sm font-bold text-gray-900">Investor Readiness</h4>
                            </div>
                            <label className="block text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-1.5">Pitch Deck URL</label>
                            <input
                                type="url"
                                name="pitch_url"
                                defaultValue={project.pitch_url || ''}
                                placeholder="https://gamma.app/..."
                                className="w-full text-sm border-gray-200 rounded-lg p-3 border focus:ring-2 focus:ring-indigo-500 transition-all font-medium"
                            />
                            <p className="mt-2 text-[10px] text-gray-400 flex items-center gap-1">
                                <Info className="w-3 h-3" /> External link to your pitch deck (e.g., Gamma, Canva, Google Slides)
                            </p>
                        </div>
                    </div>

                    <div className="flex justify-end pt-4">
                        <button
                            type="submit"
                            className="bg-gray-900 text-white px-6 py-2.5 rounded-lg text-xs font-bold hover:bg-gray-800 transition-all shadow-sm flex items-center gap-2"
                        >
                            <Save className="w-3.5 h-3.5" />
                            SAVE CHANGES
                        </button>
                    </div>
                </form>
            </div>

            {/* Danger Zone */}
            <div className="bg-red-50/50 rounded-xl border border-red-100 p-8">
                <div className="flex items-center gap-3 mb-4">
                    <div className="p-2 bg-red-100 rounded-lg">
                        <AlertTriangle className="w-5 h-5 text-red-600" />
                    </div>
                    <div>
                        <h3 className="text-lg font-bold text-red-900">Danger Zone</h3>
                        <p className="text-xs text-red-700/60 font-medium leading-relaxed">
                            Deleting a project is irreversible. All team member associations and data will be wiped.
                        </p>
                    </div>
                </div>

                <form action={async () => {
                    'use server';
                    await deleteProject(id);
                }} className="mt-6">
                    <button
                        type="submit"
                        className="bg-red-600 text-white px-6 py-2.5 rounded-lg text-xs font-bold hover:bg-red-700 transition-all shadow-sm flex items-center gap-2"
                    >
                        <Trash2 className="w-3.5 h-3.5" />
                        DELETE PROJECT PERMANENTLY
                    </button>
                </form>
            </div>
        </div>
    );
}
