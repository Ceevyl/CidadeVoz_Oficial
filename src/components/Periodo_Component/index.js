import React, { useEffect, useState } from "react";
import { View, Text, StyleSheet } from "react-native";
import { IconDate, IconBook } from "../../Icons";
import * as Animatable from "react-native-animatable"
import Icon from "react-native-vector-icons/FontAwesome";
import axios from "axios";

export default function Periodo_Component(props) {
  const { Ano } = props;
  const FinalYear = Number(Ano) + 4;

  return (
    <Animatable.View style={styles.BackAll} animation="zoomIn" >
      <Text style={styles.textPeriodo}>Período</Text>
      <View style={styles.iconContainerDate}>
        <IconDate />
      </View>
      <View style={styles.iconContainerBook}>
        <IconBook style={styles.iconBook} />
      </View>
      <Text style={styles.yearPeriodo}>
        {Ano} - {FinalYear}
      </Text>
      <Text style={styles.textInformation1}>
        Descubra todos os vereadores que
      </Text>
      <Text style={styles.textInformation2}>
        estiveram presentes no período acima.
      </Text>
    </Animatable.View>
  );
}

const styles = StyleSheet.create({
  BackAll: {
    backgroundColor: "#D9D9D9",
    marginLeft: "8%",
    marginRight: "8%",
    marginTop: "2%",
    height: 100,
    borderRadius: 20,
    elevation: 2,
    marginBottom: 5
  },

  textPeriodo: {
    marginLeft: "9%",
    marginTop: "2%",
    fontWeight: "bold",
  },
  iconContainerDate: {
    position: "absolute",
    left: 31,
    top: 35,
  },
  iconContainerBook: {
    marginLeft: "84%",
    marginTop: "-3%",
  },
  yearPeriodo: {
    fontSize: 11,
    marginLeft: "15.6%",
    marginTop: "-1.5%",
  },
  textInformation1: {
    paddingLeft: "10%",
    paddingRight: "13%",
    paddingTop: "2.8%",
    fontSize: 10,
  },
  textInformation2: {
    paddingLeft: "10%",
    paddingRight: "13%",
    paddingEnd: "5%",
    fontSize: 10,
  },
});
