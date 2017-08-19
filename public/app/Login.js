import React, {Component} from 'react'
import { Button, Header, Form, Message } from 'semantic-ui-react'

class Login extends Component {
  constructor(props) {
    super(props);
  
    this.state = { username: '', password: '' };
  }

  handleChange = ({target: {name, value}}) => {
    this.setState({[name]: value});
  }

  handleSubmit = (e) => {
    e.preventDefault(); 
    console.log('login submit');
    this.props.loginSubmit(this.state);
  }

  handleCreateNewAccount = (e) => {
    e.preventDefault(); 
    console.log('login create');
    this.props.createNewAccount(this.state);
  }

  render() {
    const { loggedIn, failureMessage } = this.props;
    const { username, password } = this.state;

    return(
      <Form 
        success={loggedIn} 
        error={!!failureMessage} 
        size='mini' 
        onSubmit={this.handleSubmit.bind(this)} 
        method='post' 
        style={{position: 'absolute', width: 210, height: 100, top: 10, right: 10, zIndex: 7}}
      >

        <div className='inline'>
          <Form.Field>
            <input placeholder='Email' name='username' value={username} onChange={this.handleChange.bind(this)} style={{padding: '3px 10px'}}/>
          </Form.Field>
          <Form.Field>
            <input type='password' size='mini' placeholder='Password' name='password' value={password} onChange={this.handleChange.bind(this)} style={{padding: '3px 10px'}}/>
          </Form.Field>
        </div>

        <Button 
          style={{float: 'right', marginLeft: 20, marginTop: 10}} 
          type='submit' 
          basic 
          compact 
          size='small' 
          color='green' 
          content='Log In'
        />

        <Button 
          style={{float: 'right', marginTop: 10}} 
          type='button' 
          basic 
          compact 
          size='small' 
          color='green' 
          content='Create Account'
          onClick={this.handleCreateNewAccount}
        />

        <Message error compact content={failureMessage}/>

      </Form>
    )
  }

};

export default Login;
