import { join } from "node:path";
import { glob } from "glob";

export async function loadFiles(dir: string) {
    try {
        const mainCwd = process.cwd().replace(/\\/g, "/");
        const path = join(mainCwd, "dist", dir);

        const files = await glob(`${path}/**/*.js`);

        return files;
    } catch (error) {
        console.log("Error trying to load files in the directory: ", dir);
        throw error;
    };
};