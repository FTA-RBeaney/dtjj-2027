'use client';

import { useActionState } from 'react';

import Link from 'next/link';

import { register } from '@/app/actions/auth';
import { CheckCircle2, Loader2, Music2 } from 'lucide-react';

const RegisterPage = () => {
    const [state, formAction, isPending] = useActionState(register, null);

    if (state?.success) {
        return (
            <div className='flex min-h-screen items-center justify-center px-4 py-12'>
                <div className='w-full max-w-sm text-center'>
                    <div
                        className='mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-xl'
                        style={{ background: 'rgba(4,120,87,0.12)' }}>
                        <CheckCircle2 size={22} style={{ color: 'var(--ok)' }} />
                    </div>
                    <h2 className='ff-display t-main mb-2 text-2xl font-bold'>Check your email</h2>
                    <p className='t-muted mb-6 text-sm'>{state.message}</p>
                    <Link href='/login' className='t-accent text-sm font-medium hover:opacity-80'>
                        Back to sign in
                    </Link>
                </div>
            </div>
        );
    }

    return (
        <div className='flex min-h-screen items-center justify-center px-4 py-12'>
            <div className='w-full max-w-sm'>
                <div className='mb-8 text-center'>
                    <div
                        className='mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-xl'
                        style={{ background: 'var(--accent-solid)' }}>
                        <Music2 size={22} style={{ color: 'var(--accent-solid-text)' }} />
                    </div>
                    <h1 className='ff-display t-main mb-1 text-2xl font-bold'>Create account</h1>
                    <p className='t-faint text-sm'>Join the Downtown Jazz Jam admin team</p>
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
                                minLength={8}
                                className='field w-full rounded-lg px-3 py-2.5 text-sm'
                                autoComplete='new-password'
                            />
                            <p className='t-faint mt-1.5 text-xs'>Minimum 8 characters</p>
                        </div>

                        <div>
                            <label className='t-faint mb-1.5 block text-[11px] font-medium tracking-wider uppercase'>
                                Confirm password
                            </label>
                            <input
                                name='confirmPassword'
                                type='password'
                                placeholder='••••••••'
                                required
                                className='field w-full rounded-lg px-3 py-2.5 text-sm'
                                autoComplete='new-password'
                            />
                        </div>

                        <button
                            type='submit'
                            disabled={isPending}
                            className='btn-accent flex w-full items-center justify-center gap-2 rounded-lg px-4 py-2.5 text-sm font-semibold hover:opacity-90 disabled:opacity-60'>
                            {isPending ? (
                                <>
                                    <Loader2 size={15} className='animate-spin' /> Creating account…
                                </>
                            ) : (
                                'Create account'
                            )}
                        </button>
                    </form>
                </div>

                <p className='t-faint mt-6 text-center text-sm'>
                    Already have an account?{' '}
                    <Link href='/login' className='t-accent font-medium hover:opacity-80'>
                        Sign in
                    </Link>
                </p>
            </div>
        </div>
    );
};

export default RegisterPage;
