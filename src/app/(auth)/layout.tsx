import { type ReactNode } from 'react';

const AuthLayout = ({ children }: { children: ReactNode }) => (
    <div className='ff-body bg-base t-main min-h-screen w-full'>{children}</div>
);

export default AuthLayout;
