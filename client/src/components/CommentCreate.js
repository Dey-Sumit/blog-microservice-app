import React, { useState } from 'react'
import axios from 'axios'

function CommentCreate({ postId }) {

    const [content, setContent] = useState('')

    const handleSubmit = async (e) => {
        e.preventDefault()
        console.log(postId);
        await axios.post(`http://localhost:4001/api/posts/${postId}/comments`,
            {
                content,
                status: 'pending',
            }
        )
        setContent('')
    }
    return (
        <div>
            <form onSubmit={handleSubmit}>
                <div className="form-group">
                    <label htmlFor="">New Comment</label>
                    <input
                        value={content}
                        onChange={e => setContent(e.target.value)}
                        type="text" className="form-control" />
                </div>
                <button className="btn btn-info" type="submit">Comment</button>
            </form>
        </div>
    )
}

export default CommentCreate
