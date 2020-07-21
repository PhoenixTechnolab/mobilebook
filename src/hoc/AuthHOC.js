import React, { Component } from 'react';
import { StyleSheet, Image, ImageBackground } from 'react-native';
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
import { assets } from '../assets';

const AuthWrapper = WrappedComponents => {
  return class AuthHOC extends Component {
    render() {
      return (
        <Root>
        <ImageBackground
          style={styles.imageContainer}
          imageStyle={{ opacity: 0.05 }}
          source={assets.airport_image}>
          <Container style={[styles.container]}>
            <View style={styles.cardStyle}>
              <WrappedComponents {...this.props} />
            </View>
          </Container>
        </ImageBackground>
        </Root>
      );
    }
  };
};
const styles = StyleSheet.create({
  imageContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'transparent',
    padding: 5,
    width: '90%',
    flexWrap: 'wrap',
  },
  cardStyle: {
    flexDirection: 'column',
    backgroundColor: 'transparent',
    width: '100%',
    alignSelf: 'center',
    minHeight: '75%',

  },
});
export default AuthWrapper;
