import React from 'react'
import Success from '../../img/cloudSuccess.png'

export default () => {
  return (
    <div>
      <img
        src={Success}
        style={{ width: '200px', margin: 'auto', display: 'block' }}
        alt="Loading..."
      />
    </div>
  );
};
