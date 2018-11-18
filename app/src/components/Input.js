import React from 'react';

const Input = React.forwardRef((props, ref) => (
  <input
    type="text"
    placeholder="PR #"
    onChange={props.onInputChange}
    onKeyPress={props.onInputChange}
    value={props.value}
    ref={ref}
  />
));

export default Input;
