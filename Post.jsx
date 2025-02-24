import { useContext } from "react";
import {AiFillDelete}from "react-icons/ai";

import { PostListContext } from "../store/post-list-store";

const Post =({post})=>{
  const{deletePost} = useContext(PostListContext);
  return <div className="card post-card" style={{width: "30rem"}}>

  <div className="card-body">
    <h5 className="card-title">{post.Title}
      <span class="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-danger" onClick={()=> deletePost(post.id)}><AiFillDelete/>
        
      </span>
    </h5>
    <p class="card-text">{post.body}</p>
    {post.tags.map((tag)=>(<span key={tag} class="badge text-bg-primary hashtag">{tag}</span>))}
    
    <div class="alert alert-success Like" role="alert">This post is liked by {post.Like} people!!</div>
    <div class="Likes">{post.Like}</div>
  </div>
</div>
}
export default Post;