import { ScrollView, Text } from "react-native";
import { Avatar, Card, ListItem } from "react-native-elements";
import { useSelector } from "react-redux";
import { baseUrl } from "../shared/baseUrl";
import Loading from "../components/LoadingComponent";

const AboutScreen = () => {
  const partners = useSelector((state) => state.partners);
  console.log(partners);

  const Mission = () => (
    <Card>
      <Card.Title>Our Mission</Card.Title>
      <Card.Divider />
      <Text style={{ margin: 10 }}>
        We present a curated database of the best campsites in the vast woods
        and backcountry of the World Wide Web Wilderness. We increase access to
        adventure for the public while promoting safe and respectful use of
        resources. The expert wilderness trekkers on our staff personally verify
        each campsite to make sure that they are up to our standards. We also
        present a platform for campers to share reviews on campsites they have
        visited with each other.
      </Text>
    </Card>
  );

  if (partners.isLoading) {
    return (
      <ScrollView>
        <Mission />
        <Card>
          <Card.Title>Community Partners</Card.Title>
          <Card.Divider />
          <Loading />
        </Card>
      </ScrollView>
    );
  }

  if (partners.errMess) {
    return (
      <ScrollView>
        <Mission />
        <Card>
          <Card.Title>Community Partners</Card.Title>
          <Card.Divider />
          <Text>{partners.errMess}</Text>
        </Card>
      </ScrollView>
    );
  }

  return (
    <ScrollView>
      <Mission></Mission>
      <Card>
        <Card.Title>Community Partners</Card.Title>
        <Card.Divider />
        {partners.partnersArray.map((p) => (
          <ListItem key={p.id}>
            <Avatar source={{ uri: baseUrl + p.image }} rounded />
            <ListItem.Content>
              <ListItem.Title>{p.name}</ListItem.Title>
              <ListItem.Subtitle>{p.description}</ListItem.Subtitle>
            </ListItem.Content>
          </ListItem>
        ))}
      </Card>
    </ScrollView>
  );
};

export default AboutScreen;