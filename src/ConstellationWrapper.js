import React from 'react';
import styled from 'styled-components';

import Constellation from './Constellation';

const Canvas = styled.canvas`
  z-index: 1;
  left: 0;
  top: 0;
  position: absolute;
`;

class ConstellationWrapper extends React.Component {
  componentDidMount() {
    const c = new Constellation(this.canvas, {});
    c.init();
  }

  render() {
    return (
      <Canvas
        innerRef={(canvas) => { this.canvas = canvas; }}
      />
    );
  }
}

module.exports ConstellationWrapper;
