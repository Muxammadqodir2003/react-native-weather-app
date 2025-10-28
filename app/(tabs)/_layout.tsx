import axios from "axios";
import * as Location from "expo-location";
import React, { useEffect, useState } from "react";

import Loader from "@/components/loader";
import Weather from "@/components/weather";
import { ILocation } from "@/types";
import { Alert } from "react-native";

const API_KEY = "5271c64e7f7234351746c31263861315";

export default function TabLayout() {
  const [isLoading, setIsLoading] = useState(true);
  const [location, setLocation] = useState<ILocation>({} as ILocation);

  const getWeather = async (lat: number, lon: number) => {
    const { data } = await axios.get(
      `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${API_KEY}&units=metric`
    );
    setIsLoading(false);
    setLocation(data);
  };

  const setWeather = async (query: string) => {
    const { data } = await axios.get(
      `https://api.openweathermap.org/data/2.5/weather?q=${query}&appid=${API_KEY}&units=metric`
    );
    setLocation(data);
  };

  const getLocation = async () => {
    try {
      const { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== "granted") {
        Alert.alert("Permission to access location was denied");
        return;
      }

      const { coords } = await Location.getCurrentPositionAsync();
      getWeather(coords.latitude, coords.longitude);
    } catch (error) {
      Alert.alert("I can't find your current location, so bad");
    }
  };

  useEffect(() => {
    getLocation();
  }, []);

  return isLoading ? (
    <Loader />
  ) : (
    <Weather
      setWeather={setWeather}
      temp={Math.round(location.main.temp)}
      name={location.name}
      condition={location.weather[0].main}
    />
  );
}
