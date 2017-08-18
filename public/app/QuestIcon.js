import React, { Component } from 'react';
import { Card, Icon, Image } from 'semantic-ui-react'


class QuestIcon extends Component {
  constructor(props) {
    super(props);
  
    this.state = {};
  }

  render() {
    const { handleClick, onMouseEnter, onMouseLeave, quest, activeQuest, completion, champ } = this.props;

    let outline;
    let color = 'rgba(0, 75, 150, 1)'
    if(activeQuest.id === quest.id) {
      outline = '0px 0px 25px 5px rgba(0,247,255,0.8)'
      console.log('render', quest.id, completion)
    } else
      outline = `0 2px 3px 0 ${color}, 0 0 0 2px ${color}`

    

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

    const iconPath = `http://ddragon.leagueoflegends.com/cdn/7.17.1/img/champion/${champ}.png`

    return (
      <div style={style} className='questIcon' onMouseEnter={() => onMouseEnter(quest.id)} onMouseLeave={onMouseLeave} onClick={() => handleClick(quest.id)}>
        <Card style={{boxShadow: outline, background: '#222'}}>
          <div style={{width: 70, height: 70, background: 'black'}}>
          {completion > 0 && <Image src={iconPath} fluid centered />}
          </div>
          <span>
            <Icon name={'favorite'} color={completion > 0 ? 'yellow' : 'grey'} />
            <Icon name={'favorite'} color={completion > 1 ? 'yellow' : 'grey'} />
            <Icon name={'favorite'} color={completion > 2 ? 'yellow' : 'grey'} />
          </span>
        </Card>
      </div>
    )
  }
}

export default QuestIcon;