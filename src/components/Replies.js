import React from 'react';
import Comment from './Comment';
import './Replies.css';

export default function Replies({
	replies,
	currentUser,
	replyingToCommentId,
	data,
	setData,
}) {
	return (
		<div className='replies'>
			<div className='replies__line'></div>
			<div className='replies__comments'>
				{replies.map((el) => (
					<Comment
						key={el.id}
						id={el.id}
						comment={el}
						currentUser={currentUser}
						isReply={true}
						replyingToCommentId={replyingToCommentId}
						data={data}
						setData={setData}
					/>
				))}
			</div>
		</div>
	);
}
