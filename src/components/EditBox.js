import React from 'react';
import './EditBox.css';

export default function EditBox({
	id,
	replyingTo,
	content,
	data,
	setData,
	replyingToCommentId,
}) {
	let defaultText = replyingTo ? `@${replyingTo} ${content}` : `${content}`;

	function handleSubmit(e) {
		// e.preventDefault();

		if (!replyingTo) {
			let currentCommentIndex = data.comments.findIndex((el) => el.id === id);

			let newData = { ...data };
			newData.comments[currentCommentIndex].content = e.target.edit.value;
			setData(newData);
		} else {
			let replyingToCommentIndex = data.comments.findIndex(
				(el) => el.id === replyingToCommentId
			);
			let currentCommentIndex = data.comments[
				replyingToCommentIndex
			].replies.findIndex((el) => el.id === id);

			let newData = { ...data };

			// Remove @username from text input
			let contentString = e.target.edit.value;
			let spaceIndex = contentString.indexOf(' ');
			let newComment = contentString.substring(spaceIndex + 1);

			newData.comments[replyingToCommentIndex].replies[
				currentCommentIndex
			].content = newComment;

			setData(newData);
		}
	}

	return (
		<form className='editBox__form' onSubmit={handleSubmit}>
			<textarea
				className='textarea editBox__textarea'
				name='edit'
				id=''
				rows={4}
				defaultValue={defaultText}></textarea>
			<button type='submit' className='button editBox__button'>
				UPDATE
			</button>
		</form>
	);
}
