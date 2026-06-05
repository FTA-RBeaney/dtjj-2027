'use client';
import { useEffect, useState } from 'react';

import Link from 'next/link';

import { createClient } from '@/lib/supabase/client';
import { Avatar } from '@/registry/new-york-v4/ui/avatar';
import { Badge } from '@/registry/new-york-v4/ui/badge';

import {
    ArrowDownRight,
    ArrowUpRight,
    Bell,
    Building2,
    CalendarDays,
    ChevronRight,
    LayoutDashboard,
    Mail,
    MapPin,
    MessageSquare,
    Moon,
    MoreHorizontal,
    Music2,
    Plus,
    PoundSterling,
    Search,
    Settings,
    Sun,
    Tags,
    Ticket,
    Trash2,
    TrendingUp,
    UserCog,
    UserPlus,
    Users
} from 'lucide-react';
import { url } from 'node:inspector';

const NAV = [
    { id: 'overview', label: 'Overview', icon: LayoutDashboard, url: '/admin' },
    { id: 'tickets', label: 'Tickets', icon: Ticket, url: '/admin/tickets' },
    { id: 'attendees', label: 'Attendees', icon: Users, url: '/admin/attendees' },
    { id: 'schedule', label: 'Schedule', icon: CalendarDays, url: '/admin/schedule' },
    { id: 'performers', label: 'Performers', icon: Music2, url: '/admin/performers' },
    { id: 'team', label: 'Team', icon: UserCog, url: '/admin/team' },
    { id: 'comms', label: 'Comms', icon: MessageSquare, url: '/admin/comms' },
    { id: 'settings', label: 'Settings', icon: Settings, url: '/admin/settings' }
];
function AdminSidebar() {
    const active = false;
    const supabase = createClient();
    const [profile, setProfile] = useState<{ full_name: string; avatar_url: string } | null>(null);

    const fetchUser = async () => {
        const {
            data: { user }
        } = await supabase.auth.getUser();

        const { data: profile } = await supabase.from('profiles').select().eq('id', user?.id).single();

        setProfile(profile);
    };

    useEffect(() => {
        fetchUser();
    }, []);

    return (
        <aside className='surface hidden w-60 shrink-0 flex-col px-3 py-5 md:flex' style={{ borderWidth: '0 1px 0 0' }}>
            <div className='flex items-center gap-2.5 px-3 pb-6'>
                <span className='btn-accent flex h-9 w-9 items-center justify-center rounded-lg text-sm font-bold'>
                    DJ
                </span>
                <div className='leading-tight'>
                    <div className='ff-display t-main text-base font-bold'>Downtown</div>
                    <div className='t-accent text-[10px] tracking-[0.22em] uppercase'>Jazz Jam</div>
                </div>
            </div>
            <nav className='flex-1 space-y-1'>
                {NAV.map((n) => {
                    return (
                        <Link
                            href={n.url}
                            passHref
                            key={n.id}
                            className={`flex w-full items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium transition-colors ${active ? 'bg-soft t-accent' : 't-muted hover-s2'}`}>
                            <n.icon size={17} strokeWidth={2} />
                            {n.label}
                            {active && (
                                <span
                                    className='ml-auto h-1.5 w-1.5 rounded-full'
                                    style={{ background: 'var(--accent-solid)' }}
                                />
                            )}
                        </Link>
                    );
                })}
            </nav>
            <Link href='/admin/profile' className='bdr mt-4 flex items-center gap-3 rounded-lg border px-3 py-2.5'>
                <Avatar>
                    {profile?.avatar_url ? (
                        <img
                            src={profile.avatar_url}
                            alt={profile.full_name}
                            className='h-full w-full rounded-full object-cover'
                        />
                    ) : (
                        <span className='avatar flex h-full w-full items-center justify-center rounded-full text-sm font-bold'>
                            {profile?.full_name[0]?.toUpperCase() ?? '?'}
                        </span>
                    )}
                </Avatar>

                <div className='min-w-0 leading-tight'>
                    <div className='t-main truncate text-sm font-medium'>{profile?.full_name}</div>
                    {profile?.user_role === 'admin' && (
                        <Badge size='sm' variant='secondary' className='t-accent mt-0.5'>
                            Admin
                        </Badge>
                    )}
                </div>
            </Link>
        </aside>
    );
}

export default AdminSidebar;
