export type { ClientConfiguration } from "./client/ClientConfiguration.js";

export type { ClientEvent, ClientEventRun } from "./client/ClientEvent.js";
export type { ClientCommand, ClientCommandAutocomplete, ClientCommandRun } from "./client/ClientCommand.js";
export type { ClientComponent, ClientComponentRun } from "./client/ClientComponent.js";
export type { ClientHandler, ClientHandlerRun } from "./client/ClientHandler.js";

export type { CommandOptions } from "./shared/CommandOptions.js";
export type { ComponentOptions } from "./shared/ComponentOptions.js";

export type When<A, B, C, D> = A extends B ? C : D;

export enum ActionRowType {
    /**
     * Button component.
     */
    Button = 1,
    /**
     * Modal component.
     */
    Modal = 2,
    /**
     * Select Menu component.
     */
    SelectMenu = 3,

    /**
     * String Select Menu component.
     */
    StringSelect = 4,
    /**
     * User Select Menu component.
     */
    UserSelect = 5,
    /**
     * Role Select Menu component.
     */
    RoleSelect = 6,
    /**
     * Mentionable Select Menu component.
     */
    MentionableSelect = 7,
    /**
     * Channel Select Menu component.
     */
    ChannelSelect = 8,
}
