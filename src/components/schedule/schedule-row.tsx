'use client';

function ScheduleRow({ e }) {
    return (
        <div className='hover-s2 flex items-center gap-3 rounded-lg px-2 py-2.5 transition-colors'>
            <div className='bg-s2 flex w-12 shrink-0 flex-col items-center rounded-lg py-1.5'>
                <span className='t-accent text-[10px] font-semibold tracking-wide'>{e.day}</span>
                <span className='t-muted text-xs font-medium'>{e.time}</span>
            </div>
            <div className='min-w-0 flex-1'>
                <div className='t-main truncate text-sm font-medium'>{e.title}</div>
                <div className='t-faint truncate text-xs'>
                    {e.sub} · {e.room}
                </div>
            </div>
            <span
                className={`shrink-0 rounded px-1.5 py-0.5 text-[10px] font-medium ${e.tag === 'Social' ? 'bg-soft t-accent' : 'bg-s2 t-muted'}`}>
                {e.tag}
            </span>
        </div>
    );
}

export default ScheduleRow;
