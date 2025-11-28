import { useState } from 'react';
import Image from '~/components/Image';
import { PencilIcon } from '@phosphor-icons/react';
import PostUser from '~/pages/Profile/PostUser';
import danceVideo from '~/assets/videos/dance.mp4';
import EditProfileOverlay from '~/components/Modals/EditProfileModals';

export interface ProfilePageProps {
    params: {
        id: string;
    };
}

function Profile() {
    const [showEditProfile, setShowEditProfile] = useState(false);

    const currentProfile = {
        id: '123',
        user_id: '123',
        name: 'John Weeks',
        image: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1a?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80',
        bio: 'this is the bio',
    };
    return (
        <>
            {showEditProfile && (
                <EditProfileOverlay onClose={() => setShowEditProfile(false)} />
            )}
            <div className="pt-[90px] ml-[90px] 2xl:pl-[185px] lg:pl-[160px] lg:pr-0 w-[calc(100%-90px)] pr-3 max-w-[1800px] 2xl:mx-auto">
                <div className="flex w-[calc(100vw-230px)]">
                    {true ? (
                        <Image className="w-[120px] min-w-[120px] rounded-full" src="" />
                    ) : (
                        <div className="min-w-[150px] h-[120px] bg-gray-200 rounded-full" />
                    )}
                    <div className="ml-5 w-full">
                        {currentProfile?.name ? (
                            <div>
                                <p className="text-[30px] font-bold truncate">
                                    {currentProfile?.name}
                                </p>
                                <p className="text-[18px] truncate">
                                    {currentProfile?.name}
                                </p>
                            </div>
                        ) : (
                            <div className="h-[60px]" />
                        )}

                        {true ? (
                            <button
                                onClick={() => setShowEditProfile(true)}
                                className="flex item-center rounded-md py-1.5 px-3.5 mt-3 text-[15px] font-semibold border hover:bg-gray-100"
                            >
                                <PencilIcon className="mt-0.5 mr-1" size="18" />
                                <span>Edit profile</span>
                            </button>
                        ) : (
                            <button className="flex item-center rounded-md py-1.5 px-8 mt-3 text-[15px] text-white font-semibold bg-[#F02C56]">
                                Follow
                            </button>
                        )}
                    </div>
                </div>

                <div className="flex items-center pt-4">
                    <div className="mr-4">
                        <span className="font-bold">10K</span>
                        <span className="text-gray-500 font-light text-[15px] pl-1.5">
                            Following
                        </span>
                    </div>
                    <div className="mr-4">
                        <span className="font-bold">44K</span>
                        <span className="text-gray-500 font-light text-[15px] pl-1.5">
                            Followers
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
                    <PostUser
                        post={{
                            id: '123',
                            user_id: '123',
                            video_url: danceVideo,
                            text: 'this is the bio',
                            created_at: '2022-01-01',
                        }}
                    />
                </div>
            </div>
        </>
    );
}

export default Profile;
