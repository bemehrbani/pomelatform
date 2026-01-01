import db from '@/lib/db'
import { revalidatePath } from 'next/cache'

async function getTesters() {
    return await db.tester.findMany({
        orderBy: { invitedAt: 'desc' }
    })
}

async function addTester(formData: FormData) {
    'use server'

    const email = formData.get('email') as string
    const name = formData.get('name') as string
    const role = formData.get('role') as string

    // Simple unique token generation
    const token = Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15)

    if (!email || !role) return

    await db.tester.create({
        data: {
            email,
            name,
            role,
            token,
            status: 'INVITED'
        }
    })

    revalidatePath('/admin/dashboard')
}

export default async function AdminDashboard() {
    const testers = await getTesters()

    const total = testers.length
    const activated = testers.filter(t => t.status !== 'INVITED').length
    const completed = testers.filter(t => t.status === 'COMPLETED').length

    return (
        <div className="space-y-6">
            {/* Stats */}
            <div className="grid grid-cols-1 gap-5 sm:grid-cols-3">
                <div className="bg-white overflow-hidden shadow rounded-lg p-5">
                    <dt className="text-sm font-medium text-gray-700 truncate">Total Invited</dt>
                    <dd className="mt-1 text-3xl font-semibold text-gray-900">{total}</dd>
                </div>
                <div className="bg-white overflow-hidden shadow rounded-lg p-5">
                    <dt className="text-sm font-medium text-gray-700 truncate">Activated</dt>
                    <dd className="mt-1 text-3xl font-semibold text-gray-900">{activated}</dd>
                </div>
                <div className="bg-white overflow-hidden shadow rounded-lg p-5">
                    <dt className="text-sm font-medium text-gray-700 truncate">Completed</dt>
                    <dd className="mt-1 text-3xl font-semibold text-gray-900">{completed}</dd>
                </div>
            </div>

            {/* Add Tester Form */}
            <div className="bg-white shadow sm:rounded-lg p-6">
                <h3 className="text-lg leading-6 font-medium text-gray-900 mb-4">Add New Tester</h3>
                <form action={addTester} className="grid grid-cols-1 gap-y-6 gap-x-4 sm:grid-cols-6">
                    <div className="sm:col-span-2">
                        <label htmlFor="name" className="block text-sm font-medium text-gray-900">Name</label>
                        <input type="text" name="name" id="name" className="mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md p-2 border text-gray-900" />
                    </div>
                    <div className="sm:col-span-2">
                        <label htmlFor="email" className="block text-sm font-medium text-gray-900">Email</label>
                        <input type="email" name="email" id="email" required className="mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md p-2 border text-gray-900" />
                    </div>
                    <div className="sm:col-span-2">
                        <label htmlFor="role" className="block text-sm font-medium text-gray-900">Role</label>
                        <select name="role" id="role" className="mt-1 block w-full py-2 px-3 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm text-gray-900">
                            <option>Consultant</option>
                            <option>Manager</option>
                            <option>CEO</option>
                            <option>Strategy</option>
                            <option>Other</option>
                        </select>
                    </div>
                    <div className="sm:col-span-6">
                        <button type="submit" className="inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
                            Add Tester
                        </button>
                    </div>
                </form>
            </div>

            {/* Tester List */}
            <div className="flex flex-col">
                <div className="-my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
                    <div className="py-2 align-middle inline-block min-w-full sm:px-6 lg:px-8">
                        <div className="shadow overflow-hidden border-b border-gray-200 sm:rounded-lg">
                            <table className="min-w-full divide-y divide-gray-200">
                                <thead className="bg-gray-50">
                                    <tr>
                                        <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-900 uppercase tracking-wider">Name</th>
                                        <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-900 uppercase tracking-wider">Role</th>
                                        <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-900 uppercase tracking-wider">Status</th>
                                        <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-900 uppercase tracking-wider">Feedback</th>
                                        <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-900 uppercase tracking-wider">Link (Dev)</th>
                                        <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-900 uppercase tracking-wider">Action</th>
                                    </tr>
                                </thead>
                                <tbody className="bg-white divide-y divide-gray-200">
                                    {testers.map((tester) => {
                                        let feedbackData = null
                                        try {
                                            feedbackData = tester.feedback ? JSON.parse(tester.feedback) : null
                                        } catch (e) { }

                                        return (
                                            <tr key={tester.id}>
                                                <td className="px-6 py-4 whitespace-nowrap">
                                                    <div className="text-sm font-medium text-gray-900">{tester.name}</div>
                                                    <div className="text-sm text-gray-500">{tester.email}</div>
                                                </td>
                                                <td className="px-6 py-4 whitespace-nowrap">
                                                    <span className="text-sm text-gray-900">{tester.role}</span>
                                                </td>
                                                <td className="px-6 py-4 whitespace-nowrap">
                                                    <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${tester.status === 'COMPLETED' ? 'bg-green-100 text-green-800' :
                                                        tester.status === 'ACTIVE' ? 'bg-blue-100 text-blue-800' :
                                                            'bg-yellow-100 text-yellow-800'
                                                        }`}>
                                                        {tester.status}
                                                    </span>
                                                </td>
                                                <td className="px-6 py-4 text-sm text-gray-500 max-w-xs truncate">
                                                    {feedbackData ? (
                                                        <div title={feedbackData.comment}>
                                                            <div className="font-bold flex items-center">
                                                                <span>{feedbackData.rating}/5</span>
                                                                <span className="ml-1 text-xs text-gray-400">({new Date(feedbackData.submittedAt).toLocaleDateString()})</span>
                                                            </div>
                                                            <div className="truncate text-xs">{feedbackData.comment}</div>
                                                        </div>
                                                    ) : (
                                                        <span className="text-gray-300">-</span>
                                                    )}
                                                </td>
                                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                                    /t/{tester.token}
                                                </td>
                                                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                                                    <form action={async () => {
                                                        'use server'
                                                        const { sendInviteAction } = await import('../actions')
                                                        await sendInviteAction(tester.id)
                                                    }}>
                                                        <button className="text-indigo-600 hover:text-indigo-900">Send Email</button>
                                                    </form>
                                                </td>
                                            </tr>
                                        )
                                    })}
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
