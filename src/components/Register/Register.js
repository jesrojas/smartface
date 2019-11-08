import React from 'react';

class Register extends React.Component{

	constructor(props){
		super(props);
		this.state = {
			email: '',
			password: '',
			name: ''
		}
	}

	onNameChange = (event) => {
		this.setState({name: event.target.value});
	}	

	onEmailChange = (event) => {
		this.setState({email: event.target.value});
	}

	onPasswordChange = (event) => {
		this.setState({password: event.target.value});
	}

	onEnterKeySubmitSignIn = (event) => {
		if(event.which === 13){
			fetch('https://git.heroku.com/protected-temple-85720.git/register', {
				method: 'post',
				headers: {'Content-Type': 'application/json'},
				body: JSON.stringify({
					email: this.state.email,
					password: this.state.password,
					name: this.state.name
				})
			})
				.then(response => response.json())
				.then(user => {
					//When we send a response through the server, it can be a user with an id that 
					//was found or just a string with an error message, that's why we add user.id instead
					//of just user, that way will be true if the response send the user info or false if
					//it was just the error string
					if(user.id){
						this.props.loadUser(user);
						this.props.signInClick('home');
					}
				})
		}
	}

	onSubmitSignIn = () => {
			fetch('https://git.heroku.com/protected-temple-85720.git/register', {
				method: 'post',
				headers: {'Content-Type': 'application/json'},
				body: JSON.stringify({
					email: this.state.email,
					password: this.state.password,
					name: this.state.name
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

	render(){
		return(
		<article className="br3 ba dark-gray b--black-10 mv4 w-100 w-50-m w-25-l mw6 shadow-5 center">
				<main className="pa4 black-80">
				  <div className="measure">
				    <fieldset id="sign_up" className="ba b--transparent ph0 mh0">
				      <legend className="f1 fw6 ph0 mh0">Register</legend>
				      <div className="mt3">
				        <label className="db fw6 lh-copy f6" htmlFor="name">Name</label>
				        <input className="pa2 input-reset ba bg-transparent hover-bg-black hover-white w-100" 
					        type="name" 
					        name="name"  
					        id="name"
					        onChange={this.onNameChange}
					        onKeyPress={this.onEnterKeySubmitSignIn}
				        />
				      </div>
				      <div className="mt3">
				        <label className="db fw6 lh-copy f6" htmlFor="email">Email</label>
				        <input className="pa2 input-reset ba bg-transparent hover-bg-black hover-white w-100" 
				        	   type="email" 
				        	   name="email"  
				        	   id="email"
				        	   onChange={this.onEmailChange}
				        	   onKeyPress={this.onEnterKeySubmitSignIn}
				        />
				      </div>
				      <div className="mv3">
				        <label className="db fw6 lh-copy f6" htmlFor="password">Password</label>
				        <input className="b pa2 input-reset ba bg-transparent hover-bg-black hover-white w-100" 
						        type="password" 
						        name="password"  
						        id="password"
						        onChange={this.onPasswordChange}
						        onKeyPress={this.onEnterKeySubmitSignIn}
				        />
				      </div>
				    </fieldset>
				    <div className="">
				      <input 
					      className="b ph3 pv2 input-reset ba b--black bg-transparent grow pointer f6 dib" 
					      type="submit" 
					      value="Register"
					      onClick={this.onSubmitSignIn}/>
				    </div>
				  </div>
				</main>
		</article>
			);
	}
}

export default Register;