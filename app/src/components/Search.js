import React, { Component } from 'react';

import Input from './Input';
import Results from './Results';

class Search extends Component {
  state = {
    number: '19218',
    selectedOption: 'pr',
    foundPRs: []
  };

  clearObj = { number: '', foundPRs: [] };

  inputRef = React.createRef();

  handleInputEvent = (event) => {
    const { type, key, target: { value } } = event;

    if (type === 'change') {
      if (Number(value) || value === '') {
        this.setState((prevState) => ({ number: value, foundPRs: [] }));
      }
    }
    else if (type === 'keypress' && key === 'Enter') {
      this.searchPRs(value);
    }
  }

  handleButtonClick = () => {
    const { number } = this.state;
    this.searchPRs(number);
  }

  handleOptionChange(changeEvent) {
    this.setState((prevState) => ({ selectedOption: changeEvent.target.value }));
  }

  searchPRs = (type, value) => {
    const baseUrl = 'https://pr-relations.glitch.me/';
    const fetchUrl = baseUrl + (type === 'pr' ? `pr/${value}` : `search/?value=${value}`);
    fetch(fetchUrl)
    .then((response) => response.json())
    .then(({ ok, foundPRs }) => {
      if (ok) {
        if (!foundPRs.length) {
          foundPRs.push({ number: 'No matching results', filenames: [] });
        }
        this.setState((prevState) => ({ foundPRs }));
      }
      else {
        this.inputRef.current.focus();
      }
    })
    .catch(() => {
      this.setState((prevState) => (this.clearObj));
    });
  }

  render() {
    const { handleButtonClick, handleInputEvent, inputRef, state } = this;
    const { number, foundPRs } = state;
    return (
      <>
        <label>
          <input
            type="radio"
            value="pr"
            checked={this.state.selectedOption === 'pr'}
            onChange={this.handleOptionChange}
          />
          PR #
        </label>
        <label>
          <input
            type="radio"
            value="filename"
            checked={this.state.selectedOption === 'filename'}
            onChange={this.handleOptionChange}
          />
          Filename
        </label>
        <Input ref={inputRef} value={number} onInputEvent={handleInputEvent} />
        <button onClick={handleButtonClick}>Search</button>
        <Results foundPRs={foundPRs} />
      </>
    );
  }
}

export default Search;
