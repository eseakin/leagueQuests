import React, { Component } from 'react';
import { Container, Image, Card, Icon, Button } from 'semantic-ui-react';


class CurrentQuestCard extends Component {
  constructor(props) {
    super(props);
  
    this.state = {
      scrollY: 0
    };
  }

  componentDidMount = () => {
    window.addEventListener('scroll', this.handleScroll);
  }

  componentWillUnmount = () => {
    window.removeEventListener('scroll', this.handleScroll);
  }

  componentWillReceiveProps = (nextProps) => {
    console.log('current quest props', nextProps)
    this.setState({completion: this.props.handleCompletion(nextProps.activeQuest.id)})
  }

  // shouldComponentUpdate = (nextProps, nextState) => {
  //   const completion = this.props.handleCompletion(nextProps.activeQuest.id)

  //   if(completion != this.state.completion || nextProps.activeQuest.id != this.props.activeQuest.id || this.state.scrollY != nextState.scrollY)
  //     return true;
  //   else
  //     return false;
  // }

  handleScroll = () => {
      this.setState({
        scrollY: window.scrollY
      });
  }


  render() {
    const { scrollY, completion } = this.state;
    const { activeQuest, beginQuest, completeQuest, handleDescription, handleCompletion } = this.props;

    const style = {
      div: {
        background: 'transparent',
        width: window.innerWidth,
        margin: '20px 0',
        position: 'relative',
        textAlign: 'center',
      },
      divScroll: {
        background: 'rgba(25,25,25,.8)',
        position: 'fixed',
        width: window.innerWidth,
        padding: '10px 50px 10px 50px',
        marginTop: '-110px',
        zIndex: 3,
        textAlign: 'center',
        borderBottom: '2px solid #474747'
      },
      container: {
        color: '#00eaff', 
        margin: 'auto',
      },
      card: {
        height: 160, 
        width: 900,
        background: '#1f1f3d', 
        boxShadow: '0 1px 3px 0 #111, 0 0 0 1px #111',
        overflow: 'hidden'
      },
      image: {
        opacity: .85,
        position: 'absolute',
        top: -50,
        right: 0,
        zIndex: 1
      },
      iconSpan: {
        // marginLeft: 25
      },
      content: {
        position: 'absolute',
        backgroundColor: 'rgba(0, 50, 100, 0.8)',
        textAlign: 'left',
        marginLeft: 20,
        top: 15,
        left: 0,
        zIndex: 3
      },
      cardHeader: {
        fontFamily: 'Merriweather',
        color: 'white',
        width: '100%',
        fontSize: 22
      },
      cardDescription: {
        color: 'white',
        width: '100%',
        fontSize: 18
      },
      buttonBegin: {
        fontFamily: 'Merriweather',
        position: 'absolute',
        top: 30,
        right: 30,
        zIndex: 3,
        width: 180,
        fontSize: 12
      },
      buttonComplete: {
        fontFamily: 'Merriweather',
        position: 'absolute',
        top: 80,
        right: 30,
        zIndex: 3,
        fontSize: 12,
        width: 180
      }
    };

    return (
      <div style={scrollY < 100 ? style.div : style.divScroll}>
        <Container style={style.container}>
          <Card centered style={style.card}>
            <Image style={style.image} src={activeQuest.backgroundImg} />
            <Card.Content style={style.content}>
              <h1>
                <span style={style.iconSpan}>
                  <Icon name='favorite' color={completion > 0 ? 'yellow' : 'grey'} />
                  <Icon name='favorite' color={completion > 1 ? 'yellow' : 'grey'} />
                  <Icon name='favorite' color={completion > 2 ? 'yellow' : 'grey'} />
                </span>
              </h1>
              
              <Card.Header content={activeQuest.name} style={style.cardHeader} />
              <Card.Description style={style.cardDescription} content={handleDescription(activeQuest, completion)}>

              </Card.Description>
            
            </Card.Content>   
            <Button onClick={beginQuest} content='BEGIN QUEST' icon='play' style={style.buttonBegin} color='red' />
            <Button onClick={completeQuest} content='COMPLETE QUEST' icon='winner' style={style.buttonComplete} color='yellow' />       

          </Card>
        </Container>
      </div>
    )
  }
}

export default CurrentQuestCard;
