import { createClient } from '@/lib/supabase/server'
import { cache } from 'react'

export const getUser = cache(async () => {
    const supabase = await createClient()
    const { data: { user } } = await supabase.auth.getUser()
    return user
})

export const getUserRole = cache(async (userId: string) => {
    if (!userId) return null

    const supabase = await createClient()

    // Fetch user role from user_roles table joined with roles table
    const { data, error } = await supabase
        .from('user_roles')
        .select(`
            roles (
                name
            )
        `)
        .eq('user_id', userId)
        .single()

    if (error || !data || !data.roles) {
        return null
    }

    // @ts-expect-error - Supabase types might be loose here without full generation
    return data.roles.name as string
})
