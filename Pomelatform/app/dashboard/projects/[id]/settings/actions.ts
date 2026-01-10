'use server';

import { createClient } from '@/lib/supabase/server';
import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation';

export async function updateProjectSettings(projectId: string, formData: FormData) {
    const supabase = await createClient();

    const title = formData.get('title') as string;
    const description = formData.get('description') as string;
    const status = formData.get('status') as string;
    const pitch_url = formData.get('pitch_url') as string;

    const { error } = await supabase
        .from('projects')
        .update({
            title,
            description,
            status,
            pitch_url,
            updated_at: new Date().toISOString()
        })
        .eq('id', projectId);

    if (error) {
        return { error: error.message };
    }

    revalidatePath(`/dashboard/projects/${projectId}`);
    return { success: true };
}

export async function deleteProject(projectId: string) {
    const supabase = await createClient();

    const { error } = await supabase
        .from('projects')
        .delete()
        .eq('id', projectId);

    if (error) {
        return { error: error.message };
    }

    redirect('/dashboard/projects');
}
