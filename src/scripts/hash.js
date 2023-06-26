import fs from "fs";
import crypto from "crypto";
import path from "path";
import { handleOperationFailed, showDir } from "./index.js";

export const hash = async (currDir, [pathToFile]) => {
  const absPathToFile = path.resolve(currDir, pathToFile);
  fs.readFile(absPathToFile, (err, data) => {
    if (err) {
      handleOperationFailed(err);
      showDir(currDir);
      return;
    }

    const hash = crypto.createHash("sha256");
    hash.update(data);

    const hashHex = hash.digest("hex");

    console.log("Hash of given file is:", hashHex);
    showDir(currDir);
  });
};
