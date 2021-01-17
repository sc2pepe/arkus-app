import '../styles/css/ContactForm.css';
import React, { useEffect, useState } from 'react';
import { Dispatch } from 'redux';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory, useRouteMatch } from 'react-router-dom';
import * as yup from 'yup';
import Modal from 'react-modal';
import { yupResolver } from '@hookform/resolvers/yup';
import { clearSuccessErrorAction, getContactAction, saveContactAction } from '../store/contactActions';
import { useForm } from 'react-hook-form';

interface MatchParams {
    id: string
}

const fileUploadToBase64 = (file: any) => new Promise<string>((resolve, reject) => {
    const reader = new FileReader();

    reader.readAsDataURL(file);
    reader.onload = () => resolve(String(reader.result));
    reader.onerror = error => reject(error);
});

const ContactFormSchema = yup.object().shape({
    first_name: yup.string().required(),
    last_name: yup.string().required(),
    email: yup.string().required().email()
});


const ContactForm = () => {
    const dispatch: Dispatch = useDispatch();
    const { contact, success, error } = useSelector((store: AppState) => store);

    const history = useHistory();
    const match = useRouteMatch<MatchParams>('/:id');
    const id: string | undefined = match?.params?.id;

    const [show, setShow] = useState(false);
    const [newAvatar, setNewAvatar] = useState<Base64File>();

    const { register, reset, handleSubmit, errors } = useForm<Contact>({
        resolver: yupResolver(ContactFormSchema),
    });

    const handleAvatarChange = async (event: any) => {
        const [file] = event.target.files;

        if (file) {
            const { name, type, size } = file;

            let data = await fileUploadToBase64(file);

            data = data.substring(data.indexOf('base64,') + 7);

            setNewAvatar({
                name,
                size,
                type,
                data
            });
        } else {
            setNewAvatar(newAvatar ? newAvatar : undefined);
        }
    };

    const onSubmit = (data: Contact) => {
        data.id = contact ? contact.id : undefined;

        dispatch(saveContactAction(data));
    };

    useEffect(() => {
        if (contact) {
            reset(contact);
        }
    }, [contact]);

    useEffect(() => {
        if (success) {
            dispatch(clearSuccessErrorAction());
            history.push('/');
        } else if (!!error) {
            console.log(error);
        }
    }, [success, error]);

    useEffect(() => {
        console.log(errors);
    }, [errors]);

    useEffect(() => {
        if (id) {
            if (id !== 'add') {
                dispatch(getContactAction(+id));
            } else {
                reset({
                    first_name: '',
                    last_name: '',
                    email: '',
                    avatar: ''
                });
            }
        }
        setNewAvatar(undefined);
        setShow(Boolean(id));
    }, [id]);

    return (
        <Modal
            isOpen={show}
            contentLabel={id && id === 'add' ? 'Nuevo contacto' : 'Edición'}
        >
            <form onSubmit={handleSubmit(onSubmit)}>
                <div>
                    <label htmlFor="first_name">First Name *</label>
                    <input
                        ref={register}
                        type="text"
                        id="first_name"
                        name="first_name"
                    />
                    <span className="error">
                        {errors.first_name?.type === "required" && "Este campo es requierido"}
                    </span>
                </div>
                <div>
                    <label htmlFor="last_name">Last Name *</label>
                    <input
                        ref={register}
                        type="text"
                        id="last_name"
                        name="last_name"
                    />
                    <span className="error">
                        {errors.last_name?.type === "required" && "Este campo es requierido"}
                    </span>
                </div>
                <div>
                    <label htmlFor="email">Email *</label>
                    <input
                        ref={register}
                        type="email"
                        id="email"
                        name="email"
                    />
                    <span className="error">
                        {errors.email?.type === "required" && "Este campo es requierido"}
                    </span>
                </div>
                <div>
                    <label htmlFor="avatar">Avatar</label>
                    <br />
                    {contact && id !== 'add' ?
                        <img
                            src={newAvatar ?
                                `data:${newAvatar.type};base64,${newAvatar.data}`
                                : contact.avatar
                            }
                            alt=""
                        />
                        : (newAvatar ?
                            <img
                                src={`data:${newAvatar.type};base64,${newAvatar.data}`}
                                alt=""
                            />
                            : null
                        )
                    }
                    <input
                        id="upload-file"
                        name="upload-file"
                        type="file"
                        accept=".png,.jpg"
                        onChange={(event) => {
                            handleAvatarChange(event)
                        }}
                    />
                </div>
                <br />
                <button type="submit">Guardar</button>
                <button
                    onClick={() => {
                        history.push('/')
                    }}
                >Regresar</button>
            </form>
        </Modal>
    );
};

export default ContactForm;