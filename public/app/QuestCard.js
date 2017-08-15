import React, { Component } from 'react';
import { Container, Image, Card } from 'semantic-ui-react';
import QuestIcon from './QuestIcon';
import PopupQuestDetail from './PopupQuestDetail';


class QuestCard extends Component {
  constructor(props) {
    super(props);
  
    this.state = {
      showPopup: false
    };
  }

  handleMouseOver = (e) => {
    console.log('style', e.target)
  }

  onMouseEnter = (i) => {
    this.setState({showPopup: true, popupQuest: this.props.questList[i]})
  }

  onMouseLeave = (e) => {
    this.setState({showPopup: false})
  }

  render() {
    const { showPopup, popupQuest } = this.state;
    const { questList, activeQuest, handleClick, cardTitle, cardBackground, cardColor, questLineIndex } = this.props;

    const style = {
      container: {
        marginBottom: 20
      },
      header: {
        position: 'absolute',
        top: 30,
        right: 30,
        color: 'white',
        fontSize: '2em'
      }
    }

    return (
      <Container style={style.container}>
        <Card centered style={{width: 900, background: cardColor, boxShadow: '0 1px 3px 0 #111, 0 0 0 1px #111'}}>
          <Card.Content style={{margin: 0}}>
          <Image src={cardBackground} style={{opacity: .5}}/>
          <Card.Header content={cardTitle} style={style.header} />
          <PopupQuestDetail top='24px' left='240px' showPopup={showPopup} quest={popupQuest} />

          {questList.map((quest, i) => 
            <QuestIcon 
            questLineIndex={questLineIndex}
            onMouseEnter={this.onMouseEnter} 
            onMouseLeave={this.onMouseLeave} 
            handleClick={handleClick} 
            id={`quest${i}`} 
            quest={quest} 
            activeQuest={activeQuest}
            i={i} 
            key={i}/>
          )}
          
          </Card.Content>          
        </Card>
      </Container>
    )
  }
}

export default QuestCard;
