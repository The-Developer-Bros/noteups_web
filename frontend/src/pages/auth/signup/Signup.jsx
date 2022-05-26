import { Grid, Heading, Stack } from "@chakra-ui/react";
import { Form, Formik } from "formik";
import { InputControl, SubmitButton } from "formik-chakra-ui";
import React from "react";
import { useSignupUserMutation } from "../../../redux/store/api/authApi";

const Signup = () => {
  const [signupUser, { data, isLoading }] = useSignupUserMutation();
  console.log("data", data);

  return (
    <Formik
      initialValues={{ name: "", email: "", password: "" }}
      onSubmit={(values) => {
        signupUser({ ...values });
      }}
    >
      <Form>
        <Grid h="100vh" placeItems="center">
          <Stack p={4} boxShadow="xl" borderRadius="md">
            <Heading
              fontSize="lg"
              fontWeight="semibold"
              textAlign="center"
              color="teal"
            >
              Sign up
            </Heading>

            <InputControl
              name="name"
              label="Name"
              inputProps={{
                placeholder: "Enter your name",
                type: "name",
                size: "lg",
                variant: "outline",
                rounded: "md",
                width: "100%",
              }}
            />

            <InputControl
              name="email"
              label="Email"
              inputProps={{
                placeholder: "Enter your email",
                type: "email",
                size: "lg",
                variant: "outline",
                rounded: "md",
                width: "100%",
              }}
            />

            <InputControl
              name="password"
              label="Password"
              inputProps={{
                placeholder: "Enter your password",
                type: "password",
                size: "lg",
                variant: "outline",
                rounded: "md",
                width: "100%",
              }}
            />
            <SubmitButton isLoading={isLoading} type="submit" size="lg">
              Sign up
            </SubmitButton>
          </Stack>
        </Grid>
      </Form>
    </Formik>
  );
};

export default Signup;
