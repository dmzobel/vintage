import React, { Component } from 'react';
import Paper from '@material-ui/core/Paper';
import TextField from '@material-ui/core/TextField';
import './VintageSearch.style.css';

class VintageSearch extends Component {
  state = {
    input: ''
  };

  searchTyping = evt => {
    this.setState({ input: evt.target.value });
  };

  handleSearch = () => {};

  render() {
    return (
      <Paper className="paper-overlay">
        <form onSubmit={this.handleSearch} className="search-form">
          <h3>Looking for a particular vintage?</h3>
          <TextField
            placeholder="Search..."
            type="search"
            margin="normal"
            className="search-box"
            onChange={this.searchTyping}
          />
        </form>
      </Paper>
    );
    /* TODO:
      Add magnifying glass button to end of search bar
      Normalize user input
      Do I want to allow the user to type? Or provide a list of normalized inputs?
    */
  }
}

export default VintageSearch;
