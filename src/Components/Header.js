import { Avatar } from '@material-ui/core';
import React from 'react';
import './Header.css';
import WatchLaterOutlinedIcon from '@material-ui/icons/WatchLaterOutlined';
import SearchOutlinedIcon from '@material-ui/icons/SearchOutlined';
import HelpOutlineOutlinedIcon from '@material-ui/icons/HelpOutlineOutlined';
import { useStateValue } from '../Context/StateProvider';
function Header() {
	const [{ user }] = useStateValue();

	return (
		<div className='header'>
			<div className='header-left'>
				<Avatar
					className='header-avatar'
					alt={user?.displayName}
					src={user?.photoURL}
				/>
				<WatchLaterOutlinedIcon />
			</div>
			<div className='header-search'>
				<SearchOutlinedIcon />
				<input placeholder='search' />
			</div>
			<div className='header-right'>
				<HelpOutlineOutlinedIcon />
			</div>
		</div>
	);
}

export default Header;
