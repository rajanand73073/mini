import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { toast } from "sonner";

const UserProtectWrapper = ({ children }) => {
  const [userInfo, setUserInfo] = useState(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    axios
      .get(`${import.meta.env.VITE_API_URL}/api/v1/users/profile`, {
        withCredentials: true,
      })
      .then((res) => {
        setUserInfo(res.data.data);
        setLoading(false);
      })
      .catch((err) => {
        toast.error("Error fetching user profile: " + err.message);
        navigate("/sign-in");
      });
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-100">
        <p className="text-gray-600 text-lg">Verifying User...</p>
      </div>
    );
  }

  return React.cloneElement(children, { userInfo });
};

export default UserProtectWrapper;
