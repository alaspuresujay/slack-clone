import React from 'react';
import './Messages.css';
function Messages(props) {
	const { message, timestamp, user, userimage } = props;
	return (
		<div className='message'>
			<img src={userimage} alt='' />
			<div className='message-info'>
				<h4>
					{user}{' '}
					<span className='message-timestamp'>
						{new Date(timestamp?.toDate()).toUTCString()}
					</span>
				</h4>
				<p>{message}</p>
			</div>
		</div>
	);
}

export default Messages;
