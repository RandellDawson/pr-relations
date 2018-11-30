import React, { Component } from 'react';

import Input from './Input';
import Results from './Results';
import SearchOption from './SearchOption';
class Search extends Component {
  state = {
    number: '19218',
    // selectedOption: 'filename',
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

  handleOptionChange = (changeEvent) => {
    const selectedOption = changeEvent.target.value;
    this.setState((prevState) => ({ selectedOption }));
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
    const { handleButtonClick, handleInputEvent, inputRef, handleOptionChange, state } = this;
    const { number, foundPRs, selectedOption } = state;
    return (
      <>
        <div>
          <SearchOption value="pr" onOptionChange={handleOptionChange} selectedOption={selectedOption}>
            PR #
          </SearchOption>
          <SearchOption value="filename" onOptionChange={handleOptionChange} selectedOption={selectedOption}>
            Filename
          </SearchOption>
        </div>
        <Input ref={inputRef} value={number} onInputEvent={handleInputEvent} />
        <button onClick={handleButtonClick}>Search</button>
        <Results foundPRs={foundPRs} />
      </>
    );
  }
}

export default Search;

/*
<label>
  <input
    id="pr"
    name="searchType"
    type="radio"
    value="pr"
    checked={this.state.selectedOption === 'pr'}
    onChange={this.handleOptionChange}
  />
  PR #
</label>
<label>
  <input
    id="filename"
    name="searchType"
    type="radio"
    value="filename"
    checked={this.state.selectedOption === 'filename'}
    onChange={this.handleOptionChange}
  />
  Filename
</label>
*/
