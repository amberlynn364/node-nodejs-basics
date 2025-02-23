import { createWriteStream } from 'fs';
import { dirname, join } from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const fileToWrite = join(__dirname, 'files', 'fileToWrite.txt');

const write = async () => {
    const writableStream = createWriteStream(fileToWrite);

    process.stdin.pipe(writableStream);

    process.stdin.on('end', () => {
        process.stdin.destroy();
    })

    process.stdin.on('error', (err) => {
        console.error(`Error writing data to file: ${err}`);
    })
};

await write();