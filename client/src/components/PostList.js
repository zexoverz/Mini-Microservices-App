import React, {useState, useEffect} from 'react';

import CommentCreate from './CommentCreate';
import CommentList from './CommentList';

import axios from 'axios';

export default function PostList() {
    const [posts, setPosts] = useState({});


    const fetchPosts = async () => {
        const res = await axios.get('http://localhost:4000/posts/');

        setPosts(res.data);
    }


    useEffect(() => {
        fetchPosts()
    }, [posts]);

    const renderedPosts = Object.values(posts).map(post => {
        return (
            <div
                className="card"
                style={{ margin:"20px"}}
                key={post.id}
            >
                <div className="card-body">
                    <h3>{post.title}</h3>
                    <CommentList postId={post.id}></CommentList>
                    <CommentCreate postId={post.id}></CommentCreate>
                </div>
            </div>
        )
    });


    return (
        <div className="d-flex flex-row flex-wrap justify-content-between">
            {renderedPosts}
        </div>
    )
}   
