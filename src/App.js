import React from 'react';
import { BrowserRouter, Route, Routes, Link } from 'react-router-dom';

import Login from './components/Login';
import Chat from './components/Chat';

function App(props) {
	const loggedInUser = localStorage.getItem('user');

	return (
		<BrowserRouter>
			<div>
				<Link to='/'> Home </Link>
				{loggedInUser ? <Link to='/chats'> | Chats |</Link> : null}

				<Routes>
					<Route path='/' element={<Login />} />
					<Route path='chats' element={<Chat />} />
					<Route
						path='*'
						element={
							<main style={{ padding: '1rem' }}>
								<p>There's nothing here!</p>
							</main>
						}
					/>
					{/* {loggedInUser && <Redirect from='/' to='chats' />} */}
				</Routes>
			</div>
		</BrowserRouter>
	);
}
export default App;
