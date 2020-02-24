import './comments.sass'
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { loadComments } from '../AC';

class Comments extends Component {
  componentDidMount() {
    const { loadComments, postId } = this.props;
    loadComments(postId);
  }

  render() {
    const { loading, error, entities } = this.props;

    if(error)
      return <span className="error">{error}</span>;
    if(loading)
      return <div className="loader"></div>;

    return (
      <div className="comments">
        <h3 className="comments__title">Comments</h3>
        <ul className="comments__body">
          { entities.map(({ id, email, body }) =>
            <li className="comments__item" key={id}>
              <span className="comments__author">{email}:</span>
              <p className="comments__body">{body}</p>
            </li>
          )}
        </ul>
      </div>
    );
  }

  static propTypes = {
    postId: PropTypes.oneOfType([
      PropTypes.string,
      PropTypes.number,
    ]).isRequired,
    // from connect
    loading: PropTypes.bool.isRequired,
    error: PropTypes.string,
    entities: PropTypes.array.isRequired,
    loadComments: PropTypes.func.isRequired
  }
}

export default connect(
  state => ({ ...state.comments }),
  { loadComments }
)(Comments);
