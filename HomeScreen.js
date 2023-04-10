import React, { useEffect, useLayoutEffect, useState } from 'react';
import { StyleSheet, Text, View, SafeAreaView, ScrollView ,TouchableOpacity } from 'react-native';
import CustomListItem from '../components/CustomListItem';
import { Avatar } from 'react-native-elements';
import{auth ,db} from '../firebase';
import{AntDesign, SimpleLineIcons } from "@expo/vector-icons";




const HomeScreen = ({navigation}) => {

    const [chats, setChats] = useState([]);

    const signOutUser = () =>{
        auth.signOut().then(() => {
            navigation.replace("Login");
        });
    }

    useEffect(() =>{
        const unsubscribe = db.collection('chats')
            .onSnapshot(snapshot => 
                (setChats(snapshot.docs.map(doc => ({
                   id: doc.id, // collection detail header in firebase console
                   data: doc.data() // data of collection

             })))
        ))
        return unsubscribe;
    },[])
  useLayoutEffect(() => {
    navigation.setOptions({
          title: "ASH",
          headerStyle: {backgroundColor: "#3B3486", alignItems:"center"},
          headerTitleStyle:{ color : "#FCFDF2", fontWeight:"bold"},
          headerTintColor: "black",
          headerLeft:() => (
          <View style ={{ margin: 2 ,justifyContent:"center", alignItems:"center"}}>
            <TouchableOpacity onPress={signOutUser} activeOpacity={0.5} style={{padding:2}}>
            <Avatar rounded source = {{ uri: auth?.currentUser?.photoURL }} />
            </TouchableOpacity>   
          </View>
          ),
          headerRight: () => (
            <View 
            style = {{
               flexDirection:"row",
               justifyContent:"space-between",
               width:80,
               marginRight:5,
            }}
            >
                <TouchableOpacity activeOpacity={0.5}>
                    <AntDesign name= "camerao" size= {24} color="white"/>
                </TouchableOpacity>
                <TouchableOpacity onPress={() => navigation.navigate("AddChat")} activeOpacity={0.5}>
                    <SimpleLineIcons name ="pencil" size={20} color= "white" />
                </TouchableOpacity>

            </View>
          ),
         });
  },[navigation]);

  const enterChat = (id, chatName) => {
    navigation.navigate('Chat', {
        id,
        chatName,
    })
  }

    return (
        <SafeAreaView >
            <View style = {styles.Backdrop}>
                <Text style = {styles.DisplayText}> Chats </Text>
            </View>
            <ScrollView style = {styles.Container}>
               {chats.map(({id, data : { chatName }}) => (
                <CustomListItem key ={id} id={id} chatName={chatName}
                enterChat={enterChat} />
        
     ))}
            </ScrollView>
           
        </SafeAreaView>
    )
}

export default HomeScreen

const styles = StyleSheet.create({
    DisplayText:{
        fontSize:30,
        fontWeight:"bold",
        marginLeft:15,
        paddingBottom:10,
        paddingTop:20,


    },
    Backdrop:{
        backgroundColor :"#FCFDF2",
    },
    Container:{
        height:"100%",
        backgroundColor: "#FCFDF2"
    
    },
})
