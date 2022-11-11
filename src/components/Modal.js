import React from 'react';
import './Modal.css';

export default function Modal({ showDeleteModal, toggleModal, deleteComment }) {
	return (
		<dialog
			className='deleteModal__container'
			open={showDeleteModal ? 'open' : false}>
			<article className='deleteModal__content'>
				<h2>Delete comment</h2>
				<p>
					Are you sure want to delete this comment? This will remove the comment
					and can't be undone.
				</p>
				<button
					className='button deleteModal__button__cancel'
					id='deleteModal__cancel'
					onClick={() => toggleModal()}>
					NO, CANCEL
				</button>
				<button
					className='button deleteModal__button__delete'
					id='deleteModal__delete'
					onClick={() => deleteComment()}>
					YES, DELETE
				</button>
			</article>
		</dialog>
	);
}
