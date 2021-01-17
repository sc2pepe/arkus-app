import '../styles/css/ContactsList.css';
import '../styles/css/FloatingButton.css';
import React from 'react';
import { connect } from 'react-redux';
import { Dispatch } from 'redux';
import { deleteContactAction, listContactsAction } from '../store/contactActions';
import { NavLink } from 'react-router-dom';
import ContactForm from './ContactForm';

interface ContactListProps {
    dispatch: Dispatch,
    contacts: Contact[],
    history: any
}

class ContactList extends React.Component<ContactListProps, any> {
    componentDidMount() {
        this.props.dispatch(listContactsAction());
    }

    render() {
        const { contacts, history, dispatch } = this.props;

        return (
            <>
                <div className="flex">
                    {contacts && contacts.length ?
                        contacts.map((contact) => {
                            return (
                                <div key={contact.id}>
                                    <img key={contact.avatar} src={contact.avatar} alt="" />
                                    <p>
                                        <strong>{contact.first_name} {contact.last_name}</strong>
                                    </p>
                                    <p>
                                        {contact.email}
                                    </p>
                                    <button
                                        onClick={() => {
                                            history.push(`/${contact.id}`)
                                        }}
                                    >
                                        Editar
                                    </button>
                                    <button
                                        onClick={() => {
                                            dispatch(deleteContactAction(contact.id ? contact.id : 0));
                                        }}
                                    >
                                        Borrar
                                    </button>
                                </div>
                            );
                        })
                        : null
                    }
                </div>
                <ContactForm />
                <NavLink className="float" to="/add">
                    <div>+</div>
                </NavLink>
            </>
        );
    }
}


const mapDispatchToProps = (dispatch: Dispatch) => {
    return {
        dispatch
    };
};

const mapStateToProps = (state: AppState) => {
    const { contacts, contact, success } = state;

    return {
        contacts,
        contact,
        success
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(ContactList);