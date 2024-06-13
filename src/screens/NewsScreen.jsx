import React, { useEffect, useState } from "react";
import { View, FlatList, ScrollView } from "react-native";
import { styles } from "../config/style";
import { Surface, ActivityIndicator, Text } from "react-native-paper";

export default function NewsScreen() {
  const [eventDetails, setEventDetails] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchEvents = async () => {
      const url =
        "https://real-time-events-search.p.rapidapi.com/search-events?query=Concerts%20in%20San-Francisco&date=any&is_virtual=false&start=0";
      const options = {
        method: "GET",
        headers: {
          "x-rapidapi-key":
            "adb39cbae6mshfc803cfaef5bc28p1a2d53jsn876c5f494f55",
          "x-rapidapi-host": "real-time-events-search.p.rapidapi.com",
        },
      };
      try {
        const response = await fetch(url, options);
        const result = await response.json();
        if (result && result.data && result.data) {
          setEventDetails(result.data); // Update to match the API response structure
          console.log(result.data);
        } else {
          setError("No events found.");
        }
      } catch (error) {
        console.error(error);
        setError("Failed to fetch events.");
      } finally {
        setLoading(false);
      }
    };

    fetchEvents();
  }, []);

  return (
    <ScrollView>
      <Surface style={styles.container}>
        <View style={styles.innerContainer}>
          <Text style={styles.title}>Eventos</Text>
          {loading ? (
            <ActivityIndicator size="large" color="#0000ff" />
          ) : error ? (
            <Text style={styles.errorText}>{error}</Text>
          ) : (
            <FlatList
              data={eventDetails}
              keyExtractor={(item) => item.event_id.toString()}
              renderItem={({ item }) => (
                <View style={styles.item}>
                  <Text style={styles.title}>Nome: {item.name}</Text>
                  <Text>Descrição: {item.description}</Text>
                  <Text>
                    Hora para começar:{" "}
                    {new Date(item.start_time).toLocaleString()}
                  </Text>
                  <Text>
                    Hora para acabar: {new Date(item.end_time).toLocaleString()}
                  </Text>
                  <Text>Local: {item.venue.name}</Text>
                  <Text>Endereço: {item.venue.full_address}</Text>
                </View>
              )}
            />
          )}
        </View>
      </Surface>
    </ScrollView>
  );
}
