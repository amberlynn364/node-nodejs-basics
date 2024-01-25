import { access, unlink } from 'fs/promises'
import { dirname, resolve } from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const fileToRemove = resolve(__dirname, 'files', 'fileToRemove.txt');

const remove = async () => {
	try {
		await access(fileToRemove);
		await unlink(fileToRemove);
	} catch (error) {
		throw new Error('FS operation failed: File does not exist');
	}
};

remove();