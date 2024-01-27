import { createWriteStream, createReadStream } from 'fs';
import { dirname, join } from 'path';
import { fileURLToPath } from 'url';
import { createGzip } from 'zlib';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const fileToCompress = join(__dirname, 'files', 'fileToCompress.txt');
const compressedFile = join(__dirname, 'files', 'archive.gz');

const compress = async () => {
    const gzip = createGzip();
    const input = createReadStream(fileToCompress);
    const output = createWriteStream(compressedFile);

    input.pipe(gzip).pipe(output);

    output.on('finish', () => {
        console.log('File has been compressed to archive.gz');
    })

    output.on('error', (err) => {
        console.log(`'Error compressing file: ${err}`);
    })
};

await compress();