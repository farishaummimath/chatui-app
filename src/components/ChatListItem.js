import React from 'react';

export class ChatListItem extends React.Component {
	click = () => {
		this.props.onClick(this.props.id);
	};

	render() {
		return (
			<div className='chat-list-item' onClick={this.click}>
				<div>
					<img src={this.props.imageUrl} alt='Avatar' class='avatar' />
				</div>
				<div>
					<div>{this.props.name}</div>
					<div className='last-chat-message'>{this.props.lastMessage}</div>
				</div>
			</div>
		);
	}
}
