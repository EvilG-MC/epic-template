import type { Awaitable } from "discord.js";
import type { Base } from "#template/client";

import { readdir } from "node:fs/promises";
import { basename, join, resolve } from "node:path";
import { pathToFileURL } from "node:url";
import { AsciiTable3 } from "ascii-table3";

export abstract class Handlers {
    readonly name: string = this.constructor.name;
    readonly table: AsciiTable3 = new AsciiTable3(this.name).setStyle("unicode-single");

    /**
     *
     * Load files from a specific directory.
     * @param directory The directory to load.
     * @returns
     */
    protected async loadFiles(directory: string): Promise<string[]> {
        directory = resolve("dist", directory);

        const files: string[] = [];

        try {
            const searchFiles = await readdir(directory, { withFileTypes: true });
            if (!searchFiles.length) return files;

            for (const file of searchFiles) {
                const filePath = join(directory, file.name);

                if (file.isFile()) files.push(filePath);
                else if (file.isDirectory()) files.push(...(await this.loadFiles(filePath)));
            }

            return files;
        } catch (_error) {
            //ignore the error, why not?
            return files;
        }
    }

    /**
     *
     * Import files from path.
     * @param file
     * @returns
     */
    protected async import(file: string): Promise<any> {
        const result = (await import(`${pathToFileURL(file)}?updated=${Date.now()}`)).default;
        if (!result) throw new Error(`File: '${basename(file)}' is not exported as default or it's empty.`);
        return result;
    }

    /**
     *
     * The bot will execute this method.
     * When the handler is loaded.
     */
    public abstract load(client: Base): Awaitable<void>;
}
