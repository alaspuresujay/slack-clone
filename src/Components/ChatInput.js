import React, { useState } from 'react';
import { useStateValue } from '../Context/StateProvider';
import { db } from '../firebase';
import './ChatInput.css';
import firebase from 'firebase';
function ChatInput(props) {
	const { channelName, channelId } = props;
	const [input, setInput] = useState('');
	const [{ user }] = useStateValue();
	const sendMessage = (e) => {
		e.preventDefault();

		if (!channelId) {
			return false;
		}

		db.collection('rooms').doc(channelId).collection('messages').add({
			message: input,
			timestamp: firebase.firestore.FieldValue.serverTimestamp(),
			user: user.displayName,
			userImage: user.photoURL,
		});

		setInput('');
	};
	return (
		<div className='chatInput'>
			<form>
				<input
					placeholder={`Message #${channelName}`}
					value={input}
					onChange={(e) => setInput(e.target.value)}
				/>
				<button type='submit' onClick={sendMessage}>
					SEND
				</button>
			</form>
		</div>
	);
}

export default ChatInput;
