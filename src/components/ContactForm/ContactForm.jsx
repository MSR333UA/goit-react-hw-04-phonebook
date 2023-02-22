import { Notify } from 'notiflix/build/notiflix-notify-aio';
import { nanoid } from 'nanoid';
// import { useState } from 'react';
import { PropTypes } from 'prop-types';
import { useReducer } from 'react';
import { Form, FormBtn, FormInput, FormLabel } from './ContactForm.styled';
import { memo } from 'react';

const initialState = {
  name: '',
  number: '',
};

function formReducer(state, action) {
  switch (action.type) {
    case 'UPDATE_NAME':
      return { ...state, name: action.payload };
    case 'UPDATE_NUMBER':
      return { ...state, number: action.payload };
    case 'RESET_FORM':
      return initialState;
    default:
      Notify.failure('🐷 Error happened. Please try again');
      return state;
  }
}

const ContactForm = ({ onSubmitForm }) => {
  const [formState, dispatch] = useReducer(formReducer, initialState);

  const handleChange = e => {
    const { name, value } = e.target;

    switch (name) {
      case 'name':
        dispatch({ type: 'UPDATE_NAME', payload: value });
        break;
      case 'number':
        dispatch({ type: 'UPDATE_NUMBER', payload: value });
        break;
      default:
        dispatch({ type: 'DEFAULT' });
        break;
    }
  };

  const handleSubmit = e => {
    e.preventDefault();

    onSubmitForm({ ...formState, id: nanoid() });
    dispatch({ type: 'RESET_FORM' });
  };

  // const [name, setName] = useState('');
  // const [number, setNumber] = useState('');
  // // state = {
  // //   name: '',
  // //   number: '',
  // // };

  // const handleChange = e => {
  //   const { name, value } = e.target;

  //   switch (name) {
  //     case 'name':
  //       setName(value);
  //       break;
  //     case 'number':
  //       setNumber(value);
  //       break;
  //     default:
  //       Notify.failure('🐷 Error happened. Please try again');
  //       break;
  //   }
  // };
  // // handleChange = e => {
  // //   const { name, value } = e.target;
  // //   this.setState({ [name]: value });
  // // };

  // //
  // //
  // //
  // //
  // //

  // const handleSubmit = e => {
  //   e.preventDefault();

  //   onSubmitForm({ name, number, id: nanoid() });
  //   reset();
  // };
  // // handleSubmit = e => {
  // //   e.preventDefault();
  // //   this.props.onSubmitForm({ ...this.state, id: nanoid() });
  // //   this.reset();
  // // };
  // //
  // //
  // //
  // const reset = () => {
  //   setName('');
  //   setNumber('');
  // };
  // // reset = () => {
  // //   this.setState({ name: '', number: '' });
  // // };

  return (
    <Form onSubmit={handleSubmit}>
      <FormLabel>Name</FormLabel>
      <FormInput
        type="text"
        name="name"
        value={formState.name}
        onChange={handleChange}
        pattern="^[a-zA-Zа-яА-Я]+(([' -][a-zA-Zа-яА-Я ])?[a-zA-Zа-яА-Я]*)*$"
        title="Name may contain only letters, apostrophe, dash and spaces. For example Adrian, Jacob Mercer, Charles de Batz de Castelmore d'Artagnan"
        required
      />

      <FormLabel>Number</FormLabel>
      <FormInput
        type="tel"
        name="number"
        value={formState.number}
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
export default memo(ContactForm);
