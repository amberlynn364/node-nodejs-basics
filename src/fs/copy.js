import { fileURLToPath } from 'url';
import { resolve, dirname, join } from 'path';
import { lstat, mkdir, readdir, copyFile } from 'fs/promises';
import { existsSync } from 'fs';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const sourceDir = join(__dirname, 'files');
const destinationDir  = join(__dirname, 'files-copy');

const copyFolder = async (source, target) => {
  try {
    await mkdir(target);
    const files = await readdir(source);
    for (const file of files) {
      const current = await lstat(join(source, file));
      current.isDirectory() 
      ? await copyFolder(join(source, file), join(target, file)) 
      : await copyFile(join(source, file), join(target, file))
    }
  } catch (error) {
    console.error('FS operation failed:', error.message);
  }
}

const copy = async (source, target) => {
  try {
    if (!existsSync(source)) {
      throw new Error('FS operation failed: Source folder does not exist');
    }

    if (existsSync(target)) {
      throw new Error('FS operation failed: Destination folder already exists');
    }

    copyFolder(source, target);

  } catch (error) {
    console.error('FS operation failed:', error.message);
  }
};

await copy(sourceDir, destinationDir);


