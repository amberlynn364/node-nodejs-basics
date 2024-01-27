import { createHash } from 'crypto';
import { createReadStream } from 'fs';
import { dirname, join } from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const fileToRead = join(__dirname, 'files', 'fileToCalculateHashFor.txt')

const calculateHash = async () => {
    const hash = createHash('sha256');
    const input = createReadStream(fileToRead);

    input.on('readable', () => {
        const data = input.read();
        data ? hash.update(data) : console.log(hash.digest('hex'));
    })

    input.on('error', (err) => {
        console.error(err);
    })
};

await calculateHash();