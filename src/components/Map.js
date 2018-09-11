import React, { Component } from 'react';
import { connect } from 'react-redux';
import Slider from 'material-ui/Slider';
import Paper from 'material-ui/Paper';
import { allVintagesThunk } from '../store';
import Datamap from 'datamaps';
import './Map.style.css';

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
    // retrieves list of vintages
    await this.props.allVintagesThunk();
    // using a Set to avoid including duplicate years
    const yearsSet = new Set();
    this.props.vintages.forEach(vintage => yearsSet.add(vintage.year));

    await this.setState({ dateRange: Array.from(yearsSet) });
    this.setState({ selectedYear: Math.max(...this.state.dateRange) });

    // creates map
    let worldMap = new Datamap({
      element: document.getElementById('map'),
      projection: 'mercator',
      fills: {
        defaultFill: '#aaaaaa',
        authorHasTraveledTo: '#fa0fa0'
      },
      data: {
        USA: { fillKey: 'authorHasTraveledTo' },
        JPN: { fillKey: 'authorHasTraveledTo' },
        ITA: { fillKey: 'authorHasTraveledTo' },
        FRA: { fillKey: 'authorHasTraveledTo' },
        KOR: { fillKey: 'authorHasTraveledTo' },
        DEU: { fillKey: 'authorHasTraveledTo' }
      }
    });
  }

  handleSlider = (event, value) => {
    this.setState({ selectedYear: value });
  };

  render() {
    // TODO: sometimes server 500 error shows up when trying to fetch vintages
    console.log('state', this.state);

    const style = {
      height: '100%',
      position: 'relative',
      width: '50%',
      marginTop: '100px'
    };

    return (
      <Paper zDepth={2} className="map-container">
        <div id="map" style={style} />
        <Slider
          value={this.state.selectedYear}
          min={Math.min(...this.state.dateRange)}
          max={Math.max(...this.state.dateRange)}
          step={1}
          onChange={this.handleSlider}
          style={{ width: 500, height: 20 }}
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
