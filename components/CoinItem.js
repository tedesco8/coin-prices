import React from "react";
import { View, Text, StyleSheet, Image } from "react-native";

const CoinItem = ({ coin }) => {
  return (
    <View style={styles.containerItem}>
      <View style={styles.coinName}>
        <Image style={styles.image} source={{ uri: coin.image }} />
        <Text style={styles.text}>{coin.name}</Text>
      </View>
      <Text style={styles.text}>{coin.name}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  containerItem: {
    backgroundColor: "#121212",
    flexDirection: "row",
    paddingTop: 10,
    justifyContent: "space-between",
  },
  coinName: {
    flexDirection: "row",
  },
  text: {
    color: "#ffffff",
  },
  image: {
    width: 30,
    height: 30,
  },
});
export default CoinItem;
