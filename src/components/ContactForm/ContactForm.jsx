import { useState } from 'react';

import { Form, Input, Label, Button } from './ContactForm.module';

export const ContactForm = ({ addContact }) => {
  const [name, setName] = useState('');
  const [number, setNumber] = useState('');

  const handleChange = event =>
    event.currentTarget.name === 'name'
      ? setName(event.currentTarget.value)
      : setNumber(event.currentTarget.value);
  
  const resetContactForm = () => {
    setName('');
    setNumber('');
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    addContact({ name, number });

    resetContactForm();
  };

  return (
    <Form onSubmit={handleSubmit} autoComplete="off">
      <Label>
        Name
        <Input
          type="text"
          name="name"
          title="Name may contain only letters, apostrophe, dash and spaces. For example Adrian, Jacob Mercer, Charles de Batz de Castelmore d'Artagnan"
          required
          placeholder="Enter name"
          value={name}
          onChange={handleChange}
        />
      </Label>
      <Label>
        Number
        <Input
          type="tel"
          name="number"
          title="Phone number must be digits and can contain spaces, dashes, parentheses and can start with +"
          required
          placeholder="Enter number"
          value={number}
          onChange={handleChange}
        />
      </Label>
      <Button type="submit" disabled={!name || !number}>
        Add contact
      </Button>
    </Form>
  );
};