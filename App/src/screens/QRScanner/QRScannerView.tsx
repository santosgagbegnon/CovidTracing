import React, { useEffect, useState, useRef } from "react";
import { View, Text, StyleSheet, Animated } from "react-native";
import { BarCodeScanner, BarCodeEvent } from "expo-barcode-scanner";
import { useNavigation } from "@react-navigation/core";
import { PrimaryButton } from "../BusinessProfile/components";
import { successIcon } from "../../shared/images";

const HEADER_HEIGHT = 75;

export const QRScannerView = () => {
  const navigation = useNavigation();

  const [hasPermission, setHasPermission] = useState<boolean>();
  const [scanned, setScanned] = useState(false);

  const sizeAnimation = useRef(new Animated.Value(30)).current;
  const opacityAnimation = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    (async () => {
      const { status } = await BarCodeScanner.requestPermissionsAsync();
      setHasPermission(status === "granted");
    })();
  });

  useEffect(() => {
    if (hasPermission === false) {
      alert(`Please go to your settings and enable camera access`);
      if (navigation.canGoBack()) navigation.goBack();
    }
  }, [hasPermission]);

  const onBarCodeScanned = ({ type, data: uuid }: BarCodeEvent) => {
    setScanned(true);
    alert(`Bar code with type ${type} and data ${uuid}`);
    // Get customer info from users/uuid
    // Log business informaiton in users/uuid (eg. visits.append({businessName, address timestmap}))
    // Log customer informaiton in users/businessUUID (eg. visits.append({firstName, LastName, number, timestmap}))
  };

  const animateResult = () => {
    const increaseSize = Animated.timing(sizeAnimation, {
      useNativeDriver: false,
      toValue: 100,
      duration: 600,
    });

    const increaseOpacity = Animated.timing(opacityAnimation, {
      useNativeDriver: false,
      toValue: 1,
      duration: 150,
    });

    const decreaseOpacity = Animated.timing(opacityAnimation, {
      useNativeDriver: false,
      toValue: 0,
      duration: 600,
    });

    const staggeredOpacity = Animated.stagger(400, [
      increaseOpacity,
      decreaseOpacity,
    ]);

    const parallel = Animated.parallel([increaseSize, staggeredOpacity], {
      stopTogether: false,
    });

    parallel.start((finish) => {
      if (finish) {
        sizeAnimation.setValue(30);
        opacityAnimation.setValue(0);
      }
    });
  };

  const navigateToManuallyLog = () => {
    navigation.navigate("ManuallyLog");
  };

  return (
    <View style={{ flex: 1 }}>
      <BarCodeScanner
        style={StyleSheet.absoluteFill}
        onBarCodeScanned={scanned ? undefined : onBarCodeScanned}
      >
        <View style={styles.barcodeScanner}>
          <View style={styles.informationContainer}>
            <Text style={styles.informationText}>
              Scan your customer's Huella QR Code to automatically log their
              visit.
            </Text>
          </View>
          <View style={styles.confirmationContainer}>
            <Animated.Image
              source={successIcon}
              style={{
                width: sizeAnimation,
                height: sizeAnimation,
                opacity: opacityAnimation,
              }}
            />
          </View>
          <PrimaryButton
            title="Manually log customer"
            onPress={navigateToManuallyLog}
          />
        </View>
      </BarCodeScanner>
    </View>
  );
};

export default QRScannerView;

const styles = StyleSheet.create({
  barcodeScanner: {
    flex: 1,
    justifyContent: "space-between",
    margin: 16,
  },
  informationContainer: {
    backgroundColor: "rgba(0,0,0,0.50)",
    borderRadius: 8,
    justifyContent: "center",
    alignItems: "center",
    padding: 16,
    marginTop: HEADER_HEIGHT + 30,
  },
  informationText: {
    color: "#fff",
    textAlign: "center",
  },
  confirmationContainer: {
    position: "absolute",
    top: 0,
    bottom: 0,
    left: 0,
    right: 0,
    justifyContent: "center",
    alignItems: "center",
  },
});
