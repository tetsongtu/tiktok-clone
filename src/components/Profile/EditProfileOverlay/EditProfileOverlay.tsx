import { useState, useRef } from 'react';
import { PencilIcon, SpinnerGapIcon, XIcon } from '@phosphor-icons/react';
import ReactCrop, { centerCrop, makeAspectCrop } from 'react-image-crop';
import 'react-image-crop/dist/ReactCrop.css';

import UserAvatar from '~/components/User';
import type { UserData } from '~/types';
import Button from '~/components/Buttons/Button';
import TextInput from './TextInput';

function EditProfileOver() {
    const [userBio, setUserBio] = useState<string>('');
    const [userName, setUserName] = useState<string>('');
    const [file, setFile] = useState<File | null>(null);
    const [isUpdating, setIsUpdating] = useState(false);
    const [uploadedImage, setUploadedImage] = useState<string | null>(null);
    const [crop, setCrop] = useState<any>();
    const [completedCrop, setCompletedCrop] = useState<any>();
    const imgRef = useRef<HTMLImageElement>(null);

    const getUploadedImage = (e: any) => {
        const selectedFile = e.target.files?.[0];

        if (selectedFile) {
            setFile(selectedFile);
            const imageUrl = URL.createObjectURL(selectedFile);
            setUploadedImage(imageUrl);

            // Tạo crop mặc định
            const defaultCrop = {
                unit: '%',
                width: 50,
                height: 50,
                x: 25,
                y: 25,
            };
            setCrop(defaultCrop);
        } else {
            setFile(null);
            setUploadedImage(null);
            setCrop(undefined);
        }
    };

    const onImageLoad = (e: any) => {
        const { width, height } = e.currentTarget;
        const crop = centerCrop(
            makeAspectCrop(
                {
                    unit: '%',
                    width: 50,
                },
                1,
                width,
                height,
            ),
            width,
            height,
        );
        setCrop(crop);
    };

    const handleCancelCrop = () => {
        if (uploadedImage) {
            URL.revokeObjectURL(uploadedImage);
        }
        setUploadedImage(null);
        setFile(null);
        setCrop(undefined);
    };

    const handleApplyCrop = async () => {
        if (!uploadedImage || !completedCrop || !imgRef.current) return;

        setIsUpdating(true);
        try {
            console.log('Applying crop:', completedCrop);
            handleCancelCrop();
        } catch (error) {
            console.error('Error cropping image:', error);
        } finally {
            setIsUpdating(false);
        }
    };

    const guestUser: UserData = {
        id: 1,
        nickname: 'test',
        avatar: 'test',
    };

    return (
        <div className="fixed flex justify-center pt-14 md:pt-[105px] z-50 top-0 left-0 w-full h-full bg-black/50 overflow-auto">
            <div className="relative bg-white w-full max-w-[700px] mx-3 p-8 rounded-lg mb-10">
                {/* Header */}
                <div className="absolute flex items-center justify-between w-full p-5 left-0 top-0 border-b border-b-gray-300">
                    <h1 className="text-[22px] font-medium">
                        {uploadedImage ? 'Crop Profile Photo' : 'Edit Profile'}
                    </h1>
                    <button
                        onClick={handleCancelCrop}
                        disabled={isUpdating}
                        className="hover:bg-gray-200 p-1 rounded-full"
                    >
                        <XIcon size="25" />
                    </button>
                </div>

                {/* Main Content */}
                <div className="mt-16">
                    {!uploadedImage ? (
                        // Edit Form
                        <div className="space-y-6">
                            {/* Profile Photo */}
                            <div className="flex flex-col border-b pb-6">
                                <h3 className="font-semibold text-[15px] text-gray-700 mb-4">
                                    Profile photo
                                </h3>
                                <div className="flex justify-center">
                                    <label
                                        htmlFor="image"
                                        className="relative cursor-pointer"
                                    >
                                        <UserAvatar size={28} user={guestUser} />
                                        <button className="absolute bottom-0 right-0 rounded-full bg-white shadow-xl border p-1 border-gray-300 w-8 h-8">
                                            <PencilIcon className="mx-auto" size="17" />
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

                            {/* Name */}
                            <div className="flex flex-col border-b pb-6">
                                <h3 className="font-semibold text-[15px] text-gray-700 mb-4">
                                    Name
                                </h3>
                                <div className="flex justify-center">
                                    <div className="w-full max-w-md">
                                        <TextInput
                                            string={userName}
                                            placeholder="Name"
                                            onUpdate={setUserName}
                                            inputType="text"
                                            error=""
                                        />
                                    </div>
                                </div>
                            </div>

                            {/* Bio */}
                            <div className="flex flex-col">
                                <h3 className="font-semibold text-[15px] text-gray-700 mb-4">
                                    Bio
                                </h3>
                                <div className="flex justify-center">
                                    <div className="w-full max-w-md">
                                        <textarea
                                            cols={30}
                                            rows={4}
                                            value={userBio}
                                            onChange={(e: any) =>
                                                setUserBio(e.target.value)
                                            }
                                            maxLength={80}
                                            className="resize-none w-full bg-[#F1F1F2] text-gray-800 border border-gray-300 rounded-md py-2.5 px-3 focus:outline-none"
                                        />
                                        <p className="text-[11px] text-gray-500 mt-1">
                                            {userBio.length}/80
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    ) : (
                        // Cropper với react-image-crop
                        <div className="flex flex-col items-center">
                            <div className="max-w-md max-h-96 overflow-hidden">
                                <ReactCrop
                                    crop={crop}
                                    onChange={(_, percentCrop) => setCrop(percentCrop)}
                                    onComplete={(c) => setCompletedCrop(c)}
                                    keepSelection
                                >
                                    <img
                                        ref={imgRef}
                                        src={uploadedImage}
                                        onLoad={onImageLoad}
                                        alt="Crop preview"
                                        className="max-w-full max-h-80"
                                    />
                                </ReactCrop>
                            </div>
                            <div className="text-center mt-4 text-gray-600 text-sm">
                                🔹 Kéo các điểm để thay đổi kích thước vùng chọn
                            </div>
                        </div>
                    )}
                </div>

                {/* Footer Buttons */}
                <div className="absolute p-5 left-0 bottom-0 border-t border-t-gray-300 w-full">
                    {!uploadedImage ? (
                        <div className="flex justify-end gap-3">
                            <Button variant="outline" disabled={isUpdating}>
                                Cancel
                            </Button>
                            <Button variant="primary" disabled={isUpdating}>
                                Apply
                            </Button>
                        </div>
                    ) : (
                        <div className="flex justify-end gap-3">
                            <button
                                onClick={handleCancelCrop}
                                disabled={isUpdating}
                                className="px-4 py-2 border border-gray-300 rounded-md hover:bg-gray-50 disabled:opacity-50"
                            >
                                Cancel
                            </button>
                            <button
                                onClick={handleApplyCrop}
                                disabled={isUpdating}
                                className="px-4 py-2 bg-[#F02C56] text-white rounded-md disabled:opacity-50 flex items-center gap-2"
                            >
                                {isUpdating ? (
                                    <>
                                        <SpinnerGapIcon
                                            className="animate-spin"
                                            size={20}
                                        />
                                        Processing...
                                    </>
                                ) : (
                                    'Apply Crop'
                                )}
                            </button>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}

export default EditProfileOver;
