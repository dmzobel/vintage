import React, { Component } from 'react';
import { connect } from 'react-redux';
import Slider from 'material-ui/Slider';
import { allVintagesThunk } from '../store';

/**
 * The slider bar can have a set minimum and maximum, and the value can be
 * obtained through the value parameter fired on an onChange event.
 */
class Map extends Component {
  state = {
    year: 0
  };

  componentDidMount() {
    this.props.allVintagesThunk();
  }

  handleSlider = (event, value) => {
    this.setState({ year: value });
  };

  render() {
    return (
      <div>
        <Slider value={this.state.year} onChange={this.handleSlider} />
        <p className="relative">
          <span>{'The value of this slider is: '}</span>
          <span>{this.state.year}</span>
          <span>{' from a range of 0 to 1 inclusive'}</span>
        </p>
      </div>
    );
  }
}

function mapState(state) {
  return {
    vintages: state.vintages
  };
}

const MapContainer = connect(mapState, { allVintagesThunk })(Map);
export default MapContainer;
