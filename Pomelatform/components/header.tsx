'use client';

import { Wallet } from 'lucide-react';

export function Header() {
    return (
        <header className="h-16 border-b bg-card flex items-center justify-between px-6 sticky top-0 z-10">
            <div className="flex items-center gap-4">
                {/* Breadcrumbs or Page Title could go here */}
                <h2 className="text-lg font-semibold">Dashboard</h2>
            </div>

            <div className="flex items-center gap-4">
                <button
                    className="flex items-center gap-2 px-4 py-2 text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 rounded-lg transition-colors opacity-80 cursor-not-allowed"
                    title="Coming Soon"
                >
                    <Wallet className="h-4 w-4" />
                    Connect Wallet (Soon)
                </button>
            </div>
        </header>
    );
}
