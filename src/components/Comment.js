import React from 'react';
import Score from './Score';
import './Comment.css';
import UserControl from './UserControl';
import Replies from './Replies';
import ReplyButton from './ReplyButton';
import CommentBox from './CommentBox';
import EditBox from './EditBox';
import Modal from './Modal';
import { timeSince } from '../utilities';

export default function Comment({
	id,
	comment,
	currentUser,
	isReply = false,
	replyingToCommentId,
	data,
	setData,
}) {
	const [isReplying, setIsReplying] = React.useState(false);
	const [isEditing, setIsEditing] = React.useState(false);
	const [showDeleteModal, setShowDeleteModal] = React.useState(false);

	function toggleModal() {
		setShowDeleteModal(!showDeleteModal);
	}

	function deleteComment() {
		if (!isReply) {
			let newData = { ...data };
			let newComments = newData.comments.filter((el) => el.id !== id);
			newData.comments = newComments;
			setData(newData);
		} else {
			let newData = { ...data };
			// Find index of parent comment
			let replyingToCommentIndex = newData.comments.findIndex(
				(el) => el.id === replyingToCommentId
			);

			let newReplies = newData.comments[replyingToCommentIndex].replies.filter(
				(el) => el.id !== id
			);
			newData.comments[replyingToCommentIndex].replies = newReplies;
			toggleModal();
			setData(newData);
		}
	}

	function like() {
		if (!isReply) {
			let newData = { ...data };
			let commentIndex = newData.comments.findIndex((el) => el.id === id);
			newData.comments[commentIndex].score += 1;
			setData(newData);
		} else {
			let newData = { ...data };
			let replyingToCommentIndex = newData.comments.findIndex(
				(el) => el.id === replyingToCommentId
			);
			let replyingToCommentReplies =
				newData.comments[replyingToCommentIndex].replies;
			let commentIndex = replyingToCommentReplies.findIndex(
				(el) => el.id === id
			);
			replyingToCommentReplies[commentIndex].score += 1;
			setData(newData);
		}
	}

	function dislike() {
		if (!isReply) {
			let newData = { ...data };
			let commentIndex = newData.comments.findIndex((el) => el.id === id);
			newData.comments[commentIndex].score -= 1;
			setData(newData);
		} else {
			let newData = { ...data };
			let replyingToCommentIndex = newData.comments.findIndex(
				(el) => el.id === replyingToCommentId
			);
			let replyingToCommentReplies =
				newData.comments[replyingToCommentIndex].replies;
			let commentIndex = replyingToCommentReplies.findIndex(
				(el) => el.id === id
			);
			replyingToCommentReplies[commentIndex].score -= 1;
			setData(newData);
		}
	}

	let userbadge = null;
	let actions = (
		<ReplyButton isReplying={isReplying} setIsReplying={setIsReplying} />
	);
	if (currentUser.username === comment.user.username) {
		userbadge = <p className='comment__currentUser'>you</p>;
		actions = (
			<UserControl
				isEditing={isEditing}
				setIsEditing={setIsEditing}
				toggleModal={toggleModal}
			/>
		);
	}

	let replyingTo = null;
	if (isReply) {
		replyingTo = <span className='replyingTo'>@{comment.replyingTo}</span>;
	}

	let replies = null;
	if (!isReply && comment.replies.length > 0) {
		replies = (
			<Replies
				replies={comment.replies}
				currentUser={currentUser}
				replyingToCommentId={id}
				data={data}
				setData={setData}
			/>
		);
	}

	let replyBox = null;
	if (isReplying) {
		replyBox = (
			<CommentBox
				currentUser={currentUser}
				isReply={true}
				commentAuthor={comment.user.username}
				data={data}
				setData={setData}
				replyingToCommentId={comment.id}
			/>
		);
	}

	let content = (
		<p className='content'>
			{replyingTo} {comment.content}
		</p>
	);
	if (isEditing) {
		content = (
			<EditBox
				id={id}
				replyingTo={comment.replyingTo}
				content={comment.content}
				data={data}
				setData={setData}
				replyingToCommentId={replyingToCommentId}
			/>
		);
	}

	return (
		<>
			<article className='comment__container'>
				<article className='comment'>
					<div className='comment__rating'>
						<Score
							score={comment.score}
							currentUserComment={
								currentUser.username === comment.user.username
							}
							like={like}
							dislike={dislike}
						/>
					</div>
					<div className='comment__user'>
						<img src={comment.user.image.webp} alt='' />
						<p className='comment__username'>{comment.user.username}</p>
						{userbadge}
						<p className='comment__timestamp'>
							{typeof comment.createdAt === 'string'
								? comment.createdAt
								: timeSince(comment.createdAt)}
						</p>
					</div>
					<div className='comment__actions'>{actions}</div>
					<div className='comment__content'>{content}</div>
				</article>
				{replyBox}
				{replies}
				<Modal
					showDeleteModal={showDeleteModal}
					toggleModal={toggleModal}
					deleteComment={deleteComment}
				/>
			</article>
		</>
	);
}
