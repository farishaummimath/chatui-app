import React from 'react';

export class Message extends React.Component {
	render() {
		const className = this.props.senderName === 'USER' ? 'user-message' : '';
		return (
			<div className={`${className} message-item`}>
				<div className='sender-name'>
					<b>{this.props.senderName}</b>
				</div>
				<span>{this.props.text}</span>
				<div className='message-time'>{this.props.timestamp}</div>
			</div>
		);
	}
}
