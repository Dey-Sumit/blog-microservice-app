import React, { useState } from 'react';
import axios from 'axios'

const PostCreate = () => {
    const [title, setTitle] = useState('')

    const handleSubmit = async (e) => {
        e.preventDefault()

        await axios.post('http://localhost:4000/api/posts', {
            title
        });

        setTitle('')
        console.log("completed create post");

    }
    return (
        <div>
            <form onSubmit={handleSubmit}>
                <div className="form-group">
                    <label htmlFor="title">Title</label>
                    <input type="text" value={title} onChange={e => setTitle(e.target.value)} name="title" className="form-control" />
                </div>
                <button className="btn btn-primary" type="submit">Create Post</button>
            </form>
        </div>
    );
};

export default PostCreate;