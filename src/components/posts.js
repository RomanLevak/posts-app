import './posts.sass'
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { loadPosts, loadUsers } from '../AC';
import Editor from './editor';

class Posts extends Component {
  componentDidMount() {
    const { loadPosts, loadUsers, userId } = this.props;
    loadUsers();
    loadPosts(userId);
  }

  state = {
    isEditorOpen: false
  }

  toggleEditor = () =>
    this.setState({
      isEditorOpen: !this.state.isEditorOpen
    })

  render() {
    const {
      loading, error, userId, username, entities
    } = this.props;
    const { isEditorOpen } = this.state;

    if(error)
      return <span className="error">{error}</span>;
    if(loading)
      return <div className="loader"></div>;

    return (
      <div className="posts">
        <header className="posts__header">
          <h1 className="posts__title">Posts by {username}</h1>
        </header>
        <ul className="posts__list">
          { entities.map(({ id, title }) =>
            <li className="posts__item" key={id}>
              <h2 className="posts__item-title">{title}</h2>
              <Link className="btn posts__btn"
               to={{ pathname: `/posts/${id}`, state: { userId } }}>
                Details
              </Link>
            </li>
          )}
        </ul>
        <div>
          <div className="editor-wrap">
            <button className="btn posts__btn-add"onClick={this.toggleEditor}>
              {isEditorOpen ? 'Cancel' : 'Add New'}
            </button>
            { isEditorOpen &&
              <div className="posts__editor">
                <Editor
                  type="create"
                  userId={userId}
                />
               </div>
              }
          </div>
        </div>
      </div>
    );
  }

  static propTypes = {
    userId: PropTypes.string.isRequired,
    // from connect
    loading: PropTypes.bool.isRequired,
    error: PropTypes.string.isRequired,
    entities: PropTypes.array.isRequired,
    username: PropTypes.string,
    loadPosts: PropTypes.func.isRequired,
    loadUsers: PropTypes.func.isRequired
  }
}

export default connect(
  (state, { userId }) => ({
    ...state.posts,
    username: state.users.entities.find(
      user => user.id == userId
    )?.username
  }),
  { loadPosts, loadUsers }
)(Posts);
