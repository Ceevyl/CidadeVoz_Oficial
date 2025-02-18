import React from "react";
import { View } from "react-native";
import FontAwesome5 from "react-native-vector-icons/FontAwesome5";
import Icon from "react-native-vector-icons/FontAwesome5";
import EvilIcons from "react-native-vector-icons/EvilIcons"
import AntDesign from "react-native-vector-icons/AntDesign"
import IconHome from "react-native-vector-icons/FontAwesome";
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { Ionicons } from '@expo/vector-icons';
import { Foundation } from '@expo/vector-icons';
import { Feather } from '@expo/vector-icons';


export const IconDate = ({ style }) => {
  return (
    <View style={style}>
      <Icon name="calendar-alt" size={18} color="#000" />
    </View>
  );
};

export const IconImageDefault = ({ style }) => {
  return(
    <View style={style}>
      <AntDesign name="user" size={34} color="#000" />
    </View>
  );
}

export const IconImageDefault_Perfil = ({ style }) => {
  return(
    <View style={style}>
      <AntDesign name="user" size={38} color="#000" />
    </View>
  );
}

export const IconDataSearch = ({style}) => {
  return (
    <View style={style}>
      <EvilIcons name="calendar" size={85} color="#fff" />
    </View>
  );
}

export const IconNameSearch = ({style}) => {
  return (
    <View style={style}>
      <EvilIcons name="search" size={35} color="#2C2C2C" />
    </View>
  );
}

export const IconBook = ({ style }) => {
  return (
    <View style={style}>
      <Icon name="book-open" size={23} color="#44A86C" />
    </View>
  );
};

// -------------- Icons Navigation 

export const IconHome_ = ({ style }) => {
  return (
    <View style={style}>
      <IconHome name="home" size={28} color="#44A86C" />
    </View>
  );
};

export const IconChat = ({ style }) => {
  return (
    <View style={style}>
      <IconHome name="wechat" size={28} color="#44A86C" />
    </View>
  );
};

export const IconPerfil = ({ style }) => {
  return (
    <View style={style}>
      <IconHome name="users" size={28} color="#44A86C" />
    </View>
  );
};

// Icon Alterar Senha, Foto, Sugeest




export const IconAlterarSenha = ({ style }) => {
  return (
    <View style={style}>
      <MaterialCommunityIcons name="form-textbox-password" size={25} color="white" />
    </View>
  );
};

export const IconAlterarFoto = ({style}) => {
  return (
    <View style={style}>
      <Ionicons name="ios-image" size={24} color="white" />
    </View>
  )
}

export const IconSugestion = ({style}) => {
  return (
    <View style={style}>
      <Foundation name="comment-quotes" size={25} color="white" />
    </View>
  )
}

export const IconClose = ({style}) => {
  return (
    <View style={style}>
      <Feather name="x" size={24} color="#fff" />
    </View>
  )
}