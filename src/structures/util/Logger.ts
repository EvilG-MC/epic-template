import chalk from "chalk";

export class Logger {
    constructor() { };

    get getTime() {
        return new Date().toLocaleTimeString();
    };
    get getDate() {
        return new Date().toISOString().split("T")[0];
    };

    public info(text: string) {
        return console.log(`[${chalk.grey(`${this.getDate} - ${this.getTime}`)}] [${chalk.cyan("INFO")}] - `, text);
    };

    public log(text: string) {
        return console.log(`[${chalk.grey(`${this.getDate} - ${this.getTime}`)}] [${chalk.green("LOG")}] - `, text);
    };

    public warn(text: string) {
        return console.log(`[${chalk.grey(`${this.getDate} - ${this.getTime}`)}] [${chalk.yellow("WARN")}] - `, text);
    };

    public error(text: string) {
        return console.log(`[${chalk.grey(`${this.getDate} - ${this.getTime}`)}] [${chalk.red("ERROR")}] - `, text);
    };
};