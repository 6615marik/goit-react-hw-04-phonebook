import { useState, useEffect } from 'react';
import { ContactForm } from './ContactForm/ContactForm';
import { ContactList } from './ContactList/ContactList';
import { Filter } from './Filter/Filter';
import { nanoid } from 'nanoid';

export const App = () => {
  const initialData = [
    { id: 'id-1', name: 'Rosie Simpson', number: '459-12-56' },
    { id: 'id-2', name: 'Hermione Kline', number: '443-89-12' },
    { id: 'id-3', name: 'Eden Clements', number: '645-17-79' },
    { id: 'id-4', name: 'Annie Copeland', number: '227-91-26' },
  ];

  const [name, setName] = useState('');
  const [number, setNumber] = useState('');
  const [filter, setFilter] = useState('');
  const [contacts, setContacts] = useState(() => {
    return JSON.parse(window.localStorage.getItem('contacts')) ?? initialData;
  });

  useEffect(() => {
    localStorage.setItem('contacts', JSON.stringify(contacts));
  }, [contacts]);

  const handleAddContact = data => {
    if (contacts.some(contact => contact.name === data.name)) {
      alert(`${data.name} already exists`);
      return;
    }

    setContacts(contacts => {
      const newContact = {
        id: nanoid(),
        ...data,
      };
      return [newContact, ...contacts];
    });
    setName('');
    setNumber('');
  };
  const handleFilterChange = e => {
    setFilter(e.currentTarget.value);
  };

  const handleRemoveContact = contactId => {
    setContacts(contacts.filter(({ id }) => id !== contactId));
  };

  const visibleContacts = (contacts, filter) => {
    return contacts.filter(({ name }) =>
      name.toLocaleLowerCase().includes(filter.toLocaleLowerCase())
    );
  };

  return (
    <div className="main">
      <h1>Phonebook</h1>
      <ContactForm onSubmit={handleAddContact} name={name} number={number} />
      <h2>Contacts</h2>
      <ContactList
        contacts={visibleContacts(contacts, filter)}
        onRemove={handleRemoveContact}
      >
        <Filter filter={filter} onChange={handleFilterChange} />
      </ContactList>
    </div>
  );
};
