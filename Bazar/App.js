import React from 'react';
import {
  Alert,
  AppRegistry,
  Platform,
  StyleSheet,
  Text,
  View,
  Image,
  FlatList,
  List,
  ListItem,
  ActivityIndicator,
  ImageBackground,
  ScrollView,
  TouchableOpacity,
  Component,
  TouchableHighlight,
  Animated,
  StatusBar,

} from 'react-native';

import BrusinhasList from './feed.json';
import Tabbar from 'react-native-tabbar-bottom'
import { Tile, Header } from 'react-native-elements'
import Expand from 'react-native-simple-expand'

export default class exampleTabs extends React.Component {

  constructor(props) {
    super(props)

    this.loader(v => this.setState({ loaded: true }));

    this.state = {
      page: "HomeScreen",

    }

    this.images = [
      require('./assets/img/brusinha.png'),
      require('./assets/img/alien.png'),
      require('./assets/img/lalala.png'),
      require('./assets/img/yellow.png'),
      require('./assets/img/stripes.png'),
      require('./assets/img/yellow2.png'),
    ]

    console.log('Sarting')
    console.log('\n')
    console.log('*')
    console.log('**')
    console.log('***')
  }

  photoPicker = (name) => {
    var imgIndex;
    switch (name) {
      case 'brusinha top':
        imgIndex = 0;
        break;
      case 'alien':
        imgIndex = 1;
        break;
      case 'lalala':
        imgIndex = 2;
        break;
      case 'yellow':
        imgIndex = 3;
        break;
      case 'stripes':
        imgIndex = 4;
        break;
      case 'yellow two':
        imgIndex = 5;
        break;
    }

    return (this.images[imgIndex]);

  }

  loader(cb) {
    setTimeout(cb, 1500); // 1.5s - simulating server request
  }

  flatListItemSeparator = () => {
    return (
      <View
        style={{
          height: 200,
          width: 200,
          backgroundColor: "#E0E0E0",
        }}
      />
    );
  }


  GetFlatListItem(item_name) {

    Alert.alert(item_name);
    console.log(item_name);
    // return require(item_name);

  }



  render() {

    return (

      <View style={styles.container}>
        {
          // if you are using react-navigation just pass the navigation object in your components like this:
          // {this.state.page === "HomeScreen" && <MyComp navigation={this.props.navigation}>Screen1</MyComp>}
        }
        {this.state.page === "HomeScreen" &&
          <View>
            <Header
              leftComponent={{ icon: 'menu', color: '#fff' }}
              centerComponent={{ text: 'MY TITLE', style: { color: '#fff' } }}
              rightComponent={{ icon: 'home', color: '#fff' }}
            />

            <Tile
              imageSrc={{ require: './assets/img/brusinha.png' }}
              title="Lorem ipsum dolor sit amet, consectetur adipisicing elit. Dolores dolore exercitationem"
              featured
              caption="Some Caption Text"
            />
          </View>

        }

        {this.state.page === "ProfileScreen" && <Text>Screen2</Text>}
        {this.state.page === "NotificationScreen" && <Text>Screen3</Text>}
        {this.state.page === "SearchScreen" &&


          <View style={{ flex: 1 }}>

            <Header
              leftComponent={{ icon: 'menu', color: '#fff' }}
              centerComponent={{ text: 'MY TITLE', style: { color: '#fff' } }}
              rightComponent={{ icon: 'home', color: '#fff' }}
            />

            {this.state.loaded ? (

              <FlatList

                style={{ borderRadius: 4, }}
                data={BrusinhasList.shirts}
                ItemSeparatorComponent={this.FlatListItemSeparator}
                horizontal={true}
                keyExtractor={item => item.name}
                renderItem={({ item }) =>
                  <View>
                    <Tile
                      imageSrc={require('./assets/img/alien.png')}
                      title="Lorem ipsum dolor sit amet, consectetur adipisicing elit. Dolores dolore exercitationem"
                      featured
                      caption="Some Caption Text"
                    />
                  </View>
                }
              />
            ) : <ActivityIndicator style={styles.screenLoader} size="large" color="#D06600" />}

            <TouchableOpacity onPress={() => this.setState({ open: !this.state.open })}>
              <View style={{ alignItems: 'center' }}>
                <ImageBackground style={{ width: 100, height: 100 }} source={require('./assets/img/yellow.png')}>
                  <Text style={styles.wardrobe}>Armário</Text>
                </ImageBackground>
              </View>
            </TouchableOpacity>
            <Expand style={styles.expand} value={this.state.open}>
              <FlatList
                style={{ flex: 1, borderRadius: 2, height: 200, width: 200, }}
                data={BrusinhasList.shirts}
                ItemSeparatorComponent={this.FlatListItemSeparator}
                horizontal={true}
                keyExtractor={item => item.name}
                renderItem={({ item }) =>
                  <View style={styles.scrollImage} >
                    <ImageBackground style={{width: 200, height: 200}} source={this.photoPicker(item.name)}>
                      <Text style={{justifyContent: 'flex-start', alignItems: 'center',}} onPress={this.GetFlatListItem.bind(this, item.name)}> {item.name} </Text>
                    </ImageBackground>
                  </View>
                }
              />
            </Expand>

          </View>

        }

        <Tabbar
          stateFunc={(tab) => {
            this.setState({ page: tab.page })
          }}
          activePage={this.state.page}
          tabs={[
            {
              page: "HomeScreen",
              icon: "home"

            },
            {
              page: "ProfileScreen",
              icon: "person",
            },
            {
              page: "NotificationScreen",
              icon: "notifications",
            },
            {
              page: "SearchScreen",
              icon: "ios-add",
            },
          ]}
        />
      </View>
    );
  }
}



const styles = StyleSheet.create({
  container: {
    flex: 1
  },
  expand: {
    minHeight: 400,
    flexDirection: 'row',
  },


  imagePreview: {
    height: 60,
    width: 90,
    margin: 5,
  },

  wardrobe: {

    justifyContent: 'flex-start',
    alignItems: 'center',
  },

  horizontalScroll: {
    height: 100,
  },

  scrollImageTile: {
    flex: 5,
    margin: 7,
    width: 70,//must be seted
    height: 70,
  },

  scrollImage: {
    flex: 1,
    width: 200,//must be seted
    height: 200,
    margin: 7,
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'center',


  },

  FlatListItemStyle: {
    padding: 10,
    fontSize: 18,
    height: 44,
  },

  screenLoader: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },


});


