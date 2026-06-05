import React from 'react';

function Field({ label, children, className = '' }) {
    return (
        <label className={`block ${className}`}>
            <span className='t-faint mb-1.5 block text-[11px] font-medium tracking-wider uppercase'>{label}</span>
            {children}
        </label>
    );
}

export default Field;
