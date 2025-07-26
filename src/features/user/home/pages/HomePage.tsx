import React from "react";
import { View } from "react-native";
import { Text, Card, Button } from "react-native-paper";

const HomePage = () => {
  return (
    <View style={{ padding: 16 }}>
      <Card style={{ marginBottom: 16 }}>
        <Card.Title title="Welcome!" />
        <Card.Content>
          <Text>Ready for your next workout?</Text>
        </Card.Content>
        <Card.Actions>
          <Button mode="contained" onPress={() => {}}>
            Book a Session
          </Button>
        </Card.Actions>
      </Card>

      <Card>
        <Card.Title title="Active Membership" />
        <Card.Content>
          <Text>Unlimited access to gyms until Aug 25</Text>
        </Card.Content>
      </Card>
    </View>
  );
};

export default HomePage;
