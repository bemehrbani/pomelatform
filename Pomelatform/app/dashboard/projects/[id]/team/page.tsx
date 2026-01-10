import { getProjectMembers } from '@/lib/project-team';
import { addTeamMember, removeTeamMember, signAgreement } from './actions';
import { UserPlus, Trash2, User, FileCheck, ShieldAlert } from 'lucide-react';
import { getUser } from '@/lib/auth-service';

export default async function ProjectTeamPage({ params }: { params: Promise<{ id: string }> }) {
    const { id } = await params;
    const members = await getProjectMembers(id);
    const currentUser = await getUser();

    const currentUserMember = members.find(m => m.user_id === currentUser?.id);
    const canSign = currentUserMember && !currentUserMember.is_agreement_signed;

    return (
        <div className="space-y-6">
            {canSign && (
                <div className="bg-amber-50 border border-amber-200 rounded-lg p-4 flex items-start gap-3">
                    <ShieldAlert className="w-5 h-5 text-amber-600 shrink-0 mt-0.5" />
                    <div className="flex-1">
                        <h4 className="text-sm font-bold text-amber-900">Pending Action: Sign Agreement</h4>
                        <p className="text-sm text-amber-700 mt-1">
                            Your cofounder/member agreement for this project is ready for review.
                        </p>
                        <form action={async () => {
                            'use server';
                            await signAgreement(id);
                        }} className="mt-3">
                            <button className="bg-amber-600 hover:bg-amber-700 text-white text-xs font-bold py-1.5 px-3 rounded flex items-center gap-2 transition-colors">
                                <FileCheck className="w-3.5 h-3.5" />
                                SIGN AGREEMENT
                            </button>
                        </form>
                    </div>
                </div>
            )}

            <div className="bg-white shadow rounded-lg border border-gray-100 p-6">
                <div className="flex justify-between items-center mb-6">
                    <h3 className="text-lg font-medium leading-6 text-gray-900">Project Team</h3>
                    <AddMemberForm projectId={id} />
                </div>

                <div className="overflow-x-auto">
                    <table className="min-w-full divide-y divide-gray-200 border rounded-lg">
                        <thead className="bg-gray-50 uppercase text-[10px] tracking-widest text-gray-500 font-bold">
                            <tr>
                                <th className="px-6 py-3 text-left">Member</th>
                                <th className="px-6 py-3 text-left">Role</th>
                                <th className="px-6 py-3 text-left">Equity</th>
                                <th className="px-6 py-3 text-left">Agreement</th>
                                <th className="px-6 py-3 text-right">Actions</th>
                            </tr>
                        </thead>
                        <tbody className="bg-white divide-y divide-gray-200">
                            {members.map((member) => (
                                <tr key={member.id} className="hover:bg-gray-50/50 transition-colors">
                                    <td className="px-6 py-4 whitespace-nowrap">
                                        <div className="flex items-center">
                                            <div className="flex-shrink-0 h-9 w-9">
                                                {member.profile.avatar_url ? (
                                                    /* eslint-disable-next-line @next/next/no-img-element */
                                                    <img className="h-9 w-9 rounded-full object-cover ring-2 ring-gray-100" src={member.profile.avatar_url} alt="" />
                                                ) : (
                                                    <div className="h-9 w-9 rounded-full bg-indigo-50 flex items-center justify-center text-indigo-600 border border-indigo-100">
                                                        <User className="w-4 h-4" />
                                                    </div>
                                                )}
                                            </div>
                                            <div className="ml-3">
                                                <div className="text-sm font-bold text-gray-900 leading-tight">{member.profile.full_name || 'Unknown User'}</div>
                                                <div className="text-[11px] text-gray-400">{member.profile.email}</div>
                                            </div>
                                        </div>
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap">
                                        <span className="px-2 py-0.5 inline-flex text-[10px] font-bold rounded-full bg-gray-100 text-gray-600 border border-gray-200 uppercase tracking-tighter">
                                            {member.role}
                                        </span>
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-indigo-600">
                                        {member.equity_percent}%
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap">
                                        {member.is_agreement_signed ? (
                                            <span className="flex items-center gap-1.5 text-green-600 text-xs font-bold">
                                                <FileCheck className="w-3.5 h-3.5" />
                                                SIGNED
                                            </span>
                                        ) : (
                                            <span className="text-gray-400 text-xs font-medium italic">PENDING</span>
                                        )}
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                                        <form action={async () => {
                                            'use server';
                                            await removeTeamMember(id, member.id);
                                        }}>
                                            <button type="submit" className="text-gray-300 hover:text-red-600 transition-colors">
                                                <Trash2 className="w-4 h-4" />
                                            </button>
                                        </form>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
}

function AddMemberForm({ projectId }: { projectId: string }) {
    return (
        <form action={async (formData) => {
            'use server';
            const email = formData.get('email') as string;
            const equity = Number(formData.get('equity')) || 0;
            if (!email) return;
            await addTeamMember(projectId, email, equity);
        }} className="flex gap-2">
            <input
                type="email"
                name="email"
                placeholder="Email address"
                required
                className="rounded-lg border-gray-200 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 text-xs border px-3 py-2 w-48"
            />
            <div className="relative">
                <input
                    type="number"
                    name="equity"
                    placeholder="0"
                    max="100"
                    min="0"
                    className="rounded-lg border-gray-200 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 text-xs border px-3 py-2 w-20 pr-6"
                />
                <span className="absolute right-2 top-2 text-[10px] text-gray-400">%</span>
            </div>
            <button type="submit" className="inline-flex items-center px-4 py-2 border border-transparent text-xs font-bold rounded-lg text-white bg-indigo-600 hover:bg-indigo-700 transition-colors shadow-sm">
                <UserPlus className="w-4 h-4 mr-1.5" />
                ADD
            </button>
        </form>
    );
}
