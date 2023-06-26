import { readdir, stat } from 'fs/promises';
import path from 'path';
import { handleOperationFailed, showDir } from './index.js';

export const ls = async currentDirectory => {

readdir(currentDirectory)
  .then(async data => {

    const dirrs = [];
    const files = [];

    const isDirectory = async (file) => {
      const filePath = path.join(currentDirectory, file);
      try {
        const stats = await stat(filePath);
        return stats.isDirectory();
      } catch (error) {
        handleOperationFailed(error)
        return false;
      }
    };

    for (const item of data) {
      const fileType = await isDirectory(item);
      if (fileType) {
        dirrs.push({ Type: 'directory', Name: item });
      } else {
        files.push({ Type: 'file', Name: item });
      }
    }

    dirrs.sort((a, b) => a.Name.localeCompare(b.Name));
    files.sort((a, b) => a.Name.localeCompare(b.Name));

    console.table([...files, ...dirrs]);
    showDir(currentDirectory)
  })
  .catch(error => {
    handleOperationFailed(error)
  });
}