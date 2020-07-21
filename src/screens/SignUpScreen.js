import React, { Component } from 'react';
import { StyleSheet, ScrollView, Image } from 'react-native';
import { View, Text, Button } from 'native-base';
import AuthWrapper from '../hoc/AuthHOC';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import validator from 'validator';
import FloatingInput from '../components/FloatingInput';
import { translate } from '../locales';
import { assets } from '../assets';
import { isEmpty } from '../utils';
import { signUpAction } from '../action/SignUpAction';


class SignUpScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      fullName: '',
      username: '',
      password: '',
      contact: '',
      loading: false,
      errors: {},
    };
  }

  validateSignUpForm = () => {
    const { fullName, username, contact, password } = this.state;
    const errors = {};
    if (fullName.length <= 0) {
      errors.hasErrorFullName = true;
      errors.errorMessageFullName = translate('error_valid_full_name');
    }
    if (username.length <= 0) {
      errors.hasErrorUsername = true;
      errors.errorMessageUsername = translate('error_valid_username');
    }
    if (password.length <= 0) {
      errors.hasErrorPassword = true;
      errors.errorMessagePassword = translate('error_valid_password');
    }
    if (contact.length <= 0) {
      errors.hasErrorContact = true;
      errors.errorMessageContact = translate('error_valid_contact');
    }
    return errors;
  };

  onSignUpClicked = () => {
    const errors = this.validateSignUpForm();
    this.setState({ errors });
    if (!isEmpty(errors)) {
      this.setState({ loading: true });
      const { fullName, username, password, contact } = this.state;
      Promise.all([this.props.signUpAction(fullName, username, password, contact)]).then(() => {
        this.setState({
          loading: false,
        });
      });
    }
  };
  onTextChange = (value, name, type) => {
    if (type === 'number') {
      this.setState({
        [name]: value.replace(/[^0-9]/g, ''),
      });
    } else {
      this.setState({ [name]: value });
    }
  };

  redirectTo = screenToRedirect => {
    this.props.navigation.pop();
  };

  render() {
    const { fullName, username, contact, password, loading } = this.state;
    const {
      hasErrorFullName,
      errorMessageFullName,
      hasErrorContact,
      errorMessageContact,
      hasErrorUsername,
      errorMessageUsername,
      hasErrorPassword,
      errorMessagePassword,
    } = this.state.errors;
    return (
      <ScrollView contentContainerStyle={styles.container}>
        <Image style={{ height: 100, width: 100 }} source={assets.bumpd_logo} />
        <Text>{translate('label_sign_up')}</Text>
        <View style={styles.inputContainer}>
          <FloatingInput
            name={'fullName'}
            placeHolder={translate('label_full_name')}
            hasError={hasErrorFullName}
            errorMessage={errorMessageFullName}
            value={fullName}
            onChangeText={this.onTextChange}
            disabled={loading}
          />

          <FloatingInput
            name={'username'}
            placeHolder={translate('label_username')}
            hasError={hasErrorUsername}
            errorMessage={errorMessageUsername}
            value={username}
            onChangeText={this.onTextChange}
            keyboardType="email-address"
            disabled={loading}
          />

          <FloatingInput
            name={'contact'}
            placeHolder={translate('label_contact_number')}
            hasError={hasErrorContact}
            errorMessage={errorMessageContact}
            value={contact}
            type={'number'}
            keyboardType="numeric"
            onChangeText={this.onTextChange}
            disabled={loading}
          />

          <FloatingInput
            name={'password'}
            placeHolder={translate('label_password')}
            hasError={hasErrorPassword}
            errorMessage={errorMessagePassword}
            value={password}
            onChangeText={this.onTextChange}
            hasSecureTextEntry={true}
            last
          />
        </View>
        <Button
          primary
          rounded
          block
          title="Sign up"
          onPress={() => this.onSignUpClicked()}>
          <Text>{translate('label_sign_up')}</Text>
        </Button>
        <Text>Not an User? </Text>
        <Button primary rounded block title="Sign in" onPress={this.redirectTo}>
          <Text>{translate('label_sign_in')}</Text>
        </Button>
      </ScrollView>
    );
  }
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: '100%',
    justifyContent: 'space-around',
    alignItems: 'center',
    alignSelf: 'center',
    backgroundColor: 'transparent',
    minHeight: '60%',
  },
  inputContainer: {
    marginBottom: 15,
  },
});

mapStateToProps = ({ signUp }) => {
  const { isSignUpSuccess, message, authStatus } = signUp;
  return { isSignUpSuccess, message, authStatus };
};
mapDispatchToProps = dispatch => {
 return bindActionCreators({ signUpAction }, dispatch);
};
// export default AuthWrapper(SignUpScreen);

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(AuthWrapper(SignUpScreen));


