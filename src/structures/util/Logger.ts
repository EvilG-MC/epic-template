import chalk from "chalk";

export class Logger {
    constructor() { };

    private setPadding(label: string) {
        const maxLength = 6;
        const bar = "-";

        const spacesToAdd = maxLength - label.length;

        if (spacesToAdd <= 0) return bar;

        const spaces = " ".repeat(spacesToAdd);

        return spaces + bar;
    };

    get getTime() {
        return new Date().toLocaleTimeString();
    };
    get getDate() {
        return new Date().toISOString().split("T")[0];
    };

    public info(text: string) {
        const label = "INFO";
        return console.log(`[${chalk.grey(`${this.getDate} - ${this.getTime}`)}] [${chalk.cyan(label)}]${this.setPadding(label)} ${text}`);
    };

    public log(text: string) {
        const label = "LOG";
        return console.log(`[${chalk.grey(`${this.getDate} - ${this.getTime}`)}] [${chalk.green(label)}]${this.setPadding(label)} ${text}`);
    };

    public warn(text: string) {
        const label = "WARN";
        return console.log(`[${chalk.grey(`${this.getDate} - ${this.getTime}`)}] [${chalk.yellow(label)}]${this.setPadding(label)} ${text}`);
    };

    public error(text: string) {
        const label = "ERROR";
        return console.log(`[${chalk.grey(`${this.getDate} - ${this.getTime}`)}] [${chalk.red(label)}]${this.setPadding(label)} ${text}`);
    };
};