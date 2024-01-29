import { access, constants, rename } from 'fs/promises'
import { dirname, join } from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const oldFile = join(__dirname, 'files', 'wrongFilename.txt');
const newFile = join(__dirname, 'files', 'properFilename.md');

const renameFile = async () => {
  try {
    await rename(oldFile, newFile);
  } catch {
    throw new Error('FS operation failed');
  }
}

await renameFile();