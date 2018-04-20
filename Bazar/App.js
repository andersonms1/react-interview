import React from 'react';
import { 
  Alert, 
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
  TouchableOpacity } from 'react-native';
import BrusinhasList from './feed.json';
import Tabbar from 'react-native-tabbar-bottom'

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

    console.log('A')
    console.log('N')
    console.log('D')

  }

  loader(cb) {
    setTimeout(cb, 1500); // 1.5s - simulating server request
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

  flatListItemSeparator = () => {
    return (
      <View
        style={{
          height: 1,
          width: "100%",
          backgroundColor: "#E0E0E0",
        }}
      />
    );
  }

  GetFlatListItem(item_name) {

    Alert.alert(item_name);

  }

  render() {
    return (
      <View style={styles.container}>
        {
          // if you are using react-navigation just pass the navigation object in your components like this:
          // {this.state.page === "HomeScreen" && <MyComp navigation={this.props.navigation}>Screen1</MyComp>}
        }
        {this.state.page === "HomeScreen" &&
          <Text>Hello world!</Text>




        }

        {this.state.page === "ProfileScreen" && <Text>Screen2</Text>}
        {this.state.page === "NotificationScreen" && <Text>Screen3</Text>}
        {this.state.page === "SearchScreen" &&

          <View style={{ flex: 1 }}>

            {/* <View>
                <TouchableOpacity onPress={() => this.setState({ open: !this.state.open })}>
                  <Text>Toggle Menu</Text>
                </TouchableOpacity>
                <Expand value={this.state.open}>
                  <Text>
                    Some very very very very very
                  </Text>
                </Expand>
              </View> */}


            {this.state.loaded ? (

              <FlatList
                style={{ marginBottom: 150 }}
                data={BrusinhasList.shirts}
                ItemSeparatorComponent={this.FlatListItemSeparator}
                horizontal={true}
                keyExtractor={item => item.name}
                renderItem={({ item }) =>
                  <View>

                    <ImageBackground style={styles.scrollImage} source={this.photoPicker(item.name)}>
                      <Text style={styles.textImage} onPress={this.GetFlatListItem.bind(this, item.name)}> {item.name} </Text>
                    </ImageBackground>
                  </View>
                }


              />

              



            ) : <ActivityIndicator style={styles.screenLoader} size="large" color="#D06600" />}


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
  imagePreview: {
    height: 60,
    width: 90,
    margin: 5,
  },

  horizontalScroll: {
    height: 100,
  },

  scrollImage: {
    width: 70,
    height: 70,
    margin: 7,
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

  restaurantName: {
    fontSize: 17,
    color: '#D06600',
    marginVertical: 7,
  },


});
