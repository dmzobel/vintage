import React, { Component } from 'react';
import { connect } from 'react-redux';
import Paper from 'material-ui/Paper';
import Divider from 'material-ui/Divider';

import { allVintagesThunk } from '../store';

class VintageList extends Component {
  componentDidMount() {
    this.props.allVintagesThunk();
  }

  render() {
    return (
      <Paper zDepth={2} className="vintage-list">
        {this.props.vintages.map(vintage => {
          return (
            <div key={vintage.id}>
              <p>
                {vintage.vintage} {vintage.region} {vintage.quality}
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
