import { Worker, isMainThread } from 'worker_threads';
import { cpus } from 'os';
import { dirname, join } from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const workerFile = join(__dirname, 'worker.js');


const performCalculations = async () => {
    if (isMainThread) {
        const numWorkers = cpus().length;
        const workers = [];
        const results = [];

        for (let i = 0; i < numWorkers; i++) {
            workers[i] = new Worker(workerFile, { workerData: i + 10 });
            workers[i].on('message', (message) => {
                results[i] = message;
                if (results.filter(Boolean).length === numWorkers) {
                    console.log(results);
                }
            });

            workers[i].on('error', (error) => {
                results[i] = { status: 'error', data: null, error: error.message };
                if (results.filter(Boolean).length === numWorkers) {
                  console.log(results);
                }
              });
        }
    }
};

await performCalculations();