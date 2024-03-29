import React, {useState} from 'react'

import axios from 'axios';

export default function CommentCreate({postId}) {

    const [content, setContent] = useState('');

    const onSubmit = async (event) => {
        if(content.length !== 0){
            await axios.post(`http://posts.com/posts/${postId}/comments`, {
                content
            });

            setContent('');
        }

        
    }


    return (
        <div>
            <form onSubmit={onSubmit}>
                <div className="form-group">
                    <label>New Comment</label>
                    <input value={content} onChange={e => setContent(e.target.value)} className="form-control"></input>
                </div>
                <button className="btn btn-secondary" style={{marginTop:"10px"}}>Submit</button>
            </form>
        </div>
    )
}
