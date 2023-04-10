import React, { useLayoutEffect } from 'react'
import { StyleSheet, Text, View, Button } from 'react-native'
import { KeyboardAvoidingView } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import { useState } from 'react';
import { Input} from 'react-native-elements';
import {auth} from "../firebase";


const RegisterScreen = ({navigation}) => {
    const [name, setName] = useState("");
    // const [lastName, setLastName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [imageUrl, setImageUrl] = useState("");

    useLayoutEffect(() => {
        navigation.setOptions({
            headerBackTitle: "Back to Login",

        })

    },[navigation]);
    const register = () =>{
        auth
        .createUserWithEmailAndPassword(email, password)
        .then((authUser) => {
            authUser.user.updateProfile({
                displayName: name,
                // displayName: lastName,
                photoURL: imageUrl || "https://cencup.com/wp-content/uploads/2019/07/avatar-placeholder.png",
            });

        })
        .catch((error) => alert(error.message));
        
    };


    return (
        <KeyboardAvoidingView behavior ="padding" style={styles.container} >
            <StatusBar style='dark'/>
            <Text style={styles.headerText}>
                 Hola Amigos!
            </Text>

            <View style={styles.inputContainer}>
            <Input placeholder='Name'
             type='name' 
             value={name} 
             onChangeText={(text) => setName(text)}/>

            {/* <Input placeholder='Last Name'
             type='lastName' 
             value={lastName} 
             onChangeText={(text) => setLastName(text)}/> */}

            <Input placeholder='Email'
             type='email' 
             value={email} 
             onChangeText={(text) => setEmail(text)}/> 

            <Input placeholder='Password'
             type='password' 
             secureTextEntry
             value={password} 
             onChangeText={(text) => setPassword(text)}/>   

            <Input placeholder='Profile Picture URL (optional)'
             type='text' 
             value={imageUrl} 
             onChangeText={(text) => setImageUrl(text)}
             onSubmitEditing={register} 
             />  
            </View>  
            <View style = {styles.registerButton}>
            <Button color = "#FCFDF2" containerStyle ={styles.Button} onPress={register} title= "Register"/>       
            </View>
        <View style = {{height: 100}}/>
        </KeyboardAvoidingView>
    )
}

export default RegisterScreen

const styles = StyleSheet.create({
    container:{
        flex:1,
        alignItems: 'center',
        justifyContent: 'center',
        padding:10,
        backgroundColor:'#FCFDF2', 

    },
    Text:{
        backgroundColor:"#FCFDF2"

    },
    inputContainer:{
        marginTop:10,
        width:300,
        paddingTop: 40,
        borderRadius:2,
        borderColor:"#222222",
        borderRadius: 3,
    },
    Button:{

        width:200,
        marginBottom:10,
        // backgroundColor:"#3B3486", 

    },
    headerText:{
        fontSize:30,
        fontWeight:"bold",

    },
    registerButton:{
        backgroundColor: '#3B3486',
        alignContent:"center",
        justifyContent:"center",
        width: 200,
        padding: 5,
        margin: 2,
        borderRadius: 5,
        shadowRadius: 1,
        shadowColor:"#7743DB",
    },

});
