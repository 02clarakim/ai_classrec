import React, { useState } from "react";
import { Lock, Eye, EyeOff } from "lucide-react";
import Button from "../components/Button";

export default function AuthModal({ open, onClose, onSuccess, studentName }) {
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");

  if (!open) return null;

  const handleSubmit = (e) => {
    e.preventDefault();
    // for demo authentication
    if (password === "admin123") {
      setError("");
      setPassword("");
      onSuccess();
    } else {
      setError("Invalid password. Try 'admin123' for demo.");
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40">
      <div className="bg-white rounded-xl shadow-lg sm:max-w-md w-full p-6">
        <div className="flex flex-col items-center mb-4">
          <div className="w-12 h-12 rounded-full bg-teal-100 flex items-center justify-center mb-2">
            <Lock className="w-6 h-6 text-teal-600" />
          </div>
          <h2 className="text-lg font-semibold text-center">Authentication Required</h2>
          <p className="text-sm text-gray-500 text-center">
            Enter your credentials to view {studentName}'s detailed information.
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <label htmlFor="password" className="block text-sm font-medium text-gray-700">
              Password
            </label>
            <div className="relative">
              <input
                id="password"
                type={showPassword ? "text" : "password"}
                placeholder="Enter password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full border border-gray-300 rounded px-3 py-2 pr-10 focus:outline-none focus:ring-2 focus:ring-teal-500"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
              >
                {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
              </button>
            </div>
            {error && <p className="text-sm text-red-500">{error}</p>}
          </div>

          <div className="flex gap-3">
            <Button type="button" onClick={onClose} className="flex-1 border border-gray-300 rounded px-4 py-2 hover:bg-gray-100">
              Cancel
            </Button>
            <Button type="submit" className="flex-1 bg-teal-600 text-white rounded px-4 py-2 hover:bg-teal-700">
              Authenticate
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
}
