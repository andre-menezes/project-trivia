import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import md5 from 'crypto-js/md5';
import trivia from '../images/trivia.png';

class Header extends React.Component {
  constructor(props) {
    super(props);

    this.state = { gravatar: '' };

    this.gravatar = this.gravatar.bind(this);
  }

  componentDidMount() {
    this.gravatar();
  }

  gravatar() {
    const { email } = this.props;
    const hash = md5(email).toString();
    const gravatar = `https://www.gravatar.com/avatar/${hash}`;
    this.setState({ gravatar });
  }

  render() {
    const { name, score } = this.props;
    const { gravatar } = this.state;
    return (
      <header className="header-content">
        <img
          src={ gravatar }
          alt="player-avatar"
          data-testid="header-profile-picture"
        />
        <img src={ trivia } alt="trivia-logo" className="App-logo header-logo" />
        <div className="player-data">
          <p>
            Player:
            <span data-testid="header-player-name">{name}</span>
          </p>
          <p>
            Score:
            <span data-testid="header-score">{score}</span>
          </p>
        </div>
      </header>
    );
  }
}

const mapStateToProps = ({ login }) => ({
  email: login.player.email,
  name: login.player.name,
  score: login.player.score,
});

Header.propTypes = {
  email: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  score: PropTypes.number.isRequired,
};

export default connect(mapStateToProps)(Header);
