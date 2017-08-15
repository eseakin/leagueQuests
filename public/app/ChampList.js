import React, { Component } from 'react';
import Icon from './Icon';

const ChampList = (props) => {
  const { champsDisplayed, 
    iconsPerRow, 
    showMore, 
    handleShowMore, 
    showMoreText, 
    iconPath,
    onIconLoad,
    iconsLoaded,
    iconStyle,
    iconLoadedStyle,
    handleChampClick } = props;

  return (
    <div name='champList' className='champList'>
              
      {Object.keys(champsDisplayed).map((champ, i) => {
        if(i >= iconsPerRow * 3 && !showMore)
          return;

        return (
          <Icon 
            key={i}
            i={i}
            style={iconsLoaded[i] ? iconLoadedStyle : iconStyle} 
            iconPath={iconPath + champ + '.png'}
            onIconLoad={() => onIconLoad(i)}
            handleChampClick={() => handleChampClick(champ)}
            name={champsDisplayed[champ].name}
          />
        )
      })}
      <button className='showMore btn' onClick={() => handleShowMore(showMore)}>{showMoreText}</button>
      
    </div>
  )
}

export default ChampList;