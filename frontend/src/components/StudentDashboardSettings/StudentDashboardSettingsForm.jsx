import { Upload } from "lucide-react";
import Input from "../ui/Input";
import Button from "../ui/Button";
import ChangePasswordForm from "./ChangePasswordForm";

const StudentDashboardSettingsForm = () => {
  return (
    <>
      <div className="max-w-[82.5rem] mx-auto px-4">
        <h3>Account settings</h3>
        <div className="grid md:grid-cols-3 gap-8 mt-8">
          <div className="w-full">
            <div className="border p-8">
              <div className="relative">
                <img
                  src="https://picsum.photos/200/300"
                  alt="Profile"
                  className="w-full aspect-square object-cover"
                />
                <button className="absolute bottom-0 bg-black/30 w-full py-2 text-white flex items-center justify-center gap-1 shadow font-normal cursor-pointer hover:bg-black/50">
                  <Upload size={16} />
                  Upload Photo
                </button>
              </div>
              <p className="text-sm text-gray-500 mt-4 text-center">
                Image size should be under 1MB and image ratio needs to be 1:1
              </p>
            </div>
          </div>
          <div className="w-full col-span-2">
            <div className="space-y-6">
              <div className="row">
                <Input
                  id="firstName"
                  label="First Name"
                  placeholder="First name"
                  required
                  type="text"
                />
                <Input
                  id="lastName"
                  label="Last Name"
                  placeholder="Last name"
                  required
                  type="text"
                />
              </div>
              <div className="row">
                <Input
                  id="username"
                  label="Username"
                  placeholder="Enter your username"
                  required
                  type="text"
                />
              </div>
              <div className="row">
                <Input
                  id="email"
                  label="Email"
                  placeholder="Email address"
                  required
                  type="email"
                />
              </div>
              <div className="row">
                <Input
                  id="title"
                  label="Title"
                  placeholder="Your title, profession or small biography"
                  required
                />
              </div>
              <Button title={"Save Changes"} secondary />
            </div>
          </div>
        </div>
      </div>
      <ChangePasswordForm />
    </>
  );
};
export default StudentDashboardSettingsForm;
