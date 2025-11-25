import { useState } from 'react';
import { PencilIcon, SpinnerGapIcon, XIcon } from '@phosphor-icons/react';

import type { CropperDimensions, ShowErrorObject } from './EditProfile.types';
import UserAvatar from '~/components/User';
import type { UserData } from '~/types';
import Button from '~/components/Buttons/Button';

function EditProfileOver() {
    const [file, setFile] = useState<File | null>(null);
    const [uploadedImage, setUploadedImage] = useState<string | null>(null);
    const [cropper, setCropper] = useState<CropperDimensions>({});
    const [isUpdating, setIsUpdating] = useState(false);
    const [error, setError] = useState<ShowErrorObject | null>(null);

    const getUploadedImage = (e: any) => {
        const selectedFile = e.target.files && e.target.files[0];

        if (selectedFile) {
            setFile(selectedFile);
            setUploadedImage(URL.createObjectURL(selectedFile));
        } else {
            setFile(null);
            setUploadedImage(null);
        }
    };

    const test: UserData = {
        id: 1,
        nickname: 'test',
        avatar: 'test',
    };

    return (
        <div
            id="EditProfileOverlay"
            className="fixed flex justify-center pt-14 md:pt-[105px] z-50 top-0 left-0 w-full h-full bg-black/50 overflow-auto"
        >
            <div
                className={`
                    relative bg-white w-full max-w-[700px] sm:h-[580px] h-[655px] mx-3 p-8 rounded-lg mb-10
                    ${!uploadedImage ? 'h-[655px]' : 'h-[580px]'}
                `}
            >
                <div className="absolute flex items-center justify-between w-full p-5 left-0 top-0 border-b border-b-gray-300">
                    <h1 className="text-[22px] font-medium">Edit profile</h1>
                    <button
                        disabled={isUpdating}
                        className="hover:bg-gray-200 p-1 rounded-full"
                    >
                        <XIcon size="25" />
                    </button>
                </div>

                <div>
                    <div
                        className={`h-[calc(500px-200px)] ${
                            !uploadedImage ? 'mt-16' : 'mt-[58px]'
                        }`}
                    >
                        {!uploadedImage ? (
                            <div>
                                <div
                                    id="ProfilePhotoSection"
                                    className="flex flex-col border-b sm:h-[118px] h-[145px] px-1.5 py-2 w-full"
                                >
                                    <h3 className="font-semibold text-[15px] sm:mb-0 mb-1 text-gray-700 sm:w-[160px] sm:text-left text-center">
                                        Profile photo
                                    </h3>

                                    <div className="flex items-center justify-center sm:-mt-6">
                                        <label
                                            htmlFor="image"
                                            className="relative cursor-pointer"
                                        >
                                            <UserAvatar size={28} user={test} />
                                            <button className="absolute bottom-0 right-0 rounded-full bg-white shadow-xl border p-1 border-gray-300 inline-block w-[32px] h-[32px]">
                                                <PencilIcon
                                                    className="mx-auto"
                                                    size="17"
                                                />
                                            </button>
                                        </label>
                                        <input
                                            className="hidden"
                                            type="file"
                                            id="image"
                                            onChange={getUploadedImage}
                                            accept="image/png, image/jpeg, image/jpg"
                                        />
                                    </div>
                                </div>

                                <div
                                    id="UserNameSection"
                                    className="flex flex-col border-b sm:h-[118px]  px-1.5 py-2 mt-1.5  w-full"
                                >
                                    <h3 className="font-semibold text-[15px] sm:mb-0 mb-1 text-gray-700 sm:w-[160px] sm:text-left text-center">
                                        Name
                                    </h3>

                                    <div className="flex items-center justify-center sm:-mt-6">
                                        <div className="sm:w-[60%] w-full max-w-md">
                                            <p
                                                className={`relative text-[11px] text-gray-500 ${
                                                    error ? 'mt-1' : 'mt-4'
                                                }`}
                                            >
                                                Usernames can only contain letters,
                                                numbers, underscores, and periods.
                                                Changing your username will also change
                                                your profile link.
                                            </p>
                                        </div>
                                    </div>
                                </div>

                                <div
                                    id="UserBioSection"
                                    className="flex flex-col sm:h-[120px]  px-1.5 py-2 mt-2 w-full"
                                >
                                    <h3 className="font-semibold text-[15px] sm:mb-0 mb-1 text-gray-700 sm:w-[160px] sm:text-left text-center">
                                        Bio
                                    </h3>

                                    <div className="flex items-center justify-center sm:-mt-6">
                                        <div className="sm:w-[60%] w-full max-w-md">
                                            <textarea
                                                cols={30}
                                                rows={4}
                                                maxLength={80}
                                                className="
                                                    resize-none
                                                    w-full
                                                    bg-[#F1F1F2]
                                                    text-gray-800
                                                    border
                                                    border-gray-300
                                                    rounded-md
                                                    py-2.5
                                                    px-3
                                                    focus:outline-none
                                                "
                                            ></textarea>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        ) : (
                            <div className="w-full max-h-[420px] mx-auto bg-black circle-stencil"></div>
                        )}
                    </div>

                    <div
                        id="ButtonSection"
                        className="absolute p-5 left-0 bottom-0 border-t border-t-gray-300 w-full"
                    >
                        {!uploadedImage ? (
                            <div
                                id="UpdateInfoButtons"
                                className="flex items-center justify-end"
                            >
                                <Button variant="outline" disabled={isUpdating}>
                                    Cancel
                                </Button>

                                <Button variant="primary" disabled={isUpdating}>
                                    Apply
                                </Button>
                            </div>
                        ) : (
                            <div
                                id="CropperButtons"
                                className="flex items-center justify-end"
                            >
                                <button
                                    onClick={() => setUploadedImage(null)}
                                    className="flex items-center border rounded-sm px-3 py-[6px] hover:bg-gray-100"
                                >
                                    <span className="px-2 font-medium text-[15px]">
                                        Cancel
                                    </span>
                                </button>

                                <button className="flex items-center bg-[#F02C56] text-white border rounded-md ml-3 px-3 py-[6px]">
                                    <span className="mx-4 font-medium text-[15px]">
                                        {isUpdating ? (
                                            <SpinnerGapIcon
                                                color="#ffffff"
                                                className="my-1 mx-2.5 animate-spin"
                                            />
                                        ) : (
                                            'Apply'
                                        )}
                                    </span>
                                </button>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
}

export default EditProfileOver;
