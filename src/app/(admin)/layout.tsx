import { type ReactNode } from 'react';

import AdminSidebar from '@/components/admin/admin-sidebar';
import { Bell, Plus, Search } from 'lucide-react';

import ThemeSwitch from '@/app/(delete-this-and-modify-page.tsx)/ThemeSwitch';

const AdminLayout = ({ children }: { children: ReactNode }) => (
    <div className='ff-body bg-base t-main min-h-screen w-full'>
        <div className='flex min-h-screen'>
            <AdminSidebar />
            <main className='flex-1 overflow-x-hidden'>
                <header
                    className='surface sticky top-0 z-10 flex items-center justify-between gap-4 px-6 py-4'
                    style={{ borderWidth: '0 0 1px 0' }}>
                    <div>
                        <h1 className='ff-display t-main text-xl font-semibold'>Nav</h1>
                        <p className='t-faint text-xs'>Downtown Jazz Jam 2026 · admin</p>
                    </div>
                    <div className='flex items-center gap-2'>
                        <div className='bdr hidden items-center gap-2 rounded-lg border px-3 py-2 sm:flex'>
                            <Search size={15} className='t-faint' />
                            <input
                                placeholder='Search…'
                                className='t-main w-36 bg-transparent text-sm focus:outline-none'
                                style={{ caretColor: 'var(--accent-solid)' }}
                            />
                        </div>
                        <ThemeSwitch />
                        <button className='bdr t-muted relative flex h-9 w-9 items-center justify-center rounded-lg border hover:opacity-80'>
                            <Bell size={16} />
                            <span
                                className='absolute top-2 right-2 h-1.5 w-1.5 rounded-full'
                                style={{ background: 'var(--accent-solid)' }}
                            />
                        </button>
                        <button className='btn-accent flex items-center gap-1.5 rounded-lg px-3 py-2 text-sm font-semibold hover:opacity-90'>
                            <Plus size={16} /> New
                        </button>
                    </div>
                </header>
                <div className='p-6'>{children}</div>
            </main>
        </div>
    </div>
);

export default AdminLayout;
