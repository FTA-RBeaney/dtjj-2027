'use client';

import { useRef, useState } from 'react';

import Image from 'next/image';

import Panel from '@/components/panel';
import { createClient } from '@/lib/supabase/client';

import { Camera, Loader2, Save, User } from 'lucide-react';
import { toast } from 'sonner';

interface Props {
    userId: string;
    email: string;
    initialName: string;
    initialAvatarUrl: string;
}

const ProfileForm = ({ userId, email, initialName, initialAvatarUrl }: Props) => {
    const supabase = createClient();
    const [name, setName] = useState(initialName);
    const [avatarUrl, setAvatarUrl] = useState(initialAvatarUrl);
    const [uploading, setUploading] = useState(false);
    const [saving, setSaving] = useState(false);
    const fileRef = useRef<HTMLInputElement>(null);

    const handleAvatarChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (!file) return;

        if (file.size > 5 * 1024 * 1024) {
            toast.error('Image must be under 5 MB');
            return;
        }

        setUploading(true);
        try {
            const ext = file.name.split('.').pop();
            const path = `${userId}/avatar.${ext}`;

            const { error: uploadError } = await supabase.storage.from('avatars').upload(path, file, { upsert: true });

            if (uploadError) throw uploadError;

            const {
                data: { publicUrl }
            } = supabase.storage.from('avatars').getPublicUrl(path);

            const { error: updateError } = await supabase
                .from('profiles')
                .update({ avatar_url: publicUrl })
                .eq('id', userId);

            if (updateError) throw updateError;

            setAvatarUrl(`${publicUrl}?t=${Date.now()}`);
            toast.success('Photo updated');
        } catch (err: unknown) {
            toast.error(err instanceof Error ? err.message : 'Failed to upload photo');
        } finally {
            setUploading(false);
            if (fileRef.current) fileRef.current.value = '';
        }
    };

    const handleSave = async () => {
        setSaving(true);
        try {
            const { error } = await supabase.from('profiles').update({ full_name: name }).eq('id', userId);
            if (error) throw error;
            toast.success('Profile saved');
        } catch (err: unknown) {
            toast.error(err instanceof Error ? err.message : 'Failed to save profile');
        } finally {
            setSaving(false);
        }
    };

    const initials = name?.trim() ? name.trim()[0].toUpperCase() : (email[0]?.toUpperCase() ?? '?');

    return (
        <div className='space-y-5'>
            <Panel className='p-6'>
                <h3 className='ff-display t-main mb-5 text-lg font-semibold'>Photo</h3>
                <div className='flex items-center gap-6'>
                    <div className='relative shrink-0'>
                        <div className='h-24 w-24 overflow-hidden rounded-full'>
                            {avatarUrl ? (
                                <Image
                                    src={avatarUrl}
                                    alt='Profile photo'
                                    width={96}
                                    height={96}
                                    className='h-full w-full object-cover'
                                />
                            ) : (
                                <div className='avatar flex h-full w-full items-center justify-center text-2xl font-bold'>
                                    {initials}
                                </div>
                            )}
                        </div>
                        <button
                            onClick={() => fileRef.current?.click()}
                            disabled={uploading}
                            aria-label='Change photo'
                            className='absolute -right-1 -bottom-1 flex h-8 w-8 items-center justify-center rounded-full shadow-md'
                            style={{ background: 'var(--accent-solid)', border: '2px solid var(--surface)' }}>
                            {uploading ? (
                                <Loader2
                                    size={14}
                                    className='animate-spin'
                                    style={{ color: 'var(--accent-solid-text)' }}
                                />
                            ) : (
                                <Camera size={14} style={{ color: 'var(--accent-solid-text)' }} />
                            )}
                        </button>
                        <input
                            ref={fileRef}
                            type='file'
                            accept='image/*'
                            className='hidden'
                            onChange={handleAvatarChange}
                        />
                    </div>
                    <div>
                        <p className='t-main text-sm font-medium'>Profile photo</p>
                        <p className='t-faint mt-0.5 text-xs'>JPG, PNG or WebP · max 5 MB</p>
                        <button
                            onClick={() => fileRef.current?.click()}
                            disabled={uploading}
                            className='t-accent mt-2 text-xs font-medium hover:opacity-80 disabled:opacity-50'>
                            {uploading ? 'Uploading…' : 'Change photo'}
                        </button>
                    </div>
                </div>
            </Panel>

            <Panel className='p-6'>
                <h3 className='ff-display t-main mb-5 text-lg font-semibold'>Details</h3>
                <div className='max-w-md space-y-4'>
                    <div>
                        <label className='t-faint mb-1.5 block text-[11px] font-medium tracking-wider uppercase'>
                            Full name
                        </label>
                        <input
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            placeholder='Your name'
                            className='field w-full rounded-lg px-3 py-2.5 text-sm'
                        />
                    </div>
                    <div>
                        <label className='t-faint mb-1.5 block text-[11px] font-medium tracking-wider uppercase'>
                            Email
                        </label>
                        <input
                            value={email}
                            disabled
                            className='field w-full cursor-not-allowed rounded-lg px-3 py-2.5 text-sm opacity-60'
                        />
                        <p className='t-faint mt-1.5 text-xs'>Contact your administrator to change your email.</p>
                    </div>
                </div>
                <div className='mt-6'>
                    <button
                        onClick={handleSave}
                        disabled={saving}
                        className='btn-accent flex items-center gap-2 rounded-lg px-4 py-2.5 text-sm font-semibold hover:opacity-90 disabled:opacity-60'>
                        {saving ? (
                            <>
                                <Loader2 size={15} className='animate-spin' /> Saving…
                            </>
                        ) : (
                            <>
                                <Save size={15} /> Save changes
                            </>
                        )}
                    </button>
                </div>
            </Panel>
        </div>
    );
};

export default ProfileForm;
