import minioClient from '../config/minioClient.js';
import Post from '../models/postModel.js';
import { v4 as uuidv4 } from 'uuid';

// Helper function to ensure the bucket exists in MinIO
const ensureBucketExists = async (bucketName) => {
    return new Promise((resolve, reject) => {
        minioClient.bucketExists(bucketName, (err, exists) => {
            if (err) {
                return reject(new Error('Error checking bucket existence: ' + err.message));
            }
            if (!exists) {
                minioClient.makeBucket(bucketName, (err) => {
                    if (err) {
                        return reject(new Error('Error creating bucket: ' + err.message));
                    }
                    resolve();
                });
            } else {
                resolve();
            }
        });
    });
};

// Helper function to get the appropriate file extension based on the programming language
const getFileExtension = (language) => {
    switch (language) {
        case 'C++':
            return 'cpp';
        case 'Python':
            return 'py';
        case 'JavaScript':
            return 'js';
        case 'Java':
            return 'java';
        default:
            return 'txt';
    }
};

// Helper function to upload a string (code snippet) to MinIO with a public URL
const uploadCodeSnippetToMinIO = async (bucketName, fileName, content) => {
    return new Promise((resolve, reject) => {
        const buffer = Buffer.from(content, 'utf-8');
        const metaData = { 'Content-Type': 'text/plain' };

        minioClient.putObject(bucketName, fileName, buffer, metaData, (err) => {
            if (err) {
                return reject('Error uploading code snippet to MinIO: ' + err);
            }
            console.log('Code snippet uploaded successfully.');

            // Generate a long expiration presigned URL for public access
            minioClient.presignedUrl('GET', bucketName, fileName, 7 * 24 * 60 * 60, (err, presignedUrl) => {
                if (err) {
                    return reject('Error generating presigned URL: ' + err);
                }
                resolve(presignedUrl);
            });
        });
    });
};

// @desc    Get all posts with public code snippet URLs for each post
// @route   GET /api/posts
// @access  Private
export const getPosts = async (req, res) => {
    try {
        const posts = await Post.find({}).populate('user', 'name').sort({ createdAt: -1 });
        res.json(posts);
    } catch (error) {
        res.status(500).json({ message: 'Server Error' });
    }
};

// @desc    Create a new post with code snippet uploaded to MinIO
// @route   POST /api/posts
// @access  Private
export const createPost = async (req, res) => {
    const { title, content, codeSnippet, language } = req.body;

    if (!title || !content || !codeSnippet || !language) {
        return res.status(400).json({ message: 'Title, content, code snippet, and language are required' });
    }

    try {
        let codeSnippetUrl = null;

        const fileExtension = getFileExtension(language);
        const fileName = uuidv4() + `.${fileExtension}`;

        // Ensure the bucket exists and upload the code snippet
        await ensureBucketExists(process.env.MINIO_BUCKET);
        codeSnippetUrl = await uploadCodeSnippetToMinIO(process.env.MINIO_BUCKET, fileName, codeSnippet);

        const post = new Post({
            user: req.user._id,
            title,
            content,
            codeSnippet: codeSnippetUrl,
            language,
        });

        const createdPost = await post.save();
        res.status(201).json(createdPost);
    } catch (error) {
        console.error('Error:', error);
        res.status(500).json({ message: 'Server Error' });
    }
};
