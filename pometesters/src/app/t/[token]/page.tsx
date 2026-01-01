import db from '@/lib/db'
import { notFound } from 'next/navigation'
import { revalidatePath } from 'next/cache'

async function getTester(token: string) {
    return await db.tester.findUnique({
        where: { token }
    })
}

async function startBeta(token: string) {
    'use server'
    await db.tester.update({
        where: { token },
        data: { status: 'ACTIVE', activatedAt: new Date() }
    })
    revalidatePath(`/t/${token}`)
}

async function markTask(token: string, tasksJson: string) {
    'use server'
    await db.tester.update({
        where: { token },
        data: { tasksCompleted: tasksJson }
    })
    revalidatePath(`/t/${token}`)
}

async function submitFeedback(token: string, formData: FormData) {
    'use server'
    const feedback = {
        rating: formData.get('rating'),
        comment: formData.get('comment'),
        submittedAt: new Date().toISOString()
    }

    await db.tester.update({
        where: { token },
        data: {
            status: 'COMPLETED',
            completedAt: new Date(),
            feedback: JSON.stringify(feedback)
        }
    })
    revalidatePath(`/t/${token}`)
}

export default async function TesterPage({ params }: { params: { token: string } }) {
    const { token } = await params
    const tester = await getTester(token)

    if (tester) {
        // "Fire and forget" update for lastSeenAt
        db.tester.update({
            where: { id: tester.id },
            data: { lastSeenAt: new Date() }
        }).catch(e => console.error('Failed to update lastSeen:', e))
    }

    if (!tester) notFound()

    // 1. Welcome Screen
    if (tester.status === 'INVITED') {
        return (
            <div className="min-h-screen bg-gray-50 flex flex-col justify-center py-12 sm:px-6 lg:px-8">
                <div className="sm:mx-auto sm:w-full sm:max-w-md">
                    <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
                        Welcome to VSMEExpress Beta
                    </h2>
                    <p className="mt-2 text-center text-sm text-gray-600">
                        Hi {tester.name || 'there'}, you've been invited to test our new ESG tool.
                    </p>
                </div>

                <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
                    <div className="bg-white py-8 px-4 shadow sm:rounded-lg sm:px-10">
                        <div className="space-y-6">
                            <div className="rounded-md bg-blue-50 p-4">
                                <div className="flex">
                                    <div className="ml-3">
                                        <h3 className="text-sm font-medium text-blue-800">Your Rewards</h3>
                                        <div className="mt-2 text-sm text-blue-700">
                                            <ul className="list-disc pl-5 space-y-1">
                                                <li>Free Beta Access</li>
                                                <li>50% Discount on ESGClick DMA</li>
                                                <li>1-hour ESG Consultation</li>
                                            </ul>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <form action={startBeta.bind(null, token)}>
                                <button type="submit" className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none">
                                    Start Testing
                                </button>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        )
    }

    // 2. Checklist & Feedback Screen (ACTIVE)
    if (tester.status === 'ACTIVE') {
        const tasks = [
            { id: 'profile', label: 'Create your Tester Profile' },
            { id: 'assessment', label: 'Run a Baseline Assessment' },
            { id: 'report', label: 'Generate a Report' },
        ]

        const completedTasks = JSON.parse(tester.tasksCompleted || '[]') as string[]

        return (
            <div className="min-h-screen bg-gray-100 py-12 px-4 sm:px-6 lg:px-8">
                <div className="max-w-3xl mx-auto space-y-8">
                    {/* Instructions Block */}
                    <div className="bg-white shadow overflow-hidden sm:rounded-lg p-6 border-l-4 border-indigo-500">
                        <h3 className="text-lg leading-6 font-medium text-gray-900">🚀 Instructions</h3>
                        <div className="mt-4 prose prose-indigo text-gray-500">
                            <p>
                                Thank you for helping us test <strong>VSMEExpress</strong>. Your goal is to run through the "Standard ESG Assessment" flow as if you were a real user.
                            </p>
                            <ol className="list-decimal pl-5 space-y-2 mt-2">
                                <li>Click the button below to open VSMEExpress in a new tab.</li>
                                <li>Create a temporary account (or use your existing pomegroup login).</li>
                                <li>Complete the tasks listed below in the checklist.</li>
                                <li>Come back here to mark them as done and submit your feedback.</li>
                            </ol>
                        </div>
                        <div className="mt-6">
                            <a
                                href="https://vsmeexpress.pomegroup.studio"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="inline-flex items-center px-6 py-3 border border-transparent text-base font-medium rounded-md shadow-sm text-white bg-indigo-600 hover:bg-indigo-700"
                            >
                                Open VSMEExpress Beta &rarr;
                            </a>
                        </div>
                    </div>

                    <div className="bg-white shadow overflow-hidden sm:rounded-lg">
                        <div className="px-4 py-5 sm:px-6">
                            <h3 className="text-lg leading-6 font-medium text-gray-900">Beta Checklist</h3>
                            <p className="mt-1 max-w-2xl text-sm text-gray-500">Complete these tasks to unlock your rewards.</p>
                        </div>
                        <div className="border-t border-gray-200 px-4 py-5 sm:p-0">
                            <dl className="sm:divide-y sm:divide-gray-200">
                                {tasks.map(task => {
                                    const isDone = completedTasks.includes(task.id)
                                    return (
                                        <div key={task.id} className="py-4 sm:py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6 flex items-center justify-between">
                                            <dt className="text-sm font-medium text-gray-500">{task.label}</dt>
                                            <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2 flex justify-end">
                                                <form action={async () => {
                                                    'use server'
                                                    const newTasks = isDone
                                                        ? completedTasks.filter(id => id !== task.id)
                                                        : [...completedTasks, task.id]
                                                    await markTask(token, JSON.stringify(newTasks))
                                                }}>
                                                    <button className={`px-3 py-1 rounded text-sm font-semibold ${isDone ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-800 hover:bg-gray-200'}`}>
                                                        {isDone ? 'Completed' : 'Mark as Done'}
                                                    </button>
                                                </form>
                                            </dd>
                                        </div>
                                    )
                                })}
                            </dl>
                        </div>
                    </div>

                    <div className="bg-white shadow sm:rounded-lg">
                        <div className="px-4 py-5 sm:p-6">
                            <h3 className="text-lg leading-6 font-medium text-gray-900">Feedback</h3>
                            <div className="mt-2 max-w-xl text-sm text-gray-500">
                                <p>Once you've tried the flow, let us know what you think.</p>
                            </div>
                            <form action={submitFeedback.bind(null, token)} className="mt-5 space-y-4">
                                <div>
                                    <label htmlFor="rating" className="block text-sm font-medium text-gray-700">Rating</label>
                                    <select id="rating" name="rating" className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm rounded-md border text-gray-900">
                                        <option value="5">Excellent</option>
                                        <option value="4">Good</option>
                                        <option value="3">Average</option>
                                        <option value="2">Poor</option>
                                        <option value="1">Terrible</option>
                                    </select>
                                </div>
                                <div>
                                    <label htmlFor="comment" className="block text-sm font-medium text-gray-700">Comments</label>
                                    <textarea id="comment" name="comment" rows={3} className="shadow-sm focus:ring-indigo-500 focus:border-indigo-500 mt-1 block w-full sm:text-sm border border-gray-300 rounded-md p-2 text-gray-900" placeholder="What did you like? What was confusing?"></textarea>
                                </div>
                                <button type="submit" className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
                                    Submit Feedback & Complete Beta
                                </button>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        )
    }

    // 3. Completed Screen
    return (
        <div className="min-h-screen bg-gray-50 flex flex-col justify-center py-12 sm:px-6 lg:px-8">
            <div className="sm:mx-auto sm:w-full sm:max-w-md text-center">
                <svg className="mx-auto h-12 w-12 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
                <h2 className="mt-6 text-3xl font-extrabold text-gray-900">Thank You!</h2>
                <p className="mt-2 text-sm text-gray-600">
                    Your feedback has been recorded. We will be in touch shortly with your rewards.
                </p>
            </div>
        </div>
    )
}
