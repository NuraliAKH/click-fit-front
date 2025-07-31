import React from "react";
import { View } from "react-native";
import { Layout, Card, Text, Button } from "@ui-kitten/components";

const HomePage = () => {
  return (
    <Layout style={{ flex: 1, padding: 16 }}>
      <Card style={{ marginBottom: 16 }}>
        <Text category="h5" style={{ marginBottom: 8 }}>
          Welcome!
        </Text>
        <Text style={{ marginBottom: 16 }}>Ready for your next workout?</Text>
        <Button onPress={() => {}}>Book a Session</Button>
      </Card>

      <Card>
        <Text category="h6" style={{ marginBottom: 8 }}>
          Active Membership
        </Text>
        <Text appearance="hint">Unlimited access to gyms until Aug 25</Text>
      </Card>
    </Layout>
  );
};

export default HomePage;
