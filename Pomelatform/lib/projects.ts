import { createClient } from '@/lib/supabase/server';
import { cache } from 'react';

export interface Project {
    id: string;
    title: string;
    description: string | null;
    status: 'Active' | 'On Hold' | 'Completed' | 'Alumni';
    owner_id: string;
    pitch_url: string | null;
    created_at: string;
}

export const getProjects = cache(async () => {
    const supabase = await createClient();

    const { data, error } = await supabase
        .from('projects')
        .select('*')
        .order('created_at', { ascending: false });

    if (error) {
        console.error('Error fetching projects:', error);
        return [];
    }

    return data as Project[];
});

export const getProjectById = cache(async (id: string) => {
    const supabase = await createClient();

    const { data, error } = await supabase
        .from('projects')
        .select('*')
        .eq('id', id)
        .single();

    if (error) {
        console.error('Error fetching project:', error);
        return null;
    }

    return data as Project;
});

export async function createProject(formData: FormData) {
    'use server';

    const supabase = await createClient();
    const { data: { user } } = await supabase.auth.getUser();

    if (!user) {
        return { error: 'Not authenticated' };
    }

    const title = formData.get('title') as string;
    const description = formData.get('description') as string;
    const status = 'Active';

    const { error } = await supabase
        .from('projects')
        .insert({
            title,
            description,
            status,
            owner_id: user.id
        });

    if (error) {
        return { error: error.message };
    }

    return { success: true };
}
