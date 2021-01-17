interface Base64File {
    name: string;
    size: number;
    type: string;
    data: string;
}

interface Contact {
    id?: number
    first_name: string;
    last_name: string;
    email: string;
    avatar: string;
    newAvatar?: Base64File;
}

interface AppState {
    contacts: Contact[];
    contact?: Contact | null;
    action?: 'ADD' | 'EDIT' | 'DELETE' | null;
    error: any;
    success: boolean | null;
    loading: boolean;
}

type ActionThunk<ReturnType = void> = ThunkAction<ReturnType, {}, null, Action<string>>

interface ListContactsStartAction {
    type: '@@contact/LIST_START'
}

interface ListContactsSuccessAction {
    type: '@@contact/LIST_SUCCESS';
    contacts: any;
}

interface ListContactsFailAction {
    type: '@@contact/LIST_FAIL';
    error: any;
}

interface GetContactStartAction {
    type: '@@contact/GET_START'
}

interface GetContactSuccessAction {
    type: '@@contact/GET_SUCCESS';
    contact: Contact;
}

interface GetContactFailAction {
    type: '@@contact/GET_FAIL';
    error: any;
}

interface SaveContactStartAction {
    type: '@@contact/SAVE_START'
}

interface SaveContactSuccessAction {
    type: '@@contact/SAVE_SUCCESS';
}

interface SaveContactFailAction {
    type: '@@contact/SAVE_FAIL';
    error: any;
}

interface DeleteContactStartAction {
    type: '@@contact/DELETE_START';
}

interface DeleteContactSuccessAction {
    type: '@@contact/DELETE_SUCCESS';
    success: boolean;
}

interface DeleteContactFailAction {
    type: '@@contact/DELETE_FAIL';
    error: any;
}

interface ClearSuccessErrorAction {
    type: '@@contact/CLEAR_SUCCESS_ERROR';
    success: null;
    error: null;
}