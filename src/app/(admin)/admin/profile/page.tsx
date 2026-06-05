import { redirect } from 'next/navigation';

import { createClient } from '@/lib/supabase/server';

import ProfileForm from './profile-form';

const ProfilePage = async () => {
    const supabase = await createClient();
    const {
        data: { user }
    } = await supabase.auth.getUser();

    const { data: profile } = await supabase.from('profiles').select().eq('id', user?.id).single();

    if (!user) redirect('/login');

    return (
        <div className='mx-auto max-w-2xl space-y-5'>
            <div>
                <h2 className='ff-display t-main text-2xl font-bold'>Profile</h2>
                <p className='t-faint mt-1 text-sm'>Manage your account details and photo</p>
            </div>
            <ProfileForm
                userId={user.id}
                email={user.email ?? ''}
                initialName={profile?.full_name ?? ''}
                initialAvatarUrl={profile?.avatar_url ?? ''}
            />
        </div>
    );
};

export default ProfilePage;
