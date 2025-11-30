import { useState } from 'preact/hooks';
import {
    CheckCircleIcon,
    CloudArrowUpIcon,
    SpinnerGapIcon,
    KnifeIcon,
} from '@phosphor-icons/react';
import Button from '~/components/Buttons/Button';
import type { UploadError } from '~/types/UploadError';
import styles from './Upload.module.css';

function Upload() {
    const [fileDisplay, setFileDisplay] = useState('');
    const [caption, setCaption] = useState('');
    const [file, setFile] = useState<File | null>(null);
    const [error, setError] = useState<UploadError | null>(null);
    const [isUploading] = useState(false);

    const handleFileChange = (e: any) => {
        const selectedFile = e.currentTarget.files?.[0];
        if (selectedFile) {
            setFileDisplay(URL.createObjectURL(selectedFile));
            setFile(selectedFile);
        }
    };

    const handleCaptionChange = (e: any) => {
        setCaption(e.currentTarget.value);
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

    const canPost = !isUploading && file;

    return (
        <div className={styles.container}>
            <header className={styles.header}>
                <h1 className={styles.title}>Upload video</h1>
                <h2 className={styles.subtitle}>Post a video to your account</h2>
            </header>

            <div className={styles.content}>
                {!fileDisplay ? (
                    <label htmlFor="fileInput" className={styles.uploadContainer}>
                        <CloudArrowUpIcon size={40} className={styles.uploadIcon} />
                        <p className={styles.uploadTitle}>Select video to upload</p>
                        <p className={styles.uploadSubtitle}>Or drag and drop a file</p>
                        <div className={styles.uploadInfo}>
                            <p>MP4</p>
                            <p>Up to 30 minutes</p>
                            <p>Less than 2 GB</p>
                        </div>
                        <span className={styles.uploadButton}>Select file</span>
                        <input
                            id="fileInput"
                            type="file"
                            onChange={handleFileChange}
                            hidden
                            accept=".mp4"
                        />
                    </label>
                ) : (
                    <div className={styles.previewContainer}>
                        {isUploading && (
                            <div className={styles.uploadingOverlay}>
                                <div className={styles.uploadingContent}>
                                    <SpinnerGapIcon
                                        className="animate-spin"
                                        size={30}
                                        color="#F12B56"
                                    />
                                    <span className={styles.uploadingText}>
                                        Uploading...
                                    </span>
                                </div>
                            </div>
                        )}
                        <video
                            className={styles.video}
                            autoPlay
                            muted
                            loop
                            src={fileDisplay}
                        />
                        <button onClick={discard} className={styles.cancelButton}>
                            <div className={styles.fileInfo}>
                                <CheckCircleIcon
                                    style={{ minWidth: '16px' }}
                                    size={16}
                                    color="#F12B56"
                                />
                                <span className={styles.fileName}>{file?.name}</span>
                            </div>
                            <span className={styles.cancelText}>Cancel</span>
                        </button>
                    </div>
                )}

                <div className={styles.editSection}>
                    <div className={styles.editBox}>
                        <KnifeIcon className={styles.editIcon} size={20} />
                        <div className={styles.editContent}>
                            <div className={styles.editTitle}>Divide videos and edit</div>
                            <div className={styles.editDescription}>
                                You can quickly divede videos into multiple parts, remove
                                redundant parts and turn landscapes videos into portraits
                                videos
                            </div>
                        </div>
                        <div className={styles.editButtonWrapper}>
                            <Button size="small" variant="primary">
                                Edit
                            </Button>
                        </div>
                    </div>

                    <div className={styles.captionSection}>
                        <div className={styles.captionHeader}>
                            <label htmlFor="captionInput" className={styles.captionLabel}>
                                Caption
                            </label>
                            <span className={styles.captionCounter}>
                                {caption.length}/150
                            </span>
                        </div>
                        <input
                            id="captionInput"
                            className={styles.captionInput}
                            maxLength={150}
                            type="text"
                            value={caption}
                            onChange={handleCaptionChange}
                            placeholder="Add a caption..."
                        />
                    </div>

                    <div className={styles.actionButtons}>
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
                                    size={25}
                                    color="#fff"
                                />
                            ) : (
                                'Post'
                            )}
                        </Button>
                    </div>

                    {error && <div className={styles.errorMessage}>{error.message}</div>}
                </div>
            </div>
        </div>
    );
}

export default Upload;
