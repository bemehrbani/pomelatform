'use server';

import { createClient } from '@/lib/supabase/server';
import { revalidatePath } from 'next/cache';

export async function addTeamMember(projectId: string, email: string, equity_percent: number = 0, payment_terms: string = '') {
    const supabase = await createClient();

    // 1. Find user by email
    const { data: user, error: userError } = await supabase
        .from('profiles')
        .select('id')
        .eq('email', email)
        .single();

    if (userError || !user) {
        return { error: 'User not found with this email.' };
    }

    // 2. Add to project_members
    const { error: insertError } = await supabase
        .from('project_members')
        .insert({
            project_id: projectId,
            user_id: user.id,
            role: 'Member',
            equity_percent,
            payment_terms
        });

    if (insertError) {
        if (insertError.code === '23505') { // Unique violation
            return { error: 'User is already a member of this project.' };
        }
        return { error: insertError.message };
    }

    revalidatePath(`/dashboard/projects/${projectId}/team`);
    return { success: true };
}

export async function removeTeamMember(projectId: string, memberId: string) {
    const supabase = await createClient();

    const { error } = await supabase
        .from('project_members')
        .delete()
        .eq('id', memberId)
        .eq('project_id', projectId); // Security check to ensure deletion is within project context

    if (error) {
        return { error: error.message };
    }

    revalidatePath(`/dashboard/projects/${projectId}/team`);
    return { success: true };
}

export async function signAgreement(projectId: string) {
    const supabase = await createClient();
    const { data: { user } } = await supabase.auth.getUser();

    if (!user) return { error: 'Not authenticated' };

    const { error } = await supabase
        .from('project_members')
        .update({ is_agreement_signed: true })
        .eq('project_id', projectId)
        .eq('user_id', user.id);

    if (error) return { error: error.message };

    revalidatePath(`/dashboard/projects/${projectId}/team`);
    return { success: true };
}

