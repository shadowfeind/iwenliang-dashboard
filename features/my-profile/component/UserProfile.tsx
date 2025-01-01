import { UserTypes } from "@/features/users/users.types";
import { Mail, Calendar, Shield } from "lucide-react";
import EditMyProfile from "./EditMyProfile";

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
      <EditMyProfile userData={userData} />
    </div>
  );
};

export default UserProfile;
