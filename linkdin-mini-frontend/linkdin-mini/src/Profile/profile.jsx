import React, { useEffect, useState } from "react";
import { toast } from "sonner";

const Profile = ({ userInfo }) => {
  const [user, setUser] = useState(null);
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    try {
      if (!userInfo) {
        toast.error("User information is not available.");
      } else {
        const { user } = userInfo;
        setUser(user);
        setPosts(user.posts || []);
      }
      setLoading(false);
    } catch (err) {
      toast.error("Error fetching profile: " + err.message);
      setLoading(false);
    }
  }, []);

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen bg-gray-100">
        <p className="text-lg text-gray-600">Loading profile...</p>
      </div>
    );
  }

  if (!user) {
    return (
      <div className="flex justify-center items-center min-h-screen bg-gray-100">
        <p className="text-lg text-red-500">Failed to load profile data.</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-100 py-10 px-4">
      <div className="max-w-4xl mx-auto bg-white rounded-2xl shadow-lg p-8">
        <div className="flex items-center space-x-4 mb-6">
          <div className="w-16 h-16 rounded-full bg-blue-500 flex items-center justify-center text-white font-bold text-2xl">
            {user.name?.[0]?.toUpperCase()}
          </div>
          <div>
            <h1 className="text-2xl font-semibold text-gray-800">
              {user.name}
            </h1>
            <p className="text-gray-500">{user.email}</p>
          </div>
        </div>

        <p className="text-gray-700 mb-6 border-l-4 border-blue-500 pl-4 italic">
          {user.bio || "No bio provided."}
        </p>

        <h2 className="text-xl font-semibold text-gray-800 mb-4">
          📰 Your Posts
        </h2>

        <div className="space-y-4">
          {posts.length > 0 ? (
            posts.map((post) => (
              <div
                key={post._id}
                className="bg-gray-50 border border-gray-200 rounded-xl p-4 shadow-sm hover:shadow-md transition"
              >
                <p className="text-gray-800">{post.content}</p>
                <span className="text-sm text-gray-500 block mt-2">
                  Posted on {new Date(post.createdAt).toLocaleString()}
                </span>
              </div>
            ))
          ) : (
            <p className="text-gray-500 italic">
              You haven't posted anything yet.
            </p>
          )}
        </div>
      </div>
    </div>
  );
};

export default Profile;
