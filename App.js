import React from 'react';
import {View, StyleSheet, Text, ActivityIndicator, FlatList, Dimensions, Image, TouchableWithoutFeedback, Linking} from 'react-native';
const {width,height} = Dimensions.get('window');
console.disableYellowBox = true;

export default class App extends React. Component{
  state = {
    news: [],
    loading: true,
    fav: [],
    active: 0,
    xTabOne: 0,
    xTabTwo: 0,
    translateX: new Animated.Value(0),
    translateXTabOne: new Animated.Value(0),
    translateXTabTwo: new Animated.Value(width),
    translateY: -1000
  }


  fetchnews = () => {
    fetch('http://newsapi.org/v2/everything?q=bitcoin&from=2020-10-16&sortBy=publishedAt&apiKey=bd5b523041084dbfa0a1034d6c30312e')
    .then((res)=>res.json())
    .then ((response)=>{
      this.setState({
        news: response.articles,
        loading: false
      })
    })
  }

  componentDidMount(){
    this.fetchnews()
  }

  favorite = async article =>{
    try {
      fav.push({item});
    } catch (error) {
      console.log(error)
    }
  }

  handleSlide = type => {
    let {
        active,
        xTabOne,
        xTabTwo,
        translateX,
        translateXTabOne,
        translateXTabTwo
    } = this.state;
    Animated.spring(translateX, {
        toValue: type,
        duration: 100
    }).start();
    if (active === 0) {
        Animated.parallel([
            Animated.spring(translateXTabOne, {
                toValue: 0,
                duration: 100
            }).start(),
            Animated.spring(translateXTabTwo, {
                toValue: width,
                duration: 100
            }).start()
        ]);
    } else {
        Animated.parallel([
            Animated.spring(translateXTabOne, {
                toValue: -width,
                duration: 100
            }).start(),
            Animated.spring(translateXTabTwo, {
                toValue: 0,
                duration: 100
            }).start()
        ]);
    }
};

render() {
    let {
        xTabOne,
        xTabTwo,
        translateX,
        active,
        translateXTabOne,
        translateXTabTwo,
        translateY
    } = this.state;
    return (
        <View style={{ flex: 1 }}>
            <View
                style={{
                    width: "90%",
                    marginLeft: "auto",
                    marginRight: "auto"
                }}
            >
                <View
                    style={{
                        flexDirection: "row",
                        marginTop: 40,
                        marginBottom: 20,
                        height: 36,
                        position: "relative"
                    }}
                >
                    <Animated.View
                        style={{
                            position: "absolute",
                            width: "50%",
                            height: "100%",
                            top: 0,
                            left: 0,
                            backgroundColor: "#007aff",
                            borderRadius: 4,
                            transform: [
                                {
                                    translateX
                                }
                            ]
                        }}
                    />
                    <TouchableOpacity
                        style={{
                            flex: 1,
                            justifyContent: "center",
                            alignItems: "center",
                            borderWidth: 1,
                            borderColor: "#007aff",
                            borderRadius: 4,
                            borderRightWidth: 0,
                            borderTopRightRadius: 0,
                            borderBottomRightRadius: 0
                        }}
                        onLayout={event =>
                            this.setState({
                                xTabOne: event.nativeEvent.layout.x
                            })
                        }
                        onPress={() =>
                            this.setState({ active: 0 }, () =>
                                this.handleSlide(xTabOne)
                            )
                        }
                    >
                        <Text
                            style={{
                                color: active === 0 ? "#fff" : "#007aff"
                            }}
                        >
                            News
                        </Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                        style={{
                            flex: 1,
                            justifyContent: "center",
                            alignItems: "center",
                            borderWidth: 1,
                            borderColor: "#007aff",
                            borderRadius: 4,
                            borderLeftWidth: 0,
                            borderTopLeftRadius: 0,
                            borderBottomLeftRadius: 0
                        }}
                        onLayout={event =>
                            this.setState({
                                xTabTwo: event.nativeEvent.layout.x
                            })
                        }
                        onPress={() =>
                            this.setState({ active: 1 }, () =>
                                this.handleSlide(xTabTwo)
                            )
                        }
                    >
                        <Text
                            style={{
                                color: active === 1 ? "#fff" : "#007aff"
                            }}
                        >
                            Favorite
                        </Text>
                    </TouchableOpacity>
                </View>

                <ScrollView>
                    <Animated.View
                        style={{
                            justifyContent: "center",
                            alignItems: "center",
                            transform: [
                                {
                                    translateX: translateXTabOne
                                }
                            ]
                        }}
                        onLayout={event =>
                            this.setState({
                                translateY: event.nativeEvent.layout.height
                            })
                        }
                    >
                        <View styLe={styles.container}>
                          <View style={styles.header}>
                            <Text styLe={{fontSize:25, color: "#fff"}}>Bitcoin</Text>
                            <Text styLe={{fontSize:20, color: "#fff"}}>Bitcoin news</Text>
                          </View>
                          <View style={styles.news}>
                            <FlatList>
                              data={this.state.news}
                              renderItem={({item})=>{
                                return(
                                  <TouchableWithoutFeedback onPress={()=>Linking.openURL(item.url)}>
                                    <View style={{width:width-50,height:200, backgroundColor:'wtite', marginBottom:15, borderRadius:15}}>
                                      <Image source={{uri: item.urlToImage}} style={[StyleSheet.absoluteFill, {borderRadius:15}]}></Image>
                                      <View style={styles.gradient}>
                                        <Text style={{position:'absolute',bottom:0,color:'white', fontSize:20, padding:5}}>{item.title}</Text>
                                        <Text style={{fontSize: 16,color:'white', position:'absolute',top:0,right:0, padding:5, fontWeight:'bold'}} onPress={()=>this.favorite(item)}>★</Text>
                                      </View>
                                    </View>
                                  </TouchableWithoutFeedback>
                                );
                              }}
                            </FlatList>
                          </View>
                        </View>
                        <View style={{ marginTop: 20 }}>
                        </View>
                    </Animated.View>

                    <Animated.View
                        style={{
                            justifyContent: "center",
                            alignItems: "center",
                            transform: [
                                {
                                    translateX: translateXTabTwo
                                },
                                {
                                    translateY: -translateY
                                }
                            ]
                        }}
                    >
                        <View>alert( fav );</View>
                        <View style={{ marginTop: 20 }}>
                        </View>
                    </Animated.View>
                </ScrollView>
            </View>
        </View>
    );
}
}




const styles = StyleSheet. create({
  container : {
    flex : 1,
    backgroundColor : '#333'
  },
  header : {
    padding : 30
  },
  news: {
    alignSelf:'center'
  },
  gradient:{
    width:'100%',
    height:'100%',
    backgroundColor:'rgba(0,0,0,0.5)',
    borderRadius:15
  }
})