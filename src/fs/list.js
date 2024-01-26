import { readdir } from 'fs/promises'
import { dirname, join } from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const filesFolder = join(__dirname, 'files')

const list = async () => {
	try {
		const files = await readdir(filesFolder);
		console.log(files);
	} catch {
		throw new Error('FS operation failed: Folder does not exist');
	}
};

await list();