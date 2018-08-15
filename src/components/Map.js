import React, { Component } from 'react';
import { connect } from 'react-redux';
import Slider from 'material-ui/Slider';
import Paper from 'material-ui/Paper';
import { allVintagesThunk } from '../store';

/**
 * The slider bar can have a set minimum and maximum, and the value can be
 * obtained through the value parameter fired on an onChange event.
 */
class Map extends Component {
  constructor(props) {
    super(props);
    this.state = {
      selectedYear: 0,
      dateRange: []
    };
  }

  async componentDidMount() {
    await this.props.allVintagesThunk();

    const dateRange = [];
    for (const vintage of this.props.vintages) {
      if (!dateRange.includes(vintage.year)) dateRange.push(vintage.year);
    }

    this.setState({ dateRange });
    this.setState({ selectedYear: Math.max(...dateRange) });
  }

  handleSlider = (event, value) => {
    this.setState({ selectedYear: value });
  };

  render() {
    return (
      <Paper zDepth={2} className="map">
        <div id="map" />
        <Slider
          value={this.state.selectedYear}
          min={Math.min(...this.state.dateRange)}
          max={Math.max(...this.state.dateRange)}
          step={1}
          onChange={this.handleSlider}
          style={{ width: 500 }}
        />
        <p className="subtitle">
          <span>{'Selected year: '}</span>
          <span>{this.state.selectedYear}</span>
        </p>
      </Paper>
    );
  }
}

function mapState(state) {
  return {
    vintages: state.vintages
  };
}

const MapContainer = connect(
  mapState,
  { allVintagesThunk }
)(Map);

export default MapContainer;
