'use client';

import { ArrowDownRight, ArrowUpRight } from 'lucide-react';

function StatCard({ label, value, sub, trend, up, icon: Icon, delay }) {
    return (
        <div className='animate-fadeUp surface card rounded-2xl p-5' style={{ animationDelay: `${delay}ms` }}>
            <div className='flex items-center justify-between'>
                <span className='t-faint text-[11px] font-medium tracking-[0.14em] uppercase'>{label}</span>
                <span className='bg-soft t-accent flex h-8 w-8 items-center justify-center rounded-lg'>
                    <Icon size={15} strokeWidth={2} />
                </span>
            </div>
            <div className='ff-display t-main mt-4 text-3xl font-semibold tracking-tight'>{value}</div>
            <div className='mt-2 flex items-center gap-1.5 text-xs'>
                {trend && (
                    <span
                        className={`flex items-center gap-0.5 font-medium ${up ? 'text-emerald-500' : 'text-rose-500'}`}>
                        {up ? <ArrowUpRight size={13} /> : <ArrowDownRight size={13} />}
                        {trend}
                    </span>
                )}
                <span className='t-faint'>{sub}</span>
            </div>
        </div>
    );
}

export default StatCard;
