import React from 'react';
import { Chatlist } from './Chatlist';
import './chat.scss';

import { MessagesPanel } from './MessagesPanel';
import data from './data.json';

export default class Chat extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			chatlist: null,
			chatlistItem: null,
		};
	}

	componentDidMount() {
		this.loadChatList();
		// this.getData();
	}
	loadChatList = () => {
		localStorage.setItem('chats', JSON.stringify(data));

		this.setState({ chatlist: data });
		// fetch('./data.json')
		// 	.then((response) => {
		// 		return response.json();
		// 	})
		// 	.then((data) => {
		// 		// Work with JSON data here
		// 		console.log(data);
		// 	})
		// 	.catch((err) => {
		// 		// Do something for an error here
		// 	});
	};

	handlechatItemSelect = (id) => {
		let chatlistItem = this.state.chatlist.find((c) => {
			return c.id === id;
		});

		this.setState({ chatlistItem });
	};

	handleSendMessage = (chatListItemId, sender, text) => {
		const chats = localStorage.getItem('chats');
		const chatList = JSON.parse(chats);
		const payload = {
			message: text,
			sender,
			timestamp: Date.now(),
			messageType: 'text',
		};
		console.log(payload);

		const newChatList = chatList.map((c) => {
			if (c.id === chatListItemId) {
				payload.messageId = c.messageList.length + 1;
				const updatedMessageList = c.messageList.push(payload);
				return c;
			} else {
				return c;
			}
		});
		console.log(newChatList);
		this.setState(
			(prevState) => {
				return {
					chatList: newChatList,
				};
			},
			function () {
				return this.state.chatList;
			}
		);
		console.log(this.state);
	};
	render() {
		return (
			<div className='chat-app'>
				<Chatlist
					chatList={this.state.chatlist}
					onSelectItem={this.handlechatItemSelect}
				/>

				<MessagesPanel
					onSendMessage={this.handleSendMessage}
					chatListItem={this.state.chatlistItem}
				/>
			</div>
		);
	}
}
