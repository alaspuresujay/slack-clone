import React, { useEffect, useState } from 'react';
import './Sidebar.css';
import FiberManualRecordIcon from '@material-ui/icons/FiberManualRecord';
import CreateIcon from '@material-ui/icons/Create';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import AddIcon from '@material-ui/icons/Add';
import SIdebarOption from './SIdebarOption';
import { SidebarOptionData } from '../Data/Data';

import { db } from '../firebase';
import { useStateValue } from '../Context/StateProvider';

function Sidebar() {
	const [channels, setChannels] = useState([]);
	const [{ user }] = useStateValue();

	const addChannel = () => {
		const channelName = prompt('Please enter Channel Name');
		if (channelName) {
			db.collection('rooms').add({
				name: channelName,
			});
		}
	};
	useEffect(() => {
		db.collection('rooms').onSnapshot((snapshot) =>
			setChannels(
				snapshot.docs.map((doc) => ({
					id: doc.id,
					name: doc.data().name,
				})),
			),
		);
	}, []);
	return (
		<div className='sidebar'>
			<div className='sidebar-header'>
				<div className='sidebar-info'>
					<h2>Slack Clone</h2>
					<h3>
						<FiberManualRecordIcon className='' />
						{user?.displayName}
					</h3>
				</div>
				<CreateIcon />
			</div>
			{SidebarOptionData.map((item) => (
				<SIdebarOption Icon={item.Icon} title={item.title} />
			))}
			<hr />
			<div className='channels'>
				<SIdebarOption Icon={ExpandMoreIcon} title='Channels' />
				<div className='add-channel' onClick={addChannel}>
					<AddIcon />
				</div>
			</div>

			<hr />
			{channels.map((channel) => (
				<SIdebarOption
					id={channel.id}
					title={channel.name}
					key={channel.id}
				/>
			))}
			{/* <hr /> */}
			<SIdebarOption
				Icon={AddIcon}
				addChanneloption
				title='Add Channel'
			/>
		</div>
	);
}

export default Sidebar;
