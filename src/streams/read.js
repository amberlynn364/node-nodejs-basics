import { createReadStream } from 'fs';
import { dirname, join } from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const fileToRead = join(__dirname, 'files', 'fileToRead.txt');

const read = async () => {
    const readableStream = createReadStream(fileToRead);

    readableStream.on('data', (chunk) => {
        process.stdout.write(chunk);
    })

    readableStream.on('end', () => {
        console.log('\nFile has been read')
    })

    readableStream.on('error', (err) => {
        console.error(`Error reading the file: ${err}`);
    })
};

await read();