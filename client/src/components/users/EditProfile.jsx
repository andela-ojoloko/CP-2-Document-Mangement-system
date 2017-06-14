/* global $ */
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import PropTypes from 'prop-types';
import { Redirect } from 'react-router-dom';
import { updateUser } from '../../actions/userActions';

/**
 * @desc EditProfile Component
 * @class EditProfile
 * @extends {Component}
 */
class EditProfile extends Component {
  /**
   * Creates an instance of EditProfile.
   * @param {any} props property of Component
   * @memberof EditProfile
   */
  constructor(props) {
    super(props);
    this.state = {
      firstName: this.props.user.firstName,
      lastName: this.props.user.lastName,
      password: '',
      userId: this.props.user.id,
      email: this.props.user.email,
      errorMsg: '',
      showError: false

    };
    this.handleChange = this.handleChange.bind(this);
  }
   /**
   * @desc runs before component recieves props;
   * @param {any} nextProps property of element;
   * @return {null} no return value;
   * @memberof SignUp
   */
  componentWillReceiveProps(nextProps) {
    if (!nextProps.status.success) {
      this.setState({
        errorMsg: nextProps.status.msg,
        showError: true
      });
    }
  }
/**
 * @desc handles change of form input
 * @param {any} event html event
 * @memberof SignUp
 * @returns {null} no return value
 *  */
  handleChange(event) {
    event.preventDefault();
    const name = event.target.name;
    const value = event.target.value;
    if (name === 'email') {
      this.setState({ showError: false });
    }
    this.setState({ [name]: value });
    const that = this;
    $('#signupForm').validate({
      rules: {
        firstName: {
          required: true,
          nowhitespace: true,
          minlength: 2
        },
        lastName: {
          required: true,
          nowhitespace: true,
          minlength: 2
        },
        password: {
          required: false,
          minlength: 5,
          nowhitespace: true,
        },
        email: {
          nowhitespace: true,
          required: true,
          email: true
        },
      },
      messages: {
        firstName: {
          required: 'Please enter a your firstname',
          minlength: 'Your first Name must consist of at least 2 characters'
        },
        lastName: {
          required: 'Please enter a your lastname',
          minlength: 'Your last Name must consist of at least 2 characters'
        },
        email: {
          required: 'Please enter a your email',
          email: 'please enter a valid email'
        },
        password: {
          minlength: 'Your password must be at least 5 characters long'
        },
      },
      errorElement: 'div',
      errorPlacement(error, element) {
        error.insertAfter(element);
      },
      submitHandler() {
        console.log(that.state);
        that.props.updateUser(that.state);
        // that.props.signUp(that.state).then(() => {
        //   toastr.success('Account created successfully');
        // });
      }
    });
  }
  /**
   * @desc renders html
   * @returns {*} html
   * @memberof SignUp
   */
  render() {
    return (
      <div className="row">
        <div className="col s12 editProfile-body">
          <div className="row">
            <div className="col s10  offset-s1 ">
              <div className="card form z-depth-0">
                <div className="card-content login-content">
                  <form
                    id="signupForm"
                    onSubmit={(e) => { e.preventDefault(); }}
                  >
                    <div className="row">
                      <div className="input-field col s6">
                        <i className="material-icons prefix">account_box</i>
                        <input
                          id="first_name"
                          type="text"
                          name="firstName"
                          value={this.state.firstName}
                          onChange={this.handleChange}
                        />
                        <label
                          htmlFor="first_name"
                          className="active"
                        >First Name</label>
                      </div>
                      <div className="input-field col s6">
                        <i className="material-icons prefix">account_box</i>
                        <input
                          id="last_name"
                          type="text"
                          name="lastName"
                          value={this.state.lastName}
                          onChange={this.handleChange}
                        />
                        <label
                          htmlFor="last_name"
                          className="active"
                        >Last Name</label>
                      </div>
                    </div>
                    <div className="row">
                      <div className="input-field col s12">
                        <i className="material-icons prefix">email</i>
                        <input
                          id="email"
                          type="email"
                          name="email"
                          value={this.state.email}
                          onChange={this.handleChange}
                        />
                        { this.state.showError &&
                        <div className="custom-error">{this.state.errorMsg}</div>
                    }
                        <label htmlFor="email" className="active">Email</label>

                      </div>
                    </div>
                    <div className="row">
                      <div className="input-field col s12">
                        <i className="material-icons prefix">lock_outline</i>
                        <input
                          id="password"
                          type="password"
                          name="password"
                          placeholder="Leave Blank if you dont to edit"
                          value={this.state.password}
                          onChange={this.handleChange}
                        />
                        <label
                          htmlFor="password"
                          className="active"
                        >Password</label>
                      </div>
                    </div>
                    <div className="row">

                      <button
                        className={`btn waves-effect 
                        waves-light col s4 offset-s1 z-depth-4 save-btn`}
                        type="submit"
                      >Save<i className="material-icons left">save</i>
                      </button>
                    </div>

                  </form>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    )
;
  }
}
const mapDispatchToProps = dispatch => bindActionCreators({
  updateUser
}, dispatch);
const mapStateToProps = state => ({
  user: state.authReducer.user
});
EditProfile.defaultProps = {
  status: false,
  signUp: () => undefined
};
EditProfile.propTypes = {
  status: PropTypes.func,
  user: PropTypes.shape({
    firstName: PropTypes.string,
    lastName: PropTypes.string,
    id: PropTypes.number,
    email: PropTypes.string,
  }).isRequired
};

export default connect(mapStateToProps, mapDispatchToProps)(EditProfile);
