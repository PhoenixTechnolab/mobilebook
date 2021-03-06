import React, { Component } from 'react';
import { StyleSheet, ActivityIndicator, Image, ScrollView } from 'react-native';
import {
  Container,
  Content,
  View,
  Text,
  Button,
  Card,
  Root,
  Toast,
} from 'native-base';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import validator from 'validator';
import FloatingInput from '../components/FloatingInput';
import CheckBox from '../components/CheckBoxInput';
import { signInAction } from '../action/SignInAction';
import { translate } from '../locales/index';
import { assets } from '../assets';
import { CONSTANTS, AUTH_STATUS, toastService } from '../utils';
import AuthWrapper from '../hoc/AuthHOC';

class SignInScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      username: '',
      password: '',
      loading: false,
      isRememberMe: false,
      isRememberMe: false,
      errors: {},
    };
  }
  redirectTo = screen => {
    switch (screen) {
      case 'SignUp':
        this.props.navigation.navigate('SignUp');
        break;
      case 'Dashboard':
        this.props.navigation.navigate('Dashboard');
        break;

      default:
        alert('No Redirection Mentioned');
        break;
    }
  };

  onTextChange = (value, name) => {
    this.setState({ [name]: value });
  };

  forgotPasswordClicked = () => {
    alert('Coming Soon...');
  };
  onRememberMeClicked = () => {
    this.setState({ isRememberMe: !this.state.isRememberMe });
    console.log('You clicked isRemember Me ', this.state.isRememberMe);
  };

  validateSignInForm = () => {
    const { username, password } = this.state;
    const errors = {};

    if (validator.isEmpty(username)) {
      // to check as email we can make it as validator.isEmail(username)
      errors.hasErrorUsername = true;
      errors.errorMessageUsername = translate('error_valid_username');
    }
    if (!CONSTANTS.REGEX.PASSWORD_REGEX.test(password)) {
      errors.hasErrorPassword = true;
      errors.errorMessagePassword = translate('error_valid_password');
    }
    return errors;
  };

  signInClicked = () => {
    const errors = this.validateSignInForm();
    this.setState({ errors });

    if (Object.keys(errors).length === 0) {
      this.setState({ loading: true });
      const { username, password } = this.state;
      // If there are multiple parallel calls put all over here.
      Promise.all([
        this.props.signInAction(username, password),
        // this.props.signInAction(username, password)
      ]).then(() => {
        //We can do final stuff like stop loader here
        this.setState({ loading: false });
      });
    }
  };
  componentDidUpdate() {
    const { authStatus, message } = this.props;

    switch (authStatus) {
      case AUTH_STATUS.SUCCESS:
        toastService.showToast(message);
        this.props.navigation.navigate('Dashboard');
        break;
      case AUTH_STATUS.FAILED:
        toastService.showToast(message);
        authStatus = '';
        break;
      default:
        break;
    }
  }
  render() {
    const { username, password, loading, isRememberMe } = this.state;
    const {
      hasErrorUsername,
      errorMessageUsername,
      hasErrorPassword,
      errorMessagePassword,
    } = this.state.errors;

    return (
      <ScrollView contentContainerStyle={styles.container}>
        <Image style={{ height: 100, width: 100 }} source={assets.bumpd_logo} />
        <Text>{translate('label_sign_up')}</Text>
        <View styles={styles.inputContainer}>
          <FloatingInput
            name={'username'}
            placeHolder={translate('label_username')}
            iconName="account-box"
            hasError={hasErrorUsername}
            errorMessage={errorMessageUsername}
            value={username}
            onChangeText={this.onTextChange}
            keyboardType="email-address"
            disabled={loading}
          />

          <FloatingInput
            name={'password'}
            placeHolder={translate('label_password')}
            iconName="lock"
            hasError={hasErrorPassword}
            errorMessage={errorMessagePassword}
            value={password}
            onChangeText={this.onTextChange}
            hasSecureTextEntry={true}
          />
        </View>
        <View style={styles.forgotPasswordContainer}>
          <CheckBox
            isChecked={isRememberMe}
            label={translate('label_remember_me')}
            onCheckBoxClick={this.onRememberMeClicked}
          />
          <Button
            transparent
            title="Forgot Password?"
            style={styles.buttonStyle}
            onPress={() => this.forgotPasswordClicked()}>
            <Text style={{ justifyContent: 'center' }}>
              {translate('label_forgot_password')}
            </Text>
          </Button>
        </View>

        <Button
          primary
          block
          title="Sign in"
          onPress={() => this.signInClicked()}>
          <Text>{translate('label_sign_in')}</Text>
        </Button>
        <Text>{translate('label_not_a_member')}</Text>
        <Button
          primary
          rounded
          block
          title="Sign up"
          onPress={() => this.redirectTo('SignUp')}>
          <Text>{translate('label_sign_up')}</Text>
        </Button>

        {loading && (
          <View style={styles.loading}>
            <ActivityIndicator animating={true} size="large" />
          </View>
        )}
      </ScrollView>
    );
  }
}

const mapDispatchToProps = dispatch => {
  return bindActionCreators({ signInAction }, dispatch);
};

const mapConnectStateToProps = ({ signIn }) => {
  const { message, isSignInSuccess, authStatus } = signIn;
  return { message, isSignInSuccess, authStatus };
};

export default connect(
  mapConnectStateToProps,
  mapDispatchToProps,
)(AuthWrapper(SignInScreen));

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'space-around',
    alignItems: 'center',
    alignSelf: 'center',
    backgroundColor: 'transparent',
    minHeight: '50%',
    padding: 10,
  },
  loading: {
    backgroundColor: '#77777788',
    position: 'absolute',
    left: 0,
    right: 0,
    top: 0,
    bottom: 0,
    alignItems: 'center',
    justifyContent: 'center',
  },
  inputContainer: {
    marginBottom: 25,
  },

  forgotPasswordContainer: {
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 10,
  },
});
