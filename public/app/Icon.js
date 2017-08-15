import React, { Component } from 'react';

const Icon = (props) => {
  const { style, onIconLoad, handleChampClick, iconPath, name } = props;
  return (
    <span 
      className='icon' 
      onClick={handleChampClick} 
      style={style}
    >
      <img src={iconPath} onLoad={onIconLoad} />
      <p>{name}</p>
    </span>
  )
}

export default Icon;