import React from 'react';
import { ChatListItem } from './ChatListItem';

export class Chatlist extends React.Component {
	handleClick = (id) => {
		this.props.onSelectItem(id);
	};
	getLastMessage = (ChatListItem) => {
		let lastMessageText = 'No messages yet for this chatlist';
		let messageList;
		if (ChatListItem.messageList.length > 0) {
			messageList = ChatListItem.messageList.sort(
				(a, b) => a.timestamp - b.timestamp
			);
			lastMessageText = messageList[0].message;
		}

		return lastMessageText;
	};
	render() {
		let list = (
			<div className='no-content-message'>There is no chat list to show</div>
		);
		if (this.props.chatList && this.props.chatList.map) {
			list = this.props.chatList.map((c) => {
				const lastmessage = this.getLastMessage(c);
				return (
					<ChatListItem
						key={c.id}
						id={c.id}
						imageUrl={c.imageUrl}
						name={c.name}
						lastMessage={lastmessage}
						onClick={this.handleClick}
					/>
				);
			});
		}
		return <div className='chat-list'>{list}</div>;
	}
}
