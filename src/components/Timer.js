import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

class Timer extends React.Component {
  constructor(props) {
    super(props);

    const { timer } = props;
    this.state = { timer };

    this.startCountdown = this.startCountdown.bind(this);
  }

  componentDidMount() {
    this.startCountdown();
  }

  startCountdown() {
    const second = 1000;
    setInterval(() => {
      const { isResponding } = this.props;
      const { timer } = this.state;
      if (timer > 0 && isResponding) {
        this.setState((prev) => ({ timer: prev.timer - 1 }));
      }
    }, second);
  }

  render() {
    const { timer } = this.state;
    return (
      <span>{timer}</span>
    );
  }
}

const mapStateToProps = (state) => ({
  isResponding: state.game.isResponding,
  timer: state.game.timer,
});

Timer.propTypes = {
  isResponding: PropTypes.bool.isRequired,
  timer: PropTypes.number.isRequired,
};

export default connect(mapStateToProps)(Timer);
