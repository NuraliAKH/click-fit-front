import React, { useEffect, useRef } from "react";
import { View, ScrollView, TouchableOpacity, KeyboardAvoidingView, Platform, StyleSheet, Animated } from "react-native";
import { Modal, Card, Text, Divider } from "@ui-kitten/components";
import type { StyleProp, ViewStyle } from "react-native";

// If you're using react-native-vector-icons (as per your project),
// make sure it's installed and linked. You can swap Ionicons to any set you prefer.
import Ionicons from "react-native-vector-icons/Ionicons";
import Button from "./Button";

export type ModalAction = {
  label: string;
  onPress: () => void;
  loading?: boolean;
  disabled?: boolean;
};

export type UniversalModalProps = {
  visible: boolean;
  onClose: () => void;

  // Header
  title?: string;
  subtitle?: string;
  iconName?: string; // Ionicons name e.g. "calendar-outline"
  showClose?: boolean; // show top-right close button

  // Body
  children?: React.ReactNode;
  contentContainerStyle?: StyleProp<ViewStyle>;
  scroll?: boolean; // if true, wraps body with ScrollView
  maxBodyHeight?: number; // for ScrollView max height

  // Footer
  primaryAction?: ModalAction;
  secondaryAction?: ModalAction;
  footerContent?: React.ReactNode; // custom footer; overrides actions if provided

  // Behavior
  dismissOnBackdrop?: boolean;
  disableBackdrop?: boolean;

  // Layout
  width?: number | string;
  cardStyle?: StyleProp<ViewStyle>;
  backdropStyle?: StyleProp<ViewStyle>;
  headerDivider?: boolean; // show divider under header
  footerDivider?: boolean; // show divider above footer
};

const UniversalModal: React.FC<UniversalModalProps> = ({
  visible,
  onClose,
  title,
  subtitle,
  iconName,
  showClose = true,
  children,
  contentContainerStyle,
  scroll = true,
  maxBodyHeight = 420,
  primaryAction,
  secondaryAction,
  footerContent,
  dismissOnBackdrop = true,
  disableBackdrop = false,
  width = "100%",
  cardStyle,
  backdropStyle,
  headerDivider = true,
  footerDivider = false,
}) => {
  const fade = useRef(new Animated.Value(0)).current;
  const scale = useRef(new Animated.Value(0.95)).current;

  useEffect(() => {
    if (visible) {
      Animated.parallel([
        Animated.timing(fade, { toValue: 1, duration: 180, useNativeDriver: true }),
        Animated.spring(scale, { toValue: 1, friction: 7, useNativeDriver: true }),
      ]).start();
    } else {
      Animated.parallel([
        Animated.timing(fade, { toValue: 0, duration: 120, useNativeDriver: true }),
        Animated.timing(scale, { toValue: 0.95, duration: 120, useNativeDriver: true }),
      ]).start();
    }
  }, [visible, fade, scale]);

  const handleBackdropPress = () => {
    if (!dismissOnBackdrop) return;
    onClose?.();
  };

  const BodyWrapper = scroll ? ScrollView : View;

  return (
    <KeyboardAvoidingView behavior={Platform.OS === "ios" ? "padding" : undefined} style={{ flex: 1 }}>
      <Modal
        visible={visible}
        backdropStyle={[, backdropStyle]}
        onBackdropPress={disableBackdrop ? undefined : handleBackdropPress}
      >
        <Animated.View style={{ opacity: fade, transform: [{ scale }], width }}>
          <Card disabled style={[styles.card, cardStyle]}>
            {/* Header */}
            {(title || showClose || iconName) && (
              <View style={styles.header}>
                <View style={styles.headerLeft}>
                  {iconName ? <Ionicons name={iconName} size={22} style={styles.headerIcon} /> : null}
                  {title ? (
                    <Text category="h6" style={styles.title} numberOfLines={2}>
                      {title}
                    </Text>
                  ) : null}
                </View>

                {showClose && (
                  <TouchableOpacity onPress={onClose} accessibilityLabel="Close modal" style={styles.closeBtn}>
                    <Ionicons name="close" size={22} color={"#00B1E3"} />
                  </TouchableOpacity>
                )}
              </View>
            )}

            {subtitle ? (
              <Text appearance="hint" category="s2" style={styles.subtitle}>
                {subtitle}
              </Text>
            ) : null}

            {headerDivider ? <Divider style={{ marginTop: 4 }} /> : null}

            {/* Body */}
            <BodyWrapper
              style={[styles.body, scroll && { maxHeight: maxBodyHeight }, contentContainerStyle as any]}
              {...(scroll ? { showsVerticalScrollIndicator: false } : {})}
            >
              {children}
            </BodyWrapper>

            {/* Footer */}
            {footerContent ? (
              <View style={styles.footer}>{footerContent}</View>
            ) : primaryAction || secondaryAction ? (
              <>
                {footerDivider ? <Divider style={{ marginBottom: 8 }} /> : null}
                <View style={styles.actions}>
                  {secondaryAction ? (
                    <Button
                      onPress={secondaryAction.onPress}
                      disabled={secondaryAction.disabled}
                      style={styles.actionBtn}
                    >
                      {secondaryAction.label}
                    </Button>
                  ) : null}

                  {primaryAction ? (
                    <Button onPress={primaryAction.onPress} disabled={primaryAction.disabled} style={styles.actionBtn}>
                      {primaryAction.label}
                    </Button>
                  ) : null}
                </View>
              </>
            ) : null}
          </Card>
        </Animated.View>
      </Modal>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  card: {
    backgroundColor: "#191A27",
    borderRadius: 20,
    borderColor: "#00B1E3",
    borderWidth: 2,
    shadowOpacity: 0,
    minWidth: "90%",
    padding: 0,
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingVertical: 4,
  },
  headerLeft: {
    flexDirection: "row",
    alignItems: "center",
    flexShrink: 1,
  },
  headerIcon: {
    marginRight: 8,
  },
  title: {
    fontWeight: "700",
    flexShrink: 1,
    color: "#00B1E3",
  },
  subtitle: {
    marginTop: 6,
    marginBottom: 8,
  },
  closeBtn: {
    padding: 6,
    borderRadius: 999,
  },
  body: {
    borderWidth: 0,
    backgroundColor: "transparent",
    padding: 0,
    paddingTop: 8,
    paddingBottom: 12,
  },
  footer: {
    marginTop: 12,
  },
  actions: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 8,
  },
  actionBtn: {
    minWidth: 120,
  },
});

export default UniversalModal;

/**
 * ==========================
 * USAGE EXAMPLES
 * ==========================
 *
 * 1) Simple confirm dialog
 *
 * const [open, setOpen] = useState(false);
 *
 * <UniversalModal
 *   visible={open}
 *   onClose={() => setOpen(false)}
 *   title="Delete gym?"
 *   subtitle="Bu amalni qaytarib bo'lmaydi."
 *   iconName="warning-outline"
 *   primaryAction={{ label: "Delete", onPress: onDelete, loading: deleting }}
 *   secondaryAction={{ label: "Cancel", onPress: () => setOpen(false) }}
 * />
 *
 * 2) Form inside modal (scrollable)
 *
 * <UniversalModal
 *   visible={open}
 *   onClose={() => setOpen(false)}
 *   title="Create booking"
 *   iconName="calendar-outline"
 *   maxBodyHeight={520}
 *   primaryAction={{ label: "Save", onPress: handleSave, disabled: !isValid }}
 *   secondaryAction={{ label: "Close", onPress: () => setOpen(false) }}
 * >
 *   <YourFormComponent />
 * </UniversalModal>
 *
 * 3) Custom footer content
 *
 * <UniversalModal
 *   visible={open}
 *   onClose={() => setOpen(false)}
 *   title="Filters"
 *   footerContent={
 *     <Layout style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
 *       <Button appearance="ghost" onPress={reset}>Reset</Button>
 *       <Button onPress={apply}>Apply</Button>
 *     </Layout>
 *   }
 * />
 */
