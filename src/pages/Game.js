import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { fetchQuestions } from '../actions';
import Header from '../components/Header';
import Questions from '../components/Questions';

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
    const { isFetching } = this.props;
    return isFetching ? (<p>Loading...</p>) : (
      <div>
        <Header />
        <Questions />
      </div>
    );
  }
}

const mapStateToProps = (state) => ({ isFetching: state.game.isFetching });

const mapDispatchToProps = (dispatch) => ({
  fetchQuestionsApi: () => dispatch(fetchQuestions()),
});

Game.propTypes = {
  fetchQuestionsApi: PropTypes.func.isRequired,
  isFetching: PropTypes.bool.isRequired,
};

export default connect(mapStateToProps, mapDispatchToProps)(Game);
