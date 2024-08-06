import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

const SignInForm = () => {
  return (
    <div className="p-8 m-4 md:p-12 bg-white rounded-md w-full md:w-[400px] ">
      <h1 className="text-xl font-semibold">Sign In</h1>
      <form action="" className="space-y-6 mt-4">
        <div className="space-y-2">
          <Label className="mb-2" htmlFor="userName">
            Username*
          </Label>
          <Input type="text" id="userName" name="userName" />
        </div>
        <div className="space-y-3">
          <Label className="mb-2" htmlFor="password">
            Password*
          </Label>
          <Input type="text" id="password" name="password" />
        </div>
        <div>
          <Button className="w-full mt-4">Sign In</Button>
        </div>
      </form>
    </div>
  );
};

export default SignInForm;
