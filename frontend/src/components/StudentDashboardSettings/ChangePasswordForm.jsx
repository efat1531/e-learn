import Button from "../ui/Button";
import Input from "../ui/Input";

const ChangePasswordForm = () => {
  return (
    <div className="w-full border-t mt-8 px-4">
      <h3 className="mt-12">Change Password</h3>
      <div className="max-w-lg mt-8">
        <div className="w-full col-span-2">
          <div className="space-y-6">
            <div className="row">
              <Input
                label="Current Password"
                placeholder="Password"
                id="password"
                type="password"
              />
            </div>
            <div className="row">
              <Input
                label="New Password"
                placeholder="Password"
                id="password"
                type="password"
              />
            </div>
            <div className="row">
              <Input
                label="Confirm Password"
                placeholder="Password"
                id="password"
                type="password"
              />
            </div>
            <Button title={"Change Password"} secondary />
          </div>
        </div>
      </div>
    </div>
  );
};
export default ChangePasswordForm;
