import { useContext, useRef } from "react";
import { PostListContext } from "../store/post-list-store";
import { useNavigate } from "react-router-dom";

const Create = () => {
  const { addPost } = useContext(PostListContext);
  const navigate = useNavigate();

  const userIDElement = useRef();
  const posttitleElement = useRef();
  const postcontentElement = useRef();
  const reactionsElement = useRef();
  const tagsElement = useRef();

  const handleonSubmit = async (event) => {
    event.preventDefault();

    // Trim inputs to prevent empty or extra space issues
    const userId = userIDElement.current.value.trim();
    const posttitle = posttitleElement.current.value.trim();
    const postcontent = postcontentElement.current.value.trim();
    const reactions = parseInt(reactionsElement.current.value) || 0;
    const tags = tagsElement.current.value.split(" ").filter(tag => tag); // Remove empty tags

    if (!posttitle || !postcontent) {
      alert("Title and content cannot be empty!");
      return;
    }

    const newPost = {
      title: posttitle,
      body: postcontent,
      reactions: reactions,
      userId: userId || "1", // DummyJSON expects a valid user ID (fallback to "1")
      tags: tags.length > 0 ? tags : ["default"], // Ensure at least one tag
    };

    try {
      console.log("🚀 Sending Request:", JSON.stringify(newPost));

      const response = await fetch("https://dummyjson.com/posts/add", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(newPost),
      });

      if (!response.ok) {
        const errorText = await response.text();
        throw new Error(`HTTP ${response.status}: ${errorText}`);
      }

      const post = await response.json();
      console.log("✅ Post Created Successfully:", post);

      // Add new post to state
      addPost({ ...newPost, id: post.id || Date.now() });

      // Navigate to home page
      navigate("/");

    } catch (error) {
      console.error("❌ Error Creating Post:", error);
      alert(`Failed to create post: ${error.message}`);
    }

    // Reset form fields after successful submission
    userIDElement.current.value = "";
    posttitleElement.current.value = "";
    postcontentElement.current.value = "";
    reactionsElement.current.value = "";
    tagsElement.current.value = "";
  };

  return (
    <form className="create-post" onSubmit={handleonSubmit}>
      <div className="mb-3">
        <label htmlFor="userId" className="form-label">Enter your User ID</label>
        <input type="text" ref={userIDElement} className="form-control" id="UserID" placeholder="Your User ID" />
      </div>
      <div className="mb-3">
        <label htmlFor="title" className="form-label">Post Title</label>
        <input type="text" ref={posttitleElement} className="form-control" id="title" placeholder="How are you feeling today?" required />
      </div>
      <div className="mb-3">
        <label htmlFor="body" className="form-label">Post Content</label>
        <textarea ref={postcontentElement} rows="4" className="form-control" id="body" placeholder="Tell us more about it..." required />
      </div>
      <div className="mb-3">
        <label htmlFor="reactions" className="form-label">No. of Reactions</label>
        <input type="number" ref={reactionsElement} className="form-control" id="reactions" placeholder="Number of reactions" />
      </div>
      <div className="mb-3">
        <label htmlFor="tags" className="form-label">Enter your hashtags</label>
        <input type="text" ref={tagsElement} className="form-control" id="tags" placeholder="Enter hashtags separated by space" />
      </div>
      <button type="submit" className="btn btn-primary">POST</button>
    </form>
  );
};

export default Create;
