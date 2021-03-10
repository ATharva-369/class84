import React, { Component } from 'react';
import { Header, Icon, Badge } from 'react-native-elements';
import { View, Text, StyeSheet, Alert } from 'react-native';
import db from '../config';

export default class MyHeader extends Component() {
  constructor(props) {
    super(props);
    this.state = {
      value: ''
    }
  }
  getNotifications = () => {
    db.collection('notifications').where("notificationStatus", "==", "unread")
      .onSnapshot((d) => {
        var n = d.docs.map(m => {
          m.data();
        })
        this.setState({
          value: n.length
        })
      })
  }
  componentDidMount = () => {
    this.getNotifications();
  }
  bellsWithBadge = () => {
    return (
      <View>
        <Icon name='bell' type='font-awesome' color='#696969' onPress={() => props.navigation.navigate('Notification')} />
        <Badge value={this.state.value} containerStyle={{ position: 'absolute', top: -3, right: -4 }} />
      </View>
    )
  }
  render() {
    return (
      <Header
        leftComponent={<Icon name='bars' type='font-awesome' color='#696969' onPress={() => props.navigation.toggleDrawer()} />}
        rightComponent={ <this.bellsWithBadge {...this.props}/>}
        centerComponent={{ text: props.title, style: { color: '#90A5A9', fontSize: 20, fontWeight: "bold", } }}
        backgroundColor="#eaf8fe"
      />
    );

  }
}



