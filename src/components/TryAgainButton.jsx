import React from 'react';
import { Button } from 'reactstrap';

const TryAgainButton = ({ size, onClickFunction }) => (
  <Button size={size} onClick={() => onClickFunction()}>
    Try Again?
  </Button>
);

export default TryAgainButton;
