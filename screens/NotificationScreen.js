import React, { Component } from 'react'
import { View, Text, TouchableOpacity, ScrollView, FlatList, StyleSheet } from 'react-native';
import { Card, Icon, ListItem } from 'react-native-elements'
import MyHeader from '../components/MyHeader.js'
import firebase from 'firebase';
import db from '../config.js'
export default class Notification extends Component() {
    constructor(props) {
        super(props);
        this.state = {
            userId: firebase.auth().currentUser.email,
            notifications: []

        }
        this.nRef = null
    }

    getNotification = async () => {
        db.collection("notifications").where("notificationStatus", "==", "unread").where("target", "==", this.state.userId)
            .onSnapshot(snapshot => {
                var n = []
                snapshot.docs.map(d => {
                    var notification = d.data();
                    notification["docId"] = d.id;
                    n.push(notification);
                })
                this.setState({
                    notifications: n
                })
            })
    }
    componentDidMount() {
        this.getNotification();
    }
    keyExtractor = (item, index) => index.toString()
    renderItem = ({ item, index }) => (
        <ListItem key={index} title={item.bookName} subtitle={item.message} titleStyle={{}} bottomDivider leftElement={{}} />
    )
    render() {
        return (
            <View>
                <MyHeader title={"Notifications"} navigation={this.props.navigation} />
                <View style={{ flex: 0.9 }}>
                    {this.state.notifications.length === 0 ? (
                        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                            <Text>
                                You have no notifications
                        </Text>
                        </View>
                    ) : (
                        <FlatList
                            data={this.state.notifications}
                            keyExtractor={this.keyExtractor}
                            renderItem={this.renderItem}
                        />
                    )}
                </View>
            </View>
        )


    }
}
