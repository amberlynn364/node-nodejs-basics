import { access, readFile } from 'fs/promises'
import { dirname, join } from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const fileToRead = join(__dirname, 'files', 'fileToRead.txt')

const read = async () => {
	try {
		await access(fileToRead)
		const content = await readFile(fileToRead, 'utf-8');
		console.log(content)
	} catch {
		throw new Error('FS operation failed: File does not exist');
	}
};

await read();