import React, { useEffect, useState } from "react";
import {
  StyleSheet,
  Text,
  View,
  FlatList,
  TextInput,
  StatusBar,
} from "react-native";
import CoinItem from "./components/CoinItem";

function App() {
  const [coins, setCoins] = useState([]);
  const [search, setSearch] = useState("");
  const [refreshing, setRefreshing] = useState(false);
  const loadData = async () => {
    //https://www.coingecko.com/es/api#explore-api
    const res = await fetch(
      "https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=100&page=1&sparkline=false"
    );
    const data = await res.json();
    setCoins(data);
  };

  useEffect(() => {
    console.log("loaded");
    loadData();
  }, []);

  return (
    <View style={styles.container}>
      <StatusBar backgroundColor="#141414" />
      <View style={styles.header}>
        <Text style={styles.title}>Coin Prices</Text>
        <TextInput
          style={styles.searchInput}
          placeholder="Search a Coin"
          placeholderTextColor="#858585"
          onChangeText={(text) => setSearch(text)}
        />
      </View>
      <FlatList
        style={styles.list}
        data={coins.filter(
          (coin) =>
            coin.name.toLowerCase().includes(search.toLowerCase()) |
            coin.symbol.toLowerCase().includes(search)
        )}
        renderItem={({ item }) => {
          return <CoinItem coin={item} />;
        }}
        showsVerticalScrollIndicator={false}
        refreshing={refreshing}
        onRefresh={async () => {
          setRefreshing(true)
          await loadData()
          setRefreshing(false)
        }}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#141414",
    alignItems: "center",
    flex: 1,
  },
  list: {
    width: "90%",
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    width: "90%",
    marginBottom: 10,
  },
  title: {
    color: "#fff",
    marginTop: 10,
    fontSize: 20,
  },
  searchInput: {
    color: "#fff",
    borderBottomColor: "#4657CE",
    borderBottomWidth: 1,
    width: "40%",
    textAlign: "center",
  },
});

export default App;
