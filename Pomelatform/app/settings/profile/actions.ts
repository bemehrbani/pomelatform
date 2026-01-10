'use server'

import { createClient } from '@/lib/supabase/server'
import { revalidatePath } from 'next/cache'

export async function updateProfile(formData: FormData) {
    const supabase = await createClient()

    const { data: { user } } = await supabase.auth.getUser()

    if (!user) {
        return { error: 'Not authenticated' }
    }

    const full_name = formData.get('full_name') as string
    const avatar_url = formData.get('avatar_url') as string

    // 1. Update Supabase Auth Metadata (optional, but good for quick access)
    const { error: authError } = await supabase.auth.updateUser({
        data: { full_name, avatar_url }
    })

    if (authError) {
        return { error: authError.message }
    }

    // 2. Update public.profiles table (The source of truth for our app)
    const { error: profileError } = await supabase
        .from('profiles')
        .update({
            full_name,
            avatar_url,
            updated_at: new Date().toISOString()
        })
        .eq('id', user.id)

    if (profileError) {
        return { error: profileError.message }
    }

    revalidatePath('/', 'layout')
    return { success: true }
}
