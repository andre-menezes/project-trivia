import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

class AnswerButtons extends Component {
  render() {
    const { questions, answerQuestion, checkAnswer, questionNumber } = this.props;
    const answers = [
      questions[questionNumber].correct_answer,
      questions[questionNumber].incorrect_answers,
    ];
    const param = 0.5;
    const shuffle = answers.flat().sort(() => Math.random() - param);
    return (
      <div className="answers-group">
        {shuffle.map((element) => (
          <button
            className="btn"
            key={ element }
            id={ element }
            name="btn-answer"
            onClick={ () => answerQuestion(questionNumber) }
            type="button"
            data-testid={ checkAnswer(element, questionNumber) }
          >
            {element}
          </button>
        ))}
      </div>
    );
  }
}

const mapStateToProps = (state) => ({ questions: state.game.questions });

AnswerButtons.propTypes = {
  answerQuestion: PropTypes.func.isRequired,
  checkAnswer: PropTypes.func.isRequired,
  questionNumber: PropTypes.number.isRequired,
  questions: PropTypes.arrayOf(PropTypes.object).isRequired,
};

export default connect(mapStateToProps)(AnswerButtons);
