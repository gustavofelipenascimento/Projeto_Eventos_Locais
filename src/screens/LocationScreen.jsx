import { useState, useEffect } from "react";
import * as Location from "expo-location";
import { styles } from "../config/style";
import { Button, Surface, Text } from "react-native-paper";

export default function LocationScreen() {
  const [location, setLocation] = useState(null);
  const [errorMsg, setErrorMsg] = useState(null);
  const [subscription, setSubscription] = useState(null);

  useEffect(() => {
    (async () => {
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== "granted") {
        setErrorMsg("Permission to access location was denied");
        return;
      }

      let location = await Location.getCurrentPositionAsync({});
      setLocation(location);
    })();

    // Cleanup function to remove the watcher when the component unmounts
    return () => {
      if (subscription) {
        subscription.remove();
      }
    };
  }, []);

  const startWatching = async () => {
    let { status } = await Location.requestForegroundPermissionsAsync();
    if (status !== "granted") {
      setErrorMsg("Permission to access location was denied");
      return;
    }

    let newSubscription = await Location.watchPositionAsync(
      {
        accuracy: Location.Accuracy.High,
        timeInterval: 1000, // Intervalo de tempo em milissegundos para atualizar a localização
        distanceInterval: 1, // Distância mínima em metros para atualizar a localização
      },
      (newLocation) => {
        setLocation(newLocation);
      }
    );

    setSubscription(newSubscription);
  };

  const stopWatching = () => {
    if (subscription) {
      subscription.remove();
      setSubscription(null);
    }
  };

  let text = "Waiting..";
  if (errorMsg) {
    text = errorMsg;
  } else if (location) {
    text = `Latitude: ${location.coords.latitude}, Longitude: ${location.coords.longitude}`;
  }

  return (
    <Surface style={styles.container}>
      <Text style={styles.paragraph}>{text}</Text>
      <Button onPress={() => startWatching()} mode="contained-tonal">
        Start Watching Location
      </Button>
      <Button onPress={() => stopWatching()} mode="contained-tonal">
        Stop Watching Location
      </Button>
    </Surface>
  );
}
