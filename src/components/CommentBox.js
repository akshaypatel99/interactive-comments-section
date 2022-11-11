import React, { useState } from 'react';
import './CommentBox.css';

export default function CommentBox({
	currentUser,
	isReply = false,
	commentAuthor,
	data,
	setData,
	replyingToCommentId,
}) {
	let replyingTo = null;
	if (isReply) {
		replyingTo = `@${commentAuthor} `;
	}

	function handleSubmit(e) {
		// e.preventDefault();
		if (!isReply) {
			let newComment = {
				id: data.totalComments + 1,
				content: e.target.comment.value,
				createdAt: Date.now(),
				score: 0,
				user: currentUser,
				replies: [],
			};
			let newData = {
				...data,
				comments: [...data.comments, newComment],
				totalComments: data.totalComments + 1,
			};
			setData(newData);
		} else {
			// Remove @username from text input
			let contentString = e.target.comment.value;
			let spaceIndex = contentString.indexOf(' ');
			let replyString = contentString.substring(spaceIndex + 1);

			let newReply = {
				id: data.totalComments + 1,
				content: replyString,
				createdAt: Date.now(),
				score: 0,
				replyingTo: commentAuthor,
				user: currentUser,
			};

			// Find index of parent comment
			let replyingToCommentIndex;
			// Is parent comment part of main thread
			replyingToCommentIndex = data.comments.findIndex(
				(el) => el.id === replyingToCommentId
			);
			// Find parent comment index if replying to a reply
			if (replyingToCommentIndex === -1) {
				data.comments.forEach((el, index) => {
					const replyIndex = el.replies.findIndex(
						(el) => el.id === replyingToCommentId
					);
					if (replyIndex === -1) return;
					replyingToCommentIndex = index;
				});
			}
			// Add new reply to parent comment replies
			let newData = { ...data };
			newData.comments[replyingToCommentIndex].replies = [
				...newData.comments[replyingToCommentIndex].replies,
				newReply,
			];
			setData(newData);
		}
	}

	return (
		<article className='commentBox'>
			<form className='commentBox__form' onSubmit={handleSubmit}>
				<div className='commentBox__userImg'>
					<img
						src={currentUser.image.webp}
						alt={`${currentUser.username} profile picture`}
					/>
				</div>
				<textarea
					className='textarea commentBox__textarea '
					name='comment'
					id=''
					rows={4}
					placeholder='Add a comment...'
					defaultValue={replyingTo}></textarea>
				<button type='submit' className='button commentBox__button'>
					{isReply ? 'REPLY' : 'SEND'}
				</button>
			</form>
		</article>
	);
}
