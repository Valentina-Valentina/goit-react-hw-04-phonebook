import { useEffect, useState } from 'react';
import { nanoid } from 'nanoid';

import { Section } from './Section/Section';
import { ContactForm } from './ContactForm/ContactForm';
import { Filter } from './Filter/Filter';
import { ContactList } from './ContactList/ContactList';

export const App = () => {
  const [contacts, setContacts] = useState(() => {
    const savedContacts = localStorage.getItem('contacts'); // Отримуємо дані з localStorage.
    if (savedContacts !== null) {
      return JSON.parse(savedContacts); // Додаємо контакти в об"єкт "contacts".
    }

    return [
      { id: 'id-1', name: 'Rosie Simpson', number: '459-12-56' },
      { id: 'id-2', name: 'Hermione Kline', number: '443-89-12' },
      { id: 'id-3', name: 'Eden Clements', number: '645-17-79' },
      { id: 'id-4', name: 'Annie Copeland', number: '227-91-26' },
    ];
  });

  useEffect(() => {
      // Порівнюємо поточні контакти с попереднім об"єктом контактів.
      localStorage.setItem('contacts', JSON.stringify(contacts));
      // Якщо контакти змінились, зберігаємо їх у localStorage.
  }, [contacts]);

  const [filter, setFilter] = useState('');

  const addContact = data => {
    const newContact = {
      id: nanoid(),
      ...data,
    };

    contacts.some(({ name }) => name === data.name)
      ? alert(`${data.name} is already in contacts`)
      : setContacts(contacts => [...contacts, newContact]);
  };

  const deleteContact = userId => {
    setContacts(contacts => contacts.filter(contact => contact.id !== userId));
  };

  const handleChangeFilter = ({ currentTarget: { value } }) => {
    setFilter(value);
  };

  const getFilterContacts = contacts.filter(({ name }) =>
    name.toLowerCase().includes(filter.toLowerCase())
  );

  return (
    <>
      <Section title="Phonebook">
        <ContactForm addContact={addContact} />
      </Section>
      <Section title="Contacts">
        <Filter value={filter} handleChangeFilter={handleChangeFilter} />

        <ContactList
          contacts={getFilterContacts}
          deleteContact={deleteContact}
        />
      </Section>
    </>
  );
};