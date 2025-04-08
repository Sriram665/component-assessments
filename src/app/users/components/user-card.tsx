import React from "react";
import { UserCardProps } from "../types/user";

const UserCard: React.FC<UserCardProps> = ({ user, onViewProfile }) => {
  return (
    <div className="flex items-center p-4 bg-[var(--card-bg)] text-[var(--text-color)] shadow-md rounded-lg mb-4">
      {user.avatar && (
        <img
          src={user.avatar}
          alt={user.name}
          className="w-16 h-16 rounded-full mr-4"
        />
      )}
      <div className="flex-grow">
        <h3 className="text-lg font-bold">{user.name}</h3>
        <p>{user.email}</p>
        <p>Role: {user.role}</p>
        <span
          className={`text-xs font-semibold px-2 py-1 rounded-full ${
            user.isActive
              ? "bg-green-200 text-green-700"
              : "bg-red-200 text-red-700"
          }`}
        >
          {user.isActive ? "Active" : "Inactive"}
        </span>
      </div>
      <button
        onClick={() => onViewProfile(user)}
        className="ml-4 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition"
      >
        View Profile
      </button>
    </div>
  );
};

export default UserCard;
