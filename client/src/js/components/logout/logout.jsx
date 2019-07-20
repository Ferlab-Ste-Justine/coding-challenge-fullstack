import Button from '@material-ui/core/Button';
import PropTypes from 'prop-types';
import React from 'react';

export default function Logout(props) {
  const { handleDisConnect } = props;
  return (
    <div>
      <Button onClick={handleDisConnect} color="inherit">
        Logout
      </Button>
    </div>
  );
}

Logout.propTypes = {
  handleDisConnect: PropTypes.func.isRequired
};
