import { dirname, join } from 'path';
import { fileURLToPath } from 'url';
import { spawn } from 'child_process';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const script = join(__dirname, 'files', 'script.js');

const spawnChildProcess = async (args) => {
    const child = spawn('node', [script, ...args], { stdio: ['pipe', 'pipe', 'pipe', 'ipc'] });

    process.stdin.pipe(child.stdin);
    child.stdout.pipe(process.stdout);

    return new Promise((resolve, reject) => {
        child.on('exit', (code) => {
            code === 0 ? resolve() : reject(new Error(`Child process exited with code ${code}`));
        })
    })
};

// Put your arguments in function call to test this functionality
spawnChildProcess([12312, 'someArgument2']);
