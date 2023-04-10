import React, { useLayoutEffect, useState } from 'react'
import { StyleSheet, Text, View, TouchableOpacity, Platform, ScrollView, TextInput, SafeAreaView, Keyboard, TouchableWithoutFeedback} from 'react-native'
import { Avatar } from 'react-native-elements'
import { AntDesign, FontAwesome, Ionicons} from "@expo/vector-icons";
import { StatusBar } from 'expo-status-bar';
import { KeyboardAvoidingView } from 'react-native';
import firebase from "firebase/compat/app";
import { db, auth } from '../firebase';



const ChatScreen = ({navigation, route}) => {
    const[input, setInput] = useState("");
    const[messages, setMessages] = useState([]);
    useLayoutEffect(() =>{
       
        navigation.setOptions({
            headerStyle:{backgroundColor: "#3B3486"},
            title: "Chat",
            // headerBackTitle: false,
            headerTitleAlign :"left",
            headerTitle: () => (
                <View 
                style = {{
                    flexDirection:"row",
                    alignItems:"center",
                }}
                >
                    <Avatar 
                        rounded 
                        source={{
                        uri: messages[0]?.data.photoURL ||
                        "https://cencup.com/wp-content/uploads/2019/07/avatar-placeholder.png",
                    }}
                     />
                    <Text 
                    style ={{color:"#FCFDF2", marginLeft:10, padding:5,fontWeight:"700"}}> 
                    {route.params.chatName} 
                    </Text>
                </View>
            ),
            headerLeft: () => (
                <TouchableOpacity 
                style={{ marginLeft:10}}
                onPress={navigation.goBack}
                >
                    <AntDesign name = "arrowleft" size={24} color="white" />

                </TouchableOpacity>
            ),
            headerRight: () => (
                <View 
                    style={{
                        flexDirection: "row",
                        justifyContent: "space-between",
                        width:80,
                        marginRight: 20,
                    }}
                    >
                    <TouchableOpacity style ={{paddingRight:1}}>
                        <FontAwesome name = "video-camera" size={24} color="white"/>
                    </TouchableOpacity>
                    <TouchableOpacity style = {{paddingRight:1, marginRight:1}}>
                        <Ionicons name = "call" size={24} color="white"/>
                    </TouchableOpacity>
                </View>
            )
        });
    },[navigation, messages]);

    const sendMessage = () =>{
        Keyboard.dismiss();
        db.collection('chats').doc(route.params.id).collection('messages').add({
            timestamp: firebase.firestore.FieldValue.serverTimestamp(), // for unified time
            message: input,
            displayName: auth.currentUser.displayName,
            email: auth.currentUser.email,
            photoURL: auth.currentUser.photoURL
        })
            setInput('')
    };
    useLayoutEffect(() =>{
        const unsubscribe = db.collection('chats').doc(route.params.id)
        .collection('messages')
        .orderBy('timestamp',"asc")
        .onSnapshot(snapshot => setMessages(
            snapshot.docs.map(doc => ({
                id: doc.id,
                data: doc.data()

            }))
        ));

        return unsubscribe;
    },[route]);

    return (

        <SafeAreaView style ={{ flex:1, backgroundColor: "#FCFDF2"}}>
            <StatusBar style='light'/>
            <KeyboardAvoidingView

                 behavior ={Platform.OS === "ios" ? "padding" : "height"}
                 style={styles.container}
                 keyboardVerticalOffset={90}
                 >
                 <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
                    <>
                    <ScrollView contentContainerStyle={{padding:15 }}>
                        {messages.map(({id, data})=> (
                            data.email === auth.currentUser.email ?(
                                <View key={id} style={styles.receiverBlock}>
                                    <Avatar
                                        position="absolute"
                                        rounded
                                        //WEB
                                        containerStyle={{
                                            position:"absolute",
                                            bottom: -15,
                                            right: -5,
                                            size:30
                                          }}
                                        bottom={-15}
                                        right={-5}
                                        size={30}
                                    source={{uri: data.photoURL
                                    }} />
                                    <Text style = {styles.recText}> 
                                    {data.message}</Text>
                                </View>

                            ) : (

                                <View key ={id} style={styles.senderBlock}>
                                    <Avatar
                                     position="absolute"
                                     rounded
                                     //WEB
                                     containerStyle={{
                                         position:"absolute",
                                         bottom: -15,
                                         right: -5,
                                         size:30
                                       }}
                                     bottom={-15}
                                     right={-5}
                                     size={30}
                                 source={{uri: data.photoURL
                                 }} />
                                    <Text style = {styles.senderText}> 
                                    {data.message}</Text>
                                    <Text style={styles.senderName}>
                                        {data.displayName}
                                    </Text>

                                </View>
                            )
                        ))}
                    </ScrollView>
                    <View style={styles.footer}>
    
                     <TextInput value={input}
                        onChangeText={(text) => setInput(text)} 
                        onSubmitEditing={sendMessage}
                        placeholder='ASH Message' 
                        style={styles.textInput}
                        />
                    <TouchableOpacity 
                        onPress={sendMessage} 
                         activeOpacity={0.5}
                         >
                            <Ionicons name='send' size={24} color="#3B3486" />
                    </TouchableOpacity>
                    </View>
                    </>
                    </TouchableWithoutFeedback>
            </KeyboardAvoidingView>
             
        </SafeAreaView>
    )
}

export default ChatScreen

const styles = StyleSheet.create({
    container:{
        flex:1,

     },
    footer: {
        flexDirection:"row",
        alignItems:"center",
        width:"100%",
        padding:15,


        },
    textInput:{
        bottom:0,
        height:40,
        flex:1,
        marginRight:15,
        borderColor: "black",
        backgroundColor:"lightgrey",
        padding:10,
        color:"black",
        borderRadius:30,


     },
    recText:{
        color:"white",
        fontWeight:"500",
        marginLeft:5,
        marginBottom:5,
     },
     senderText:{
            color:"white",
            fontWeight:"500",
            marginLeft:10,
            marginBottom:15,

     },
     receiverBlock:{
    
        padding:15,
        backgroundColor: "#3B3486",
        alignSelf:"flex-end",
        marginRight:15,
        marginBottom: 20,
        borderRadius:20,
        maxWidth:"80%",
        position:"relative",
        color:"white",
        


     },
     senderBlock:{

        padding:15,
        backgroundColor: "#7743DB",
        alignSelf:"flex-start",
        marginRight:15,
        marginBottom: 20,
        maxWidth:"80%",
        position:"relative",
        borderRadius:20,
       


     },
     senderName:{
        left:10,
        paddingRight:10,
        fontSize:10,
        color:"white",
     },
})
