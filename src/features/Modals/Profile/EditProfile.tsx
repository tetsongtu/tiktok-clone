import { useState, useRef } from 'preact/hooks';
import { PencilIcon, SpinnerGapIcon } from '@phosphor-icons/react';
import ReactCrop, { centerCrop, makeAspectCrop } from 'react-image-crop';
import type { Crop, PixelCrop } from 'react-image-crop';
import 'react-image-crop/dist/ReactCrop.css';

import { UserAvatar } from '~/features';
import type { Account } from '~/shared/types';
import { Button, TextInput, Modal } from '~/shared';

interface EditProfileModalProps {
    onClose: () => void;
}

const BIO_MAX_LENGTH = 80;
const DEFAULT_CROP_WIDTH = 50;

function EditProfileModal({ onClose }: EditProfileModalProps) {
    const [bio, setBio] = useState('');
    const [name, setName] = useState('');
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [previewImageUrl, setPreviewImageUrl] = useState<string | null>(null);
    const [cropConfig, setCropConfig] = useState<Crop>();
    const [completedCropConfig, setCompletedCropConfig] = useState<PixelCrop>();
    const imageRef = useRef<HTMLImageElement>(null);

    const handleImageSelect = (event: any) => {
        const selectedFile = event.currentTarget.files?.[0];

        if (selectedFile) {
            const imageUrl = URL.createObjectURL(selectedFile);
            setPreviewImageUrl(imageUrl);
        } else {
            setPreviewImageUrl(null);
            setCropConfig(undefined);
        }
    };

    const handleImageLoad = (event: { currentTarget: HTMLImageElement }) => {
        const { width, height } = event.currentTarget;
        const centeredCrop = centerCrop(
            makeAspectCrop(
                {
                    unit: '%',
                    width: DEFAULT_CROP_WIDTH,
                },
                1,
                width,
                height,
            ),
            width,
            height,
        );
        setCropConfig(centeredCrop);
    };

    const handleCancelCrop = () => {
        if (previewImageUrl) {
            URL.revokeObjectURL(previewImageUrl);
        }
        setPreviewImageUrl(null);
        setCropConfig(undefined);
    };

    const handleApplyCrop = async () => {
        if (!previewImageUrl || !completedCropConfig || !imageRef.current) return;

        setIsSubmitting(true);
        try {
            console.log('Applying crop:', completedCropConfig);
            handleCancelCrop();
        } catch (error) {
            console.error('Error cropping image:', error);
        } finally {
            setIsSubmitting(false);
        }
    };

    const guestUser: Account = {
        id: 1,
        nickname: 'test',
        avatar: 'test',
    };

    return (
        <Modal
            isOpen={true}
            onClose={onClose}
            onBack={previewImageUrl ? handleCancelCrop : undefined}
            title={previewImageUrl ? 'Crop Profile Photo' : 'Edit Profile'}
            maxWidth="700px"
            maxHeight="80vh"
        >
            <div className="mt-8">
                {!previewImageUrl ? (
                    // Edit Form
                    <div className="space-y-6">
                        {/* Profile Photo */}
                        <div className="flex flex-col border-b pb-6">
                            <h3 className="font-semibold text-[15px] text-gray-700 mb-4">
                                Profile photo
                            </h3>
                            <div className="flex justify-center">
                                <label
                                    htmlFor="profile-photo-input"
                                    className="relative cursor-pointer"
                                >
                                    <UserAvatar size={28} user={guestUser} />
                                    <button
                                        type="button"
                                        className="absolute bottom-0 right-0 rounded-full bg-white shadow-xl border p-1 border-gray-300 w-8 h-8"
                                    >
                                        <PencilIcon className="mx-auto" size={17} />
                                    </button>
                                </label>
                                <input
                                    className="hidden"
                                    type="file"
                                    id="profile-photo-input"
                                    onChange={handleImageSelect}
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
                                        string={name}
                                        placeholder="Name"
                                        onUpdate={setName}
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
                                        value={bio}
                                        onChange={(e) => setBio(e.currentTarget.value)}
                                        maxLength={BIO_MAX_LENGTH}
                                        className="resize-none w-full bg-[#F1F1F2] text-gray-800 border border-gray-300 rounded-md py-2.5 px-3 focus:outline-none"
                                    />
                                    <p className="text-[11px] text-gray-500 mt-1">
                                        {bio.length}/{BIO_MAX_LENGTH}
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>
                ) : (
                    // Image Cropper
                    <div className="flex flex-col items-center">
                        <div className="max-w-md max-h-96 overflow-hidden">
                            <ReactCrop
                                crop={cropConfig}
                                onChange={(_, percentCrop) => setCropConfig(percentCrop)}
                                onComplete={setCompletedCropConfig}
                                keepSelection
                            >
                                <img
                                    ref={imageRef}
                                    src={previewImageUrl}
                                    onLoad={handleImageLoad}
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
            <div className="mt-8 pt-5 border-t border-t-gray-300">
                {!previewImageUrl ? (
                    <div className="flex justify-end gap-3">
                        <Button
                            variant="outline"
                            disabled={isSubmitting}
                            onClick={onClose}
                        >
                            Cancel
                        </Button>
                        <Button variant="primary" disabled={isSubmitting}>
                            Apply
                        </Button>
                    </div>
                ) : (
                    <div className="flex justify-end gap-3">
                        <button
                            onClick={handleCancelCrop}
                            disabled={isSubmitting}
                            className="px-4 py-2 border border-gray-300 rounded-md hover:bg-gray-50 disabled:opacity-50"
                        >
                            Cancel
                        </button>
                        <button
                            onClick={handleApplyCrop}
                            disabled={isSubmitting}
                            className="px-4 py-2 bg-[#F02C56] text-white rounded-md disabled:opacity-50 flex items-center gap-2"
                        >
                            {isSubmitting ? (
                                <>
                                    <SpinnerGapIcon className="animate-spin" size={20} />
                                    Processing...
                                </>
                            ) : (
                                'Apply Crop'
                            )}
                        </button>
                    </div>
                )}
            </div>
        </Modal>
    );
}

export default EditProfileModal;
