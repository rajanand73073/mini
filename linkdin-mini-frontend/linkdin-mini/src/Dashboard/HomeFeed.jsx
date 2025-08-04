import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import axios from "axios";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";
import { io } from "socket.io-client";

const HomeFeed = () => {
  const [posts, setPosts] = useState([]);
  const [newPost, setNewPost] = useState("");
  const navigate = useNavigate();
  const socket = io(`${import.meta.env.VITE_API_URL}`, {
    withCredentials: true,
    transports: ["websocket"],
  });

  useEffect(() => {
    const fetchAllPosts = async () => {
      try {
        const res = await axios.get(
          `${import.meta.env.VITE_API_URL}/api/v1/posts/all`,
          {
            withCredentials: true,
          },
        );
        if (res.data.success) {
          toast.success("Posts fetched successfully!");
        }
        let fetchedPosts = res.data.data.posts;
        if (fetchedPosts.length > 50) {
          fetchedPosts = fetchedPosts.slice(0, 10);
        }
        setPosts(fetchedPosts);
      } catch (error) {
        toast.error("Failed to fetch posts " + error.message);
      }
    };

    fetchAllPosts();
  }, []);

  useEffect(() => {
    socket.on("newPost", (data) => {
      setPosts((prevPosts) => [data.post, ...prevPosts]);
    });

    //cleanup
    return () => {
      socket.off("newPost");
    };
  }, []);

  const handlePost = async () => {
    if (!newPost.trim()) return;
    try {
      const res = await axios.post(
        `${import.meta.env.VITE_API_URL}/api/v1/posts/create`,
        {
          content: newPost,
        },
        { withCredentials: true },
      );
      if (res.data?.success) {
        toast.success("Post created successfully!");
      }
      setNewPost("");
    } catch (err) {
      toast.error("Create post error: " + err.message);
    }
  };

  const handleLogout = () => {
    axios
      .get(`${import.meta.env.VITE_API_URL}/api/v1/users/logout`, {
        withCredentials: true,
      })
      .then((res) => {
        if (res.data.success) {
          toast.success("User logged out successfully!");
          socket.disconnect();
          navigate("/");
        }
      })
      .catch((err) => {
        console.error("Logout error:", err);
      });
  };

  return (
    <div className="min-h-screen bg-gray-100">
      {/* Header */}
      <header className="bg-white shadow p-4 flex justify-between items-center">
        <h1 className="text-xl font-bold text-blue-600">LinkedIn-Mini</h1>
        <nav className="space-x-4">
          <Link to="/home" className="text-gray-700 font-medium">
            Home
          </Link>
          <Link to="/profile" className="text-gray-700 font-medium">
            Profile
          </Link>
          <span
            className="text-gray-700 font-medium cursor-pointer"
            onClick={handleLogout}
          >
            Logout
          </span>
        </nav>
      </header>

      {/* Create Post */}
      <motion.div
        className="bg-white max-w-xl mx-auto mt-6 p-4 rounded shadow"
        initial={{ opacity: 0, y: -15 }}
        animate={{ opacity: 1, y: 0 }}
      >
        <textarea
          className="w-full border p-2 rounded resize-none"
          placeholder="What's on your mind?"
          value={newPost}
          onChange={(e) => setNewPost(e.target.value)}
        />
        <button
          className="mt-2 bg-blue-600 text-white px-4 py-1 rounded hover:bg-blue-700"
          onClick={handlePost}
        >
          Post
        </button>
      </motion.div>

      {/* Posts Feed */}
      <div className="max-w-xl mx-auto mt-4">
        {posts.length === 0 ? (
          <p className="text-center text-gray-500">No posts yet.</p>
        ) : (
          posts.map((post) => (
            <Link to={`/profile/${post.author?._id}`} key={post._id}>
              <motion.div
                className="bg-white shadow p-4 mb-4 rounded"
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.2 }}
              >
                <h3 className="font-semibold text-lg">
                  {post.author?.name || "User"}
                </h3>
                <p className="text-sm text-gray-500">
                  {new Date(post.createdAt).toLocaleString()}
                </p>
                <p className="mt-2 text-gray-800">{post.content}</p>
              </motion.div>
            </Link>
          ))
        )}
      </div>
    </div>
  );
};

export default HomeFeed;
