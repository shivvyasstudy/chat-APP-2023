import React, { useLayoutEffect, useState } from 'react';
import { StyleSheet, Text, View, Button} from 'react-native';
import { Input } from 'react-native-elements';
import { Icon } from 'react-native-vector-icons/FontAwesome';
import { db } from "../firebase";

const AddChatScreen = ({navigation}) => {
    const [input, setInput] = useState("");

    useLayoutEffect(() => {

        navigation.setOptions({
            title: "New Chat",
            headerBackTitle:"Chats",
        })
    }, [navigation])

    const createChat = async () => {
        await db.collection('chats').add({
            chatName: input
        }).then(() => {
            navigation.goBack()
        }).catch(error => alert(error));
    }

    return (
    
        <View style = {styles.container}> 
        <View style = {styles.placeholder}>
           <Input 
            placeholder = "Enter your Amigo's Name"
            value={Input}
            onChangeText={(text) => setInput(text)}
            onSubmitEditing={createChat}
            // leftIcon={
            //     <Icon name ="message"
                
            //       />
            // }
           />
           </View>
           <Button disabled ={!input} color = "#3B3486" onPress={createChat} title='Create New Chat'/>
        </View>
    )
}

export default AddChatScreen;

const styles = StyleSheet.create({
    container:{
        padding:30,
        backgroundColor:"#FCFDF2",
        height:"100%",
        // justifyContent:"center",
        // alignContent:"center",
        
    },
    placeholder:{
        justifyContent:"center",
    },
});
