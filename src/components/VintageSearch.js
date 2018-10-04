import React, { Component } from 'react';
import {
  Paper,
  TextField,
  FormControl,
  Select,
  InputLabel,
  MenuItem
} from '@material-ui/core';
import './VintageSearch.style.css';

class VintageSearch extends Component {
  state = {
    year: '',
    region: ''
  };

  searchType = evt => {
    this.setState({ year: evt.target.value });
  };

  selectDropdown = evt => {
    this.setState({ region: evt.target.value });
  };

  handleSearch = () => {
    const year = this.state.year.trim();
  };

  render() {
    return (
      <Paper className="paper-overlay">
        <form onSubmit={this.handleSearch} className="search-form">
          <h3>Looking for a particular vintage?</h3>
          <TextField
            placeholder="Year"
            type="search"
            margin="normal"
            className="search-box"
            onChange={this.searchType}
          />
          <FormControl style={{ minWidth: 120 }}>
            <InputLabel>Region</InputLabel>
            <Select value={this.state.region} onChange={this.selectDropdown}>
              <MenuItem value={'Bordeaux'}>Bordeaux</MenuItem>
              <MenuItem value={'Napa Valley'}>Napa Valley</MenuItem>
            </Select>
          </FormControl>
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
