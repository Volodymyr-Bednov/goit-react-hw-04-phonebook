import { Component } from 'react';
import { Section } from './Section/Section';
import { FormContact } from './FormContact/FormContact';
import { ListContacts } from './ListContacts/ListContacts';
import { Firter } from './Filter/Filter';
import { nanoid } from 'nanoid';
import css from './App.module.css';

export class App extends Component {
  state = {
    contacts: [],
    filter: '',
  };

  componentDidMount() {
    if (localStorage.getItem('contacts')) {
      this.setState({ contacts: JSON.parse(localStorage.getItem('contacts')) });
    }
  }

  componentDidUpdate(prevProps, prevState) {
    localStorage.setItem('contacts', JSON.stringify(this.state.contacts));
  }

  addContactHandler = evt => {
    evt.preventDefault();
    const { name, number } = evt.target.elements;
    const nameValue = name.value;
    const numbervalue = number.value;
    const nameMatch = this.state.contacts.filter(item =>
      item.name.toLowerCase().includes(nameValue.toLowerCase())
    );
    if (nameMatch.length) return alert(`${nameValue} is already in contacts`);
    this.setState(list => {
      return {
        contacts: [
          ...list.contacts,
          { id: nanoid(), name: nameValue, number: numbervalue },
        ],
      };
    });
    this.clearFields(evt.target.elements);
  };

  clearFields = evt => {
    evt.name.value = '';
    evt.number.value = '';
  };
  deleteContactHandler = evt => {
    console.dir(evt.target.dataset.id);
    this.setState(({ contacts }) => {
      return {
        contacts: contacts.filter(item => item.id !== evt.target.dataset.id),
      };
    });
  };

  filterChahge = evt => {
    this.setState({ filter: evt.target.value });
  };

  render() {
    const { filter, contacts } = this.state;
    const formatedtext = filter.toLowerCase();
    const filteredData = contacts.filter(item =>
      item.name.toLowerCase().includes(formatedtext)
    );
    return (
      <div className={css.wrap}>
        <Section
          title={'Phoneboock'}
          children={
            <FormContact onAddContactHandler={this.addContactHandler} />
          }
        />
        <Section title={'Contacts'}>
          <Firter onFilterChahge={this.filterChahge} valueFilter={filter} />
          <ListContacts
            dataList={filteredData}
            onDeleteContactHandler={this.deleteContactHandler}
          />
        </Section>
      </div>
    );
  }
}
