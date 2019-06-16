import React, { Component } from 'react';
import { View, Image, Text, StyleSheet, TouchableOpacity, FlatList } from 'react-native';

import api from '../../services/api';
import io from 'socket.io-client';

import camera from '../../static/assets/camera.png';
import more from '../../static/assets/more.png';
import like from '../../static/assets/like.png';
import comment from '../../static/assets/comment.png';
import send from '../../static/assets/send.png';

export default class Feed extends Component {
  state = {
    feed: []
  }

  static navigationOptions = ({ navigation }) => ({
    headerRight: (
      <TouchableOpacity onPress={() => { navigation.navigate('New') }}>
        <Image style={{ marginHorizontal: 20 }} source={camera} />
      </TouchableOpacity>
    )
  });

  registerToSocket = () => {
    const socket = io("http://192.168.15.4:3000");

    socket.on('post', newPost => {
        this.setState({ feed: [newPost, ...this.state.feed] })
    });

    socket.on('like', likePost => {
        this.setState({ 
            feed: this.state.feed.map(post => 
                post._id === likePost._id ? likePost : post
            )
        })
    });
  }

  handleLike = id => {
    api.post(`/posts/${id}/like`);
  }

  async componentDidMount() {
    this.registerToSocket();

    const response = await api.get('posts');

    this.setState({ feed: response.data });
  }

  render() {
    return (
      <View style={styles.container}>
        <FlatList data={this.state.feed}
          keyExtractor={post => post._id}
          renderItem={({ item }) => (
            <View style={styles.feedItem}>

              <View style={styles.feedItemHeader}>
                <View style={styles.userInfo}>
                  <Text style={styles.name}> {item.author} </Text>
                  <Text style={styles.place}> {item.place} </Text>
                </View>

                <Image source={more} />
              </View>

              <Image style={styles.feedImage} source={{ uri: `http://192.168.15.4:3000/files/${item.image}` }} />

              <View style={styles.feedItemFooter}>
                <View style={styles.actions}>
                  <TouchableOpacity style={styles.action} onPress={() => this.handleLike(item._id) }>
                    <Image source={like} />
                  </TouchableOpacity>
                  <TouchableOpacity style={styles.action} onPress={() => {}}>
                    <Image source={comment} />
                  </TouchableOpacity>
                  <TouchableOpacity style={styles.action} onPress={() => {}}>
                    <Image source={send} />
                  </TouchableOpacity>
                </View>
                  <Text style={styles.likes}> {item.likes} curtidas </Text>
                  <Text style={styles.description}> {item.description} </Text>
                  <Text style={styles.hashtags}> {item.hashtags} </Text>
              </View>
            </View>

          )} />
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,

  },

  feedItem: {
    marginTop: 20
  },

  feedItemHeader: {
    paddingHorizontal: 15,
    flexDirection: 'row',
    justifyContent: 'space-between'
  },

  name: {
    fontSize: 14,
    color: '#000000'
  },

  feedImage: {
    width: '100%',
    height: 400,
    marginVertical: 15
  },

  feedItemFooter: {
    paddingHorizontal: 15
  },

  actions: {
    flexDirection: 'row'
  },

  action: {
    marginRight: 8
  },

  likes: {
    marginTop: 15,
    fontWeight: 'bold',
    color: '#000000'
  },

  description: {
    lineHeight: 18,
    color: '#000000'
  },

  hashtags: {
    color: '#7159c1'
  }
});