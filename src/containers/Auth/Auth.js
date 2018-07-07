import React, {Component} from 'react';
import classes from './Auth.css';
import {connect} from 'react-redux';
import {Redirect} from 'react-router-dom'
import Input from '../../components/UI/Input/Input';
import Button from '../../components/UI/Button/Button';
import Spinner from '../../components/UI/Spinner/Spinner';
import * as actions from '../../store/actions/index';
import {updateObject, checkValidity} from "../../shared/utility";

class Auth extends Component {
  state = {
    controls: {
      email: {
        elementType: 'input',
        elementConfig: {
          type: 'email',
          placeholder: 'Email',
        },
        value: '',
        validation: {
          required: true,
          isEmail: true
        },
        valid: false,
        touched: false
      },
      password: {
        elementType: 'input',
        elementConfig: {
          type: 'password',
          placeholder: 'Password'
        },
        value: '',
        validation: {
          required: true,
          minLength: 6
        },
        valid: false,
        touched: false,
      }
    },
    formIsValid: false,
    isSignUp: true
  };


  componentDidMount () {
    if(!this.props.buildingBurger && this.props.authRedirectPath !== '/') {
      this.props.onSetAuthRedirectPath('/');
    }
  }

  inputChangeHandler = (event, inputType) => {
    const updatedControls = updateObject(this.state.controls, {
      [inputType]: updateObject(this.state.controls[inputType], {
        value: event.target.value,
        valid: checkValidity(event.target.value, this.state.controls[inputType].validation),
        touched: true
      })
    });
    let formIsValid = true;
    for(let input in updatedControls){
      formIsValid = updatedControls[input].valid && formIsValid;
    }
    this.setState({controls:updatedControls, formIsValid: formIsValid});
  };

  submitHandler = (event) => {
    event.preventDefault();
    this.props.onAuth(this.state.controls.email.value, this.state.controls.password.value, this.state.isSignUp);


  };

  switchAuthModeHandler = () => {
    this.setState(prevState => {
      return {
        isSignUp: !prevState.isSignUp
      }
    })

  };

  render () {
    let formElementsArray = [];
    for (let key in this.state.controls) {
      formElementsArray.push({
        id: key,
        config: this.state.controls[key]
      });
    }

    let form = (
        <form onSubmit={this.submitHandler}>
          {formElementsArray.map(formEle => (
              <Input key={formEle.id}
                     elementType={formEle.config.elementType}
                     elementConfig={formEle.config.elementConfig}
                     value={formEle.config.value}
                     changed={(event)=>this.inputChangeHandler(event, formEle.id)}
                     inValid={!formEle.config.valid}
                     shouldValidate={formEle.config.validation}
                     touched={formEle.config.touched}/>
          ))}
          <Button btnType='Success' disabled={!this.state.formIsValid}>{this.state.isSignUp? "Sign Up" : "Sign In"}</Button>
        </form>
    );

    if(this.props.loading) {
      form = <Spinner/>
    }

    let errorMsg = null;
    if(this.props.error) {
      errorMsg = <strong style={{color: '#e31b1bbf'}}>ERROR : {this.props.error.message}</strong>
    }

    let authRedirect = null;
    if(this.props.isAuthenticated) {
      authRedirect = <Redirect to={this.props.authRedirectPath}/>
    }

    return (
      <div className={classes.Auth}>
        {authRedirect}
        {errorMsg}
        {form}
        <Button btnType="Danger" clicked={this.switchAuthModeHandler}>Switch to {this.state.isSignUp? "Sign In" : "Sign Up"}</Button>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    error: state.auth.error,
    loading: state.auth.loading,
    isAuthenticated: state.auth.token !== null,
    buildingBurger: state.burgerBuilder.buildingBurger,
    authRedirectPath: state.auth.authRedirectPath
  }
};

const mapDispatchToProps = (dispatch) => {
  return {
    onAuth: (email, password, isSignup) => dispatch(actions.auth(email, password, isSignup)),
    onSetAuthRedirectPath: (path) => dispatch(actions.setAuthRedirectPath(path))
  }
};

export default connect(mapStateToProps, mapDispatchToProps)(Auth);