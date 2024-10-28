import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import Loader from '../components/Loader';

const ViewPostScreen = () => {
    const { id } = useParams();  // Get the post ID from URL params
    const [post, setPost] = useState(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [fileContent, setFileContent] = useState(''); // New state for file content

    useEffect(() => {
        const fetchPost = async () => {
            setLoading(true);
            try {
                const { data } = await axios.get(`/api/posts/${id}`);
                setPost(data);
                setLoading(false);
            } catch (error) {
                setError('Failed to load post');
                setLoading(false);
            }
        };

        fetchPost();
    }, [id]);

    const [showSnippet, setShowSnippet] = useState(false);

    const handleToggleCode = async () => {
        if (!showSnippet) {
            try {
                // Fetch the file content from the codeSnippet URL
                const response = await fetch(post.codeSnippet);
                const content = await response.text(); // Read the response as text
                setFileContent(content); // Store the fetched content
            } catch (error) {
                console.error('Error fetching file content:', error);
                alert('Error fetching file content. Please try again.');
            }
        }
        setShowSnippet((prevState) => !prevState); // Toggle visibility of the code snippet
    };

    if (loading) return <Loader />;
    if (error) return <div className="text-red-500">{error}</div>;

    return (
        post && (
            <div className="flex justify-center items-center min-h-screen bg-gray-100">
                <div className="container mx-auto px-4">
                    <h1 className="text-2xl font-semibold mb-6 text-center text-gray-700">{post.title}</h1>
                    <div className="bg-white shadow-md rounded-lg p-6">
                        <p className="text-gray-700 mb-4">{post.content}</p>

                        {post.codeSnippet && (
                            <>
                                <button
                                    onClick={handleToggleCode}
                                    className="bg-blue-500 text-white px-4 py-2 rounded-md"
                                >
                                    {showSnippet ? 'Hide Code Snippet' : 'Show Code Snippet'}
                                </button>

                                {showSnippet && (
                                    <pre className="mt-4 bg-gray-100 p-4 rounded-md text-sm text-gray-800 overflow-auto">
                                        <code>
                                            {fileContent || 'Loading...'} {/* Show the fetched content */}
                                        </code>
                                    </pre>
                                )}
                            </>
                        )}
                        <p className="text-sm text-gray-500">Posted by: {post.user && post.user.name}</p>
                    </div>
                </div>
            </div>
        )
    );
};

export default ViewPostScreen;
