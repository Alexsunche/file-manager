
import path from 'path';
import { handleOperationFailed, isPathExist, showDir } from './index.js'

export const cd = async (currentPath, pathData) => {
    
    try {
        let newPath = path.resolve(currentPath, pathData);
        let pathExist = await isPathExist(newPath)

        if (pathExist) {
            showDir(newPath)
            return newPath
        } else throw new Error('Path does not exist')
    } catch (error) {
        handleOperationFailed(error)
        showDir(currentPath)
    }
    
}