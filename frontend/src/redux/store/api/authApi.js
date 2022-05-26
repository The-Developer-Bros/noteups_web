import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

// Define a service using a base URL and expected endpoints
export const authApi = createApi({
  reducerPath: "authApi",
  baseQuery: fetchBaseQuery({ baseUrl: "http://localhost:9000" }),
  endpoints: (builder) => ({
    signinUser: builder.mutation({
      query: (body) => {
        return {
          url: "/user/signin",
          method: "POST",
          body,
        };
      },
    }),

    signupUser: builder.mutation({
      query: (body) => {
        return {
          url: "/user/signup",
          method: "POST",
          body,
        };
      },
    }),

    sendMailForVerification: builder.mutation({
      query: (body) => {
        return {
          url: "/user/send-verification-mail",
          method: "POST",
          body,
        };
      },
    }),

    verifyUser: builder.mutation({
      query: (body) => {
        return {
          url: "/user/verify-user-mail",
          method: "POST",
          body,
        };
      },
    }),

    sendMailForgotPassword: builder.mutation({
      query: (body) => {
        return {
          url: "/user/forgot-password",
          method: "POST",
          body,
        };
      },
    }),

    resetPassword: builder.mutation({
      query: (body) => {
        return {
          url: "/user/verify-forgot-mail",
          method: "POST",
          body,
        };
      },
    }),
  }),
});
// Export hooks for usage in functional components, which are
// auto-generated based on the defined endpoints
export const {
  useSigninUserMutation,
  useSignupUserMutation,
  useSendMailForVerificationMutation,
  useVerifyUserMutation,
  useSendMailForgotPasswordMutation,
  useResetPasswordMutation,
} = authApi;
