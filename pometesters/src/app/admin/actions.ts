'use server'

import { cookies } from 'next/headers'
import { redirect } from 'next/navigation'
import db from '@/lib/db'
import { sendInviteEmail } from '@/lib/email'
import { revalidatePath } from 'next/cache'

export async function loginAction(prevState: any, formData: FormData) {
    const password = formData.get('password')
    const adminPassword = process.env.ADMIN_PASSWORD || 'admin123'

    if (password === adminPassword) {
        const cookieStore = await cookies()
        cookieStore.set('admin_session', 'true', { httpOnly: true, path: '/' })
        redirect('/admin/dashboard')
    } else {
        return { error: 'Invalid password' }
    }
}

export async function logoutAction() {
    const cookieStore = await cookies()
    cookieStore.delete('admin_session')
    redirect('/admin/login')
}

export async function sendInviteAction(testerId: string) {
    const tester = await db.tester.findUnique({
        where: { id: testerId }
    })

    if (!tester) return { error: 'Tester not found' }

    try {
        await sendInviteEmail(tester.email, tester.token)
        await db.tester.update({
            where: { id: testerId },
            data: { invitedAt: new Date() }
        })
        revalidatePath('/admin/dashboard')
        return { success: true }
    } catch (error) {
        console.error('Failed to send email:', error)
        return { error: 'Failed to send email' }
    }
}
