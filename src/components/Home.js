import React, { Component } from 'react';
import { connect } from 'react-redux';
import { allVintagesThunk } from '../store';

class Home extends Component {
  componentDidMount() {
    this.props.allVintagesThunk();
  }

  render() {
    console.log(this.props);
    return this.props.vintages.map(vintage => {
      return <h1 key={vintage.id}>{vintage.region}</h1>;
    });
  }
}

function mapState(state) {
  return {
    vintages: state.vintages
  };
}

const HomeContainer = connect(mapState, { allVintagesThunk })(Home);
export default HomeContainer;
