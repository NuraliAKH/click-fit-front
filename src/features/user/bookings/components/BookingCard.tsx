import React from "react";
import { StyleSheet } from "react-native";
import { Card, Layout, Text } from "@ui-kitten/components";

type Booking = {
  id: number;
  service: any;
  gym: any;
  bookingDate: string;
  startTime: string;
  status: string;
};

const BookingCard = ({ booking }: { booking: Booking }) => {
  return (
    <Card style={styles.card}>
      <Layout style={styles.header}>
        <Text category="h6" style={styles.service}>
          {booking.service.name}
        </Text>
        <Text style={[styles.status, getStatusStyle(booking.status)]}>{booking.status}</Text>
      </Layout>
      <Text category="s1">🏋️ {booking.gym.name}</Text>
      <Text category="p2" style={styles.date}>
        📅 {booking.bookingDate}
      </Text>
      <Text category="p2">⏰ {booking.startTime}</Text>
    </Card>
  );
};

export default BookingCard;

const getStatusStyle = (status: string) => {
  switch (status.toLowerCase()) {
    case "pending":
      return { color: "#f39c12" };
    case "confirmed":
      return { color: "#27ae60" };
    case "cancelled":
      return { color: "#e74c3c" };
    default:
      return { color: "#7f8c8d" };
  }
};

const styles = StyleSheet.create({
  card: {
    marginBottom: 12,
    borderRadius: 12,
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 8,
  },
  service: {
    fontWeight: "600",
  },
  status: {
    fontWeight: "500",
  },
  date: {
    marginTop: 4,
  },
});
