import React, { useEffect, useState } from 'react'
import CommentCreate from './CommentCreate'
import axios from 'axios'
import CommentList from './CommentList'
const PostList = () => {
    const [posts, setPosts] = useState([])

    useEffect(() => {
        fetchPosts()
    }, [])


    const fetchPosts = async () => {
        const res = await axios.get('http://localhost:4002/posts');
        console.log(res.data);
        setPosts(res.data)
    }

    const renderPosts = Object.values(posts).map(post => {
        return (
            <div className="card mb-2 w-30 p-2" key={post.id}>
                <div className="card-body">
                    <h3>{post.title}</h3>
                </div>
                <CommentCreate postId={post.id} />
                <CommentList comments={post.comments} />
            </div>


        )
    })


    return (
        <div className="d-flex flex-wrap justify-content-between">
            {renderPosts}
        </div>
    )
}

export default PostList
