import React, { useEffect, useState } from 'react';
import './Chat.css';
import { useParams } from 'react-router-dom';
import StarBorderOutlinedIcon from '@material-ui/icons/StarBorderOutlined';
import InfoOutlinedIcon from '@material-ui/icons/InfoOutlined';
import { db } from '../firebase';
import Messages from './Messages';
import ChatInput from './ChatInput';
function Chat() {
	// @ts-ignore
	const { roomId } = useParams();
	const [roomDetails, setRoomDetails] = useState(null);
	const [roomMessages, setRoomMessages] = useState([]);
	useEffect(() => {
		db.collection('rooms')
			.doc(roomId)
			.onSnapshot((snapshot) => setRoomDetails(snapshot.data()));
		db.collection('rooms')
			.doc(roomId)
			.collection('messages')
			.orderBy('timestamp', 'asc')
			.onSnapshot((snapshot) =>
				setRoomMessages(snapshot.docs.map((doc) => doc.data())),
			);
	}, [roomId]);

	return (
		<div className='chat'>
			<div className='chat-header'>
				<div className='chat-headerleft'>
					<h4 className='chat-channelName'>
						<strong># {roomDetails?.name}</strong>
						<StarBorderOutlinedIcon />
					</h4>
				</div>
				<div className='chat-headerRight'>
					<p>
						<InfoOutlinedIcon /> Details
					</p>
				</div>
			</div>
			<div className='chat-messages'>
				{roomMessages.map(({ message, timestamp, user, userImage }) => (
					<Messages
						message={message}
						timestamp={timestamp}
						user={user}
						userimage={userImage}
					/>
				))}
			</div>
			<ChatInput channelName={roomDetails?.name} channelId={roomId} />
		</div>
	);
}

export default Chat;
