export function validateEnv() {
    if (!process.env.TOKEN) throw new Error(`The env variable: "TOKEN" is missing in the ".env" file.`);
}
