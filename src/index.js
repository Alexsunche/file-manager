import * as readline from 'node:readline';
import os from 'os';
import { sep } from 'node:path';
import { cd, showDir, ls, cat, add, cp } from './scripts/index.js'
import path from 'node:path';
import { rn } from './scripts/rn.js';

const args = process.argv.splice(2);
const USER_NAME = args[0].split('=')[1]

let currentDir = os.homedir();


const greetString = `Welcome to the File Manager, ${USER_NAME}!`
const exitString = `Thank you for using File Manager, ${USER_NAME}, goodbye!`

const initExitProcess = () => {
    console.log(exitString)
    process.exit(0)
};

const handleUp = () => {
    currentDir = path.resolve(currentDir, '..')
}

const handleLine = async input => {
    const [command, ...args] = input.split(" ");
    switch (command) {
        case '.exit':
            initExitProcess();
            break;
        case 'up':
            handleUp();
            break;
        case 'cd':
            currentDir = await cd(currentDir, args[0]) || currentDir;
            break;
        case 'ls':
            ls(currentDir);
            break;
        case 'cat':
            cat(currentDir, args[0]);
            break;
        case 'add':
            add(currentDir, args[0]);
            break;    
        case 'rn':
            rn(currentDir, args);
            break;
        case 'cp':
            cp(currentDir, args);
            break;                       
        default:
            console.log(`Invalid input. Try to write correct command!`);    
    }
}

const runApp = () => {
    console.log(greetString)
    showDir(currentDir)

    const rl = readline.createInterface(process.stdin, process.stdout)

    rl.on('line', (input) => {
        handleLine(input);
    });

    rl.on('SIGINT', () => {
        initExitProcess()
    });

}

runApp()