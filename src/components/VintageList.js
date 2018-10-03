import React, { Component } from 'react';
import { connect } from 'react-redux';
import Paper from 'material-ui/Paper';
import Checkbox from 'material-ui/Checkbox';
import ActionFavorite from 'material-ui/svg-icons/action/favorite';
import ActionFavoriteBorder from 'material-ui/svg-icons/action/favorite-border';
import Divider from 'material-ui/Divider';
import './VintageList.style.css';
import DropdownMenu from './DropdownMenu';
import { allVintagesThunk } from '../store';

class VintageList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      year: null,
      region: ''
    };

    this.filterYear = this.filterYear.bind(this);
    this.filterRegion = this.filterRegion.bind(this);
  }

  componentDidMount() {
    this.props.allVintagesThunk();
  }

  filterYear = (event, index, value) => this.setState({ year: value });
  filterRegion = (event, index, value) => this.setState({ region: value });

  render() {
    const regions = ['All'];
    const years = ['All'];

    this.props.vintages.forEach(vintage => {
      if (!regions.includes(vintage.region)) regions.push(vintage.region);
      if (!years.includes(vintage.year)) years.push(vintage.year);
    });

    const vintages = this.props.vintages
      .filter(
        vintage =>
          !this.state.region || this.state.region === 'All'
            ? vintage
            : vintage.region === this.state.region
      )
      .filter(
        vintage =>
          !this.state.year || this.state.year === 'All'
            ? vintage
            : vintage.year === this.state.year
      );

    return (
      <Paper className="paper-overlay">
        <DropdownMenu
          items={years.sort((a, b) => b - a)}
          value={this.state.year}
          handleChange={this.filterYear}
          filter="Year"
        />
        <DropdownMenu
          items={regions.sort()}
          value={this.state.region}
          handleChange={this.filterRegion}
          filter="Region"
        />

        <h2>Rank</h2>

        <ol>
          {vintages.map(vintage => {
            return (
              <div key={vintage.id}>
                <li className="list-item">
                  <p>
                    {vintage.year} {vintage.region}
                  </p>
                  <Checkbox
                    checkedIcon={<ActionFavorite />}
                    uncheckedIcon={<ActionFavoriteBorder />}
                    className="favorite"
                  />
                </li>
                <Divider />
              </div>
            );
          })}
        </ol>
      </Paper>
    );
  }
}

function mapState(state) {
  return {
    vintages: state.vintages
  };
}

const VintageListContainer = connect(
  mapState,
  { allVintagesThunk }
)(VintageList);
export default VintageListContainer;
