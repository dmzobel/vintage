import React, { Component } from 'react';
import { connect } from 'react-redux';
import Paper from 'material-ui/Paper';
import Divider from 'material-ui/Divider';

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
    const regions = [];
    const years = [];

    this.props.vintages.forEach(vintage => {
      if (!regions.includes(vintage.region)) regions.push(vintage.region);
      if (!years.includes(vintage.year)) years.push(vintage.year);
    });

    const vintages = this.props.vintages
      .filter(vintage => vintage.region.match(this.state.region))
      .filter(vintage => {
        return this.state.year ? vintage.year === this.state.year : vintage;
      });

    return (
      <Paper zDepth={2} className="vintage-list relative">
        <DropdownMenu
          items={years.sort()}
          value={this.state.year}
          handleChange={this.filterYear}
          filter="Year"
        />
        <DropdownMenu
          items={regions}
          value={this.state.region}
          handleChange={this.filterRegion}
          filter="Region"
        />
        {vintages.map(vintage => {
          return (
            <div key={vintage.id}>
              <p>
                {vintage.year} {vintage.region}
              </p>
              <Divider />
            </div>
          );
        })}
      </Paper>
    );
  }
}

function mapState(state) {
  return {
    vintages: state.vintages
  };
}

const VintageListContainer = connect(mapState, { allVintagesThunk })(
  VintageList
);
export default VintageListContainer;
