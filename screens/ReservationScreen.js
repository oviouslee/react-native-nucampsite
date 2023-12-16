import { useState } from "react";
import {
  Alert,
  Text,
  View,
  ScrollView,
  Switch,
  Button,
  StyleSheet,
} from "react-native";
import { Picker } from "@react-native-picker/picker";
import DateTimePicker from "@react-native-community/datetimepicker";
import * as Animatable from "react-native-animatable";

const ReservationScreen = () => {
  const [campers, setCampers] = useState(1);
  const [hikeIn, setHikeIn] = useState(false);
  const [date, setDate] = useState(new Date());
  const [showCalendar, setShowCalendar] = useState(false);

  const handleReservation = () => {
    return Alert.alert(
      "Begin Search?",
      `Number of Campers: ${campers} \n Hike-In?: ${
        hikeIn ? "Yes" : "No"
      } \n Date: ${date.toLocaleDateString("en-US")}`,
      [
        {
          text: "Cancel",
          onPress: () => resetForm(),
          style: "cancel",
        },
        {
          text: "OK",
          onPress: () => resetForm(),
        },
      ],
      { cancelable: false }
    );
  };

  const resetForm = () => {
    setCampers(1);
    setHikeIn(false);
    setDate(new Date());
    setShowCalendar(false);
  };

  const onDateChange = (event, selectedDate) => {
    const currentDate = selectedDate || date;
    setShowCalendar(Platform.OS === "ios");
    setDate(currentDate);
  };

  return (
    <ScrollView>
      <Animatable.View animation="zoomIn" duration={2000} delay={1000}>
        <View style={styles.formRow}>
          <Text style={styles.formLabel}>Number of Campers:</Text>
          <Picker
            style={styles.formItem}
            selectedValue={campers}
            onValueChange={(itemValue) => setCampers(itemValue)}
          >
            {[1, 2, 3, 4, 5, 6].map((num) => (
              <Picker.Item label={num.toString()} value={num} key={num} />
            ))}
          </Picker>
        </View>
        <View style={styles.formRow}>
          <Text style={styles.formLabel}>Hike In?</Text>
          <Switch
            style={styles.formItem}
            value={hikeIn}
            trackColor={{ true: "#5637DD", false: null }}
            onValueChange={(value) => setHikeIn(value)}
          />
        </View>
        <View style={styles.formRow}>
          <Text style={styles.formLabel}>Date:</Text>
          <Button
            onPress={() => setShowCalendar(!showCalendar)}
            title={date.toLocaleDateString("en-US")}
            color="#5637DD"
            accessibilityLabel="Tap me to select a reservation date"
          />
        </View>
        {showCalendar && (
          <DateTimePicker
            style={styles.formItem}
            value={date}
            mode="date"
            display="default"
            onChange={onDateChange}
          />
        )}
        <View style={styles.formRow}>
          <Button
            onPress={() => handleReservation()}
            title="Search Availability"
            color="#5637DD"
            accessibilityLabel="Tap me to search for available campsites to reserve"
          />
        </View>
      </Animatable.View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  formRow: {
    alignItems: "center",
    justifyContent: "center",
    flex: 1,
    flexDirection: "row",
    margin: 20,
  },
  formLabel: {
    fontSize: 18,
    flex: 2,
  },
  formItem: {
    flex: 1,
  },
});

export default ReservationScreen;
