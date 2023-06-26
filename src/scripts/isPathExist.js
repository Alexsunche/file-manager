import { promises } from 'fs';

export const isPathExist = async path =>  {  
    try {
      await promises.access(path)
      return true
    } catch {
      return false
    }
}