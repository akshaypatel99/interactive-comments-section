import React from 'react';
import './Score.css';

export default function Score({ score, currentUserComment, like, dislike }) {
	return (
		<div className='score'>
			<button
				className='score__button'
				disabled={currentUserComment}
				onClick={() => like()}>
				<img src='./images/icon-plus.svg' alt='plus' />
			</button>
			<div className='score__counter'>{score}</div>
			<button
				className='score__button'
				disabled={currentUserComment}
				onClick={() => dislike()}>
				<img src='./images/icon-minus.svg' alt='minus' />
			</button>
		</div>
	);
}
