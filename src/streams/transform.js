import { Transform } from 'stream'

const transform = async () => {
    const reverseStream = new Transform({
        transform(chunk, _, callback) {
            this.push(chunk.toString().split('').reverse().join(''));
            callback();
        }
    })

    process.stdin.pipe(reverseStream).pipe(process.stdout);
};

await transform();