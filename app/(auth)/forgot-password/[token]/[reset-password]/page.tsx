import { ErrorComponent } from "@/components/ErrorComponent";
import jwt, { JwtPayload } from "jsonwebtoken";

type Props = {
  params: Promise<{ token: string }>;
};

const page = async (props: Props) => {
  const params = await props.params;
  if (!params.token) return <ErrorComponent message="Invalid token" />;

  const { token } = params;

  let decodedToken = jwt.decode(token) as JwtPayload;
  const currentTime = Math.floor(Date.now() / 1000);

  if (decodedToken.exp && decodedToken.exp < currentTime) {
    return (
      <div className="text-center text-red-500 text-xl mt-8">
        Token has expired
      </div>
    );
  }

  decodedToken = jwt.verify(token, process.env.JWT_SECRET_KEY!) as JwtPayload;

  if (!decodedToken) {
    return (
      <div className="text-center text-red-500 text-xl mt-8">Invalid token</div>
    );
  }

  return <div>{params.token}</div>;
};

export default page;
