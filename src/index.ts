import "dotenv/config";

import { Handlers } from "#template/builders";
import { Base } from "#template/client";
import { validateEnv } from "#template/utils/Validate.js";

//Some magic there!
Handlers.dirname = import.meta.url;

validateEnv();

const client = new Base();

export default client;
