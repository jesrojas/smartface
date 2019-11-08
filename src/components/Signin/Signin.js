import React from 'react';

class Signin extends React.Component {

	constructor(props){
		super(props);
		this.state = {
			signInEmail: '',
			signInPassword: ''
		}
	}

	onEmailChange = (event) => {
		this.setState({signInEmail: event.target.value});
	}

	onPasswordChange = (event) => {
		this.setState({signInPassword: event.target.value});
	}
	onSubmitSignIn = () => {
		fetch('https://protected-temple-85720.git/signin', {
			method: 'post',
			headers: {'Content-Type': 'application/json'},
			body: JSON.stringify({
				email: this.state.signInEmail,
				password: this.state.signInPassword
			})
		})
			.then(response => response.json())
			.then(user => {
				if(user.id){
					this.props.loadUser(user);
					this.props.signInClick('home');
				}
			})
	}

	onEnterKeyPress = (event) => {
		if(event.which === 13){
			fetch('https://protected-temple-85720.git/signin', {
			method: 'post',
			headers: {'Content-Type': 'application/json'},
			body: JSON.stringify({
				email: this.state.signInEmail,
				password: this.state.signInPassword
			})
		})
			.then(response => response.json())
			.then(user => {
				if(user.id){
					this.props.loadUser(user);
					this.props.signInClick('home');
				}
			})
		}
	}
	render(){
		const { signInClick } = this.props;
		return(
			<article className="br3 ba dark-gray b--black-10 mv4 w-100 w-50-m w-25-l mw6 shadow-5 center">
					<main className="pa4 black-80">
					  <div className="measure">
					    <fieldset id="sign_up" className="ba b--transparent ph0 mh0">
					      <legend className="f1 fw6 ph0 mh0">Sign In</legend>
					      <div className="mt3">
					        <label className="db fw6 lh-copy f6" htmlFor="email-address">Email</label>
					        <input className="pa2 input-reset ba bg-transparent hover-bg-black hover-white w-100" 
							        type="email" 
							        name="email-address"  
							        id="email-address"
							        onChange={this.onEmailChange}
							        onKeyPress={this.onEnterKeyPress}
							       />
					      </div>
					      <div className="mv3">
					        <label className="db fw6 lh-copy f6" htmlFor="password">Password</label>
					        <input className="b pa2 input-reset ba bg-transparent hover-bg-black hover-white w-100" 
							        type="password" 
							        name="password"  
							        id="password"
							        onChange={this.onPasswordChange}
							        onKeyPress={this.onEnterKeyPress}
							       />
					      </div>
					    </fieldset>
					    <div className="">
					      <input 
						      className="b ph3 pv2 input-reset ba b--black bg-transparent grow pointer f6 dib" 
						      type="submit" 
						      value="Sign in"
						      onClick={this.onSubmitSignIn}/>
					    </div>
					    <div className="lh-copy mt3">
					      <p onClick={() => signInClick('register')} 
					      	 href="#0" 
					      	 className="f6 link dim black db pointer">Register
					      </p>
					    </div>
					  </div>
					</main>
			</article>
				);
			}
		}

export default Signin;