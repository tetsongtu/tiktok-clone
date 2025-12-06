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
            <div className="px-4 md:px-10 min-h-screen flex items-center justify-center">
                <div className="text-center">
                    {status === 'loading' ? (
                        <div className="flex flex-col items-center gap-4">
                            <SpinnerGapIcon
                                className="animate-spin"
                                size={48}
                                color="#F02C56"
                            />
                            <p className="text-gray-600 text-lg">Đang tải hồ sơ...</p>
                        </div>
                    ) : (
                        <div className="flex flex-col items-center gap-4">
                            <UserCircleIcon size={64} color="#9CA3AF" />
                            <p className="text-red-500 text-xl font-semibold">{error}</p>
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
            <div className="pt-[90px] px-4 md:px-10 animate-fadeIn">
                {/* Profile Header */}
                <div className="flex flex-col md:flex-row md:gap-8">
                    {/* Avatar */}
                    <div className="flex justify-center md:justify-start">
                        <UserAvatar
                            size={30}
                            className="ring-4 ring-purple-200 shadow-lg"
                            user={profileData.avatar}
                        />
                    </div>

                    {/* Profile Info */}
                    <div className="flex-1 text-center md:text-left">
                        <div className="mb-3">
                            <h1 className="text-3xl md:text-4xl font-bold truncate text-gray-900">
                                {profileData.nickname}
                            </h1>
                            <p className="text-lg md:text-xl text-gray-600 truncate mt-1">
                                {profileData.first_name} {profileData.last_name}
                            </p>
                        </div>

                        {isOwnProfile ? (
                            <button
                                onClick={() => setShowEditProfile(true)}
                                className="inline-flex items-center justify-center rounded-lg py-2.5 px-4 font-semibold border-2 border-gray-300 hover:bg-gray-50 hover:border-gray-400 transition-all duration-200"
                            >
                                <PencilIcon className="mr-2" size="18" />
                                <span>Edit profile</span>
                            </button>
                        ) : (
                            <button className="inline-flex items-center justify-center rounded-lg py-2.5 px-6 text-base text-white font-semibold bg-[#F02C56] hover:bg-[#d02648] transition-all duration-200 shadow-md hover:shadow-lg transform hover:scale-105">
                                Theo dõi
                            </button>
                        )}
                    </div>
                </div>

                {/* Stats */}
                <div className="flex items-center justify-center md:justify-start gap-6 pt-6">
                    <div className="text-center md:text-left">
                        <span className="text-2xl font-bold text-gray-900 block">
                            {profileData?.followings_count || 0}
                        </span>
                        <span className="text-gray-500 font-medium text-base">
                            Đang theo dõi
                        </span>
                    </div>

                    <div className="w-px h-8 bg-gray-300" />
                    <div className="text-center md:text-left">
                        <span className="text-2xl font-bold text-gray-900 block">
                            {profileData?.likes_count || 0}
                        </span>
                        <span className="text-gray-500 font-medium text-base">Thích</span>
                    </div>
                </div>

                {/* Bio */}
                {profileData?.bio && (
                    <p className="pt-6 text-gray-700 text-base max-w-[600px] leading-relaxed text-center md:text-left">
                        {profileData.bio}
                    </p>
                )}

                {/* Tabs */}
                <ul className="w-full flex items-center pt-8 border-b-2 border-gray-200 relative">
                    <li
                        onClick={() => setActiveTab('videos')}
                        className={`flex-1 md:w-60 md:flex-none text-center py-3 text-lg font-semibold cursor-pointer transition-all duration-200 ${
                            activeTab === 'videos'
                                ? 'text-black'
                                : 'text-gray-500 hover:text-gray-700'
                        }`}
                    >
                        Video
                    </li>
                    <li
                        onClick={() => setActiveTab('liked')}
                        className={`flex-1 md:w-60 md:flex-none text-center py-3 text-lg font-semibold cursor-pointer transition-all duration-200 ${
                            activeTab === 'liked'
                                ? 'text-black'
                                : 'text-gray-500 hover:text-gray-700'
                        }`}
                    >
                        Đã thích
                    </li>
                    <div
                        className="absolute bottom-0 left-0 h-[3px] bg-black transition-all duration-300 ease-in-out"
                        style={{
                            width: window.innerWidth < 768 ? '50%' : '240px',
                            transform: `translateX(${
                                activeTab === 'videos' ? '0%' : '100%'
                            })`,
                        }}
                    />
                </ul>

                {/* Content */}
                <div className="mt-6">
                    {activeTab === 'videos' ? (
                        profileData?.videos?.length > 0 ? (
                            <div className="grid 2xl:grid-cols-6 xl:grid-cols-5 lg:grid-cols-4 md:grid-cols-3 grid-cols-2 gap-3 md:gap-4">
                                {profileData.videos.map((video: any, index: number) => (
                                    <div
                                        key={video.id}
                                        className="animate-fadeIn"
                                        style={{
                                            animationDelay: `${index * 50}ms`,
                                        }}
                                    >
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
                                <p className="text-xl font-medium">Chưa có video nào</p>
                                <p className="text-base mt-2">
                                    {isOwnProfile
                                        ? 'Hãy tải lên video đầu tiên của bạn!'
                                        : 'Người dùng này chưa đăng video nào'}
                                </p>
                            </div>
                        )
                    ) : profileData?.liked_videos?.length > 0 ? (
                        <div className="grid 2xl:grid-cols-6 xl:grid-cols-5 lg:grid-cols-4 md:grid-cols-3 grid-cols-2 gap-3 md:gap-4">
                            {profileData.liked_videos.map((video: any, index: number) => (
                                <div
                                    key={video.id}
                                    className="animate-fadeIn"
                                    style={{
                                        animationDelay: `${index * 50}ms`,
                                    }}
                                >
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
                            <p className="text-lg font-medium">
                                Chưa có video được thích
                            </p>
                            <p className="text-sm mt-2">
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
