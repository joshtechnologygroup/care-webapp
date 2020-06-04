import { CREATE_TOAST_NOTIFICATION } from 'Reducers/Types';

const createToastNotification = (data) => {
    return {
        type: CREATE_TOAST_NOTIFICATION,
        data: data,
    };
}

export { createToastNotification };
