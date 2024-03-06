//@ts-check

import { rm } from "node:fs/promises";
import { existsSync } from "node:fs";
import { resolve } from "node:path";
import { exec } from "node:child_process";

/**
 * 
 * @param {string} command 
 * @returns {Promise<string>}
 */
const execSync = (command) => {
    return new Promise((res, rej) => {
        exec(command, (error, stdout) => {
            if (error) return rej(error);
            return res(stdout);
        });
    });
};

(async () => {
    console.log("Attemping to compile...");
    
    const timeStart = Date.now();

    try {
        const path = resolve("dist");
        const exist = existsSync(path);

        if (exist) await rm(path, { recursive: true });

        await execSync("npm run compile");

        console.log(`Done! Compiled at: ${Date.now() - timeStart}ms`);
    } catch (error) {
        console.log(`Error! Compilation error: ${error}`);
    };
})();