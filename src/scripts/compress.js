import fs from "fs";
import zlib from "zlib";
import path from "path";
import {sep} from 'path';
import { handleOperationFailed, showDir } from "./index.js";


export const compress = async (currDir, [pathToFile, pathToNewDir]) => {
  const absPathToFile = path.resolve(currDir, pathToFile);
  const fileName = path.basename(pathToFile)
  const absPathToNewDir = path.resolve(
    currDir,
    pathToNewDir+sep+fileName+'.br'
  );

  const rs = fs.createReadStream(absPathToFile);

  const ws = fs.createWriteStream(absPathToNewDir);

  const bs = zlib.createBrotliCompress();

  rs.pipe(bs).pipe(ws);

  ws.on("finish", () => {
    console.log("Given file was compressed successfully.");
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
