import fs from 'fs';
import path from 'path';
import { sep } from 'path';
import { handleOperationFailed, showDir } from './index.js';

export const rn = async (currDir, [pathToFile, fileName]) => {
  const absolutePathToFile = path.resolve(currDir, pathToFile);
  const pathToDir = absolutePathToFile.split(sep).slice(0, -1).join(sep)
  const pathToNewFile = pathToDir + sep + fileName

  fs.rename(absolutePathToFile, pathToNewFile, (err) => {
    if (err) {
      handleOperationFailed('No such file or directory')
    }
    showDir(currDir)
  });
};
