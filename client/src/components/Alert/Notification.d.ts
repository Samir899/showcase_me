import React from "react";
type AlertProps = {
    alert: {
        type: 'success' | 'error';
        message: string;
    } | null;
    setAlert: (alert: {
        type: 'success' | 'error';
        message: string;
    } | null) => void;
};
declare const Notification: React.FC<AlertProps>;
export default Notification;
