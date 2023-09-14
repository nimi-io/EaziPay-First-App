import { ItypeDefs } from "../utils/interfaces";
import * as fs from "fs";
import nodemon from "nodemon";
import { restartServer } from "../app";
import * as path from "path";
import * as gql from "graphql";

export const updateTypeDef = async (_: any, args: ItypeDefs) => {
  console.log(args.typeDefs);
  try {
    const filePath = path.join(__dirname, "../schema/typeDefs.txt");
    console.log(filePath);
    fs.writeFileSync(filePath, args.typeDefs);
    console.log("File has been re-Written");
    restartServer();
  } catch (error) {
    console.error("Error clearing the file:", error);
    return false;
  }
  return true;
};
