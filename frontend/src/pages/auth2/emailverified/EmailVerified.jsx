import { Grid, Heading, Text } from "@chakra-ui/layout";

import { useParams } from "react-router-dom";
import { useVerifyUserMutation } from "../../../redux/store/api/authApi";
import { Spinner } from "@chakra-ui/spinner";
import { useEffect } from "react";

import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const EmailVerified = () => {
  const { token } = useParams();
  console.log(token);

  const [verifyUser, { data, isError, isLoading, error, isSuccess }] =
    useVerifyUserMutation();

  useEffect(() => {
    if (isError) {
      toast.error(error.data.message);
    } else if (isSuccess) {
      toast.success("User verified successfully");
    }
  }, [isError, isSuccess, error, data]);

  useEffect(() => {
    if (token) {
      verifyUser({ token });
      toast.success("User verified successfully");
    } else {
      toast.error("Token is required (User might have not logged in)");
    }
  }, [verifyUser, token]);
  return (
    <>
      <ToastContainer />
      {isLoading ? (
        <Spinner />
      ) : (
        <>
          {isError && (
            <Grid placeItems="center" h="100vh">
              <Text>Email Verification Failed! Try Again</Text>{" "}
            </Grid>
          )}
          {isSuccess && (
            <Grid placeItems="center" h="100vh">
              <Heading>User Verified</Heading>
            </Grid>
          )}
        </>
      )}
    </>
  );
};

export default EmailVerified;
