import React, { useState } from "react";
import { FlatList, StyleSheet, View } from "react-native";
import { useFetchAllBooking } from "../hooks";
import BookingCard from "../components/BookingCard";
import { Text, Button, Spinner } from "@ui-kitten/components";

const FILTERS = ["All", "Pending", "Confirmed", "Cancelled"];

const BookingListPage = () => {
  const [filter, setFilter] = useState<string>("All");
  const { data: bookings, isLoading, isError } = useFetchAllBooking();

  const filteredBookings =
    filter === "All" ? bookings : bookings?.filter((b: any) => b.status.toLowerCase() === filter.toLowerCase());

  if (isLoading) {
    return (
      <View style={styles.loader}>
        <Spinner size="giant" />
      </View>
    );
  }

  if (isError) {
    return (
      <View style={styles.loader}>
        <Text status="danger" category="h6">
          ❌ Error loading bookings
        </Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Text category="h5" style={styles.title}>
        My Bookings
      </Text>

      <View style={styles.filterContainer}>
        {FILTERS.map(status => (
          <Button
            key={status}
            size="small"
            appearance={filter === status ? "filled" : "outline"}
            status={filter === status ? "success" : "basic"}
            style={styles.filterButton}
            onPress={() => setFilter(status)}
          >
            {status}
          </Button>
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
  },
  title: {
    marginBottom: 16,
  },
  loader: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  filterContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 8,
    marginBottom: 16,
  },
  filterButton: {
    marginRight: 8,
    marginBottom: 8,
    borderRadius: 20,
  },
});
