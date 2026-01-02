export interface NotificationDto{
    to:string;
    subject:string;
    templetId: string;
    params: Record<string, any>;
}