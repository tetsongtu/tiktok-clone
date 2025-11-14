import { useState } from 'react';
import { BiCloudUpload } from 'react-icons/bi';

const UploadRequirements = () => {
    const requirements = [
        { text: 'MP4', className: 'text-sm pt-12' },
        { text: 'Up to 30 minutes', className: 'text-[13px]' },
        { text: 'Less than 2 GB', className: 'text-[13px]' },
    ];

    return (
        <>
            {requirements.map((req, index) => (
                <p key={index} className={`pt-2 text-gray-400 ${req.className}`}>
                    {req.text}
                </p>
            ))}
        </>
    );
};

const UploadArea = () => (
    <label
        htmlFor="fileInput"
        className="
        md:mx-0 mx-auto mt-4 mb-6 text-center
        flex flex-col items-center justify-center
        w-full max-w-[260px] h-[470px] p-3
        border-2 border-dashed border-gray-300
        rounded-lg hover:bg-gray-100 cursor-pointer"
    >
        <BiCloudUpload size="40" color="#b3b3b1" />
        <p className="pt-4 text-[17px]">Select video to upload</p>
        <p className="pt-1.5 text-gray-500 text-[13px]">Or drag and drop a file</p>
        <UploadRequirements />
        <label
            htmlFor="fileInput"
            className="px-2 py-1.5 mt-8 text-white text-[18px] w-[80%] bg-[#F02C56] rounded-sm cursor-pointer"
        >
            Select file
        </label>
    </label>
);

function Upload() {
    const [fileDisplay, setFileDisplay] = useState(false);

    return (
        <div className="w-full mt-[80px] mb-[40px] bg-white shadow-lg rounded-md py-6 md:px-10 px-4">
            <header className="mb-8">
                <h1 className="text-[23px] font-semibold">Upload video</h1>
                <h2 className="text-gray-400 mt-1">Post a video to your account</h2>
            </header>

            <div className="mt-8 md:flex items-center gap-6">
                {!fileDisplay ? <UploadArea /> : <div></div>}
            </div>
        </div>
    );
}

export default Upload;
