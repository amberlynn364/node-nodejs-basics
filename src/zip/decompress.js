import { createWriteStream, createReadStream } from 'fs';
import { dirname, join } from 'path';
import { fileURLToPath } from 'url';
import { createGunzip } from 'zlib';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const compressedFile = join(__dirname, 'files', 'archive.gz');
const decompressedFile = join(__dirname, 'files', 'fileToCompress.txt');

const decompress = async () => {
    const gunzip = createGunzip();
    const input = createReadStream(compressedFile);
    const output = createWriteStream(decompressedFile);

    input.pipe(gunzip).pipe(output);

    output.on('finish', function() {
        console.log('File has been decompressed to fileToCompress.txt');
      });

      output.on('error', (err) => {
        console.log(`'Error decompressing file: ${err}`);
    })
};

await decompress();