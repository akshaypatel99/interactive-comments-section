import React from 'react';
import './App.css';
import commentData from '../data.json';
import Comment from './components/Comment';
import CommentBox from './components/CommentBox';
import useLocalStorage from './useLocalStorage';

export default function App() {
	const [data, setData] = useLocalStorage('comments', commentData);

	return (
		<main className='comments'>
			{data.comments.map((el) => (
				<Comment
					key={el.id}
					id={el.id}
					comment={el}
					currentUser={data.currentUser}
					isReply={false}
					data={data}
					setData={setData}
				/>
			))}
			<CommentBox
				currentUser={data.currentUser}
				data={data}
				setData={setData}
			/>
		</main>
	);
}
