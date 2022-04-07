// encurtador.com.br/ctBLM
import React from 'react';
import propTypes from 'prop-types';
import { connect } from 'react-redux';
import { actionSumScore } from '../redux/actions/index';
import Header from '../components/Header';
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
    this.updateStopwatch = this.updateStopwatch.bind(this);
    this.sortAlternatives = this.sortAlternatives.bind(this);
    this.renderMain = this.renderMain.bind(this);
    this.chooseAlternative = this.chooseAlternative.bind(this);
    this.calculatePoints = this.calculatePoints.bind(this);
    this.alteraCor = this.alteraCor.bind(this);
    this.nextQuestion = this.nextQuestion.bind(this);
  }

  componentDidMount() {
    this.getQuestions();
    this.startTimer();
  }

  async getQuestions() {
    const { token } = this.props;
    const response = await fetch(`https://opentdb.com/api.php?amount=5&token=${token}`);
    const data = await response.json();
    this.setState({ questions: data.results }, () => this.sortAlternatives());
  }

  startTimer() {
    const num = 1000;
    timer = setInterval(this.updateStopwatch, num);
  }

  updateStopwatch() {
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

  chooseAlternative(alternative, correctAnswer) {
    this.setState({ chosenAlternative: true });
    clearInterval(timer);
    if (alternative === correctAnswer) { this.calculatePoints(); }
  }

  calculatePoints() {
    const { sumScore } = this.props;
    const { questions, counter, stopwatch } = this.state;
    const difficultyLevel = { hard: 3, medium: 2, easy: 1 };
    const { difficulty } = questions[counter];
    const num10 = 10;
    const score = num10 + (stopwatch * difficultyLevel[difficulty]);
    sumScore(score);
  }

  alteraCor(chosenAlternative, stopwatch, testeId) {
    if (chosenAlternative || stopwatch === 0) {
      if (testeId === 'correct-answer') { return 'correta'; }
      return 'incorreta';
    }
  }

  nextQuestion() {
    this.setState((previous) => ({ counter: previous.counter + 1,
      chosenAlternative: false,
      stopwatch: 30 }), () => {
      const { questions, counter } = this.state;
      if (counter === questions.length) {
        const { history } = this.props;
        return history.push('/feedback');
      }
      this.sortAlternatives();
      this.startTimer();
    });
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
                className={ this.alteraCor(chosenAlternative, stopwatch, testeId) }
                disabled={ (stopwatch === 0) }
                onClick={ () => this.chooseAlternative(elem, correctAnswer) }
              >
                { elem }

              </button>
            </div>
          );
        })}
        <p>{stopwatch}</p>
        {(chosenAlternative || stopwatch === 0) && (
          <button
            data-testid="btn-next"
            type="button"
            onClick={ this.nextQuestion }
          >
            Next
          </button>)}
      </main>
    );
  }

  render() {
    const { questions, counter } = this.state;
    return (
      <>
        <Header />
        { (questions.length > 0 && counter < questions.length) && this.renderMain() }
      </>
    );
  }
}

const mapStateToProps = (state) => ({
  token: state.token,
});

const mapDispatchToProps = (dispatch) => ({
  sumScore: (score) => dispatch(actionSumScore(score)),
});

export default connect(mapStateToProps, mapDispatchToProps)(Jogo);

Jogo.propTypes = {
  sumScore: propTypes.func,
}.isRequired;
