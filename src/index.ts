import { Base } from "#template/client";
import { validateEnv } from "#template/utils/Validate.js";

validateEnv();

const client = new Base();

export default client;
