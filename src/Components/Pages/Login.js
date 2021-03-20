import { Button } from '@material-ui/core';
import React from 'react';
import './Login.css';
import { auth, googleAuthProvider } from '../../firebase';
import { useStateValue } from '../../Context/StateProvider';
import { actionTypes } from '../../Context/Reducer';
function Login() {
	const [state, dispatch] = useStateValue();
	const signIn = () => {
		auth.signInWithPopup(googleAuthProvider)
			.then((result) => {
				console.log(result);
				dispatch({
					type: actionTypes.SET_USER,
					user: result.user,
				});
			})
			.catch((error) => {
				alert(error.message);
			});
	};
	return (
		<div className='login'>
			<div className='login-container'>
				<img
					src='http://assets.stickpng.com/images/5cb480cd5f1b6d3fbadece79.png'
					alt=''
				/>
				<h1> Sign In to Slack</h1>
				<p> Developed by Sujay</p>
				<Button onClick={signIn}>Sign in with Google</Button>
			</div>
		</div>
	);
}

export default Login;
