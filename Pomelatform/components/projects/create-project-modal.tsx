'use client';

import { useState } from 'react';
import { createProject } from '@/lib/projects';
import { useRouter } from 'next/navigation';

export function CreateProjectModal({ isOpen, onClose }: { isOpen: boolean; onClose: () => void }) {
    const router = useRouter();
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    if (!isOpen) return null;

    async function handleSubmit(formData: FormData) {
        setLoading(true);
        setError(null);

        // Server Action
        const result = await createProject(formData);

        setLoading(false);

        if (result.error) {
            setError(result.error);
        } else {
            router.refresh();
            onClose();
        }
    }

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm">
            <div className="bg-card w-full max-w-md rounded-lg p-6 shadow-xl border">
                <h2 className="text-xl font-bold mb-4">Create New Project</h2>

                {error && (
                    <div className="bg-red-50 text-red-600 p-2 rounded text-sm mb-4">
                        {error}
                    </div>
                )}

                <form action={handleSubmit} className="space-y-4">
                    <div>
                        <label className="block text-sm font-medium mb-1">Project Title</label>
                        <input
                            name="title"
                            required
                            className="w-full p-2 rounded border bg-background"
                            placeholder="e.g. Website Redesign"
                        />
                    </div>

                    <div>
                        <label className="block text-sm font-medium mb-1">Description</label>
                        <textarea
                            name="description"
                            className="w-full p-2 rounded border bg-background"
                            placeholder="Project goals and details..."
                        />
                    </div>

                    <div className="flex justify-end gap-3 pt-4">
                        <button
                            type="button"
                            onClick={onClose}
                            className="px-4 py-2 text-sm font-medium hover:bg-secondary rounded-md"
                        >
                            Cancel
                        </button>
                        <button
                            type="submit"
                            disabled={loading}
                            className="px-4 py-2 text-sm font-medium bg-primary text-primary-foreground rounded-md hover:opacity-90 disabled:opacity-50"
                        >
                            {loading ? 'Creating...' : 'Create Project'}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
}
