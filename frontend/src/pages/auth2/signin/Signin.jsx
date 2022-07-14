import { useToast } from "@chakra-ui/react";
import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router";
import { Link } from "react-router-dom";
import { setUser } from "../../../redux/slices/AuthSlice";
import { useSigninUserMutation } from "../../../redux/store/api/authApi";
import authSvg from "../assests/login.svg";

const Signin = () => {
  const dispatch = useDispatch();
  const toast = useToast();
  const navigate = useNavigate();
  const [signinUser, { data, isLoading, error, isError, isSuccess }] =
    useSigninUserMutation();

  const [formData, setFormData] = useState({
    email: "",
    password1: "",
    textChange: "Sign In",
  });
  const { email, password1, textChange } = formData;
  const handleChange = (text) => (e) => {
    setFormData({ ...formData, [text]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (email && password1) {
      setFormData({ ...formData, textChange: "Submitting" });
      signinUser({ email: email, password: password1 });
    } else {
      toast({
        status: "error",
        duration: 5000,
        title: "Please fill all fields",
      });
    }
  };

  useEffect(() => {
    if (isSuccess) {
      dispatch(setUser({ name: data.name, token: data.token }));
      localStorage.setItem("token", data.token);
      // window.location.href = "/"; // causes problem with redux persistor
    } else if (isError) {
      console.log(error);
      localStorage.clear();
      if (error.data.status === 406) {
        toast({
          status: "success",
          duration: 5000,
          title: "Please check your email to verify your account",
        });
        navigate("/send-verify-mail", {
          state: { email },
        });
      } else {
        toast({
          status: "error",
          duration: 5000,
          title: "Invalid email or password",
        });
      }
    } else if (isLoading) {
      setFormData({ ...formData, textChange: "Loading..." });
    }
    setFormData({ ...formData, textChange: "Sign In" });
  }, [
    isLoading,
    isError,
    isSuccess,
    data,
    error,
    email,
    navigate,
    toast,
    dispatch,
  ]);

  const redirectToGoogleSSO = async () => {
    // <Link to="/auth/google">Google</Link>;
    const baseUrl =
      // process.env.REACT_APP_BACKEND_URL
      // ||
      "http://localhost:4000";
    window.location.href = `${baseUrl}/auth/google`;
  };

  const redirectToFacebookSSO = async () => {
    // <Link to="/auth/facebook">Facebook</Link>;
    const baseUrl =
      // process.env.REACT_APP_BACKEND_URL
      // ||
      "http://localhost:4000";
    window.location.href = `${baseUrl}/auth/facebook`;
  };

  const redirectToGithubSSO = async () => {
    // <Link to="/auth/github">Github</Link>;
    const baseUrl =
      // process.env.REACT_APP_BACKEND_URL
      // ||
      "http://localhost:4000";
    window.location.href = `${baseUrl}/auth/github`;
  };

  return (
    <div className="min-h-screen bg-gray-100 text-gray-900 flex justify-center">
      {/* {isAuth() ? <Redirect to="/" /> : null}
      <ToastContainer /> */}
      <div className="max-w-screen-xl m-0 sm:m-20 bg-white shadow sm:rounded-lg flex justify-center flex-1">
        <div className="lg:w-1/2 xl:w-5/12 p-6 sm:p-12">
          <div className="mt-12 flex flex-col items-center">
            <h1 className="text-2xl xl:text-3xl font-extrabold">
              Sign In for Noteups
            </h1>
            <div className="w-full flex-1 mt-8 text-indigo-500">
              <div className="flex flex-col items-center">
                <button
                  onClick={redirectToGoogleSSO}
                  // disabled={renderProps.disabled}
                  className="w-full max-w-xs font-bold shadow-sm rounded-lg py-3 bg-indigo-100 text-gray-800 flex items-center justify-center transition-all duration-300 ease-in-out focus:outline-none hover:shadow focus:shadow-sm focus:shadow-outline"
                >
                  <div className=" p-2 rounded-full ">
                    <i className="fa-brands fa-google " />
                  </div>
                  <span className="ml-4">Sign In with Google</span>
                </button>

                <button
                  onClick={redirectToFacebookSSO}
                  className="w-full max-w-xs font-bold shadow-sm rounded-lg py-3 bg-indigo-100 text-gray-800 flex items-center justify-center transition-all duration-300 ease-in-out focus:outline-none hover:shadow focus:shadow-sm focus:shadow-outline mt-5"
                >
                  <div className=" p-2 rounded-full ">
                    <i className="fa-brands fa-facebook" />
                  </div>
                  <span className="ml-4">Sign In with Facebook</span>
                </button>

                <button
                  onClick={redirectToGithubSSO}
                  className="w-full max-w-xs font-bold shadow-sm rounded-lg py-3 bg-indigo-100 text-gray-800 flex items-center justify-center transition-all duration-300 ease-in-out focus:outline-none hover:shadow focus:shadow-sm focus:shadow-outline mt-5"
                >
                  <div className=" p-2 rounded-full ">
                    <i className="fa-brands fa-github" />
                  </div>
                  <span className="ml-4">Sign In with GitHub</span>
                </button>

                <a
                  className="w-full max-w-xs font-bold shadow-sm rounded-lg py-3
           bg-indigo-100 text-gray-800 flex items-center justify-center transition-all duration-300 ease-in-out focus:outline-none hover:shadow focus:shadow-sm focus:shadow-outline mt-5"
                  href="/signup"
                  target="_self"
                >
                  <i className="fas fa-user-plus fa 1x w-6  -ml-2 text-indigo-500" />
                  <span className="ml-4">Sign Up</span>
                </a>
              </div>
              <div className="my-12 border-b text-center">
                <div className="leading-none px-2 inline-block text-sm text-gray-600 tracking-wide font-medium bg-white transform translate-y-1/2">
                  Or sign In with e-mail
                </div>
              </div>
              <form
                className="mx-auto max-w-xs relative "
                onSubmit={handleSubmit}
              >
                <input
                  className="w-full px-8 py-4 rounded-lg font-medium bg-gray-100 border border-gray-200 placeholder-gray-500 text-sm focus:outline-none focus:border-gray-400 focus:bg-white"
                  type="email"
                  placeholder="Email"
                  onChange={handleChange("email")}
                  value={email}
                />
                <input
                  className="w-full px-8 py-4 rounded-lg font-medium bg-gray-100 border border-gray-200 placeholder-gray-500 text-sm focus:outline-none focus:border-gray-400 focus:bg-white mt-5"
                  type="password"
                  placeholder="Password"
                  onChange={handleChange("password1")}
                  value={password1}
                />
                <button
                  type="submit"
                  className="mt-5 tracking-wide font-semibold bg-indigo-500 text-gray-100 w-full py-4 rounded-lg hover:bg-indigo-700 transition-all duration-300 ease-in-out flex items-center justify-center focus:shadow-outline focus:outline-none"
                >
                  <i className="fas fa-sign-in-alt  w-6  -ml-2" />
                  <span className="ml-3">Sign In</span>
                </button>
                <Link
                  to="/forgot-password"
                  className="no-underline hover:underline text-indigo-500 text-md text-right absolute right-0  mt-2"
                >
                  Forget password?
                </Link>
              </form>
            </div>
          </div>
        </div>
        <div className="flex-1 bg-indigo-100 text-center hidden lg:flex">
          <div
            className="m-12 xl:m-16 w-full bg-contain bg-center bg-no-repeat"
            style={{ backgroundImage: `url(${authSvg})` }}
          ></div>
        </div>
      </div>
    </div>
  );
};

export default Signin;
