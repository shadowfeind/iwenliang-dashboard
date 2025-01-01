import { auth } from "@/auth";
import Unauthorized from "@/components/auth/Unauthorized";
import { getMyProfile } from "./my-profile.query";
import UserProfile from "./component/UserProfile";

const MyProfile = async () => {
  const session = await auth();
  if (!session) {
    return <Unauthorized />;
  }

  const data = await getMyProfile();
  if ("error" in data) {
    return <h1 className="text-red-600">{data.error}</h1>;
  }

  return (
    <div>
      <UserProfile userData={data} />
    </div>
  );
};

export default MyProfile;
