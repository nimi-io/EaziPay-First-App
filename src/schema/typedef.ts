import * as fs from "fs";
import * as path from "path";

console.log("dirname: ", __dirname);
const filePath = path.join(__dirname, "typeDefs.txt");

const typeDefs = fs.readFileSync(filePath, "utf-8").toString();

export default typeDefs;
