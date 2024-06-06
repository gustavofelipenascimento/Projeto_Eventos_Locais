import React, { useEffect, useState } from "react";
import { View, Text, FlatList } from "react-native";
export default function NewsScreen() {
  const [news, setNews] = useState([]);
  useEffect(() => {
    fetch(
      "https://newsapi.org/v2/top-headlines?country=us&apiKey=fe3d701f49e4483abceedd2e2b59c2d9"
    )
      .then((response) => response.json())
      .then((data) => setNews(data.articles))
      .catch((error) => console.error(error));
  }, []);
  return (
    <View>
      {" "}
      <FlatList
        data={news}
        keyExtractor={(item) => item.url}
        renderItem={({ item }) => (
          <View>
            {" "}
            <Text>{item.title}</Text> <Text>{item.description}</Text>{" "}
          </View>
        )}
      />{" "}
    </View>
  );
}
