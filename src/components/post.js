import './post.sass'
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { loadPost, deletePost } from '../AC';
import { toast } from 'react-toastify';
import Editor from './editor';
import Comments from './comments';

class Post extends Component {
  componentDidMount() {
    const { loadPost, postId } = this.props;
    loadPost(postId);
  }

  state = {
    isEditorOpen: false,
    isWaitingForDelete: false
  }

  handleDelete = () => {
    const { deletePost, postId } = this.props

    if(window.confirm('Are you sure ?')) {
      this.setState({ isWaitingForDelete: true })
      deletePost(postId)
    }
  }

  toggleEditor = () =>
    this.setState({
      isEditorOpen: !this.state.isEditorOpen
    })

  closeEditor = () =>
    this.setState({ isEditorOpen: false })

  static getDerivedStateFromProps(props, state) {
    const { isWaitingForDelete } = state
    const { isDeleted } = props

    if(isWaitingForDelete && isDeleted) {
      toast('Post has been deleted');
      return { isWaitingForDelete: false }
    }

    return null;
  }

  render() {
    const { loading, error, entity, postId } = this.props;

    if(error)
      return <span className="error">{error}</span>;
    if(loading)
      return <div className="loader"></div>;

    const { title, body } = entity;
    const { isEditorOpen } = this.state;

    return (
      <div className="post">
        <h2 className="post__title">{title}</h2>
        <div className="post__body-wrap">
        <p className="post__body">{body}</p>
          <div className="post__btn-wrap">
            <button className="btn post__btn-edit" onClick={this.toggleEditor}>
              { isEditorOpen ? 'Close' : 'Edit'}
            </button>
            <button className="btn post__btn-delete"
              onClick={this.handleDelete}
            >
              Delete
            </button>
          </div>
        </div>
        <Comments postId={postId} />
        <div className="editor-wrap">
          { isEditorOpen &&
            <Editor type='update' {...entity}
              afterSubmit={this.closeEditor}
            />
          }
        </div>
      </div>
    );
  }

  static propTypes = {
    postId: PropTypes.string.isRequired,
    // from connect
    id: PropTypes.number,
    loading: PropTypes.bool.isRequired,
    error: PropTypes.string,
    entity: PropTypes.object.isRequired,
    loadPost: PropTypes.func.isRequired,
    isDeleted: PropTypes.bool.isRequired
  }
}

export default connect(
  state => ({
    ...state.post,
    isDeleted: state.postCUD.delete.succeed
   }),
  { loadPost, deletePost }
)(Post);
