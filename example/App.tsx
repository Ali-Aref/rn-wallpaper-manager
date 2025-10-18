import { useEvent } from "expo";
import RnExpoWallpaperManager from "rn-expo-wallpaper-manager";
import { ScrollView, Text, View, Alert, StyleSheet } from "react-native";
import { useState } from "react";
import Button from "./Button";
import * as ImagePicker from "expo-image-picker";

export default function App() {
  const [isSupported, setIsSupported] = useState<boolean | null>(null);
  const [wallpaperInfo, setWallpaperInfo] = useState<any>(null);
  const onWallpaperChanged = useEvent(
    RnExpoWallpaperManager,
    "onWallpaperChanged",
  );

  const checkSupport = async () => {
    const supported = RnExpoWallpaperManager.isWallpaperSettingSupported();
    setIsSupported(supported);

    if (supported) {
      try {
        const info = await RnExpoWallpaperManager.getCurrentWallpaperInfo();
        setWallpaperInfo(info);
      } catch (error) {
        console.error("Failed to get wallpaper info:", error);
      }
    }
  };

  const setWallpaperFromUrl = async (type: "home" | "lock" | "both") => {
    try {
      const result = await RnExpoWallpaperManager.setWallpaperFromUrl(
        "https://picsum.photos/1080/1920", // Random image URL
        type,
      );
      Alert.alert("Success", result.message);
    } catch (error) {
      Alert.alert("Error", `Failed to set wallpaper: ${error}`);
    }
  };

  const setWallpaperFromFile = async (type: "home" | "lock" | "both") => {
    // Example using a file path from device storage
    // In a real app, you'd use expo-image-picker or expo-file-system to get the file path
    // Alert.alert(
    //   'Set from File',
    //   'To test this feature, you need a real file path from your device. Options:\n\n' +
    //   '1. Use expo-image-picker to select an image\n' +
    //   '2. Provide a full path like: /storage/emulated/0/Download/image.jpg\n\n' +
    //   'This is just a demo. The URL method works great for testing!',
    //   [{ text: 'OK' }]
    // );
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ["images"],
      allowsEditing: true,
      aspect: [9, 16],
      quality: 1,
    });
    if (!result.canceled) {
      try {
        // Remove 'file://' prefix to get the actual file path
        const filePath = result.assets[0].uri.replace("file://", "");
        const res = await RnExpoWallpaperManager.setWallpaperFromFile(
          filePath,
          type,
        );
        Alert.alert("Success", res.message);
      } catch (error) {
        console.log("error: ", error);
        Alert.alert("Error", `Failed to set wallpaper: ${error}`);
      }
    }
  };

  return (
    <ScrollView
      showsVerticalScrollIndicator={false}
      contentContainerStyle={styles.container}
    >
      <Text style={styles.header}>Wallpaper Manager</Text>
      <Group name="Device Support">
        <Button title="Check Wallpaper Support" onPress={checkSupport} />
        {isSupported !== null && (
          <Text style={styles.text}>
            Wallpaper setting supported: {isSupported ? "Yes" : "No"}
          </Text>
        )}
        {wallpaperInfo && (
          <View style={styles.infoContainer}>
            <Text style={styles.text}>
              Home screen supported:{" "}
              {wallpaperInfo.homeScreenSupported ? "Yes" : "No"}
            </Text>
            <Text style={styles.text}>
              Lock screen supported:{" "}
              {wallpaperInfo.lockScreenSupported ? "Yes" : "No"}
            </Text>
          </View>
        )}
      </Group>

      <Group name="Set Wallpaper from URL">
        <Text>Set wallpaper from a random image URL</Text>
        <View style={styles.buttonRow}>
          <Button
            title="Home Screen"
            onPress={() => setWallpaperFromUrl("home")}
            disabled={!isSupported}
          />
          <Button
            title="Lock Screen"
            onPress={() => setWallpaperFromUrl("lock")}
            disabled={!isSupported}
          />
          <Button
            title="Both Screens"
            onPress={() => setWallpaperFromUrl("both")}
            disabled={!isSupported}
          />
        </View>
      </Group>

      <Group name="Set Wallpaper from File">
        <Text>Set wallpaper from a local image file</Text>
        <View style={styles.buttonRow}>
          <Button
            title="Home Screen"
            onPress={() => setWallpaperFromFile("home")}
            disabled={!isSupported}
          />
          <Button
            title="Lock Screen"
            onPress={() => setWallpaperFromFile("lock")}
            disabled={!isSupported}
          />
          <Button
            title="Both Screens"
            onPress={() => setWallpaperFromFile("both")}
            disabled={!isSupported}
          />
        </View>
      </Group>

      {onWallpaperChanged && (
        <Text style={styles.eventText}>
          Success: {onWallpaperChanged.success ? "Yes" : "No"}
          {onWallpaperChanged.url && `\nURL: ${onWallpaperChanged.url}`}
          {onWallpaperChanged.filePath &&
            `\nFile: ${onWallpaperChanged.filePath}`}
          {`\nType: ${onWallpaperChanged.type}`}
        </Text>
      )}
    </ScrollView>
  );
}

function Group(props: { name: string; children: React.ReactNode }) {
  return (
    <View style={styles.group}>
      <Text style={styles.groupHeader}>{props.name}</Text>
      {props.children}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    paddingVertical: 44,
    paddingHorizontal: 16,
    backgroundColor: "#eee",
  },
  header: {
    fontSize: 24,
    fontWeight: "bold",
  },
  groupHeader: {
    fontSize: 20,
    fontWeight: "600",
    marginBottom: 4,
  },
  group: {
    marginTop: 16,
    backgroundColor: "#fff",
    borderRadius: 10,
    padding: 20,
    gap: 4,
  },
  text: {
    fontSize: 16,
    marginVertical: 5,
  },
  buttonRow: {
    flex: 1,
    marginTop: 4,
    flexDirection: "row",
    gap: 4,
  },
  infoContainer: {
    padding: 10,
    backgroundColor: "#f0f0f0",
    borderRadius: 5,
  },
  eventText: {
    fontSize: 14,
    fontFamily: "monospace",
    backgroundColor: "#f0f0f0",
    padding: 10,
    borderRadius: 5,
    marginTop: 5,
  },
});
