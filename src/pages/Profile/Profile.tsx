import { useState } from 'preact/hooks';
import { useRoute } from 'wouter-preact';
import { PencilIcon, SpinnerGapIcon, UserCircleIcon } from '@phosphor-icons/react';
import { ProfilePost, UserAvatar } from '~/features';
import { EditProfileModal } from '~/features/Modals';
import { useCurrentUser } from '~/shared/hooks';
import { useProfileData } from './useProfileData';

export function Profile() {
    const [, params] = useRoute('/:nickname');
    const { user } = useCurrentUser();
    const [showEditProfile, setShowEditProfile] = useState(false);
    const [activeTab, setActiveTab] = useState<'videos' | 'liked'>('videos');

    const nickname = params?.nickname?.replace('@', '').trim() || '';
    const { data: profileData, status, error } = useProfileData(nickname);
    const isOwnProfile = user?.nickname === nickname;

    if (status !== 'success' || !profileData) {
        return (
            <div className="px-10 min-h-screen flex items-center justify-center">
                <div className="text-center">
                    {status === 'loading' ? (
                        <div className="flex flex-col items-center gap-4">
                            <SpinnerGapIcon size={48} color="#F02C56" />
                            <p className="text-gray-600 text-base">Đang tải hồ sơ...</p>
                        </div>
                    ) : (
                        <div className="flex flex-col items-center gap-4">
                            <UserCircleIcon size={64} color="#9CA3AF" />
                            <p className="text-red-500 text-base font-normal">{error}</p>
                            <p className="text-gray-500">
                                Không tìm thấy người dùng @{nickname}
                            </p>
                        </div>
                    )}
                </div>
            </div>
        );
    }

    return (
        <>
            {showEditProfile && (
                <EditProfileModal onClose={() => setShowEditProfile(false)} />
            )}
            <div className="pt-[90px] px-10">
                <div className="flex flex-row gap-4">
                    <div className="flex justify-start">
                        <UserAvatar
                            size={30}
                            className="ring-4 ring-purple-200 shadow-lg"
                            user={profileData}
                        />
                    </div>

                    <div className="flex-1 text-left">
                        <div className="mb-4">
                            <h1 className="text-base font-normal truncate text-gray-900">
                                {profileData.nickname}
                            </h1>
                            <p className="text-base text-gray-600 truncate mt-4">
                                {profileData.first_name} {profileData.last_name}
                            </p>
                        </div>

                        {isOwnProfile ? (
                            <button
                                onClick={() => setShowEditProfile(true)}
                                className="inline-flex items-center justify-center rounded-lg py-2.5 px-4 font-normal border-2 border-gray-300"
                            >
                                <PencilIcon className="mr-2" size="18" />
                                <span>Edit profile</span>
                            </button>
                        ) : (
                            <button className="inline-flex items-center justify-center rounded-lg py-2.5 px-6 text-base text-white font-normal bg-[#F02C56] shadow-md">
                                Theo dõi
                            </button>
                        )}
                    </div>
                </div>

                <div className="flex items-center justify-start gap-4 pt-6">
                    <div className="text-left">
                        <span className="text-base font-normal text-gray-900 block">
                            {profileData?.followings_count || 0}
                        </span>
                        <span className="text-gray-500 font-normal text-base">
                            Đang theo dõi
                        </span>
                    </div>

                    <div className="w-px h-8 bg-gray-300" />
                    <div className="text-left">
                        <span className="text-base font-normal text-gray-900 block">
                            {profileData?.likes_count || 0}
                        </span>
                        <span className="text-gray-500 font-normal text-base">Thích</span>
                    </div>
                </div>

                {profileData?.bio && (
                    <p className="pt-6 text-gray-700 text-base max-w-[600px] leading-relaxed text-left">
                        {profileData.bio}
                    </p>
                )}

                <ul className="w-full flex items-center pt-8 border-b-2 border-gray-200 relative">
                    <li
                        onClick={() => setActiveTab('videos')}
                        className={`w-60 text-center py-3 text-base font-normal cursor-pointer ${
                            activeTab === 'videos' ? 'text-black' : 'text-gray-500'
                        }`}
                    >
                        Video
                    </li>
                    <li
                        onClick={() => setActiveTab('liked')}
                        className={`w-60 text-center py-3 text-base font-normal cursor-pointer ${
                            activeTab === 'liked' ? 'text-black' : 'text-gray-500'
                        }`}
                    >
                        Đã thích
                    </li>
                    <div
                        className="absolute bottom-0 left-0 h-[3px] bg-black"
                        style={{
                            width: '240px',
                            transform: `translateX(${
                                activeTab === 'videos' ? '0%' : '100%'
                            })`,
                        }}
                    />
                </ul>

                <div className="mt-6">
                    {activeTab === 'videos' ? (
                        profileData?.videos?.length > 0 ? (
                            <div className="grid grid-cols-6 gap-4">
                                {profileData.videos.map((video: any) => (
                                    <div key={video.id}>
                                        <ProfilePost post={video} />
                                    </div>
                                ))}
                            </div>
                        ) : (
                            <div className="text-center py-16 text-gray-500">
                                <UserCircleIcon
                                    size={64}
                                    color="#D1D5DB"
                                    className="mx-auto mb-4"
                                />
                                <p className="text-base font-normal">Chưa có video nào</p>
                                <p className="text-base mt-4">
                                    {isOwnProfile
                                        ? 'Hãy tải lên video đầu tiên của bạn!'
                                        : 'Người dùng này chưa đăng video nào'}
                                </p>
                            </div>
                        )
                    ) : profileData?.liked_videos?.length > 0 ? (
                        <div className="grid grid-cols-6 gap-4">
                            {profileData.liked_videos.map((video: any) => (
                                <div key={video.id}>
                                    <ProfilePost post={video} />
                                </div>
                            ))}
                        </div>
                    ) : (
                        <div className="text-center py-16 text-gray-500">
                            <UserCircleIcon
                                size={64}
                                color="#D1D5DB"
                                className="mx-auto mb-4"
                            />
                            <p className="text-base font-normal">
                                Chưa có video được thích
                            </p>
                            <p className="text-base mt-4">
                                {isOwnProfile
                                    ? 'Các video bạn thích sẽ xuất hiện ở đây'
                                    : 'Video được thích của người dùng này là riêng tư'}
                            </p>
                        </div>
                    )}
                </div>
            </div>
        </>
    );
}
