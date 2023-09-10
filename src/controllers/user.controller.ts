import { LoginArgs, User, SignupArgs } from "../utils/interfaces";
import { makeGraphQLRequest } from "./dbServiceIntegration";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
export const signInController = async (userData: LoginArgs): Promise<any> => {
  //   console.log(userData);
  const { user } = await makeGraphQLRequest(`query{
         user(email: "${userData.email}") {
    email
    password
    id
  }
    }`);

  console.log(user);
  if (!user) {
    console.log("User not found.");
    return null;
  }

  try {
    const isPasswordValid = await bcrypt.compare(
      userData.password,
      user.password
    );

    if (isPasswordValid) {
      console.log("Password is valid. User is authenticated.");
    } else {
      console.log("Password is invalid. Authentication failed.");
      throw new Error();
      return;
    }
  } catch (error) {
    console.error("Error comparing passwords:", error);
    return null;
  }

  const token = jwt.sign(
    { email: user.email, id: user.id, Date: Date.now() },
    /**? edit secret key later */ "test",
    {
      expiresIn: "1h",
    }
  );

  delete user.password;
  return { user, token };
};
export const signUpController = async (userData: SignupArgs): Promise<any> => {
  try {
    const existingUser = await makeGraphQLRequest(`query{
         user(email: "${userData.email}") {
    email
    password
    id
  }
    }`);

    if (existingUser.user) {
      console.log("User already exists.");
      return null;
    }
    console.log(userData, existingUser);

    try {
      const hashedPassword = await bcrypt.hash(userData.password, 10);
    } catch (error) {
      console.log(error);
    }

    const { user } = await makeGraphQLRequest(`mutation {
         signup(email: $${userData.email}, password: $${userData.password}) {
    email
    password
  }
      }`);

    console.log(userData, existingUser, user);

    if (!user) {
      console.log("User creation failed.");
      return null;
    }

    user.token = jwt.sign(
      { email: user.email, id: user.id, Date: Date.now() },
      "test",
      {
        expiresIn: "1h",
      }
    );

    delete user.password;

    return { user };
  } catch (error) {
    console.error("Error during sign-up:", error);
    return null;
  }
};
