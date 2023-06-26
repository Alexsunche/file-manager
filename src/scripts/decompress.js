import fs from "fs";
import zlib from "zlib";
import path from "path";
import {sep} from 'path';
import { handleOperationFailed, showDir } from "./index.js";
//compressed files should be is following shape -> file.ext.br
export const decompress = async (currDir, [pathToFile, pathToNewDir]) => {
  const absPathToFile = path.resolve(currDir, pathToFile);
  const fileExt = path.parse(pathToFile).name
  const absPathToNewDir = path.resolve(
    currDir,
    pathToNewDir + sep + fileExt
  );

  const rs = fs.createReadStream(absPathToFile);

  const ws = fs.createWriteStream(absPathToNewDir);

  const bs = zlib.createBrotliDecompress();

  rs.pipe(bs).pipe(ws);

  ws.on("finish", () => {
    console.log("Given file was decompressed successfully.");
    showDir(currDir);
  });

  // Listen for error events
  rs.on("error", (error) => {
    handleOperationFailed(error);
    showDir(currDir);
  });

  ws.on("error", (error) => {
    handleOperationFailed(error);
    showDir(currDir);
  });
};
