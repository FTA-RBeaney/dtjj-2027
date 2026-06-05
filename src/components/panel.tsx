import React from 'react';

function Panel({ children, className = '', delay = 0 }) {
    return (
        <div
            className={`animate-fadeUp surface card rounded-2xl ${className}`}
            style={{ animationDelay: `${delay}ms` }}>
            {children}
        </div>
    );
}

export default Panel;
