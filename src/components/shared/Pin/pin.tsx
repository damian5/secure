import React, { FC } from 'react';

interface PinProps {
  value: string;
  onChange: (event: string) => void;
}

const Pin: FC<PinProps> = ({ value, onChange }) => (
  <div>
    <div>enter pin</div>
    <input type="number" name="test" value={value} onChange={(e) => onChange(e.target.value)}/>
  </div>
);

export default Pin;