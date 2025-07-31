import React, { useState } from "react";
import { KeyboardAvoidingView, Platform, ScrollView, StyleSheet, View } from "react-native";
import { Modal, Card, Button, Input, Text, Select, SelectItem, IndexPath } from "@ui-kitten/components";
import { Controller, useForm } from "react-hook-form";
import DateTimePicker from "@react-native-community/datetimepicker";

type Service = {
  id: number;
  name: string;
};

type Props = {
  visible: boolean;
  onDismiss: () => void;
  onSubmit: (data: { gymId: number; serviceId: number; bookingDate: Date; startTime: string }) => void;
  services: Service[];
  gymId: number;
};

type FormData = {
  serviceId: number;
  bookingDate: Date;
  startTime: string;
};

const CreateBookingModal = ({ visible, onDismiss, onSubmit, services, gymId }: Props) => {
  const {
    control,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm<FormData>();

  const [selectedServiceIndex, setSelectedServiceIndex] = useState<IndexPath | undefined>(undefined);
  const [date, setDate] = useState<Date | null>(null);
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [showTimePicker, setShowTimePicker] = useState(false);
  const [startTime, setStartTime] = useState<string>("");

  const handleBooking = (data: FormData) => {
    onSubmit({
      gymId,
      serviceId: data.serviceId,
      bookingDate: data.bookingDate,
      startTime: data.startTime,
    });
    onDismiss();
  };

  return (
    <Modal visible={visible} backdropStyle={styles.backdrop} onBackdropPress={onDismiss}>
      <Card disabled={true} style={styles.card}>
        <KeyboardAvoidingView behavior={Platform.OS === "ios" ? "padding" : undefined}>
          <ScrollView contentContainerStyle={{ paddingBottom: 24 }}>
            <Text category="h6" style={styles.title}>
              Create Booking
            </Text>

            {/* Service Dropdown */}
            <Text category="label">Select Service</Text>
            <Controller
              control={control}
              name="serviceId"
              rules={{ required: "Please select a service" }}
              render={({ field: { onChange } }) => (
                <>
                  <Select
                    selectedIndex={selectedServiceIndex}
                    onSelect={index => {
                      let rowIndex: number | undefined;
                      if (Array.isArray(index)) {
                        rowIndex = index[0]?.row;
                        setSelectedServiceIndex(index[0]);
                      } else {
                        rowIndex = index.row;
                        setSelectedServiceIndex(index as IndexPath);
                      }
                      if (rowIndex !== undefined) {
                        const service = services[rowIndex];
                        onChange(service.id);
                      }
                    }}
                    placeholder="Choose service"
                    style={styles.input}
                  >
                    {services.map(service => (
                      <SelectItem key={service.id} title={service.name} />
                    ))}
                  </Select>
                  {errors.serviceId && (
                    <Text status="danger" category="c1">
                      {errors.serviceId.message}
                    </Text>
                  )}
                </>
              )}
            />

            {/* Date Picker */}
            <Text category="label" style={{ marginTop: 16 }}>
              Booking Date
            </Text>
            <Controller
              control={control}
              name="bookingDate"
              rules={{ required: "Please select a date" }}
              render={({ field: { onChange, value } }) => (
                <>
                  <Button appearance="outline" onPress={() => setShowDatePicker(true)} style={styles.input}>
                    {value ? value.toDateString() : "Choose Date"}
                  </Button>
                  {showDatePicker && (
                    <DateTimePicker
                      value={value || new Date()}
                      mode="date"
                      display="default"
                      minimumDate={new Date()}
                      onChange={(selectedDate: any) => {
                        setShowDatePicker(false);
                        if (selectedDate) {
                          setDate(selectedDate);
                          onChange(selectedDate);
                        }
                      }}
                    />
                  )}
                  {errors.bookingDate && (
                    <Text status="danger" category="c1">
                      {errors.bookingDate.message}
                    </Text>
                  )}
                </>
              )}
            />

            {/* Time Picker */}
            <Text category="label" style={{ marginTop: 16 }}>
              Start Time
            </Text>
            <Controller
              control={control}
              name="startTime"
              rules={{ required: "Please select a time" }}
              render={({ field: { onChange, value } }) => (
                <>
                  <Button appearance="outline" onPress={() => setShowTimePicker(true)} style={styles.input}>
                    {value || "Choose Time"}
                  </Button>
                  {showTimePicker && (
                    <DateTimePicker
                      value={new Date()}
                      mode="time"
                      display="default"
                      onChange={(selectedTime: any) => {
                        setShowTimePicker(false);
                        if (selectedTime) {
                          const hours = selectedTime.getHours().toString().padStart(2, "0");
                          const minutes = selectedTime.getMinutes().toString().padStart(2, "0");
                          const formatted = `${hours}:${minutes}`;
                          setStartTime(formatted);
                          onChange(formatted);
                        }
                      }}
                    />
                  )}
                  {errors.startTime && (
                    <Text status="danger" category="c1">
                      {errors.startTime.message}
                    </Text>
                  )}
                </>
              )}
            />

            {/* Buttons */}
            <View style={styles.buttons}>
              <Button appearance="ghost" onPress={onDismiss} style={styles.cancelBtn}>
                Cancel
              </Button>
              <Button onPress={handleSubmit(handleBooking)}>Book Now</Button>
            </View>
          </ScrollView>
        </KeyboardAvoidingView>
      </Card>
    </Modal>
  );
};

export default CreateBookingModal;

const styles = StyleSheet.create({
  card: {
    width: "90%",
    alignSelf: "center",
    borderRadius: 12,
    paddingVertical: 16,
  },
  title: {
    marginBottom: 20,
    textAlign: "center",
  },
  input: {
    marginTop: 4,
    marginBottom: 12,
  },
  buttons: {
    flexDirection: "row",
    justifyContent: "flex-end",
    marginTop: 20,
  },
  cancelBtn: {
    marginRight: 12,
  },
  backdrop: {
    backgroundColor: "rgba(0, 0, 0, 0.5)",
  },
});
