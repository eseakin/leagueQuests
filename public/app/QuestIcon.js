import React, { Component } from 'react';
import { Card, Icon, Image } from 'semantic-ui-react'


class QuestIcon extends Component {
  constructor(props) {
    super(props);
  
    this.state = {};
  }

  render() {
    const { handleClick, onMouseEnter, onMouseLeave, quest, activeQuest, i } = this.props;

    let color;
    if(activeQuest.name === quest.name)
      color = 'white'
    else
      color = 'rgba(0, 75, 150, 1)'

    const outline = `0 2px 3px 0 ${color}, 0 0 0 2px ${color}`

    const style = {
      position: 'absolute',
      top: quest.style.top + 10,
      left: quest.style.left,
      height: 70,
      width: 70,
      cursor: 'pointer',
      background: 'black',
      borderRadius: '0 0 2px 2px'
    }

    const iconPath = `http://ddragon.leagueoflegends.com/cdn/7.13.1/img/champion/${quest.champ}.png`

    return (
      <div style={style} className='quest' onMouseEnter={() => onMouseEnter(i)} onMouseLeave={onMouseLeave} onClick={() => handleClick(i)}>
        <Card style={{boxShadow: outline, background: '#222'}}>
          <div style={{width: 70, height: 70, background: 'black'}}>
          {quest.completion > 0 && <Image src={iconPath} fluid centered />}
          </div>
          <span>
            <Icon className='star' name='star' color={quest.completion > 0 ? 'yellow' : 'grey'} />
            <Icon className='star' name='star' color={quest.completion > 1 ? 'yellow' : 'grey'} />
            <Icon className='star' name='star' color={quest.completion > 2 ? 'yellow' : 'grey'} />
          </span>
        </Card>
      </div>
    )
  }
}

export default QuestIcon;