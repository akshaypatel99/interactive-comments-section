import React from 'react';

export default function ReplyButton({ isReplying, setIsReplying }) {
	return (
		<button
			className='action__button action__button__reply'
			onClick={() => setIsReplying(!isReplying)}>
			<img src='./images/icon-reply.svg' alt='reply icon' />
			Reply
		</button>
	);
}
