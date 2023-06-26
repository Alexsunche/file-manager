import fs from "fs";
import { handleOperationFailed, showDir } from "./index.js";
import path from "path";

export const add = async (currentDir, fileName) => {
  const pathToFile = path.resolve(currentDir, fileName);
  fs.writeFile(pathToFile, '', { flag: 'ax' }, (err) => {
    if (err) {
      handleOperationFailed(err);
    }
    showDir(currentDir);
  });
};
