import { useEffect, useState } from 'react';
import { Notify } from 'notiflix/build/notiflix-notify-aio';
import { ContactForm } from 'components/ContactForm/ContactForm';
import { ContactList } from 'components/ContactList/ContactList';
import { Filter } from 'components/Filter/Filter';

import { DivContainer, Title, TitleSecond } from './App.styled';
import { useLocalStorage } from 'hooks/useLocalStorage';

const defaultContacts = [
  { id: 'id-1', name: 'Rosie Simpson', number: '459-12-56' },
  { id: 'id-2', name: 'Hermione Kline', number: '443-89-12' },
  { id: 'id-3', name: 'Eden Clements', number: '645-17-79' },
  { id: 'id-4', name: 'Annie Copeland', number: '227-91-26' },
];

export const App = () => {
  const [contacts, setContacts] = useLocalStorage('contacts', defaultContacts);

  // const [contacts, setContacts] = useState(
  //   JSON.parse(localStorage.getItem('contacts')) ?? [
  //     { id: 'id-1', name: 'Rosie Simpson', number: '459-12-56' },
  //     { id: 'id-2', name: 'Hermione Kline', number: '443-89-12' },
  //     { id: 'id-3', name: 'Eden Clements', number: '645-17-79' },
  //     { id: 'id-4', name: 'Annie Copeland', number: '227-91-26' },
  //   ]
  // );
  const [filter, setFilter] = useState('');
  // state = {
  //   contacts: [
  //     { id: 'id-1', name: 'Rosie Simpson', number: '459-12-56' },
  //     { id: 'id-2', name: 'Hermione Kline', number: '443-89-12' },
  //     { id: 'id-3', name: 'Eden Clements', number: '645-17-79' },
  //     { id: 'id-4', name: 'Annie Copeland', number: '227-91-26' },
  //   ],
  //   filter: '',
  // };

  //
  //
  //
  //
  //

  const addContacts = newContact => {
    const isContactExist = contacts.some(
      contact =>
        contact.name.toLowerCase().trim() ===
        newContact.name.toLowerCase().trim()
    );
    if (isContactExist) {
      return Notify.failure(` ${newContact.name} is already in contacts. 😢`);
    }
    setContacts(prevContacts => [...prevContacts, newContact]);
  };
  // addContacts = newContact => {
  //   const isContactExist = this.state.contacts.some(
  //     contact =>
  //       contact.name.toLowerCase().trim() ===
  //       newContact.name.toLowerCase().trim()
  //   );
  //   if (isContactExist) {
  //     return Notify.failure(` ${newContact.name} is already in contacts.`);
  //   }
  //   this.setState(prev => ({ contacts: [...prev.contacts, newContact] }));
  // };

  //
  //
  //
  //
  //

  const removeContacts = id => {
    setContacts(prevContacts => prevContacts.filter(el => el.id !== id));
  };
  // removeContacts = id => {
  //   this.setState(prev => ({
  //     contacts: prev.contacts.filter(el => el.id !== id),
  //   }));
  // };

  //
  //
  //
  //
  //

  const changeFilter = e => {
    setFilter(e.currentTarget.value);
  };
  //  changeFilter = e => {
  //    this.setState({ filter: e.currentTarget.value });
  //  };

  //
  //
  //
  //
  //

  const filterContacts = () => {
    return contacts.filter(({ name }) =>
      name.toLowerCase().includes(filter.toLowerCase())
    );
  };
  //  filterContacts = () => {
  //    const { contacts, filter } = this.state;
  //    return contacts.filter(({ name }) =>
  //      name.toLowerCase().includes(filter.toLowerCase())
  //    );
  //  };

  //
  //
  //
  //
  //
  useEffect(() => {
    localStorage.setItem('contacts', JSON.stringify(contacts));
  }, [contacts]);

  //OR  ↕️❤️

  // const isFirstRenderRef = useRef(true);
  // useEffect(() => {
  //   // console.log('contacts');
  //   if (!isFirstRenderRef.current) {
  //     localStorage.setItem('contacts', JSON.stringify(contacts));
  //   }
  // }, [contacts]);

  // useEffect(() => {
  //   // console.log('one time');

  //   isFirstRenderRef.current = false;
  //   try {
  //     const localStorageData = JSON.parse(localStorage.getItem('contacts'));

  //     if (localStorageData) {
  //       setContacts(localStorageData);
  //     }
  //   } catch (error) {
  //     Notify.failure('🐷 Error happened. Please try again');
  //   }
  // }, []);
  // componentDidUpdate(prevState) {
  //   const { contacts } = this.state;

  //   if (prevState.contacts !== contacts) {
  //     const json = JSON.stringify(contacts);
  //     localStorage.setItem('contacts', json);
  //   }
  // }
  // componentDidMount() {
  //   try {
  //     const localStorageData = JSON.parse(localStorage.getItem('contacts'));

  //     if (localStorageData) {
  //       this.setState(() => ({ contacts: localStorageData }));
  //     }
  //   } catch (error) {
  // Notify.failure('🐷 Error happened. Please try again');
  // }
  // }

  const filteredContacts = filterContacts();
  return (
    <DivContainer>
      <Title>Phonebook</Title>
      <ContactForm onSubmitForm={addContacts} />

      <TitleSecond>Contacts</TitleSecond>
      <Filter value={filter} onChangeFilter={changeFilter} />

      <ContactList
        contacts={filteredContacts}
        removeContacts={removeContacts}
      />
    </DivContainer>
  );
};
