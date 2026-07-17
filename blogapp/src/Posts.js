import React from 'react';
import Post from './Post';

class Posts extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            posts: []
        };
    }

    loadPosts() {
        fetch('https://jsonplaceholder.typicode.com/posts')
            .then(response => response.json())
            .then(data => {
                const postsList = data.map(item => new Post(item.id, item.title, item.body));
                this.setState({ posts: postsList });
            })
            .catch(error => {
                console.error("Error fetching posts:", error);
                throw error; // This will be caught by componentDidCatch in a parent or error boundary, but React 16+ error boundaries only catch errors in components below them.
            });
    }

    componentDidMount() {
        this.loadPosts();
    }

    componentDidCatch(error, info) {
        alert("An error occurred: " + error.toString());
    }

    render() {
        return (
            <div>
                <h1>Posts</h1>
                {this.state.posts.map(post => (
                    <div key={post.id} style={{ borderBottom: '1px solid #ccc', paddingBottom: '10px', marginBottom: '10px' }}>
                        <h2>{post.title}</h2>
                        <p>{post.body}</p>
                    </div>
                ))}
            </div>
        );
    }
}

export default Posts;
