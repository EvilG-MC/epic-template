import chalk from "chalk";

export class Logger {
    private setPadding(label: string) {
        const maxLength = 6;
        const bar = "-";

        const spacesToAdd = maxLength - label.length;

        if (spacesToAdd <= 0) return bar;

        const spaces = " ".repeat(spacesToAdd);

        return spaces + bar;
    }

    get timeFormat() {
        const date = new Date();
        return `${date.toLocaleDateString()} - ${date.toLocaleTimeString()}`;
    }

    public log(text: string) {
        const label = "LOG";
        return console.info(`[${chalk.grey(`${this.timeFormat}`)}] [${chalk.green(label)}]${this.setPadding(label)} ${text}`);
    }

    public warn(text: string) {
        const label = "WARN";
        return console.info(`[${chalk.grey(`${this.timeFormat}`)}] [${chalk.yellow(label)}]${this.setPadding(label)} ${text}`);
    }

    public error(text: string) {
        const label = "ERROR";
        return console.info(`[${chalk.grey(`${this.timeFormat}`)}] [${chalk.red(label)}]${this.setPadding(label)} ${text}`);
    }
}
