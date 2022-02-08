import React from 'react';
import { Message } from './Message';

export class MessagesPanel extends React.Component {
	state = { input_value: '' };
	send = () => {
		if (this.state.input_value && this.state.input_value !== '') {
			this.props.onSendMessage(
				this.props.chatListItem.id,
				'USER',
				this.state.input_value
			);
			this.setState({ input_value: '' });
		}
	};

	handleInput = (e) => {
		this.setState({ input_value: e.target.value });
	};

	transformTime = (time) => {
		let ts = new Date(time);
		return ts.toDateString();
	};

	render() {
		let imageUrl, senderName;
		if (this.props.chatListItem) {
			senderName = this.props.chatListItem.name;
			imageUrl = this.props.chatListItem.imageUrl;
		}
		let list = (
			<div className='no-content-message'>There is no messages to show</div>
		);
		if (this.props.chatListItem && this.props.chatListItem.messageList) {
			list = this.props.chatListItem.messageList
				.sort((a, b) => b.timestamp - a.timestamp)
				.map((m) => (
					<Message
						key={m.id}
						id={m.id}
						senderName={m.sender}
						text={m.message}
						timestamp={this.transformTime(m.timestamp)}
					/>
				));
		}

		return (
			<div className='messages-panel'>
				{this.props.chatListItem && (
					<div className='chat-list-item-message-header'>
						<div>
							<img src={imageUrl} alt='Avatar' class='avatar' />
						</div>
						<div>
							<div>{senderName}</div>
							<div className='online-status'>Online</div>
						</div>
					</div>
				)}
				<div className='messages-list'>{list}</div>
				{this.props.chatListItem && (
					<div className='messages-input'>
						<input
							type='text'
							onChange={this.handleInput}
							value={this.state.input_value}
						/>
						<button onClick={this.send}>Send</button>
					</div>
				)}
			</div>
		);
	}
}
