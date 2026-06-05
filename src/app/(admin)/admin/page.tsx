'use client';

import { useEffect, useState } from 'react';

import OrdersTable from '@/components/admin/orders-table';
import StatCard from '@/components/admin/stat-card';
import Panel from '@/components/panel';
import ScheduleRow from '@/components/schedule/schedule-row';
import { PASSES } from '@/lib/data';
import { createClient } from '@/lib/supabase/client';

import { CalendarDays, ChevronRight, PoundSterling, Ticket, TrendingUp } from 'lucide-react';
import { Area, AreaChart, CartesianGrid, ResponsiveContainer, Tooltip, XAxis, YAxis } from 'recharts';

const TOTAL_SOLD = PASSES.reduce((a, p) => a + p.sold, 0);
const TOTAL_CAP = PASSES.reduce((a, p) => a + p.cap, 0);
const GROSS = PASSES.reduce((a, p) => a + p.sold * p.price, 0);

const SALES = [
    { week: 'Wk 1', tickets: 6, revenue: 870 },
    { week: 'Wk 2', tickets: 11, revenue: 1430 },
    { week: 'Wk 3', tickets: 9, revenue: 1185 },
    { week: 'Wk 4', tickets: 14, revenue: 1990 },
    { week: 'Wk 5', tickets: 22, revenue: 2820 },
    { week: 'Wk 6', tickets: 31, revenue: 4115 },
    { week: 'Wk 7', tickets: 28, revenue: 3650 },
    { week: 'Wk 8', tickets: 41, revenue: 5380 },
    { week: 'Wk 9', tickets: 45, revenue: 6240 },
    { week: 'Wk 10', tickets: 40, revenue: 5795 }
];

const chart = {
    line: '#d97706',
    grid: '#ece8df',
    tick: '#a8a29e',
    top: 'rgba(217,119,6,0.18)',
    bot: 'rgba(217,119,6,0)',
    cursor: 'rgba(217,119,6,0.3)',
    tipBg: '#ffffff',
    tipBorder: '#e8e4db',
    tipText: '#57534e',
    tipAccent: '#b45309'
};

const ORDERS = [
    { name: 'Amara Okafor', pass: 'Full Pass', amount: 145, status: 'Paid', when: '2h ago' },
    { name: 'James Whitfield', pass: 'Party Pass', amount: 75, status: 'Paid', when: '5h ago' },
    { name: 'Sofia Marchetti', pass: 'Full Pass', amount: 145, status: 'Pending', when: '6h ago' },
    { name: 'Daniel Cohen', pass: 'Saturday Pass', amount: 45, status: 'Paid', when: 'Yesterday' },
    { name: 'Priya Nair', pass: 'Full Pass', amount: 145, status: 'Paid', when: 'Yesterday' },
    { name: 'Tom Bevan', pass: 'Taster', amount: 15, status: 'Paid', when: '2 days ago' },
    { name: 'Lena Fischer', pass: 'Party Pass', amount: 75, status: 'Refunded', when: '2 days ago' },
    { name: 'Marcus Adeyemi', pass: 'Full Pass', amount: 145, status: 'Paid', when: '3 days ago' }
];

const SCHEDULE = [
    {
        day: 'FRI',
        time: '19:30',
        title: 'Opening Social',
        sub: 'ft. The Hot Club Quartet',
        room: 'Main Hall',
        tag: 'Social'
    },
    { day: 'SAT', time: '10:00', title: 'Lindy Hop Fundamentals', sub: 'Rob & Eliza', room: 'Studio A', tag: 'Class' },
    { day: 'SAT', time: '14:00', title: 'Jazz Roots & Solo', sub: 'Delphine Aubert', room: 'Studio B', tag: 'Class' },
    {
        day: 'SAT',
        time: '20:00',
        title: 'Saturday Night Stomp',
        sub: 'ft. Live Big Band',
        room: 'Main Hall',
        tag: 'Social'
    },
    { day: 'SUN', time: '11:00', title: 'Balboa Intensive', sub: 'Marco & Yuki', room: 'Studio A', tag: 'Class' },
    {
        day: 'SUN',
        time: '19:00',
        title: 'Closing Jam & Cabaret',
        sub: 'All performers',
        room: 'Main Hall',
        tag: 'Social'
    }
];

/**
 * The main page component that renders the HomePage component.
 *
 * @returns {JSX.Element} The rendered HomePage component.
 */
const Page = () => {
    const supabase = createClient();
    const [fest, setFest] = useState({ name: '', start: '', end: '' });

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

    useEffect(() => {
        fetchEventData();
    }, []);

    const timeToFestival = Math.max(
        0,
        Math.ceil((new Date(fest.start).getTime() - Date.now()) / (1000 * 60 * 60 * 24))
    );

    const Tip = ({ active, payload, label }) => {
        if (!active || !payload || !payload.length) return null;
        const d = payload[0].payload;
        return (
            <div
                className='ff-body rounded-lg px-3 py-2 text-xs shadow-xl'
                style={{ background: chart.tipBg, border: `1px solid ${chart.tipBorder}` }}>
                <div className='mb-1 font-medium' style={{ color: chart.tipText }}>
                    {label}
                </div>
                <div style={{ color: chart.tipAccent }}>
                    £{d.revenue.toLocaleString()} · {d.tickets} passes
                </div>
            </div>
        );
    };

    return (
        <div className='space-y-6'>
            <div className='grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4'>
                <StatCard
                    label='Tickets Sold'
                    value={TOTAL_SOLD}
                    sub='this week'
                    trend='+18'
                    up
                    icon={Ticket}
                    delay={0}
                />
                <StatCard
                    label='Gross Revenue'
                    value={`£${GROSS.toLocaleString()}`}
                    sub='this week'
                    trend='+£2,610'
                    up
                    icon={PoundSterling}
                    delay={60}
                />
                <StatCard
                    label='Capacity Filled'
                    value={`${Math.round((TOTAL_SOLD / TOTAL_CAP) * 100)}%`}
                    sub='Full Pass 92% gone'
                    icon={TrendingUp}
                    delay={120}
                />
                <StatCard
                    label='Days to Festival'
                    value={timeToFestival}
                    sub={`Starts ${new Date(fest.start).toLocaleDateString()}`}
                    icon={CalendarDays}
                    delay={180}
                />
            </div>

            <div className='grid grid-cols-1 gap-4 lg:grid-cols-3'>
                <Panel className='p-6 lg:col-span-2' delay={220}>
                    <div className='mb-5 flex items-start justify-between'>
                        <div>
                            <h3 className='ff-display t-main text-lg font-semibold'>Pass Sales</h3>
                            <p className='t-faint text-xs'>Weekly, since on-sale</p>
                        </div>
                        <span className='bdr t-muted rounded-lg border px-2.5 py-1 text-xs'>10 weeks</span>
                    </div>
                    <div style={{ height: 240 }}>
                        <ResponsiveContainer width='100%' height='100%'>
                            <AreaChart data={SALES} margin={{ top: 4, right: 4, left: -18, bottom: 0 }}>
                                <defs>
                                    <linearGradient id='amberFill' x1='0' y1='0' x2='0' y2='1'>
                                        <stop
                                            offset='0%'
                                            stopColor={chart.line}
                                            stopOpacity={chart.top.includes('0.18') ? 0.18 : 0.32}
                                        />
                                        <stop offset='100%' stopColor={chart.line} stopOpacity={0} />
                                    </linearGradient>
                                </defs>
                                <CartesianGrid strokeDasharray='3 3' stroke={chart.grid} vertical={false} />
                                <XAxis
                                    dataKey='week'
                                    tick={{ fill: chart.tick, fontSize: 11 }}
                                    axisLine={false}
                                    tickLine={false}
                                />
                                <YAxis tick={{ fill: chart.tick, fontSize: 11 }} axisLine={false} tickLine={false} />
                                <Tooltip content={<Tip />} cursor={{ stroke: chart.cursor, strokeWidth: 1 }} />
                                <Area
                                    type='monotone'
                                    dataKey='tickets'
                                    stroke={chart.line}
                                    strokeWidth={2.5}
                                    fill='url(#amberFill)'
                                />
                            </AreaChart>
                        </ResponsiveContainer>
                    </div>
                </Panel>

                <Panel className='p-6' delay={280}>
                    <h3 className='ff-display t-main mb-5 text-lg font-semibold'>Pass Mix</h3>
                    <div className='space-y-4'>
                        {PASSES.map((p, i) => {
                            const pct = Math.round((p.sold / p.cap) * 100);
                            return (
                                <div key={p.name}>
                                    <div className='mb-1.5 flex items-center justify-between text-sm'>
                                        <span className='t-muted'>{p.name}</span>
                                        <span className='t-faint'>
                                            {p.sold}/{p.cap}
                                        </span>
                                    </div>
                                    <div className='bg-s2 h-2 overflow-hidden rounded-full'>
                                        <div
                                            className='h-full rounded-full'
                                            style={{
                                                width: `${pct}%`,
                                                background: 'var(--accent-solid)',
                                                opacity: 1 - i * 0.13
                                            }}
                                        />
                                    </div>
                                </div>
                            );
                        })}
                    </div>
                </Panel>
            </div>

            <div className='grid grid-cols-1 gap-4 lg:grid-cols-3'>
                <Panel className='overflow-hidden lg:col-span-2' delay={320}>
                    <div className='bdr flex items-center justify-between border-b px-6 py-4'>
                        <h3 className='ff-display t-main text-lg font-semibold'>Recent Orders</h3>
                        <button className='t-accent flex items-center gap-1 text-xs font-medium hover:opacity-80'>
                            View all <ChevronRight size={13} />
                        </button>
                    </div>
                    <OrdersTable rows={ORDERS.slice(0, 5)} compact />
                </Panel>

                <Panel className='p-6' delay={360}>
                    <h3 className='ff-display t-main mb-4 text-lg font-semibold'>Programme</h3>
                    <div className='space-y-1'>
                        {SCHEDULE.slice(0, 4).map((e) => (
                            <ScheduleRow key={e.title} e={e} />
                        ))}
                    </div>
                </Panel>
            </div>
        </div>
    );
};

export default Page;
