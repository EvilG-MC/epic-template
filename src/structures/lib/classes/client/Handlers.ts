import type { Awaitable } from "discord.js";
import type { Base } from "#template/client";

import { basename, dirname } from "node:path";
import { fileURLToPath, pathToFileURL } from "node:url";
import { AsciiTable3 } from "ascii-table3";
import { glob } from "glob";

export abstract class Handlers {
    readonly name: string = this.constructor.name;
    readonly table: AsciiTable3 = new AsciiTable3(this.name).setStyle("unicode-single");

    static dirname: string;

    /**
     *
     * Load files from a specific directory.
     * @param directory The directory to load.
     * @returns
     */
    protected loadFiles(directory: string): Promise<string[]> {
        return glob(`${dirname(fileURLToPath(Handlers.dirname))}/${directory}/**/*.{js,ts}`);
    }

    /**
     *
     * Import files from path.
     * @param file
     * @returns
     */
    protected async import<T = any>(file: string): Promise<T> {
        const result = (await import(`${pathToFileURL(file)}?updated=${Date.now()}`)).default;
        if (!result) throw new Error(`File: '${basename(file)}' is not exported as default or it's empty.`);

        return result as T;
    }

    /**
     *
     * The bot will execute this method.
     * When the handler is loaded.
     */
    public abstract load(client: Base): Awaitable<any>;
}
