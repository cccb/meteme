
/**
 * Login Form
 */

import React         from 'react'
import { Component } from 'react'

import { reduxForm, Field } from 'redux-form'

import { Alert,
         FormGroup,
         FormControl,
         ControlLabel } from 'react-bootstrap';

import Card from '../card'


function renderInputField(field) {
  let validationState = undefined;
  if (field.errors) {
    validationState = 'error';
  }

  return (
    <FormGroup validationState={validationState}>
      <ControlLabel>{field.input.label}</ControlLabel>
      <FormControl {...field.input} />
    </FormGroup>
  );
};

class LoginForm extends Component {
  render() {
    const {
      pristine,
      resetForm,
      handleSubmit,
      submitting,
      authError
    } = this.props;

    return (
        <form className="form-signin"
              onSubmit={handleSubmit}
              id="login-form">
          <div>
            {authError &&
                <Alert bsStyle="danger">
                  <strong>Login failed!</strong>&nbsp;
                  Please check your username and password.
                </Alert>}

            <Field name="username"
                   component={renderInputField}
                   label="Username" />

            <Field name="password"
                   type="password"
                   component={renderInputField}
                   label="Password" />

            <div className="form-actions clearfix">
              <button type="submit" disabled={submitting || pristine}
                      className="btn btn-sm btn-primary btn-block">
                 Login
              </button>
            </div>

          </div>
        </form>
    );
  }
}

// Create redux form
export default reduxForm({
  form: 'login',
})(LoginForm);
