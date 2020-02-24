import './users.sass';
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { loadUsers } from '../AC';
import { Link } from 'react-router-dom';

class Users extends Component {
  componentDidMount() {
    this.props.loadUsers();
  }

  render() {
    const { loading, error, entities } = this.props;

    if(error)
      return <span className="error">{error}</span>;
    if(loading)
      return <div className="loader"></div>;

    return (
      <div>
        <header className="users__header">
         <h2 className="users__title">our users</h2>
        </header>
        <ul className="users__list">
          { entities.map(({ name, id }) =>
            <li className="users__item" key={id}>{name}
              <Link className="btn users__posts-btn" to={`/users/${id}`}>
                posts
              </Link>
            </li>
          )}
        </ul>
      </div>
    );
  }

  static propTypes = {
    // from connect
    loading: PropTypes.bool.isRequired,
    error: PropTypes.string.isRequired,
    entities: PropTypes.array.isRequired,
    loadUsers: PropTypes.func.isRequired
  }
}

export default connect(
  state => ({ ...state.users }),
  { loadUsers }
)(Users);
