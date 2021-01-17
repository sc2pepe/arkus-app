import AxiosInstance from './ApiBase';

export const USERS_ENDPOINT = `/users`;

class ContactService {
    listContacts = async () => {
        let response = null;
        try {
            response = await AxiosInstance.get(`${USERS_ENDPOINT}`);
            response = response.data;
        } catch (error) {
            response = error;
        }
        return response;
    };

    saveContact = async (contact: Contact) => {
        let response = null;
        try {
            if (contact) {
                if (contact.id) {
                    response = await AxiosInstance.put(`${USERS_ENDPOINT}/${contact.id}`, contact);
                } else {
                    response = await AxiosInstance.post(`${USERS_ENDPOINT}`, contact);
                }
                response = response.data;
            } else {
                throw { errors: [{ msg: 'Debes proporcionar un contacto.' }] };
            }
        } catch (error) {
            response = error;
        }
        return response;
    }

    getContact = async (id: number) => {
        let response = null;
        try {
            if (id) {
                response = await AxiosInstance.get(`${USERS_ENDPOINT}/${id}`);
            } else {
                throw { errors: [{ msg: 'Debes proporcionar un ID de contacto.' }] };
            }
            response = response.data;
        } catch (error) {
            response = error;
        }
        return response;
    }

    deleteContact = async (id: number) => {
        let response = null;
        try {
            if (id) {
                response = await AxiosInstance.delete(`${USERS_ENDPOINT}/${id}`);
            } else {
                throw { errors: [{ msg: 'Debes proporcionar un ID de contacto.' }] };
            }
            response = response.data;
        } catch (error) {
            response = error;
        }
        return response;
    }
}

export default new ContactService();