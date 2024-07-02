import LoginBanner from "../assets/images/LoginBanner.png";
import Button from "../components/ui/Button";
import Input from "../components/ui/Input";
const Login = () => {
  const handleSubmit = () => {};
  return (
    <div>
      <div className="flex justify-evenly">
        <div className="w-full bg-[#EBEBFF] hidden tablet:block">
          <div className="max-w-prose mx-auto">
            <img src={LoginBanner} />
          </div>
        </div>
        <div className="w-full flex items-center">
          <div className="max-w-[650px] w-full mx-auto p-4">
            <h2 className="text-center">Sign in to your account</h2>
            <form onSubmit={handleSubmit} className="mt-8 grid gap-4">
              <Input
                label="Email"
                id="email"
                type="email"
                placeholder="Username or email address..."
              />
              <Input
                label="Password"
                placeholder="Password"
                id="password"
                type="password"
              />
              <div className="flex justify-between">
                <div className="flex gap-2 items-center">
                  <input
                    type="checkbox"
                    className="h-5 w-5 border accent-Primary-600"
                    id="remember"
                  />
                  <label htmlFor="remember" className="cursor-pointer">
                    Remember Me
                  </label>
                </div>
                <Button
                  title="Sign in"
                  type="submit"
                  secondary={true}
                  className="px-8"
                />
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
