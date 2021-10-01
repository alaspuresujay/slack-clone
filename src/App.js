import Header from './Components/Header';
import './App.css';
import React from 'react';
import Sidebar from './Components/Sidebar';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import Chat from './Components/Chat';
import Login from './Components/Pages/Login';
import { useStateValue } from './Context/StateProvider';

function App() {
	const [{ user }] = useStateValue();
	return (
		<div>
			<Router>
				{!user ? (
					<Login />
				) : (
					<Router>
						<Header />
						<div className='app-body'>
							<Sidebar />
							{/* React Router */}
							<Switch>
								<Route path='/room/:roomId'>
									<Chat />
								</Route>
								<Route exact path='/'>
									<h1>Welcome</h1>
								</Route>
							</Switch>
						</div>
					</Router>
				)}
			</Router>
		</div>
	);
}

export default App;
