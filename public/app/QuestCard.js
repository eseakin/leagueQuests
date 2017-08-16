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
    const { questList, activeQuest, handleClick, cardTitle, cardBackground, cardColor, questLineIndex, handleDescription } = this.props;

    const style = {
      container: {
        marginBottom: 20
      },
      card: {
        width: 900, 
        background: cardColor, 
        boxShadow: '0 1px 3px 0 #111, 0 0 0 1px #111'
      },
      header: {
        position: 'absolute',
        top: 30,
        right: 30,
        color: 'white',
        fontSize: '2em'
      },
      image: {
        opacity: .5
      }
    }

    return (
      <Container style={style.container}>
        <Card centered style={style.card}>
          <Card.Content>
          <Image src={cardBackground} style={style.image}/>
          <Card.Header content={cardTitle} style={style.header} />
          <PopupQuestDetail showPopup={showPopup} quest={popupQuest || questList[0]} handleDescription={handleDescription} questLineIndex={questLineIndex} />

          {questList.map((quest, i) => 
            <QuestIcon 
            questLineIndex={questLineIndex}
            onMouseEnter={this.onMouseEnter} 
            onMouseLeave={this.onMouseLeave} 
            handleClick={handleClick} 
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
