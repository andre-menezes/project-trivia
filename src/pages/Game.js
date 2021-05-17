import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { fetchQuestions } from '../actions';
import Header from '../components/Header';

class Game extends Component {
  constructor(props) {
    super(props);

    this.getQuestions = this.getQuestions.bind(this);
  }

  componentDidMount() {
    this.getQuestions();
  }

  async getQuestions() {
    const { fetchQuestionsApi } = this.props;
    await fetchQuestionsApi();
  }

  render() {
    return (
      <div>
        <Header />
        Game Page
      </div>
    );
  }
}

const mapDispatchToProps = (dispatch) => ({
  fetchQuestionsApi: () => dispatch(fetchQuestions()),
});

Game.propTypes = { fetchQuestionsApi: PropTypes.func.isRequired };

export default connect(null, mapDispatchToProps)(Game);
