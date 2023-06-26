import fs from 'fs';
import path from 'path';
import { handleOperationFailed, showDir } from './index.js';

export const rm = async (currDir, [pathToFile]) => { 
    const absPathToFile = path.resolve(currDir, pathToFile)
    fs.unlink(absPathToFile, (error) => {
        if (error) handleOperationFailed(error);
        showDir(currDir);
    });
}