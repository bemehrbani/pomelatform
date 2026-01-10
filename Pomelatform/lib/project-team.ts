import { createClient } from '@/lib/supabase/server';
import { cache } from 'react';

export interface ProjectMember {
    id: string; // from project_members table
    user_id: string;
    role: string;
    equity_percent: number;
    payment_terms: string | null;
    is_agreement_signed: boolean;
    joined_at: string;
    profile: {
        full_name: string;
        email: string;
        avatar_url: string;
    };
}

export const getProjectMembers = cache(async (projectId: string) => {
    const supabase = await createClient();

    const { data, error } = await supabase
        .from('project_members')
        .select(`
            id,
            user_id,
            role,
            equity_percent,
            payment_terms,
            is_agreement_signed,
            joined_at,
            profile:public.profiles(full_name, email, avatar_url)
        `)
        .eq('project_id', projectId);

    if (error) {
        console.error('Error fetching project members:', error);
        return [];
    }

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    return data.map((item: any) => ({
        id: item.id,
        user_id: item.user_id,
        role: item.role,
        equity_percent: item.equity_percent,
        payment_terms: item.payment_terms,
        is_agreement_signed: item.is_agreement_signed,
        joined_at: item.joined_at,
        profile: item.profile
    })) as ProjectMember[];
});

export const searchUsers = async (query: string) => {
    const supabase = await createClient();

    // Simple search by email or full name
    const { data, error } = await supabase
        .from('profiles')
        .select('id, full_name, email, avatar_url')
        .or(`email.ilike.%${query}%,full_name.ilike.%${query}%`)
        .limit(5);

    if (error) return [];
    return data;
};
