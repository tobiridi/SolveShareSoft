export interface Alertmessage {
    duration: number;
    message: string;
    messageType: messageType;
}

export type messageType = "info" | "error" | "success" | "warning";
