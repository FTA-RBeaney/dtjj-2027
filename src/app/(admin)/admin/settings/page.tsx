'use client';

import { useEffect, useState } from 'react';

import Field from '@/components/field';
import Panel from '@/components/panel';
import { PASSES } from '@/lib/data';
import { createClient } from '@/lib/supabase/client';
import { Avatar } from '@/registry/new-york-v4/ui/avatar';

import { Building2, CalendarDays, MapPin, Plus, Tags, Trash2, UserCog } from 'lucide-react';

const SettingsPage = () => {
    const supabase = createClient();
    const [fest, setFest] = useState({ name: '', start: '', end: '' });
    const [teamMembers, setTeamMembers] = useState([]);

    const fetchEventData = async () => {
        const { data, error } = await supabase
            .from('events')
            .select()
            .eq('id', '5295af10-2d18-446b-a7ad-7cf097f5f7d2')
            .single();

        if (error) {
            console.log('error', error);
        }

        if (data) {
            setFest({
                name: data.name,
                start: data.start_date,
                end: data.end_date
            });
        }
    };

    const fetchTeamMembers = async () => {
        const { data, error } = await supabase.from('profiles').select('*').eq('is_team_member', true);

        if (error) {
            console.log('error', error);
        }

        if (data) {
            setTeamMembers(data);
        }
    };

    useEffect(() => {
        fetchEventData();
        fetchTeamMembers();
    }, []);

    const [types, setTypes] = useState(PASSES.map((p) => ({ name: p.name, price: p.price, cap: p.cap })));
    const [venues, setVenues] = useState([
        { name: 'Main Hall', address: 'Unit3 Studios, Hackney', cap: 320 },
        { name: 'Studio A', address: 'Unit3 Studios, Hackney', cap: 80 },
        { name: 'Studio B', address: 'Unit3 Studios, Hackney', cap: 60 }
    ]);
    const [tDraft, setTDraft] = useState({ name: '', price: '', cap: '' });
    const [vDraft, setVDraft] = useState({ name: '', address: '', cap: '' });

    const addType = () => {
        if (!tDraft.name.trim()) return;
        setTypes([...types, { name: tDraft.name, price: Number(tDraft.price) || 0, cap: Number(tDraft.cap) || 0 }]);
        setTDraft({ name: '', price: '', cap: '' });
    };
    const addVenue = () => {
        if (!vDraft.name.trim()) return;
        setVenues([...venues, { name: vDraft.name, address: vDraft.address, cap: Number(vDraft.cap) || 0 }]);
        setVDraft({ name: '', address: '', cap: '' });
    };

    return (
        <div className='mx-auto max-w-3xl space-y-5'>
            {/* festival details */}
            <Panel className='p-6'>
                <div className='mb-5 flex items-center gap-2'>
                    <CalendarDays size={17} className='t-accent' />
                    <h3 className='ff-display t-main text-lg font-semibold'>Festival Details</h3>
                </div>
                <div className='grid grid-cols-1 gap-4 sm:grid-cols-2'>
                    <Field label='Festival name' className='sm:col-span-2'>
                        <input
                            className='field w-full rounded-lg px-3 py-2 text-sm'
                            value={fest.name}
                            onChange={(e) => setFest({ ...fest, name: e.target.value })}
                        />
                    </Field>
                    <Field label='Start date'>
                        <input
                            type='date'
                            className='field w-full rounded-lg px-3 py-2 text-sm'
                            value={fest.start}
                            onChange={(e) => setFest({ ...fest, start: e.target.value })}
                        />
                    </Field>
                    <Field label='End date'>
                        <input
                            type='date'
                            className='field w-full rounded-lg px-3 py-2 text-sm'
                            value={fest.end}
                            onChange={(e) => setFest({ ...fest, end: e.target.value })}
                        />
                    </Field>
                </div>
            </Panel>

            {/* ticket types */}
            <Panel className='p-6'>
                <div className='mb-5 flex items-center gap-2'>
                    <Tags size={17} className='t-accent' />
                    <h3 className='ff-display t-main text-lg font-semibold'>Ticket Types</h3>
                </div>
                <div className='space-y-2'>
                    {types.map((t, i) => (
                        <div key={i} className='bg-s2 grid grid-cols-12 items-center gap-2 rounded-lg px-3 py-2.5'>
                            <span className='t-main col-span-6 text-sm font-medium'>{t.name}</span>
                            <span className='t-muted col-span-2 text-sm'>£{t.price}</span>
                            <span className='t-faint col-span-3 text-xs'>cap {t.cap}</span>
                            <button
                                className='t-faint col-span-1 flex justify-end hover:text-rose-500'
                                onClick={() => setTypes(types.filter((_, j) => j !== i))}>
                                <Trash2 size={15} />
                            </button>
                        </div>
                    ))}
                </div>
                <div className='bdr mt-4 grid grid-cols-12 gap-2 border-t pt-4'>
                    <input
                        placeholder='Pass name'
                        className='field col-span-5 rounded-lg px-3 py-2 text-sm'
                        value={tDraft.name}
                        onChange={(e) => setTDraft({ ...tDraft, name: e.target.value })}
                    />
                    <input
                        placeholder='£ price'
                        className='field col-span-3 rounded-lg px-3 py-2 text-sm'
                        value={tDraft.price}
                        onChange={(e) => setTDraft({ ...tDraft, price: e.target.value })}
                    />
                    <input
                        placeholder='Capacity'
                        className='field col-span-2 rounded-lg px-3 py-2 text-sm'
                        value={tDraft.cap}
                        onChange={(e) => setTDraft({ ...tDraft, cap: e.target.value })}
                    />
                    <button
                        className='btn-accent col-span-2 flex items-center justify-center gap-1 rounded-lg text-sm font-semibold hover:opacity-90'
                        onClick={addType}>
                        <Plus size={15} /> Add
                    </button>
                </div>
            </Panel>

            {/* venues */}
            <Panel className='p-6'>
                <div className='mb-5 flex items-center gap-2'>
                    <Building2 size={17} className='t-accent' />
                    <h3 className='ff-display t-main text-lg font-semibold'>Venues & Rooms</h3>
                </div>
                <div className='space-y-2'>
                    {venues.map((v, i) => (
                        <div key={i} className='bg-s2 grid grid-cols-12 items-center gap-2 rounded-lg px-3 py-2.5'>
                            <span className='t-main col-span-4 text-sm font-medium'>{v.name}</span>
                            <span className='t-muted col-span-5 flex items-center gap-1 text-xs'>
                                <MapPin size={12} /> {v.address}
                            </span>
                            <span className='t-faint col-span-2 text-xs'>cap {v.cap}</span>
                            <button
                                className='t-faint col-span-1 flex justify-end hover:text-rose-500'
                                onClick={() => setVenues(venues.filter((_, j) => j !== i))}>
                                <Trash2 size={15} />
                            </button>
                        </div>
                    ))}
                </div>
                <div className='bdr mt-4 grid grid-cols-12 gap-2 border-t pt-4'>
                    <input
                        placeholder='Venue / room'
                        className='field col-span-4 rounded-lg px-3 py-2 text-sm'
                        value={vDraft.name}
                        onChange={(e) => setVDraft({ ...vDraft, name: e.target.value })}
                    />
                    <input
                        placeholder='Address'
                        className='field col-span-4 rounded-lg px-3 py-2 text-sm'
                        value={vDraft.address}
                        onChange={(e) => setVDraft({ ...vDraft, address: e.target.value })}
                    />
                    <input
                        placeholder='Capacity'
                        className='field col-span-2 rounded-lg px-3 py-2 text-sm'
                        value={vDraft.cap}
                        onChange={(e) => setVDraft({ ...vDraft, cap: e.target.value })}
                    />
                    <button
                        className='btn-accent col-span-2 flex items-center justify-center gap-1 rounded-lg text-sm font-semibold hover:opacity-90'
                        onClick={addVenue}>
                        <Plus size={15} /> Add
                    </button>
                </div>
            </Panel>

            {/* team members */}
            <Panel className='p-6'>
                <div className='mb-5 flex items-center gap-2'>
                    <UserCog size={17} className='t-accent' />
                    <h3 className='ff-display t-main text-lg font-semibold'>Team Members</h3>
                </div>
                <div className='space-y-2'>
                    {teamMembers.map((m) => (
                        <div key={m.id} className='bg-s2 flex items-center gap-3 rounded-lg px-3 py-2.5'>
                            <Avatar>
                                {m.avatar_url ? (
                                    <img src={m.avatar_url} alt={m.full_name} />
                                ) : (
                                    <span className='t-faint flex h-8 w-8 items-center justify-center rounded-full text-xs font-bold'>
                                        {m.full_name.slice(0, 2).toUpperCase()}
                                    </span>
                                )}
                            </Avatar>
                            <span className='t-main text-sm font-medium'>{m.full_name}</span>
                        </div>
                    ))}
                </div>
            </Panel>
        </div>
    );
};

export default SettingsPage;
