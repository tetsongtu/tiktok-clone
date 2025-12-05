import { useState, useEffect } from 'preact/hooks';
import { useRoute } from 'wouter-preact';
import { Image } from '~/shared';
import { PencilIcon } from '@phosphor-icons/react';
import { ProfilePost } from '~/features';
import { EditProfileModal } from '~/features/Modals';
import { useCurrentUser } from '~/shared/hooks';
import * as searchService from '~/core/services/searchService';

function Profile() {
    const [showEditProfile, setShowEditProfile] = useState(false);
    const [currentProfile, setCurrentProfile] = useState<any>(null);
    const [, params] = useRoute('/:nickname');
    const nickname = params?.nickname?.replace('@', '');
    const { currentUserData } = useCurrentUser();

    useEffect(() => {
        if (!nickname) return;

        // Nếu đang xem profile của mình, dùng currentUserData
        if (currentUserData?.nickname === nickname) {
            setCurrentProfile(currentUserData);
            return;
        }

        // Nếu xem profile người khác, gọi API
        searchService.search(nickname, 'less').then((results) => {
            if (results?.length > 0) {
                const user =
                    results.find((u: any) => u.nickname === nickname) || results[0];
                setCurrentProfile(user);
            }
        });
    }, [nickname, currentUserData]);

    return (
        <>
            {showEditProfile && (
                <EditProfileModal onClose={() => setShowEditProfile(false)} />
            )}
            <div className="pt-[90px] px-10">
                <div className="flex">
                    {currentProfile?.avatar ? (
                        <Image
                            className="w-[120px] h-[120px] min-w-[120px] rounded-full"
                            src={currentProfile.avatar}
                        />
                    ) : (
                        <div className="min-w-[150px] h-[120px] bg-gray-200 rounded-full" />
                    )}
                    <div className="ml-5 w-full">
                        {currentProfile ? (
                            <div>
                                <p className="text-[30px] font-bold truncate">
                                    {currentProfile.nickname}
                                </p>
                                <p className="text-[18px] truncate">
                                    {currentProfile.first_name} {currentProfile.last_name}
                                </p>
                            </div>
                        ) : (
                            <div className="h-[60px]" />
                        )}

                        {currentUserData?.nickname === nickname ? (
                            <button
                                onClick={() => setShowEditProfile(true)}
                                className="flex item-center rounded-md py-1.5 px-3.5 mt-3 text-[15px] font-semibold border hover:bg-gray-100"
                            >
                                <PencilIcon className="mt-0.5 mr-1" size="18" />
                                <span>Edit profile</span>
                            </button>
                        ) : (
                            <button className="flex item-center rounded-md py-1.5 px-8 mt-3 text-[15px] text-white font-semibold bg-[#F02C56] hover:bg-[#d02648]">
                                Follow
                            </button>
                        )}
                    </div>
                </div>

                <div className="flex items-center pt-4">
                    <div className="mr-4">
                        <span className="font-bold">
                            {currentProfile?.followings_count || 0}
                        </span>
                        <span className="text-gray-500 font-light text-[15px] pl-1.5">
                            Following
                        </span>
                    </div>
                    <div className="mr-4">
                        <span className="font-bold">
                            {currentProfile?.likes_count || 0}
                        </span>
                        <span className="text-gray-500 font-light text-[15px] pl-1.5">
                            Likes
                        </span>
                    </div>
                </div>

                <p className="pt-4 mr-4 text-gray-500 font-light text-[15px] pl-1.5 max-w-[500px]">
                    {currentProfile?.bio}
                </p>

                <ul className="w-full flex items-center pt-4 border-b">
                    <li className="w-60 text-center py-2 text-[17px] font-semibold border-b-2 border-b-black">
                        Videos
                    </li>
                    <li className="w-60 text-gray-500 text-center py-2 text-[17px] font-semibold">
                        Liked
                    </li>
                </ul>

                <div className="mt-4 grid 2xl:grid-cols-6 xl:grid-cols-5 lg:grid-cols-4 md:grid-cols-3 grid-cols-2 gap-3">
                    {currentProfile?.videos?.map((video: any) => (
                        <ProfilePost key={video.id} post={video} />
                    ))}
                </div>
            </div>
        </>
    );
}

export default Profile;
