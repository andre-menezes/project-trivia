import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import logo from '../images/trivia.png';
import '../App.css';
import { getTokenApi } from '../services';
import { addPlayer } from '../actions';

class Login extends Component {
  constructor(props) {
    super(props);

    this.state = {
      name: '',
      email: '',
      disabled: true,
    };

    this.handleChange = this.handleChange.bind(this);
    this.handleClick = this.handleClick.bind(this);
    this.validateFields = this.validateFields.bind(this);
  }

  validateFields() {
    const { name, email } = this.state;
    const regex = /\S+@\S+\.\S+/;
    const validEmail = regex.test(email);
    return !(name && validEmail);
  }

  handleChange({ target: { id, value } }) {
    this.setState({ [id]: value, disabled: this.validateFields() });
  }

  async handleClick() {
    const { history, savePlayer } = this.props;
    const { name, email } = this.state;
    const tokenApi = await getTokenApi();
    const { token } = tokenApi;
    localStorage.setItem('token', token);
    const player = { name, assertions: 0, score: 0, gravatarEmail: email };
    localStorage.setItem('state', JSON.stringify({ player }));
    savePlayer(player);
    history.push('/game');
  }

  render() {
    const { history } = this.props;
    const { disabled } = this.state;
    return (
      <main className="login-content">
        <img src={ logo } className="App-logo" alt="logo" />
        <form className="form-content">
          <label htmlFor="name">
            Name:
            <input
              id="name"
              onChange={ this.handleChange }
              type="text"
              data-testid="input-player-name"
            />
          </label>
          <label htmlFor="email">
            Email:
            <input
              id="email"
              onChange={ this.handleChange }
              type="email"
              data-testid="input-gravatar-email"
            />
          </label>
          <button
            className="form-content-button"
            disabled={ disabled }
            onClick={ this.handleClick }
            type="button"
            data-testid="btn-play"
          >
            Jogar
          </button>
        </form>
        <button
          className="form-content-button btn-settings"
          onClick={ () => history.push('/settings') }
          type="submit"
          data-testid="btn-settings"
        >
          Configurações
        </button>
      </main>
    );
  }
}

const mapDispatchToProps = (dispatch) => ({
  savePlayer: (player) => dispatch(addPlayer(player)),
});

Login.propTypes = {
  history: PropTypes.shape({ push: PropTypes.func.isRequired }).isRequired,
  savePlayer: PropTypes.func.isRequired,
};

export default connect(null, mapDispatchToProps)(Login);
