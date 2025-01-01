import { UserTypes } from "@/features/users/users.types";
import { Mail, Calendar, Shield, Edit, Key } from "lucide-react";

export const UserProfile = ({ userData }: { userData: UserTypes }) => {
  return (
    <div className="w-full max-w-md mx-auto p-8 bg-white shadow-lg mt-8">
      <div className="text-center mb-8">
        <div className="w-32 h-32 mx-auto bg-gray-200 rounded-full flex items-center justify-center mb-4">
          <span className="text-4xl font-bold text-gray-600">
            {userData.fullName
              .split(" ")
              .map((n) => n[0])
              .join("")}
          </span>
        </div>
        <h2 className="text-2xl font-bold text-gray-800 mb-2">
          {userData.fullName}
        </h2>
        <p className="text-gray-600">@{userData.userName}</p>
      </div>
      <div className="space-y-4">
        <div className="flex items-center space-x-3 border-b border-gray-200 pb-3">
          <Mail className="w-5 h-5 text-gray-400" />
          <span className="text-gray-700">{userData.email}</span>
        </div>
        <div className="flex items-center space-x-3 border-b border-gray-200 pb-3">
          <Shield className="w-5 h-5 text-gray-400" />
          <span className="text-gray-700">{userData.role}</span>
        </div>
        <div className="flex items-center space-x-3">
          <Calendar className="w-5 h-5 text-gray-400" />
          <span className="text-gray-700">
            Joined on {new Date(userData.createdAt ?? "")?.toLocaleDateString()}
          </span>
        </div>
      </div>
      <div className="flex flex-col  justify-center  mt-12 space-y-4">
        <button className="flex w-full justify-center items-center px-4 py-2 bg-gray-800 text-white rounded hover:bg-gray-700 transition-colors">
          <Edit className="w-4 h-4 mr-2" />
          Edit Profile
        </button>
        <button className="flex w-full justify-center items-center px-4 py-2 bg-gray-200 text-gray-800 rounded hover:bg-gray-300 transition-colors">
          <Key className="w-4 h-4 mr-2" />
          Change Password
        </button>
      </div>
    </div>
  );
};

export default UserProfile;
