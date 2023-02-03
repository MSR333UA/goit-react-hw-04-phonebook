import { Notify } from 'notiflix/build/notiflix-notify-aio';
import { nanoid } from 'nanoid';
import { useState } from 'react';
import { PropTypes } from 'prop-types';
import { Form, FormBtn, FormInput, FormLabel } from './ContactForm.styled';

export const ContactForm = ({ onSubmitForm }) => {
  const [name, setName] = useState('');
  const [number, setNumber] = useState('');
  // state = {
  //   name: '',
  //   number: '',
  // };

  const handleChange = e => {
    const { name, value } = e.target;

    switch (name) {
      case 'name':
        setName(value);
        break;
      case 'number':
        setNumber(value);
        break;
      default:
        Notify.failure('🐷 Error happened. Please try again');
        break;
    }
  };
  // handleChange = e => {
  //   const { name, value } = e.target;
  //   this.setState({ [name]: value });
  // };

  //
  //
  //
  //
  //

  const handleSubmit = e => {
    e.preventDefault();

    onSubmitForm({ name, number, id: nanoid() });
    reset();
  };
  // handleSubmit = e => {
  //   e.preventDefault();
  //   this.props.onSubmitForm({ ...this.state, id: nanoid() });
  //   this.reset();
  // };
  //
  //
  //
  const reset = () => {
    setName('');
    setNumber('');
  };
  // reset = () => {
  //   this.setState({ name: '', number: '' });
  // };

  return (
    <Form onSubmit={handleSubmit}>
      <FormLabel>Name</FormLabel>
      <FormInput
        type="text"
        name="name"
        value={name}
        onChange={handleChange}
        pattern="^[a-zA-Zа-яА-Я]+(([' -][a-zA-Zа-яА-Я ])?[a-zA-Zа-яА-Я]*)*$"
        title="Name may contain only letters, apostrophe, dash and spaces. For example Adrian, Jacob Mercer, Charles de Batz de Castelmore d'Artagnan"
        required
      />

      <FormLabel>Number</FormLabel>
      <FormInput
        type="tel"
        name="number"
        value={number}
        onChange={handleChange}
        pattern="\+?\d{1,4}?[-.\s]?\(?\d{1,3}?\)?[-.\s]?\d{1,4}[-.\s]?\d{1,4}[-.\s]?\d{1,9}"
        title="Phone number must be digits and can contain spaces, dashes, parentheses and can start with +"
        required
      />
      <FormBtn type="submit">Add contact</FormBtn>
    </Form>
  );
};

ContactForm.propTypes = {
  onSubmitForm: PropTypes.func.isRequired,
};
