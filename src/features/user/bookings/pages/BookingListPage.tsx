import React, { useState } from "react";
import { View, Text, StyleSheet, FlatList, ActivityIndicator, TouchableOpacity } from "react-native";
import { useFetchAllBooking } from "../hooks";
import BookingCard from "../components/BookingCard";

const FILTERS = ["All", "Pending", "Confirmed", "Cancelled"];

const BookingListPage = () => {
  const [filter, setFilter] = useState<string>("All");
  const { data: bookings, isLoading, isError } = useFetchAllBooking();
  const filteredBookings =
    filter === "All" ? bookings : bookings?.filter((b: any) => b.status.toLowerCase() === filter.toLowerCase());

  if (isLoading) {
    return <ActivityIndicator size="large" color="#2ecc71" style={styles.loader} />;
  }

  if (isError) {
    return <Text style={styles.error}>❌ Error loading bookings</Text>;
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>My Bookings</Text>

      <View style={styles.filterContainer}>
        {FILTERS.map(status => (
          <TouchableOpacity
            key={status}
            onPress={() => setFilter(status)}
            style={[styles.filterButton, filter === status && styles.activeFilter]}
          >
            <Text style={filter === status ? styles.activeFilterText : styles.filterText}>{status}</Text>
          </TouchableOpacity>
        ))}
      </View>

      <FlatList
        data={filteredBookings}
        keyExtractor={item => item.id.toString()}
        renderItem={({ item }) => <BookingCard booking={item} />}
        contentContainerStyle={{ paddingBottom: 16 }}
      />
    </View>
  );
};

export default BookingListPage;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: "#f4f6f8",
  },
  title: {
    fontSize: 24,
    fontWeight: "700",
    marginBottom: 16,
    color: "#2c3e50",
  },
  loader: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  error: {
    marginTop: 50,
    textAlign: "center",
    fontSize: 18,
    color: "#e74c3c",
  },
  filterContainer: {
    flexDirection: "row",
    marginBottom: 16,
    gap: 8,
    flexWrap: "wrap",
  },
  filterButton: {
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 20,
    backgroundColor: "#ecf0f1",
  },
  activeFilter: {
    backgroundColor: "#2ecc71",
  },
  filterText: {
    color: "#34495e",
    fontWeight: "500",
  },
  activeFilterText: {
    color: "#fff",
    fontWeight: "600",
  },
});
