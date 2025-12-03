const About = () => {
	return (
		<div className='about-container'>
			<h2>About iNotebook</h2>
			<p>
				iNotebook is a modern, secure note-taking application that helps you organize your thoughts,
				ideas, and important information in one place. Built with React and powered by a robust backend,
				iNotebook provides a seamless experience for managing your notes.
			</p>
			<p style={{ marginTop: '1.5rem' }}>
				<strong>Features:</strong>
			</p>
			<ul style={{ 
				color: 'rgba(255, 255, 255, 0.8)', 
				lineHeight: '2',
				marginTop: '1rem',
				paddingLeft: '1.5rem'
			}}>
				<li>🔐 Secure user authentication</li>
				<li>📝 Create, edit, and delete notes</li>
				<li>🏷️ Organize notes with tags</li>
				<li>💾 Cloud-based storage</li>
				<li>📱 Responsive design for all devices</li>
				<li>✨ Beautiful, modern interface</li>
			</ul>
			<p style={{ marginTop: '2rem', fontStyle: 'italic', color: 'rgba(255, 255, 255, 0.6)' }}>
				Start organizing your thoughts today!
			</p>
		</div>
	);
};

export default About;
