import React from "react";
import logo from "../assets/images/school_icon.png";
import hero from "../assets/images/hero_image.png";
import googleIcon from "../assets/images/google.png";
import { createUser, loginUser } from "../Services/Allservice";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
export default function Register() {
  const dispatch = useDispatch;
  const navigate = useNavigate();

  const [formData, setFormData] = React.useState({
    name: "",
    email: "",
    password: "",
  });

  const [isLogin, setIsLogin] = React.useState(false);

  const admin_register = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      const payload = {
        name: formData.name,
        email: formData.email,
        password: formData.password,
      };

      const responseData = await createUser(payload);
      if (responseData && responseData?.success === true) {
        setIsLogin(!isLogin);
      }
    } catch (error) {
      console.error("Error creating user:", error);
    }
  };

  const handlelogin = async () => {
    setIsLogin(!isLogin);
  };

  const handleuserlogin = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      const payload = {
        email: formData.email,
        password: formData.password,
      };

      const Response = await loginUser(payload);
      if (Response && Response.success === true) {
        localStorage.setItem("token", Response.token);
        navigate("/Dashboard");
      }
    } catch (error) {
      console.error("Error logging in user:", error);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 p-6">
      <div className="w-full max-w-6xl rounded-3xl overflow-hidden shadow-lg grid grid-cols-1 md:grid-cols-2">
        <div className="hidden md:block relative">
          <img src={hero} alt="hero" className="object-cover w-full h-full" />
          <div className="absolute inset-0 bg-purple-800/40 mix-blend-multiply" />
        </div>

        <div className="bg-white p-8 md:p-12 flex items-center">
          <div className="w-full max-w-md mx-auto">
            <div className="flex items-center gap-3 mb-6">
              <img
                src={logo}
                alt="SMSYS Logo"
                className="w-10 h-10 object-contain"
              />
              <span className="text-2xl font-semibold">SMASYS</span>
            </div>

            {!isLogin && (
              <>
                <div className="text-center mb-6">
                  <h1 className="text-2xl font-semibold">Create an account</h1>
                </div>

                <button className="w-full border border-gray-200 rounded-lg py-2.5 flex items-center justify-center gap-2 text-sm mb-4 hover:bg-gray-50">
                  <img
                    src={googleIcon}
                    alt="Google"
                    className="w-5 h-5 object-contain"
                  />
                  <span>Create account with Google</span>
                </button>

                <div className="flex items-center gap-3 my-4">
                  <div className="flex-1 h-px bg-gray-200" />
                  <div className="text-xs text-gray-400">Or</div>
                  <div className="flex-1 h-px bg-gray-200" />
                </div>
              </>
            )}

            <form
              className="space-y-4"
              onSubmit={isLogin ? handleuserlogin : admin_register}
            >
              <div>
                <label
                  htmlFor="email"
                  className="block text-xs text-gray-600 mb-1"
                >
                  Email Address
                </label>
                <input
                  id="email"
                  type="email"
                  placeholder="Enter your email address"
                  className="w-full border border-gray-200 rounded-md p-3 text-sm"
                  name="email"
                  onChange={(e) =>
                    setFormData({ ...formData, email: e.target.value })
                  }
                />
              </div>
              {!isLogin && (
                <div>
                  <label
                    htmlFor="name"
                    className="block text-xs text-gray-600 mb-1"
                  >
                    Full Name
                  </label>
                  <input
                    id="name"
                    type="text"
                    placeholder="Enter your full name"
                    className="w-full border border-gray-200 rounded-md p-3 text-sm"
                    name="name"
                    onChange={(e) =>
                      setFormData({ ...formData, name: e.target.value })
                    }
                  />
                </div>
              )}
              <div>
                <label
                  htmlFor="password"
                  className="block text-xs text-gray-600 mb-1"
                >
                  Password
                </label>
                <div className="relative">
                  <input
                    id="password"
                    type="password"
                    placeholder="Enter your password"
                    className="w-full border border-gray-200 rounded-md p-3 pr-10 text-sm"
                    name="password"
                    onChange={(e) =>
                      setFormData({ ...formData, password: e.target.value })
                    }
                  />
                  <button
                    type="button"
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400"
                  ></button>
                </div>
              </div>

              <button
                type="submit"
                className="w-full mt-2 bg-gradient-to-r from-purple-600 to-purple-500 text-white py-3 rounded-full font-semibold"
              >
                {isLogin ? "Login to your account" : "Create an account"}
              </button>
            </form>
            {!isLogin && (
              <>
                <div className="mt-4 text-center text-sm text-gray-500">
                  Already have an account?{" "}
                  <a
                    className="text-purple-600 font-medium"
                    onClick={handlelogin}
                  >
                    Login
                  </a>
                </div>

                <div className="mt-6 flex items-center justify-center gap-4 text-gray-400">
                  <button className="p-2 rounded-full hover:bg-gray-100">
                    G
                  </button>
                  <button className="p-2 rounded-full hover:bg-gray-100">
                    A
                  </button>
                  <button className="p-2 rounded-full hover:bg-gray-100">
                    f
                  </button>
                  <button className="p-2 rounded-full hover:bg-gray-100">
                    t
                  </button>
                </div>
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
