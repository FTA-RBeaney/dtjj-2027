import Link from 'next/link';

import { Music2 } from 'lucide-react';

const HomePage = () => (
    <div className='flex flex-col items-center justify-center py-24 text-center'>
        <div
            className='mb-6 flex h-16 w-16 items-center justify-center rounded-2xl'
            style={{ background: 'var(--accent-solid)' }}>
            <Music2 size={28} style={{ color: 'var(--accent-solid-text)' }} />
        </div>
        <h1 className='ff-display t-main mb-2 text-3xl font-bold'>Downtown Jazz Jam 2027</h1>
        <p className='t-faint mb-8 max-w-sm text-sm'>Festival management portal. Head to the admin dashboard to manage tickets, attendees, and schedule.</p>
        <Link
            href='/admin'
            className='btn-accent inline-flex items-center gap-2 rounded-lg px-5 py-2.5 text-sm font-semibold hover:opacity-90'>
            Go to dashboard
        </Link>
    </div>
);

export default HomePage;
