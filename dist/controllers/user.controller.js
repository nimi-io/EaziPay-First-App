"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.signUpController = exports.signInController = void 0;
const dbServiceIntegration_1 = require("./dbServiceIntegration");
const bcrypt_1 = __importDefault(require("bcrypt"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const signInController = (userData) => __awaiter(void 0, void 0, void 0, function* () {
    //   console.log(userData);
    const { user } = yield (0, dbServiceIntegration_1.makeGraphQLRequest)(`query{
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
        const isPasswordValid = yield bcrypt_1.default.compare(userData.password, user.password);
        if (isPasswordValid) {
            console.log("Password is valid. User is authenticated.");
        }
        else {
            console.log("Password is invalid. Authentication failed.");
            throw new Error();
            return;
        }
    }
    catch (error) {
        console.error("Error comparing passwords:", error);
        return null;
    }
    const token = jsonwebtoken_1.default.sign({ email: user.email, id: user.id, Date: Date.now() }, 
    /**? edit secret key later */ "test", {
        expiresIn: "1h",
    });
    delete user.password;
    return { user, token };
});
exports.signInController = signInController;
const signUpController = (userData) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const existingUser = yield (0, dbServiceIntegration_1.makeGraphQLRequest)(`query{
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
            const hashedPassword = yield bcrypt_1.default.hash(userData.password, 10);
        }
        catch (error) {
            console.log(error);
        }
        const { user } = yield (0, dbServiceIntegration_1.makeGraphQLRequest)(`mutation {
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
        const secretKey = process.env.JWT_SECRET;
        if (!secretKey) {
            throw new Error("JWT_SECRET environment variable is not set.");
            return null;
        }
        user.token = jsonwebtoken_1.default.sign({ email: user.email, id: user.id, Date: Date.now() }, secretKey, {
            expiresIn: "1h",
        });
        delete user.password;
        return { user };
    }
    catch (error) {
        console.error("Error during sign-up:", error);
        return null;
    }
});
exports.signUpController = signUpController;
