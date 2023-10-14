import { ActionRowType, ClientComponent } from "#template/types";

export function createComponent<K extends ActionRowType>(component: ClientComponent<K>) {
    return component;
};