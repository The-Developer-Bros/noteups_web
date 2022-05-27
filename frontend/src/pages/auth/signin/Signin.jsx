import { Flex, Grid, Heading, Stack, Text } from "@chakra-ui/layout";
import { useToast } from "@chakra-ui/react";
import { Form, Formik } from "formik";
import { InputControl, SubmitButton } from "formik-chakra-ui";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router";
import { Link } from "react-router-dom";
import { setUser } from "../../../redux/slices/AuthSlice";
import { useSigninUserMutation } from "../../../redux/store/api/authApi";

const Signin = () => {
  const dispatch = useDispatch();
  const [email, setEmail] = useState("");
  const toast = useToast();
  const navigate = useNavigate();
  const [signinUser, { data, isLoading, error, isError, isSuccess }] =
    useSigninUserMutation();
  console.log(data);

  if (isError) {
    console.log(error);
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
  }

  useEffect(() => {
    if (isSuccess) {
      dispatch(setUser({ name: data.name, token: data.token }));
      localStorage.setItem("token", data.token);
      window.location.href = "/";
    }
  }, [isSuccess, data, dispatch]);

  //   dispatch(setUser({ name: data.name, token: data.token }));
  //   localStorage.setItem("token", data.token);
  //   window.location.reload();
  // }

  // console.log(error);

  return (
    <Formik
      initialValues={{ email: "", password: "" }}
      onSubmit={(values) => {
        setEmail(values.email);
        signinUser({ ...values });
      }}
    >
      <Form>
        <Grid h="100vh" placeItems="center">
          <Stack p="4" boxShadow="xl" borderRadius="md">
            <Heading
              color="teal"
              textAlign="center"
              fontSize="lg"
              fontWeight="semibold"
            >
              Signin
            </Heading>
            <InputControl
              name="email"
              label="Email"
              inputProps={{
                type: "email",
                placeholder: "Enter Email...",
              }}
            />
            <InputControl
              name="password"
              label="Password"
              inputProps={{
                placeholder: "Enter Password...",
                type: "password",
              }}
            />
            <Flex justify="flex-end">
              <Text as={Link} to="/forgot-password" color="teal">
                Forgot Password
              </Text>
            </Flex>
            <SubmitButton isLoading={isLoading}>Signin</SubmitButton>
          </Stack>
        </Grid>
      </Form>
    </Formik>
  );
};

export default Signin;
