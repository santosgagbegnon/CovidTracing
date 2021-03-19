import React, { useEffect, useMemo, useState } from "react";
import { View, Text, StyleSheet } from "react-native";
import { BarCodeScanner, BarCodeEvent } from "expo-barcode-scanner";
import { useNavigation } from "@react-navigation/core";
import { PrimaryButton } from "../BusinessProfile/components";

export const QRScannerView = () => {
  const navigation = useNavigation();

  const [hasPermission, setHasPermission] = useState<boolean>();
  const [scanned, setScanned] = useState(false);

  useEffect(() => {
    (async () => {
      const { status } = await BarCodeScanner.requestPermissionsAsync();
      console.log(status);

      setHasPermission(status === "granted");
    })();
  });

  const onBarCodeScanned = ({ type, data }: BarCodeEvent) => {
    setScanned(true);
    alert(`Bar code with type ${type} and data ${data}`);
  };

  useEffect(() => {
    if (hasPermission === false) {
      alert(`Please go to your settings and enable camera access`);
      if (navigation.canGoBack()) navigation.goBack();
    }
  }, [hasPermission]);

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
          <PrimaryButton
            title="Manually log customer"
            onPress={() => {
              navigation.goBack();
            }}
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
  },
  informationText: {
    color: "#fff",
    textAlign: "center",
  },
});
