import './editor.sass'
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { toast } from 'react-toastify';
import { createPost, updatePost } from '../AC';

class Editor extends Component {
  state = {
    title: this.props.title || '',
    body: this.props.body || '',
    isWaitingResponse: false
  }

  handleChange = ({ target }) =>
    this.setState({ [target.name]: target.value })

  handleSubmit = e => {
    const { submit, userId } = this.props;
    const { title, body } = this.state;

    e.preventDefault();
    submit(title, body, userId);

    this.setState({ isWaitingResponse: true });
  }

  static getDerivedStateFromProps(props, state) {
    const { isWaitingResponse } = state;
    const { type, succeed } = props;

    // if post has been changed
    if(isWaitingResponse && succeed) {
      toast(`Post has been ${type}d`);
      return { isWaitingResponse: false };
    }

    return null;
  }

  render() {
    const { type } = this.props;
    const { title, body } = this.state;

    return (
      <form className="editor" onSubmit={this.handleSubmit}>
        <input className="editor__input editor__title"
          name="title" value={title} placeholder="Title"
          onChange={this.handleChange}
        />
        <textarea className="editor__input" placeholder="Body..."
          name="body" value={body} cols="30" rows="10"
          onChange={this.handleChange}
        />
        <button className="btn editor__btn">{type}</button>
      </form>
    );
  }

  static propTypes = {
    type: PropTypes.oneOf(['create', 'update']).isRequired,
    title: PropTypes.string,
    body: PropTypes.string,
    userId: PropTypes.oneOfType([
      PropTypes.number, PropTypes.string
    ]).isRequired,
    editorDidSubmit: PropTypes.func,
    // from connect
    loading: PropTypes.bool.isRequired,
    error: PropTypes.string.isRequired,
    succeed: PropTypes.bool.isRequired,
    submit: PropTypes.func.isRequired
  }
}

export default connect(
  (state, ownProps) => ({
    ...state.postCUD[ownProps.type]
  }),
  (dispatch, { type }) => {
    if(type == 'create')
      return {
        submit: (...args) => dispatch(createPost(...args))
      };
    if(type == 'update')
      return {
        submit: (...args) => dispatch(updatePost(...args))
      };
  }
)(Editor);
