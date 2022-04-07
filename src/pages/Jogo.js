// encurtador.com.br/ctBLM
import React from 'react';
import propTypes from 'prop-types';
import { connect } from 'react-redux';
import md5 from 'crypto-js/md5';
import './jogo.css';

let timer;

class Jogo extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      questions: [],
      alternatives: [],
      counter: 0,
      chosenAlternative: false,
      stopwatch: 30,
    };
    this.getQuestions = this.getQuestions.bind(this);
    this.sortAlternatives = this.sortAlternatives.bind(this);
    this.renderMain = this.renderMain.bind(this);
    this.chooseAlternative = this.chooseAlternative.bind(this);
    this.alteraCor = this.alteraCor.bind(this);
  }

  componentDidMount() {
    const num = 1000;
    this.getQuestions();
    timer = setInterval(this.updateStopwatch, num);
  }

  async getQuestions() {
    const { token } = this.props;
    const response = await fetch(`https://opentdb.com/api.php?amount=5&token=${token}`);
    const data = await response.json();
    this.setState({ questions: data.results }, () => this.sortAlternatives());
  }

  updateStopwatch = () => {
    this.setState((previous) => ({ stopwatch: previous.stopwatch - 1 }));
  }

  sortAlternatives() {
    const { questions, counter } = this.state;
    const { correct_answer: correctAnswer,
      incorrect_answers: incorrectAnswers } = questions[counter];
    const num = 0.5;
    const alternatives = [correctAnswer, ...incorrectAnswers];
    alternatives.sort(() => Math.random() - num);
    this.setState({ alternatives });
  }

  chooseAlternative() {
    this.setState({ chosenAlternative: true });
    clearInterval(timer);
  }

  alteraCor(chosenAlternative, testeId) {
    if (chosenAlternative && testeId === 'correct-answer') { return 'correta'; }
    if (chosenAlternative && testeId.includes('wrong-answer')) { return 'incorreta'; }
  }

  renderMain() {
    const { questions, counter, alternatives, chosenAlternative, stopwatch } = this.state;
    const { category, question, correct_answer: correctAnswer } = questions[counter];
    if (stopwatch === 0) { clearInterval(timer); }
    let contador = 0;
    return (
      <main>
        <p data-testid="question-category">{ category }</p>
        <p data-testid="question-text">{ question }</p>
        { alternatives.map((elem, index) => {
          const testeId = (elem === correctAnswer)
            ? 'correct-answer'
            : `wrong-answer-${contador}`;
          contador = (elem !== correctAnswer) ? contador + 1 : contador;
          return (
            <div data-testid="answer-options" key={ index }>
              <button
                type="button"
                data-testid={ testeId }
                className={ this.alteraCor(chosenAlternative, testeId) }
                disabled={ (stopwatch === 0) }
                onClick={ this.chooseAlternative }
              >
                { elem }

              </button>
            </div>
          );
        })}
        <p>{stopwatch}</p>
      </main>
    );
  }

  render() {
    const { questions } = this.state;
    const { estado: { name, score, gravatarEmail } } = this.props;
    const converte = md5(gravatarEmail).toString();
    return (
      <>
        <header>
          <span data-testid="header-player-name">{ name }</span>
          { ' ' }
          <span data-testid="header-score">{ score }</span>
          { ' ' }
          <img src={ `https://www.gravatar.com/avatar/${converte}` } alt="avatar" data-testid="header-profile-picture" />
        </header>
        { questions.length > 0 && this.renderMain() }
      </>
    );
  }
}

const mapStateToProps = (state) => ({
  estado: state.player,
  token: state.token,
});

export default connect(mapStateToProps)(Jogo);

Jogo.propTypes = {
  estado: propTypes.arrayOf({}),
}.isRequired;
