import React from 'react';
import propTypes from 'prop-types';
import { connect } from 'react-redux';
import md5 from 'crypto-js/md5';

class Jogo extends React.Component {
  render() {
    const { estado: { name, score, gravatarEmail } } = this.props;
    const converte = md5(gravatarEmail).toString();
    // console.log('ESTADO', converte);
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
});

export default connect(mapStateToProps)(Jogo);

Jogo.propTypes = {
  estado: propTypes.arrayOf({}).isRequired,
};
