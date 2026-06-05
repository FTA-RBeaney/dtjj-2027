import { MoreHorizontal } from 'lucide-react';

const badgeClass = { Paid: 'badge-ok', Pending: 'badge-warn', Refunded: 'badge-neutral' };

const initials = (n) =>
    n
        .split(' ')
        .map((x) => x[0])
        .join('')
        .slice(0, 2);

function OrdersTable({ rows, compact }) {
    return (
        <table className='w-full text-sm'>
            <thead>
                <tr className='t-faint text-left text-[11px] tracking-wider uppercase'>
                    <th className='px-6 py-3 font-medium'>Attendee</th>
                    <th className='px-6 py-3 font-medium'>Pass</th>
                    <th className='px-6 py-3 font-medium'>Amount</th>
                    <th className='px-6 py-3 font-medium'>Status</th>
                    {!compact && <th className='px-6 py-3 font-medium'>Date</th>}
                    <th className='px-6 py-3'></th>
                </tr>
            </thead>
            <tbody>
                {rows.map((o) => (
                    <tr key={o.name} className='bdr hover-s2 border-t transition-colors'>
                        <td className='px-6 py-3.5'>
                            <div className='flex items-center gap-3'>
                                <span className='avatar flex h-8 w-8 items-center justify-center rounded-full text-xs font-semibold'>
                                    {initials(o.name)}
                                </span>
                                <span className='t-main font-medium'>{o.name}</span>
                            </div>
                        </td>
                        <td className='t-muted px-6 py-3.5'>{o.pass}</td>
                        <td className='t-main px-6 py-3.5 font-medium'>£{o.amount}</td>
                        <td className='px-6 py-3.5'>
                            <span
                                className={`rounded-md border px-2 py-0.5 text-xs font-medium ${badgeClass[o.status]}`}>
                                {o.status}
                            </span>
                        </td>
                        {!compact && <td className='t-faint px-6 py-3.5'>{o.when}</td>}
                        <td className='px-6 py-3.5 text-right'>
                            <button className='t-faint hover:opacity-70'>
                                <MoreHorizontal size={16} />
                            </button>
                        </td>
                    </tr>
                ))}
            </tbody>
        </table>
    );
}

export default OrdersTable;
