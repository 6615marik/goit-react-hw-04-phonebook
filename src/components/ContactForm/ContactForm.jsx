import React from 'react';
import PropTypes from 'prop-types';
import css from './ContactForm.module.css';

export const ContactForm = ({ onSubmit, name, number, setNumber, setName }) => {
  // const [name, setName] = useState('');
  // const [number, setNumber] = useState('');

  const handleChangeForm = ({ target }) => {
    // console.log(target);
    const { name, value } = target;
    if (name === 'name') {
      setName(value);
    } else if (name === 'number') {
      setNumber(value);
    }
  };

  const handleFormSubmit = e => {
    e.preventDefault();
    const data = { name, number };
    onSubmit(data);
    setName('');
    setNumber('');
  };

  return (
    <form onSubmit={handleFormSubmit} className={css.form}>
      <label className={css.input_label} htmlFor="name">
        Name
      </label>
      <input
        className={css.input_text}
        type="text"
        name="name"
        value={name}
        onChange={handleChangeForm}
        placeholder="Alex"
        pattern="^[a-zA-Zа-яА-Я]+(([' -][a-zA-Zа-яА-Я ])?[a-zA-Zа-яА-Я]*)*$"
        title="Name may contain only letters, apostrophe, dash and spaces. For example Adrian, Jacob Mercer, Charles de Batz de Castelmore d'Artagnan"
        required
      />
      <label className={css.input_label} htmlFor="number">
        Number
      </label>
      <input
        className={css.input_text}
        type="tel"
        name="number"
        value={number}
        onChange={handleChangeForm}
        placeholder="+38 066 155 22 255"
        pattern="\+?\d{1,4}?[-.\s]?\(?\d{1,3}?\)?[-.\s]?\d{1,4}[-.\s]?\d{1,4}[-.\s]?\d{1,9}"
        title="Phone number must be digits and can contain spaces, dashes, parentheses and can start with +"
        required
      />
      <button className={css.btn} type="submit">
        Add contact
      </button>
    </form>
  );
};

ContactForm.propTypes = {
  onSubmit: PropTypes.func.isRequired,
};
