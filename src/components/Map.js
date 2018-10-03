import React, { Component } from 'react';
import { connect } from 'react-redux';
import Slider from 'material-ui/Slider';
import Paper from 'material-ui/Paper';
import { allVintagesThunk } from '../store';
import Datamap from 'datamaps';
import './Map.style.css';

class Map extends Component {
  constructor(props) {
    super(props);
    this.state = {
      dateRange: [],
      selectedYear: 0,
      selectedVintages: []
    };
  }

  // created a global variable so that I could manipulate it in `colorMap`
  worldMap;

  async componentDidMount() {
    // retrieves list of vintages
    await this.props.allVintagesThunk();
    // using a Set to avoid including duplicate years
    const yearsSet = new Set();
    this.props.vintages.forEach(vintage => yearsSet.add(vintage.year));
    await this.setState({ dateRange: [...yearsSet] });
    this.selectYear(null, Math.max(...this.state.dateRange));

    // creates map
    this.worldMap = new Datamap({
      element: document.getElementById('map'),
      projection: 'mercator',
      fills: {
        defaultFill: '#aaaaaa',
        green: '#ABDDA4'
      },
      data: {
        USA: { fillKey: 'green' },
        FRA: { fillKey: 'green' },
        ITA: { fillKey: 'defaultFill' },
        AUS: { fillKey: 'defaultFill' },
        ESP: { fillKey: 'defaultFill' },
        DEU: { fillKey: 'defaultFill' },
        ARG: { fillKey: 'defaultFill' },
        NZL: { fillKey: 'defaultFill' }
      }
    });
  }

  selectYear = (event, value) => {
    const selectedVintages = this.filterVintages(this.props.vintages, value);
    this.colorMap(selectedVintages);

    this.setState({
      selectedYear: value,
      selectedVintages
    });
  };

  filterVintages = (vintages, year) => {
    return vintages.filter(vintage => vintage.year === year);
  };

  colorMap = selectedVintages => {
    let bordeauxRating, caliRating;

    for (let vintage of selectedVintages) {
      if (vintage.region === 'Bordeaux') bordeauxRating = vintage.quality;
      else caliRating = vintage.quality;
    }

    // TODO: How do I update this?
    // this.worldMap.updateChoropleth({
    //   USA: { fillKey: 'green' },
    //   FRA: { fillKey: 'green' }
    // });
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
      <Paper zDepth={2}>
        {this.state.selectedYear && (
          <div className="map-container">
            <div id="map" style={style} />

            <Slider
              value={this.state.selectedYear}
              min={Math.min(...this.state.dateRange)}
              max={Math.max(...this.state.dateRange)}
              step={1}
              onChange={this.selectYear}
              style={{ width: 500, height: 20 }}
            />

            <p className="subtitle">
              <span>{'Selected year: '}</span>
              <span>{this.state.selectedYear}</span>
            </p>
          </div>
        )}
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
