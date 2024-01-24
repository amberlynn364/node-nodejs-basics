import { writeFile, access, constants } from 'fs/promises';
import { resolve, dirname } from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const create = async () => {
	const filePath = resolve(__dirname, 'files', 'fresh.txt')
	try {
		await access(filePath, constants.F_OK);
		throw new Error('FS operation failed');
	} catch (error) {
		if (error.code === 'ENOENT') {
			try {
				await writeFile(filePath, 'I am fresh and young')
				console.log('File successfully created.');
			} catch (error) {
				console.error('Error creating file:', error);
			}
		} else {
			throw error;
		}
	}
};

create();