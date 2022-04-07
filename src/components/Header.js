import React from 'react';
import propTypes from 'prop-types';
import md5 from 'crypto-js/md5';
import { connect } from 'react-redux';

class Header extends React.Component {
  render() {
    const { estado: { name, score, gravatarEmail } } = this.props;
    const converte = md5(gravatarEmail).toString();
    return (
      <header>
        <span data-testid="header-player-name">{ name }</span>
        { ' ' }
        <span data-testid="header-score">{ score }</span>
        { ' ' }
        <img src={ `https://www.gravatar.com/avatar/${converte}` } alt="avatar" data-testid="header-profile-picture" />
      </header>
    );
  }
}

const mapStateToProps = (state) => ({
  estado: state.player,
  token: state.token,
});

export default connect(mapStateToProps)(Header);

Header.propTypes = {
  token: propTypes.string,
}.isRequired;
