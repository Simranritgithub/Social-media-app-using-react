import { createContext, useReducer, useEffect, useState } from "react";

// Default Post List
const DefaultPostList = [
  {
    id: 2,
    title: "About Nature",
    body: "Hi!! Nature is a gift of God.",
    reactions: 4,
    userId: "user-9",
    tags: ["vacation", "travel"],
  },
  {
    id: 1,
    title: "Beautiful Scenery",
    body: "Hi!! Nature is a gift of God.",
    reactions: 6,
    userId: "user-9",
    tags: ["beautiful", "scenery"],
  },
];

// Default Context
const DefaultContext = {
  postList: [],
  fetching: false,
  addPost: () => {},
  deletePost: () => {},
  addInitialPost: () => {},  // ✅ Added missing function
};

// Create Context
export const PostListContext = createContext(DefaultContext);

// Reducer Function
const PostListReducer = (currentPostList, action) => {
  console.log("Reducer Action:", action); // Debugging log

  switch (action.type) {
    case "ADD_POST":
      console.log("Adding post inside reducer:", action.payload);
      return [
        {
          id: Date.now(),
          title: action.payload.title,
          body: action.payload.body,
          reactions: action.payload.reactions || 0,
          userId: action.payload.userId,
          tags: action.payload.tags || [],
        },
        ...currentPostList,
      ];

    case "DELETE_POST":
      console.log("Deleting post with ID:", action.payload.postId);
      return currentPostList.filter((post) => post.id !== action.payload.postId);

    case "ADD_INITIAL_POST":
      console.log("Adding initial fetched posts");
      return [...action.payload.posts, ...currentPostList];

    default:
      return currentPostList;
  }
};

// Provider Component
const PostListProvider = ({ children }) => {
  const [postList, dispatchPostList] = useReducer(PostListReducer, DefaultPostList);
  const [fetching, setFetching] = useState(false);

  // Function to Add Post
  const addPost = (post) => {
    console.log("Adding Post:", post); // Debugging log
    dispatchPostList({
      type: "ADD_POST",
      payload: post,
    });
  };

  // Function to Delete Post
  const deletePost = (postId) => {
    console.log("Deleting Post:", postId); // Debugging log
    dispatchPostList({
      type: "DELETE_POST",
      payload: { postId },
    });
  };

  // ✅ Function to Add Initial Posts
  const addInitialPost = (posts) => {
    console.log("Adding Initial Posts:", posts);
    dispatchPostList({
      type: "ADD_INITIAL_POST",
      payload: { posts },
    });
  };

  // Fetch Initial Posts
  useEffect(() => {
    console.log("useEffect triggered - Fetching posts"); // Debugging log
    setFetching(true);

    fetch("https://dummyjson.com/posts")
      .then((res) => res.json())
      .then((data) => {
        console.log("Fetched data:", data.posts);
        addInitialPost(data.posts); // ✅ Now properly calling addInitialPost
        setFetching(false);
      })
      .catch((error) => {
        console.error("Fetch error:", error);
        setFetching(false);
      });
  }, []);

  console.log("Rendered postList:", postList); // Debugging log

  return (
    <PostListContext.Provider value={{ postList, fetching, addPost, deletePost, addInitialPost }}>
      {children}
    </PostListContext.Provider>
  );
};

export default PostListProvider;
