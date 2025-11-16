import { useState } from 'react';
import {
    CheckCircleIcon,
    CloudArrowUpIcon,
    SpinnerGapIcon,
    KnifeIcon,
} from '@phosphor-icons/react';
import Button from '~/components/Buttons/Button';
import type { UploadError } from '~/types/UploadError';

function Upload() {
    const [fileDisplay, setFileDisplay] = useState('');
    const [caption, setCaption] = useState('');
    const [file, setFile] = useState<File | null>(null);
    const [error, setError] = useState<UploadError | null>(null);
    const [isUploading] = useState(false);

    const handleFileChange = (e: any) => {
        const file = e.target.files?.[0];
        if (file) {
            setFileDisplay(URL.createObjectURL(file));
            setFile(file);
        }
    };

    const handleCaptionChange = (e: any) => {
        setCaption(e.target.value);
    };

    const discard = () => {
        setFileDisplay('');
        setFile(null);
        setCaption('');
        setError(null);
    };

    const createNewPost = () => {
        if (!file) return;
        console.log('Creating new post with:', { file, caption });
    };

    const uploadContainerClass = `
        md:mx-0 mx-auto mt-4 mb-6 text-center
        flex flex-col items-center justify-center
        w-full max-w-[260px] h-[470px] p-3
        border-2 border-dashed border-gray-300
        rounded-lg hover:bg-gray-100 cursor-pointer
    `;

    const previewContainerClass = `
        md:mx-0 mx-auto
        mt-4 md:mb-12 mb-16
        flex items-center justify-center
        w-full max-w-[260px] h-[540px] p-3
        rounded-2xl cursor-pointer relative
    `;

    const canPost = !isUploading && file;

    return (
        <div className="h-[720px] bg-white shadow-lg rounded-md py-6 md:px-10 px-4">
            <header className="pb-8">
                <h1 className="text-[23px] font-semibold">Upload video</h1>
                <h2 className="text-gray-400 mt-1">Post a video to your account</h2>
            </header>

            <div className=" mt-8 md:flex gap-6">
                {!fileDisplay ? (
                    <label htmlFor="fileInput" className={uploadContainerClass}>
                        <CloudArrowUpIcon size="40" color="#b3b3b1" />
                        <p className="mt-4 text-[17px]">Select video to upload</p>
                        <p className="mt-1.5 text-gray-500 text-[13px]">
                            Or drag and drop a file
                        </p>
                        <div className="mt-12 text-gray-400">
                            <p className="text-sm">MP4</p>
                            <p className="text-[13px]">Up to 30 minutes</p>
                            <p className="text-[13px]">Less than 2 GB</p>
                        </div>
                        <span className="px-2 py-1.5 mt-8 text-white text-[15px] w-[80%] bg-[#F12B56] rounded-sm cursor-pointer hover:bg-[#F12B56]/80">
                            Select file
                        </span>

                        <input
                            id="fileInput"
                            type="file"
                            onChange={handleFileChange}
                            hidden
                            accept=".mp4"
                        />
                    </label>
                ) : (
                    // Video Preview
                    <div className={previewContainerClass}>
                        {isUploading && (
                            <div className="absolute flex items-center justify-center z-20 bg-black rounded-xl bg-opacity-50">
                                <div className="flex items-center gap-1">
                                    <SpinnerGapIcon
                                        className="animate-spin"
                                        size="30"
                                        color="#F12B56"
                                    />
                                    <span className="text-white font-bold">
                                        Uploading...
                                    </span>
                                </div>
                            </div>
                        )}

                        <video
                            className="absolute rounded-xl object-cover z-10 w-full h-full"
                            autoPlay
                            muted
                            loop
                            src={fileDisplay}
                        />
                        <button
                            onClick={discard}
                            className="absolute -bottom-12 flex justify-center gap-32 z-50 rounded-xl border w-full p-2 border-gray-300"
                        >
                            <div className="flex items-center truncate">
                                <CheckCircleIcon
                                    className="min-w-[16px]"
                                    size="16"
                                    color="#F12B56"
                                />
                                <span className="font-semibold text-[11px] pl-1 truncate">
                                    {file ? file.name : ''}
                                </span>
                            </div>
                            <span className="text-[#F12B56] text-[11px] ml-2 font-semibold">
                                Cancel
                            </span>
                        </button>
                    </div>
                )}

                <div className="mt-4 mb-6">
                    <div className="flex bg-[#F8F8F8] py-4 px-6">
                        <KnifeIcon className="mr-4 mt-0.5" size="20" />
                        <div className="flex-1">
                            <div className="text-semibold text-[15px] mb-1.5">
                                Divide videos and edit
                            </div>
                            <div className="text-semibold text-[13px] text-gray-400">
                                You can quickly divede videos into multiple parts, remove
                                redundant parts and turn landscapes videos into portraits
                                videos
                            </div>
                        </div>
                        <div className="flex justify-end max-w-[130px] w-full my-auto">
                            <Button size="small" variant="primary">
                                Edit
                            </Button>
                        </div>
                    </div>

                    <div className="mt-5">
                        <div className="flex items-center justify-between mb-1">
                            <label htmlFor="captionInput" className="text-[15px]">
                                Caption
                            </label>
                            <span className="text-[12px] text-gray-400">
                                {caption.length}/150
                            </span>
                        </div>
                        <input
                            id="captionInput"
                            className="w-full border p-2.5 rounded-md focus:outline-none"
                            maxLength={150}
                            type="text"
                            value={caption}
                            onChange={handleCaptionChange}
                            placeholder="Add a caption..."
                        />
                    </div>
                    <div className="mt-8 flex">
                        <Button variant="outline" disabled={!canPost} onClick={discard}>
                            Discard
                        </Button>
                        <Button
                            variant="primary"
                            disabled={!canPost}
                            onClick={createNewPost}
                        >
                            {isUploading ? (
                                <SpinnerGapIcon
                                    className="animate-spin"
                                    size="25"
                                    color="#fff"
                                />
                            ) : (
                                'Post'
                            )}
                        </Button>
                    </div>

                    {error && <div className="text-red-600 mt-4">{error.message}</div>}
                </div>
            </div>
        </div>
    );
}
export default Upload;
