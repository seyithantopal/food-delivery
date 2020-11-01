import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { bindActionCreators } from 'redux';
// import * as postActions from '../actions/postActions';

const Posts = (props) => {
	useEffect(() => {
		props.actions.loadPosts();
	}, []);

	const { posts } = props;
	return (
		<div>
			<h1>Posts</h1>
			{posts.map((post) => {
				return <div key={post.id}>{post.title}</div>;
			})}
		</div>
	);
};

Posts.propTypes = {
	actions: PropTypes.oneOfType([PropTypes.object]).isRequired,
	posts: PropTypes.oneOfType([PropTypes.array]).isRequired,
};

function mapStateToProps(state) {
	return {
		posts: state.posts,
	};
}

function mapDispatchToProps(dispatch) {
	return {
		// actions: bindActionCreators(postActions, dispatch),
	};
}

export default connect(mapStateToProps, mapDispatchToProps)(Posts);
