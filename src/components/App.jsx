import css from './App.module.css';
import ContactsForm from "./ContactsForm/ContactsForm";
import ContactsList from "components/ContactsList/ContactsList";
import Filter from 'components/Filter/Filter';
import { nanoid } from "nanoid";
import { useSelector, useDispatch } from "react-redux";
import { addContact, filterContacts, deleteContacts, getContactsItem } from "redux/contactsSlice";

const App = () => {
  const dispatch = useDispatch();
  const contacts = useSelector(getContactsItem);
  const filter = useSelector(state => state.contacts.filter);

  const handleSubmit = ({ name, number }, { resetForm }) => {
    const id = nanoid();
    contacts.find(contact => contact.name.toLowerCase() === name.toLowerCase()) ? alert(`${name} is already in contacts`) :
    dispatch(addContact({ name, number, id }));
    resetForm();
  };

  const changeFilter = (evt) => {
    dispatch(filterContacts(evt.currentTarget.value))
  };

  const getFilteredContacts = () => {
      return contacts.filter(contact => contact.name.toLowerCase().includes(filter.toLowerCase()));
  };

  const deleteContact = (contactId) => {
    dispatch(deleteContacts(contactId));
  };

  return (
    <div className={css.container}>
      <h1 className={css.mainTitle}>Phonebook</h1>
      <ContactsForm initialValues={{name: '', number: ''}} onSubmit={handleSubmit}/>
      <h2 className={css.title}>Contacts</h2>
      <Filter filter={filter} changeFilter={changeFilter} />
      <ContactsList filteredContacts={getFilteredContacts()} onDeleteContact={deleteContact} />
    </div>
  )
}

export default App;