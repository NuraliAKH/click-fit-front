import React, { useState } from "react";
import { KeyboardAvoidingView, Platform, ScrollView, StyleSheet } from "react-native";
import { Card, Text } from "@ui-kitten/components";
import { Controller, useForm } from "react-hook-form";
import UniversalModal from "../../../../components/Modal";
import FloatingLabelSelect from "../../../../components/Select";
import DatePicker from "../../../../components/DatePicker";
import TimePicker from "../../../../components/TimePicker";

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
    formState: { errors, isValid },
  } = useForm<FormData>({ mode: "onChange" });

  const handleBooking = (data: FormData) => {
    onSubmit({
      gymId,
      serviceId: +data.serviceId,
      bookingDate: data.bookingDate,
      startTime: data.startTime,
    });
    onDismiss();
  };

  return (
    <UniversalModal
      visible={visible}
      title="Create Booking"
      backdropStyle={styles.backdrop}
      onClose={onDismiss}
      primaryAction={{ label: "Save", onPress: handleSubmit(handleBooking), disabled: !isValid }}
      secondaryAction={{ label: "Close", onPress: onDismiss }}
    >
      <KeyboardAvoidingView behavior={Platform.OS === "ios" ? "padding" : undefined}>
        <ScrollView contentContainerStyle={{ paddingBottom: 24, gap: 15 }}>
          <Controller
            control={control}
            name="serviceId"
            rules={{ required: "Please select a service" }}
            render={({ field: { onChange, value } }) => (
              <FloatingLabelSelect
                containerStyle={{ marginTop: 5 }}
                label="Choose service"
                value={value ? String(value) : null}
                onChange={onChange}
                options={services.map(service => ({
                  label: service.name,
                  value: String(service.id),
                }))}
              />
            )}
          />
          <Controller
            control={control}
            name="bookingDate"
            rules={{ required: "Please select a date" }}
            render={({ field: { onChange, value }, fieldState: { error } }) => (
              <DatePicker
                label="Booking Date"
                value={value}
                onChange={onChange}
                error={error?.message}
                minimumDate={new Date()}
                placeholder="Select Booking Date"
              />
            )}
          />
          <Controller
            control={control}
            name="startTime"
            rules={{ required: "Please select a time" }}
            render={({ field: { onChange, value } }) => (
              <>
                <TimePicker
                  label="Start Time"
                  value={value} // Date yoki null bo'lishi kerak
                  onChange={date => {
                    onChange(date); // faqat Date saqlaymiz
                  }}
                  error={errors.startTime?.message}
                  placeholder="Select Start Time"
                />
                {errors.startTime && (
                  <Text status="danger" category="c1">
                    {errors.startTime.message}
                  </Text>
                )}
              </>
            )}
          />
        </ScrollView>
      </KeyboardAvoidingView>
    </UniversalModal>
  );
};

export default CreateBookingModal;

const styles = StyleSheet.create({
  card: {
    width: "100%",
    padding: 0,
    alignSelf: "center",
    backgroundColor: "transparent",
    borderWidth: 0,
  },
  title: {
    marginBottom: 20,
    textAlign: "center",
  },
  input: {
    width: "100%",
    marginTop: 4,
    marginBottom: 12,
  },
  backdrop: {
    backgroundColor: "rgba(0, 0, 0, 0.9)", // qora, 50% shaffoflik
  },
});
