import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { stopTimer } from '../actions';
import AnswerButtons from './AnswerButtons';

class Questions extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      questionNumber: 0,
      timer: 30,
    };

    this.answerQuestion = this.answerQuestion.bind(this);
    this.nextQuestion = this.nextQuestion.bind(this);
    // this.renderAnswersButton = this.renderAnswersButton.bind(this);
    this.startCountdown = this.startCountdown.bind(this);
  }

  componentDidMount() {
    this.startCountdown();
  }

  startCountdown() {
    const { isResponding } = this.props;
    const { timer } = this.state;
    if (isResponding) {
      const second = 1000;
      setInterval(() => {
        if (timer > 0 && isResponding) {
          this.setState((prev) => ({ timer: prev.timer - 1 }));
        }
      }, second);
    }
  }

  answerQuestion(questionNumber) {
    const { questions, stop } = this.props;
    const answerButtons = document.getElementsByName('btn-answer');
    for (let i = 0; i < answerButtons.length; i += 1) {
      answerButtons[i].disabled = true;
      answerButtons[i].className = questions[questionNumber].correct_answer
        === answerButtons[i].innerText ? 'answered green-border' : 'answered red-border';
    }
    stop(false);
  }

  nextQuestion() {
    this.setState((prevState) => ({
      questionNumber: prevState.questionNumber + 1,
      timer: 30,
    }));
  }

  // checkAnswer(element, questionNumber) {
  //   const { questions } = this.props;
  //   console.log(questions);
  // const index = questions[questionNumber].incorrect_answers.indexOf(element);
  // return questions[questionNumber].correct_answer === element ? 'correct-answer'
  //   : `wrong-answer-${index}`;
  // }

  // renderAnswersButton(questionNumber) {
  //   const { questions } = this.props;
  //   const answers = [
  //     questions[questionNumber].correct_answer,
  //     questions[questionNumber].incorrect_answers,
  //   ];
  //   const param = 0.5;
  //   const shuffle = answers.flat().sort(() => Math.random() - param);
  //   return (
  //     <div className="answers-group">
  //       {shuffle.map((element) => (
  //         <button
  //           className="btn"
  //           key={ element }
  //           id={ element }
  //           name="btn-answer"
  //           onClick={ () => this.answerQuestion(questionNumber) }
  //           type="button"
  //           data-testid={ this.checkAnswer(element, questionNumber) }
  //         >
  //           {element}
  //         </button>
  //       ))}
  //     </div>
  //   );
  // }

  render() {
    const { questions } = this.props;
    const { questionNumber, timer } = this.state;
    const question = questions[questionNumber];
    return (
      <section>
        <span>{timer}</span>
        <p data-testid="question-category">{`Categoria: ${question.category}`}</p>
        <p data-testid="question-text">{question.question}</p>
        {/* {this.renderAnswersButton(questionNumber)} */}
        <AnswerButtons
          answerQuestion={ this.answerQuestion }
          checkAnswer={ this.checkAnswer }
          questionNumber={ questionNumber }
        />
        <button
          type="button"
          onClick={ this.nextQuestion }
        >
          Próxima
        </button>
      </section>
    );
  }
}

const mapStateToProps = (state) => ({
  isResponding: state.game.isResponding,
  questions: state.game.questions,
});

const mapDispatchToProps = (dispatch) => ({
  stop: (isResponding) => dispatch(stopTimer(isResponding)),
});

Questions.propTypes = {
  isResponding: PropTypes.bool.isRequired,
  questions: PropTypes.arrayOf(PropTypes.object).isRequired,
  stop: PropTypes.func.isRequired,
};

export default connect(mapStateToProps, mapDispatchToProps)(Questions);
