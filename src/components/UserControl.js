import React from 'react';

export default function UserControl({ isEditing, setIsEditing, toggleModal }) {
	return (
		<>
			<button
				className='action__button action__button__delete'
				onClick={() => toggleModal()}>
				<img src='./images/icon-delete.svg' alt='delete icon' />
				Delete
			</button>
			<button
				className='action__button action__button__edit'
				onClick={() => setIsEditing(!isEditing)}>
				<img src='./images/icon-edit.svg' alt='edit icon' />
				Edit
			</button>
		</>
	);
}
