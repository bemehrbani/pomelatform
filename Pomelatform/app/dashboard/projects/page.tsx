import { getProjects } from '@/lib/projects';
import { getUserRole } from '@/lib/auth-service';
import { getUser } from '@/lib/auth-service';
import { ProjectCardDB } from '@/components/projects/project-card-db';
import { ClientProjectHeader } from './client-header';

export default async function ProjectsDashboardPage() {
    const projects = await getProjects();
    const user = await getUser();
    const role = user ? await getUserRole(user.id) : null;

    const canCreate = role === 'Partner' || role === 'Founder';

    return (
        <div className="space-y-8">
            <ClientProjectHeader canCreate={canCreate} />

            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
                {projects.length > 0 ? (
                    projects.map((project) => (
                        <ProjectCardDB key={project.id} project={project} />
                    ))
                ) : (
                    <div className="col-span-full text-center py-12 bg-gray-50 rounded-lg border border-dashed">
                        <h3 className="text-lg font-medium text-gray-900">No projects found</h3>
                        <p className="text-sm text-gray-500 mt-1">Get started by creating a new project.</p>
                    </div>
                )}
            </div>
        </div>
    );
}
