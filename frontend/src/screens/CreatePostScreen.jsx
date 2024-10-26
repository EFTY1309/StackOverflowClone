import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { useSelector } from 'react-redux';
import Loader from '../components/Loader';
import FormContainer from '../components/FormContainer';

const CreatePostScreen = () => {
    const [title, setTitle] = useState('');
    const [content, setContent] = useState('');
    const [codeSnippet, setCodeSnippet] = useState('');
    const [language, setLanguage] = useState('C++');  // Default language
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    const navigate = useNavigate();

    // Getting the user info from the Redux state to check if the user is authenticated
    const { userInfo } = useSelector((state) => state.auth);

    useEffect(() => {
        if (!userInfo) {
            navigate('/login');  // Redirect to login page if not logged in
        }
    }, [userInfo, navigate]);

    const submitHandler = async (e) => {
        e.preventDefault();

        if (!title || !content || !codeSnippet || !language) {
            setError('All fields are required');
            return;
        }

        setLoading(true);
        try {
            const config = {
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${userInfo.token}`,  // Ensure that the user is authenticated
                },
            };

            const { data } = await axios.post('/api/posts', { title, content, codeSnippet, language }, config);

            setLoading(false);
            navigate('/posts');  // Redirect to the homepage or the posts list after successful submission
        } catch (err) {
            setError(err.response?.data?.message || 'An error occurred while creating the post');
            setLoading(false);
        }
    };

    return (
        <div className="flex justify-center items-center min-h-screen bg-gray-100">
            <div className="bg-white shadow-md rounded-lg p-8 w-full max-w-lg">
                <h1 className="text-2xl font-semibold mb-6 text-center text-gray-700">Create a New Post</h1>

                {error && <div className="mb-4 text-red-500 text-sm">{error}</div>}
                {loading && <Loader />}

                <form onSubmit={submitHandler} className="space-y-6">
                    {/* Title Input */}
                    <div>
                        <label htmlFor="title" className="block text-sm font-medium text-gray-700">Title</label>
                        <input
                            type="text"
                            id="title"
                            value={title}
                            onChange={(e) => setTitle(e.target.value)}
                            className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                            placeholder="Enter title"
                        />
                    </div>

                    {/* Content Input */}
                    <div>
                        <label htmlFor="content" className="block text-sm font-medium text-gray-700">Content</label>
                        <textarea
                            id="content"
                            rows="5"
                            value={content}
                            onChange={(e) => setContent(e.target.value)}
                            className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                            placeholder="Enter content"
                        ></textarea>
                    </div>

                    {/* Code Snippet Input */}
                    <div>
                        <label htmlFor="codeSnippet" className="block text-sm font-medium text-gray-700">Code Snippet</label>
                        <textarea
                            id="codeSnippet"
                            rows="10"
                            value={codeSnippet}
                            onChange={(e) => setCodeSnippet(e.target.value)}
                            className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                            placeholder="Enter code snippet"
                        ></textarea>
                    </div>

                    {/* Language Dropdown */}
                    <div>
                        <label htmlFor="language" className="block text-sm font-medium text-gray-700">Programming Language</label>
                        <select
                            id="language"
                            value={language}
                            onChange={(e) => setLanguage(e.target.value)}
                            className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                        >
                            <option value="C++">C++</option>
                            <option value="Python">Python</option>
                            <option value="JavaScript">JavaScript</option>
                            <option value="Java">Java</option>
                        </select>
                    </div>

                    {/* Submit Button */}
                    <button
                        type="submit"
                        className="w-full flex justify-center py-3 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                    >
                        Upload Post
                    </button>
                </form>
            </div>
        </div>
    );
};

export default CreatePostScreen;
