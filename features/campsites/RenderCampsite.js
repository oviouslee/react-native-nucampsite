import { StyleSheet, Text, View } from "react-native";
import { Card, Icon } from "react-native-elements";
import { baseUrl } from "../../shared/baseUrl";

const RenderCampsite = ({ campsite, isFavorite, markFavorite }) => {
  if (campsite) {
    return (
      <Card containerStyle={{ padding: 0 }}>
        <Card.Image source={{ uri: baseUrl + campsite.image }}>
          <View style={{ justifyContent: "center", flex: 1 }}>
            <Text style={styles.cardContainer}>{campsite.name}</Text>
          </View>
        </Card.Image>
        <Text style={{ margin: 20 }}>{campsite.description}</Text>
        <Icon
          name={isFavorite ? "heart" : "heart-o"}
          onPress={markFavorite}
          type="font-awesome"
          color="#f50"
          raised
          reverse
        />
      </Card>
    );
  }

  return <View />;
};

const styles = StyleSheet.create({
  cardContainer: {
    padding: 0,
    margin: 0,
    marginBottom: 20,
  },
});
export default RenderCampsite;
