import { access, constants, rename } from 'fs/promises'
import { dirname, resolve } from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const oldFile = resolve(__dirname, 'files', 'wrongFilename.txt');
const newFile = resolve(__dirname, 'files', 'properFilename.md');

const checkFileExists = async (file) => {
  try {
    await access(file, constants.F_OK);
    return true;
  } catch {
    return false;
  }
}

const renameFile = async () => {
  if (await checkFileExists(oldFile) && !(await checkFileExists(newFile))) {
    rename(oldFile, newFile);
  } else {
    throw new Error('FS operation failed');
  }
}

renameFile();