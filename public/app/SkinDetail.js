import React, { Component } from 'react';

const SkinDetail = (props) => {
  const { style, skinName, path, handleSkinClick, onSkinLoad } = props;
  return (
    <div 
      className='skinDetail'
      onClick={handleSkinClick}
      style={style}
    >
      <div>
        <img src={path} onLoad={onSkinLoad} />
        <p>{skinName}</p>
      </div>
    </div>
  )
}

export default SkinDetail;