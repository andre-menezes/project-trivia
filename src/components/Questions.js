import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

class Questions extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      questionNumber: 0,
      correctAnswers: [],
    };

    this.getCorrectAnswers = this.getCorrectAnswers.bind(this);
    this.nextQuestion = this.nextQuestion.bind(this);
    this.renderAnswersButton = this.renderAnswersButton.bind(this);
  }

  componentDidMount() {
    this.getCorrectAnswers();
  }

  getCorrectAnswers() {
    const { questions } = this.props;
    questions.forEach((element) => {
      this.setState((prevState) => ({
        correctAnswers: [...prevState.correctAnswers, element.correct_answer],
      }));
    });
  }

  nextQuestion() {
    this.setState((prevState) => ({ questionNumber: prevState.questionNumber + 1 }));
  }

  checkAnswer(element, index) {
    const { correctAnswers } = this.state;
    return correctAnswers.includes(element) ? 'correct-answer'
      : `wrong-answer-${index - 1}`;
  }

  renderAnswersButton(number) {
    const { questions } = this.props;
    const answers = [
      questions[number].correct_answer,
      questions[number].incorrect_answers,
    ];
    const param = 0.5;
    const shuffle = answers.flat().sort(() => Math.random() - param);
    return (
      <div>
        {shuffle.map((element, index) => (
          <button
            key={ element }
            type="button"
            data-testid={ this.checkAnswer(element, index) }
          >
            {element}
          </button>
        ))}
      </div>
    );
  }

  render() {
    const { questions } = this.props;
    const { questionNumber } = this.state;
    const question = questions[questionNumber];
    return (
      <section>
        <p data-testid="question-category">{`Categoria: ${question.category}`}</p>
        <p data-testid="question-text">{question.question.replace(/&quot;/g, '\'')}</p>
        {this.renderAnswersButton(questionNumber)}
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

const mapStateToProps = (state) => ({ questions: state.game.questions });

Questions.propTypes = {
  questions: PropTypes.arrayOf(PropTypes.object).isRequired,
};

export default connect(mapStateToProps)(Questions);
