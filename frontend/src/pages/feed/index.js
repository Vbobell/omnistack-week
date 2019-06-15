import React, { Component } from 'react';
import api from '../../services/api';
import io from 'socket.io-client';

import './feed.css';
import more from '../../static/assets/more.svg';
import like from '../../static/assets/like.svg';
import comment from '../../static/assets/comment.svg';
import send from '../../static/assets/send.svg';

class Feed extends Component {
    state = {
        feed: []
    }

    async componentDidMount() {
        this.registerToSocket();

        const response = await api.get('posts');

        this.setState({ feed: response.data });
    }

    registerToSocket = () => {
        const socket = io("http://localhost:3000");

        socket.on('post', newPost => {
            this.setState({ feed: [newPost, ...this.state.feed] })
        });

        socket.on('like', likePost => {
            this.setState({ 
                feed: this.state.feed.map(post => 
                    post._id === likePost._id ? likePost : post
                )
            })
        });
    }

    handleLike = id => {
        api.post(`/posts/${id}/like`);
    }

    render() {
        return (
            <section id="post-list">
                {
                    this.state.feed.map(post => (
                        <article key={post._id}>
                            <header>
                                <div className="user-info">
                                    <h2>{ post.author }</h2>
                                    <span className="place">{ post.place }</span>
                                </div>
                                <img src={more} alt="Mais" />
                            </header>
                            <img src={`http://localhost:3000/files/${post.image}`} alt="test" />
                            <footer>
                                <div className="actions">
                                    <button onClick={() => this.handleLike(post._id) }>
                                        <img src={like} alt="Curtir" />
                                    </button>
                                    <img src={comment} alt="Comentários" />
                                    <img src={send} alt="Enviar" />
                                </div>
                                <strong>{post.likes} curtidas</strong>
                                <p>
                                    {post.description}
                                    <span>{post.hashtags}</span>
                                </p>
                            </footer>
                        </article>
                    ))
                }
            </section>
        )
    }
}

export default Feed;