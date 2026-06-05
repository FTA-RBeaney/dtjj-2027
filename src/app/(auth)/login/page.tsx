'use client';

import { useActionState } from 'react';

import Link from 'next/link';

import { login } from '@/app/actions/auth';
import { Loader2, Music2 } from 'lucide-react';

const LoginPage = () => {
    const [state, formAction, isPending] = useActionState(login, null);

    return (
        <div className='flex min-h-screen items-center justify-center px-4 py-12'>
            <div className='w-full max-w-sm'>
                <div className='mb-8 text-center'>
                    <div
                        className='mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-xl'
                        style={{ background: 'var(--accent-solid)' }}>
                        <Music2 size={22} style={{ color: 'var(--accent-solid-text)' }} />
                    </div>
                    <h1 className='ff-display t-main mb-1 text-2xl font-bold'>Welcome back</h1>
                    <p className='t-faint text-sm'>Sign in to Downtown Jazz Jam admin</p>
                </div>

                <div className='surface rounded-2xl p-8' style={{ boxShadow: 'var(--card-shadow)' }}>
                    <form action={formAction} className='space-y-5'>
                        {state?.error && (
                            <div
                                className='rounded-lg px-4 py-3 text-sm'
                                style={{
                                    background: 'rgba(220,38,38,0.08)',
                                    border: '1px solid rgba(220,38,38,0.2)',
                                    color: '#dc2626'
                                }}>
                                {state.error}
                            </div>
                        )}

                        <div>
                            <label className='t-faint mb-1.5 block text-[11px] font-medium tracking-wider uppercase'>
                                Email
                            </label>
                            <input
                                name='email'
                                type='email'
                                placeholder='you@example.com'
                                required
                                className='field w-full rounded-lg px-3 py-2.5 text-sm'
                                autoComplete='email'
                            />
                        </div>

                        <div>
                            <label className='t-faint mb-1.5 block text-[11px] font-medium tracking-wider uppercase'>
                                Password
                            </label>
                            <input
                                name='password'
                                type='password'
                                placeholder='••••••••'
                                required
                                className='field w-full rounded-lg px-3 py-2.5 text-sm'
                                autoComplete='current-password'
                            />
                        </div>

                        <button
                            type='submit'
                            disabled={isPending}
                            className='btn-accent flex w-full items-center justify-center gap-2 rounded-lg px-4 py-2.5 text-sm font-semibold hover:opacity-90 disabled:opacity-60'>
                            {isPending ? (
                                <>
                                    <Loader2 size={15} className='animate-spin' /> Signing in…
                                </>
                            ) : (
                                'Sign in'
                            )}
                        </button>
                    </form>
                </div>

                <p className='t-faint mt-6 text-center text-sm'>
                    Don&apos;t have an account?{' '}
                    <Link href='/register' className='t-accent font-medium hover:opacity-80'>
                        Create one
                    </Link>
                </p>
            </div>
        </div>
    );
};

export default LoginPage;
