import React, { memo } from 'react';
import { CardWrapper } from './styles';

interface SelectCardProps {
  options: string[];
  selectedValue: string;
  setValue: (value: any) => void;
  onClose: () => void;
}

const SelectCard = ({options, selectedValue, setValue, onClose}: SelectCardProps) => {
  const toggle = (e: React.ChangeEvent<HTMLInputElement>) => {
    setValue(e.target.value)
    onClose()
  }

  return (
    <CardWrapper>
      <div className="background" onClick={() => onClose()} />
      <div className="card">
        {options.map((option, i) => (
          <div key={i}>
          <input onChange={(e) => toggle(e)} type="radio" id={option} name={option} value={option} checked={option === selectedValue} />
          <label>{option}</label>
          </div>
        ))}
      </div>
     </CardWrapper>
  )
}

export default memo(SelectCard)