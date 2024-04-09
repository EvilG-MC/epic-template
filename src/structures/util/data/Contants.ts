import { readFile } from "node:fs/promises";

const packageJSON = JSON.parse(await readFile("./package.json", "utf-8"));

/**
 * @important Get the version from the `package.json`.
 */
export const VERSION: string = packageJSON.version;
