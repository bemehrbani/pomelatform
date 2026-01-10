'use client';

import { useState } from 'react';
import { Plus } from 'lucide-react';
import { CreateProjectModal } from '@/components/projects/create-project-modal';

export function ClientProjectHeader({ canCreate }: { canCreate: boolean }) {
    const [isModalOpen, setIsModalOpen] = useState(false);

    return (
        <>
            <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-4 border-b border-gray-200 pb-6">
                <div>
                    <h1 className="text-3xl font-bold tracking-tight text-gray-900">
                        Studio Projects
                    </h1>
                    <p className="text-muted-foreground mt-2 max-w-2xl">
                        Manage all active, on-hold, and completed projects within the studio.
                    </p>
                </div>

                {canCreate && (
                    <button
                        onClick={() => setIsModalOpen(true)}
                        className="flex items-center gap-2 px-4 py-2 text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 rounded-lg transition-colors shadow-sm"
                    >
                        <Plus className="w-4 h-4" />
                        New Project
                    </button>
                )}
            </div>

            <CreateProjectModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />
        </>
    );
}
