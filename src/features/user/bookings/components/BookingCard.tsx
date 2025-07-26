import React from "react";
import { View, Text, StyleSheet } from "react-native";

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
    <View style={styles.card}>
      <View style={styles.header}>
        <Text style={styles.service}>{booking.service.name}</Text>
        <Text style={[styles.status, getStatusStyle(booking.status)]}>{booking.status}</Text>
      </View>
      <Text style={styles.gym}>🏋️ {booking.gym.name}</Text>
      <Text style={styles.date}>📅 {booking.bookingDate}</Text>
      <Text style={styles.time}>⏰ {booking.startTime}</Text>
    </View>
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
    backgroundColor: "#fff",
    padding: 16,
    borderRadius: 12,
    marginBottom: 12,
    elevation: 2,
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 8,
  },
  service: {
    fontSize: 18,
    fontWeight: "600",
    color: "#2c3e50",
  },
  status: {
    fontSize: 14,
    fontWeight: "500",
  },
  gym: {
    fontSize: 16,
    color: "#34495e",
  },
  date: {
    fontSize: 14,
    color: "#7f8c8d",
    marginTop: 4,
  },
  time: {
    fontSize: 14,
    color: "#7f8c8d",
  },
});
