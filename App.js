import React, { useEffect, useState } from 'react';
import { StyleSheet, Text, View, FlatList } from 'react-native';

function App() {
  const [coins, setCoins] = useState([])
  const loadData = async () => {
    //https://www.coingecko.com/es/api#explore-api
    const res = await fetch("https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=100&page=1&sparkline=false")
    const data = await res.json()
    setCoins(data)
  }

  useEffect(() => {
    console.log("loaded")
    loadData()
  }, [])
  return (
    <View style={ styles.container }>
      <Text>Hola desde React Native</Text>
      <FlatList
        data={coins}
        renderItem={({ item }) => {
          console.log(item.name)
          return <Text>{item.name}</Text>
        }}
      />
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#141414',
    alignItems: 'center',
    flex: 1
  }
})

export default App
