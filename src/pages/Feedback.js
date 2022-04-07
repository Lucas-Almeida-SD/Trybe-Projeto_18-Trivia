import React from 'react';
import { connect } from 'react-redux';
import propTypes from 'prop-types';
import Header from '../components/Header';

class Feedback extends React.Component {
  render() {
    const { assertions, score } = this.props;
    localStorage.setItem('score', score);
    localStorage.setItem('assertions', assertions);
    const min = 3;
    return (
      <>
        <Header />
        <p>
          Pontuação:
          <span data-testid="feedback-total-score">{ score }</span>
        </p>
        <p>
          Total de acertos:
          <span data-testid="feedback-total-question">{ assertions }</span>
        </p>
        {assertions < min
          ? <p data-testid="feedback-text">Could be better...</p>
          : <p data-testid="feedback-text">Well Done!</p>}
      </>
    );
  }
}
const mapStateToProps = (state) => ({
  assertions: state.player.assertions,
  score: state.player.score,
});

export default connect(mapStateToProps)(Feedback);

Feedback.propTypes = {
  assertions: propTypes.func,
}.isRequired;
