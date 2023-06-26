import fs from 'fs';
import path from 'path';
import { sep } from 'path';
import { handleOperationFailed, showDir } from './index.js';

export const cp = async (currDir, [pathToFile, pathToNewDir]) => {
  const absPathToFile = path.resolve(currDir, pathToFile)
  const originalFileName = absPathToFile.split(sep).slice(-1);
  const absPathToNewDir = path.resolve(currDir, `${pathToNewDir + sep + originalFileName}`)
    
  const rs = fs.createReadStream(absPathToFile);

  const ws = fs.createWriteStream(absPathToNewDir);

  rs.pipe(ws);

  ws.on('finish', () => {
    showDir(currDir);
  });

  rs.on("error", (error) => {
    handleOperationFailed(error);
    showDir(currDir);
  });

  ws.on("error", (error) => {
    handleOperationFailed(error);
    showDir(currDir);
  });

};
