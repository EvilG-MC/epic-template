import type { ClientConfiguration } from "#template/types";
import { config } from "dotenv";

config();

export const Configuration: ClientConfiguration = {
	token: process.env.TOKEN,
	developerIds: [
		"391283181665517568", // <-- JustEvil
		"OTHER-ID",
	],
	guildIds: [
		"123", // <-- Example guild,
		"OTHER-ID",
	],
};
