import { getUser } from '@/lib/auth-service'
import { updateProfile } from './actions'
import { redirect } from 'next/navigation'

export default async function ProfileSettingsPage() {
    const user = await getUser()

    if (!user) {
        redirect('/login')
    }

    return (
        <div className="max-w-2xl mx-auto py-10">
            <h1 className="text-2xl font-bold mb-6">Profile Settings</h1>

            <div className="bg-card border rounded-lg p-6 space-y-6">
                <form action={updateProfile} className="space-y-4">
                    <div className="space-y-2">
                        <label htmlFor="email" className="text-sm font-medium">
                            Email
                        </label>
                        <input
                            type="text"
                            id="email"
                            disabled
                            defaultValue={user.email}
                            className="w-full p-2 rounded-md border bg-muted text-muted-foreground"
                        />
                        <p className="text-xs text-muted-foreground">Email cannot be changed.</p>
                    </div>

                    <div className="space-y-2">
                        <label htmlFor="full_name" className="text-sm font-medium">
                            Full Name
                        </label>
                        <input
                            type="text"
                            id="full_name"
                            name="full_name"
                            defaultValue={user.user_metadata?.full_name || ''}
                            className="w-full p-2 rounded-md border bg-background"
                            placeholder="Your Name"
                        />
                    </div>

                    <div className="space-y-2">
                        <label htmlFor="avatar_url" className="text-sm font-medium">
                            Avatar URL
                        </label>
                        <input
                            type="url"
                            id="avatar_url"
                            name="avatar_url"
                            defaultValue={user.user_metadata?.avatar_url || ''}
                            className="w-full p-2 rounded-md border bg-background"
                            placeholder="https://example.com/avatar.jpg"
                        />
                        <p className="text-xs text-muted-foreground">URL to your profile picture.</p>
                    </div>

                    <div className="pt-4">
                        <button
                            type="submit"
                            className="px-4 py-2 bg-primary text-primary-foreground rounded-md hover:bg-primary/90 font-medium"
                        >
                            Save Changes
                        </button>
                    </div>
                </form>
            </div>
        </div>
    )
}
