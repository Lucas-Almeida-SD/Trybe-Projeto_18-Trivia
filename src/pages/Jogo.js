// encurtador.com.br/ctBLM
import React from 'react';
import propTypes from 'prop-types';
import { connect } from 'react-redux';
import md5 from 'crypto-js/md5';

class Jogo extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      questions: [],
      counter: 0,
    };
    this.getQuestions = this.getQuestions.bind(this);
    this.renderMain = this.renderMain.bind(this);
  }

  componentDidMount() {
    this.getQuestions();
  }

  async getQuestions() {
    const { token } = this.props;
    const response = await fetch(`https://opentdb.com/api.php?amount=5&token=${token}`);
    const data = await response.json();
    console.log('DATA', data);
    this.setState({ questions: data.results });
  }

  renderMain() {
    const num = 0.5;
    const { questions, counter } = this.state;
    const { category, question, correct_answer: correctAnswer,
      incorrect_answers: incorrectAnswers } = questions[counter];
    const alternativas = [correctAnswer, ...incorrectAnswers];
    alternativas.sort(() => Math.random() - num);
    let contador = 0;
    return (
      <main>
        <p data-testid="question-category">{ category }</p>
        <p data-testid="question-text">{ question }</p>
        { alternativas.map((elem, index) => {
          const testeId = (elem === correctAnswer)
            ? 'correct-answer'
            : `wrong-answer-${contador}`;
          contador = (elem !== correctAnswer) ? contador + 1 : contador;
          return (
            <div data-testid="answer-options" key={ index }>
              <button type="button" data-testid={ testeId }>{ elem }</button>
            </div>
          );
        })}
      </main>
    );
  }

  render() {
    const { questions } = this.state;
    const { estado: { name, score, gravatarEmail } } = this.props;
    const converte = md5(gravatarEmail).toString();
    // console.log('ESTADO', converte);
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
