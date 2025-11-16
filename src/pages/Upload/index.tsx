import { useState } from 'react';
import { AiOutlineCheckCircle } from 'react-icons/ai';
import { BiCloudUpload, BiLoaderCircle } from 'react-icons/bi';
import { PiKnifeLight } from 'react-icons/pi';
import Button from '~/components/Buttons/Button';
import type { UploadError } from '~/types/UploadError';

function Upload() {
    const [fileDisplay, setFileDisplay] = useState('');
    const [caption, setCaption] = useState('');
    const [file, setFile] = useState<File | null>(null);
    const [error, setError] = useState<UploadError | null>(null);
    const [isUploading] = useState(false);

    const onChange = (e: any) => {
        const files = e.target.files;
        if (files && files.length > 0) {
            const file = files[0];
            const fileUrl = URL.createObjectURL(file);
            setFileDisplay(fileUrl);
            setFile(file);
        }
    };

    const discard = () => {
        clearVideo();
        setCaption('');
    };

    const clearVideo = () => {
        setFileDisplay('');
        setFile(null);
    };

    const createNewPost = () => {
        console.log('createNewPost');
    };

    return (
        <div className="h-[720px] mt-[70px] bg-white shadow-lg rounded-md py-6 md:px-10 px-4">
            <div className="pb-8">
                <h1 className="text-[23px] font-semibold">Upload video</h1>
                <h2 className="text-gray-400 mt-1">Post a video to your account</h2>
            </div>

            <div className=" mt-8 md:flex gap-6">
                {!fileDisplay ? (
                    <label
                        htmlFor="fileInput"
                        className="
                            md:mx-0 mx-auto mt-4 mb-6 text-center
                            flex flex-col items-center justify-center
                            w-full max-w-[260px] h-[470px] p-3
                            border-2 border-dashed border-gray-300
                            rounded-lg hover:bg-gray-100 cursor-pointer
                        "
                    >
                        <BiCloudUpload size="40" color="#b3b3b1" />
                        <p className="mt-4 text-[17px]">Select video to upload</p>
                        <p className="mt-1.5 text-gray-500 text-[13px]">
                            Or drag and drop a file
                        </p>
                        <p className="mt-12 text-gray-400 text-sm">MP4</p>
                        <p className="mt-2 text-gray-400 text-[13px]">Up to 30 minutes</p>
                        <p className="mt-2 text-gray-400 text-[13px]">Less than 2 GB</p>

                        <label
                            htmlFor="fileInput"
                            className="px-2 py-1.5 mt-8 text-white text-[15px] w-[80%] bg-[#F12B56] rounded-sm cursor-pointer"
                        >
                            Select file
                        </label>

                        <input
                            id="fileInput"
                            type="file"
                            onChange={onChange}
                            hidden
                            accept=".mp4"
                        />
                    </label>
                ) : (
                    // Video Preview
                    <div
                        className="
                            md:mx-0 mx-auto
                            mt-4 md:mb-12 mb-16
                            flex items-center justify-center
                            w-full max-w-[260px] h-[540px] p-3
                            rounded-2xl cursor-pointer relative
                        "
                    >
                        {isUploading ? (
                            <div className="absolute flex items-center justify-center z-20 bg-black h-full w-full rounded-xl bg-opacity-50">
                                <div className="mx-auto flex items-center justify-center gap-1">
                                    <BiLoaderCircle
                                        className="animate-spin"
                                        size="30"
                                        color="#F12B56"
                                    />
                                    <div className="text-white font-bold">
                                        Uploading...
                                    </div>
                                </div>
                            </div>
                        ) : null}

                        <video
                            className="absolute rounded-xl object-cover z-10 mx-auto w-full h-full"
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
                                <AiOutlineCheckCircle
                                    className="min-w-[16px]"
                                    size="16"
                                    color="#F12B56"
                                />
                                <p className="font-semibold text-[11px] pl-1 truncate text-ellipsis">
                                    {file ? file.name : ''}
                                </p>
                            </div>
                            <p className="text-[#F12B56] text-[11px] ml-2 font-semibold">
                                Cancel
                            </p>
                        </button>
                    </div>
                )}

                <div className="mt-4 mb-6">
                    <div className="flex bg-[#F8F8F8] py-4 px-6">
                        <div>
                            <PiKnifeLight className="mr-4" size="20" />
                        </div>
                        <div>
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
                        <div className="flex items-center justify-between">
                            <div className="mb-1 text-[15px]"> Caption</div>
                            <div className="text-[12px] text-gray-400">
                                {caption.length}/150
                            </div>
                        </div>
                        <input
                            className="w-full border p-2.5 rounded-md focus:outline-none"
                            maxLength={150}
                            type="text"
                            value={caption}
                            onChange={(e: any) => setCaption(e.target.value)}
                        />
                    </div>
                    <div className="mt-8 flex">
                        <Button
                            variant="outline"
                            disabled={isUploading}
                            onClick={discard}
                        >
                            Discard
                        </Button>
                        <Button
                            variant="primary"
                            disabled={isUploading}
                            onClick={createNewPost}
                        >
                            {isUploading ? (
                                <BiLoaderCircle
                                    className="animate-spin"
                                    size="25"
                                    color="#fff"
                                />
                            ) : (
                                'Post'
                            )}
                        </Button>
                    </div>

                    {error ? (
                        <div className="text-red-600 mt-4">{error.message}</div>
                    ) : null}
                </div>
            </div>
        </div>
    );
}
export default Upload;
