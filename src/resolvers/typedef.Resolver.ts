import { ItypeDefs } from "../utils/interfaces";
import * as fs from "fs";
import nodemon from "nodemon";
import { restartServer } from "../app";
import * as path from "path";

export const updateTypeDef = async (_: any, args: ItypeDefs) => {
  try {
    if (!args.typeDefs.startsWith("#graphql")) {
      return null;
    }
    let arrayOfTypdefLines: any = [];

    args.typeDefs.split("type ").map((e: any, id: any) => {
      if (id > 0) {
        arrayOfTypdefLines[id] = `type ${e}`;
      } else {
        arrayOfTypdefLines[id] = `${e}`;
      }
      const filePath = path.join(__dirname, "../schema/typeDefs.txt");
    });

    const filePath = path.join(__dirname, "../schema/typeDefs.txt");
    console.log(filePath);
    fs.writeFileSync(filePath, arrayOfTypdefLines.join("\n"));
    console.log("File has been re-Written");

    restartServer();
  } catch (error) {
    console.error("Error clearing the file:", error);
    return false;
  }
  return true;
};
