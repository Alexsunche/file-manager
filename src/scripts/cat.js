import fs from "fs";
import { handleOperationFailed, showDir } from "./index.js";
import path from "path";

export const cat = async (currentPath, pathToFile) => {
  const absolutePathToFile = path.resolve(currentPath, pathToFile)  
  const rs = fs.createReadStream(absolutePathToFile, { encoding: "utf8" });

  rs.on("data", (chunk) => {
    console.log(chunk);
    showDir(currentPath)
  });

  rs.on("error", (error) => {
    handleOperationFailed(error)
    showDir(currentPath)
  });
};
