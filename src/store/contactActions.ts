import { Dispatch } from 'redux';
import ContactService from '../services/ContactService';

export const listContactsStartAction = (): ListContactsStartAction => ({
    type: '@@contact/LIST_START'
});

export const listContactsSuccessAction = (contacts: any): ListContactsSuccessAction => ({
    type: '@@contact/LIST_SUCCESS',
    contacts
});

export const listContactsFailAction = (error: any): ListContactsFailAction => ({
    type: '@@contact/LIST_FAIL',
    error
});

export const listContactsAction = (): ActionThunk => async (dispatch: Dispatch, getState: () => AppState) => {
    const { loading } = getState();

    if (!loading) {
        dispatch(listContactsStartAction());

        const response = await ContactService.listContacts();

        if (!response.errors) {
            dispatch(listContactsSuccessAction(response.data));
        } else {
            dispatch(listContactsFailAction(!response.errors[0]));
        }
    }
};

export const getContactStartAction = (): GetContactStartAction => ({
    type: '@@contact/GET_START'
});

export const getContactSuccessAction = (contact: any): GetContactSuccessAction => ({
    type: '@@contact/GET_SUCCESS',
    contact
});

export const getContactFailAction = (error: any): GetContactFailAction => ({
    type: '@@contact/GET_FAIL',
    error
});

export const getContactAction = (id: number): ActionThunk => async (dispatch: Dispatch, getState: () => AppState) => {
    const { loading } = getState();

    if (!loading) {
        dispatch(getContactStartAction());

        const response = await ContactService.getContact(id);

        if (!response.errors) {
            dispatch(getContactSuccessAction(response.data));
        } else {
            dispatch(getContactFailAction(!response.errors[0]));
        }
    }
};

export const saveContactStartAction = (): SaveContactStartAction => ({
    type: '@@contact/SAVE_START'
});

export const saveContactSuccessAction = (success: boolean): SaveContactSuccessAction => ({
    type: '@@contact/SAVE_SUCCESS'
});

export const saveContactFailAction = (error: any): SaveContactFailAction => ({
    type: '@@contact/SAVE_FAIL',
    error
});

export const saveContactAction = (contact: Contact): ActionThunk => async (dispatch: Dispatch, getState: () => AppState) => {
    const { loading } = getState();

    if (!loading) {
        dispatch(saveContactStartAction());

        const response = await ContactService.saveContact(contact);

        if (!response.errors) {
            dispatch(saveContactSuccessAction(response));
        } else {
            dispatch(saveContactFailAction(!response.errors[0]));
        }
    }
};

export const deleteContactStartAction = (): DeleteContactStartAction => ({
    type: '@@contact/DELETE_START'
});

export const deleteContactSuccessAction = (success: boolean): DeleteContactSuccessAction => ({
    type: '@@contact/DELETE_SUCCESS',
    success
});

export const deleteContactFailAction = (error: any): DeleteContactFailAction => ({
    type: '@@contact/DELETE_FAIL',
    error
});

export const deleteContactAction = (id: number): ActionThunk => async (dispatch: Dispatch, getState: () => AppState) => {
    const { loading } = getState();

    if (!loading) {
        dispatch(deleteContactStartAction());

        const response = await ContactService.deleteContact(id);

        if (!response.errors) {
            dispatch(deleteContactSuccessAction(response));
            dispatch(listContactsAction());
        } else {
            dispatch(deleteContactFailAction(!response.errors[0]));
        }
    }
};

export const clearSuccessErrorAction = (): ClearSuccessErrorAction => ({
    type: '@@contact/CLEAR_SUCCESS_ERROR',
    success: null,
    error: null
});