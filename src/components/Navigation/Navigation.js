import React from 'react';

const Navigation = ({signInClick, signOutForm}) => {
		if(signOutForm){
			return(
			<nav style={{display: 'flex', justifyContent: 'flex-end'}}>
				<p onClick={() => signInClick('signout')}className='f3 link dim black underline pa3 pointer'>Sign Out</p>
			</nav>		
			);
		} else {
			return(
			<nav style={{display: 'flex', justifyContent: 'flex-end'}}>
				<p onClick={() => signInClick('register')}className='f3 link dim black underline pa3 pointer'>Register</p>
				<p onClick={() => signInClick('signin')}className='f3 link dim black underline pa3 pointer'>Sign In</p>
			</nav>		
			);
		}
}

export default Navigation;