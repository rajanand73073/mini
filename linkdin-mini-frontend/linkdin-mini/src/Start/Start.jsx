"use client";

import React from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";

export default function StartPage() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-r from-blue-100 to-purple-200 px-6">
      <motion.h1
        initial={{ opacity: 0, y: -40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="text-4xl sm:text-5xl font-bold text-gray-800 mb-4 text-center"
      >
        Build Community with{" "}
        <span className="text-blue-600">LinkedIn-Mini</span>
      </motion.h1>

      <motion.p
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1, delay: 0.2 }}
        className="text-gray-700 text-lg sm:text-xl max-w-xl mb-8 text-center"
      >
        Share ideas, connect with peers, and grow your professional presence
        through powerful, simple posting.
      </motion.p>

      <Link to="/sign-in" className="mt-4">
        <motion.button
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5, delay: 0.4 }}
          className="bg-blue-600 text-white px-6 py-3 rounded-lg shadow-lg hover:bg-blue-700 transition-colors"
        >
          Get Started
        </motion.button>
      </Link>
    </div>
  );
}
