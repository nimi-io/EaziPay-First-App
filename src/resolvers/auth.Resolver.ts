import { LoginArgs, SignupArgs } from "../utils/interfaces";
import {
  signInController,
  signUpController,
} from "../controllers/user.controller";

export const signUp = async (_: any, args: SignupArgs) => {
  return await signUpController(args);
};
export const signIn = async (_: any, args: LoginArgs) => {
  return await signInController(args);
};
 