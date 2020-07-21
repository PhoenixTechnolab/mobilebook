import React, {Component} from 'react';
import {ListItem, CheckBox, Text} from 'native-base';

export default class CheckBoxInput extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isChecked: false,
    };
  }

  onCheckChanged = () => {
    this.setState({isChecked: !this.state.isChecked})
    this.props.onCheckBoxClick();
  };

  render() {
    const {label} = this.props;
    return (
      <ListItem noBorder onPress={() => this.onCheckChanged()}>
        <CheckBox checked={this.state.isChecked} />
        <Text> {label}</Text>
      </ListItem>
    );
  }
}
