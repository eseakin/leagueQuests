import React, { Component } from 'react';
import SkinDetail from './SkinDetail';

const ChampDetail = (props) => {
  const { activeVideo, activeSkin, champ, skinPath, splashPath, skinLoadedStyle, handleSkinClick, onSkinLoad } = props;

  return (
    <div name='champDetail' className='champDetail'>

      <div className='youtubeContainer'>
      <iframe src={"https://www.youtube.com/embed/" + activeVideo + '?rel=0&autoplay=1'} frameBorder="0" allowFullScreen></iframe>
      </div>

      <div className='skinContainer'>
      {champ.skins.map((skin, i) => {
        if(i === 0) 
          return;

        const path = skinPath + champ.key + '_' + i + '.jpg';
        const path2 = splashPath + champ.key + '_' + i + '.jpg';
        let skinName = skin.name;

        let style = Object.assign({}, skinLoadedStyle);
        if(skinName === activeSkin)
          style.border = '2px solid #1db7bf';

        return (
          <SkinDetail 
            key={i}
            path={path}
            skinName={skinName}
            style={style}
            handleSkinClick={() => handleSkinClick(skin.name, path2, i)}
            onSkinLoad={() => onSkinLoad(i)}
          />
        )
      })}
      </div>
    </div>
  )
}

export default ChampDetail;