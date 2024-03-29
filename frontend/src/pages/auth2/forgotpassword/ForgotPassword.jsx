import { useEffect, useState } from "react";
import { useSendMailForgotPasswordMutation } from "../../../redux/store/api/authApi";
import authSvg from "../assests/forget.svg";

import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const ForgotPassword = () => {
  const [sendMail, { data, isLoading, error, isError, isSuccess }] =
    useSendMailForgotPasswordMutation();

  const [formData, setFormData] = useState({
    email: "",
    textChange: "Submit",
  });
  const { email, textChange } = formData;
  const handleChange = (text) => (e) => {
    setFormData({ ...formData, [text]: e.target.value });
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    if (email) {
      setFormData({ ...formData, textChange: "Submitting" });
      sendMail({
        email: email,
      });
      toast.success("Email sent successfully");
    } else {
      toast.error("Please fill all fields");
    }
  };

  useEffect(() => {
    if (isSuccess) {
      setFormData({
        email: "",
        textChange: "Submit",
      });
      toast.success("Please check your email.Redirecting to login page");
      setTimeout(() => {
        window.location.href = "/signin";
      }, 5000);
    } else if (isError) {
      toast.error(error.data.message);
      setFormData({
        email: "",
        textChange: "Submit",
      });
    } else if (isLoading) {
      toast.info("Please wait...");
      setFormData({
        email: "",
        textChange: "Submitting",
      });
    }
  }, [isLoading, isError, isSuccess, error]);

  return (
    <div className="min-h-screen bg-gray-100 text-gray-900 flex justify-center">
      <ToastContainer />
      <div className="max-w-screen-xl m-0 sm:m-20 bg-white shadow sm:rounded-lg flex justify-center flex-1">
        <div className="lg:w-1/2 xl:w-5/12 p-6 sm:p-12">
          <div className="mt-12 flex flex-col items-center">
            <h1 className="text-2xl xl:text-3xl font-extrabold">
              Forget Password
            </h1>
            <div className="w-full flex-1 mt-8 text-indigo-500">
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
                <button
                  type="submit"
                  className="mt-5 tracking-wide font-semibold bg-indigo-500 text-gray-100 w-full py-4 rounded-lg hover:bg-indigo-700 transition-all duration-300 ease-in-out flex items-center justify-center focus:shadow-outline focus:outline-none"
                >
                  <i className="fas fa-sign-in-alt  w-6  -ml-2" />
                  <span className="ml-3">Submit</span>
                </button>
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

export default ForgotPassword;
