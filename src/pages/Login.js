import React from 'react';
import propTypes from 'prop-types';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { actionLogin } from '../redux/actions';

class Login extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      name: '',
      email: '',
      isDisabled: true,
    };
    this.handleChange = this.handleChange.bind(this);
    this.validate = this.validate.bind(this);
  }

  handleChange({ target: { name, value } }) {
    const { login } = this.props;
    this.setState({ [name]: value }, () => this.validate());
    login({ [name]: value });
  }

  validate() {
    const num = 3;
    const { name, email } = this.state;
    if (email
      .match(/^\w+([-+.']\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*$/)
    && name.length > num) {
      this.setState({ isDisabled: false });
    } else {
      this.setState({ isDisabled: true });
    }
  }

  render() {
    const { name, email, isDisabled } = this.state;
    return (
      <section>
        <form method="get">
          <label htmlFor="input-name">
            <input
              data-testid="input-player-name"
              type="text"
              name="name"
              value={ name }
              onChange={ this.handleChange }
            />
          </label>
          <label htmlFor="input-email">
            <input
              data-testid="input-gravatar-email"
              type="text"
              name="email"
              value={ email }
              onChange={ this.handleChange }
            />
          </label>
          <Link to="/jogo">
            <button
              data-testid="btn-play"
              type="button"
              disabled={ isDisabled }
            >
              Play
            </button>
          </Link>
        </form>
      </section>
    );
  }
}

const mapDispatchToProps = (dispatch) => ({
  login: (state) => dispatch(actionLogin(state)),
});

export default connect(null, mapDispatchToProps)(Login);

Login.propTypes = {
  login: propTypes.func.isRequired,
};
