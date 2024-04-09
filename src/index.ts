import { Base } from "#template/client";
import { validateEnv } from "#template/utils/Validate.js";

process.loadEnvFile();

validateEnv();

const client = new Base();
export default client;
