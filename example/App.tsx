import { useEvent } from 'expo';
import RnWallpaperManager from 'rn-wallpaper-manager';
import { Button, ScrollView, Text, View, Alert, StyleSheet } from 'react-native';
import { useState } from 'react';

export default function App() {
  const [isSupported, setIsSupported] = useState<boolean | null>(null);
  const [wallpaperInfo, setWallpaperInfo] = useState<any>(null);
  const onWallpaperChanged = useEvent(RnWallpaperManager, 'onWallpaperChanged');

  const checkSupport = async () => {
    const supported = RnWallpaperManager.isWallpaperSettingSupported();
    setIsSupported(supported);
    
    if (supported) {
      try {
        const info = await RnWallpaperManager.getCurrentWallpaperInfo();
        setWallpaperInfo(info);
      } catch (error) {
        console.error('Failed to get wallpaper info:', error);
      }
    }
  };

  const setWallpaperFromUrl = async (type: 'home' | 'lock' | 'both') => {
    try {
      const result = await RnWallpaperManager.setWallpaperFromUrl(
        'https://picsum.photos/1080/1920', // Random image URL
        type
      );
      Alert.alert('Success', result.message);
    } catch (error) {
      Alert.alert('Error', `Failed to set wallpaper: ${error}`);
    }
  };

  const setWallpaperFromFile = async (type: 'home' | 'lock' | 'both') => {
    // Note: You would need to provide a valid local file path
    // This is just an example - in a real app, you'd get the file path from image picker
    Alert.alert('Info', 'This would set wallpaper from a local file. You need to provide a valid file path.');
  };

  return (
    <ScrollView style={styles.scrollContainer}>
      <Text style={styles.header}>Wallpaper Manager Example</Text>
      
      <Group name="Device Support">
        <Button
          title="Check Wallpaper Support"
          onPress={checkSupport}
        />
        {isSupported !== null && (
          <Text style={styles.text}>
            Wallpaper setting supported: {isSupported ? 'Yes' : 'No'}
          </Text>
        )}
        {wallpaperInfo && (
          <View style={styles.infoContainer}>
            <Text style={styles.text}>
              Home screen supported: {wallpaperInfo.homeScreenSupported ? 'Yes' : 'No'}
            </Text>
            <Text style={styles.text}>
              Lock screen supported: {wallpaperInfo.lockScreenSupported ? 'Yes' : 'No'}
            </Text>
          </View>
        )}
      </Group>

      <Group name="Set Wallpaper from URL">
        <Text style={styles.description}>
          Set wallpaper from a random image URL
        </Text>
        <View style={styles.buttonRow}>
          <Button
            title="Home Screen"
            onPress={() => setWallpaperFromUrl('home')}
            disabled={!isSupported}
          />
          <Button
            title="Lock Screen"
            onPress={() => setWallpaperFromUrl('lock')}
            disabled={!isSupported}
          />
          <Button
            title="Both Screens"
            onPress={() => setWallpaperFromUrl('both')}
            disabled={!isSupported}
          />
        </View>
      </Group>

      <Group name="Events">
        <Text style={styles.text}>
          Last wallpaper change event:
        </Text>
        {onWallpaperChanged && (
          <Text style={styles.eventText}>
            Success: {onWallpaperChanged.success ? 'Yes' : 'No'}
            {onWallpaperChanged.url && `\nURL: ${onWallpaperChanged.url}`}
            {onWallpaperChanged.filePath && `\nFile: ${onWallpaperChanged.filePath}`}
            {`\nType: ${onWallpaperChanged.type}`}
          </Text>
        )}
      </Group>
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
  header: {
    fontSize: 30,
    margin: 20,
    fontWeight: 'bold',
  },
  groupHeader: {
    fontSize: 20,
    marginBottom: 15,
    fontWeight: '600',
  },
  group: {
    margin: 20,
    backgroundColor: '#fff',
    borderRadius: 10,
    padding: 20,
  },
  container: {
    flex: 1,
    backgroundColor: '#eee',
  },
  scrollContainer: {
    flex: 1,
  },
  text: {
    fontSize: 16,
    marginVertical: 5,
  },
  description: {
    fontSize: 14,
    color: '#666',
    marginBottom: 10,
  },
  buttonRow: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    flexWrap: 'wrap',
    gap: 10,
  },
  infoContainer: {
    marginTop: 10,
    padding: 10,
    backgroundColor: '#f0f0f0',
    borderRadius: 5,
  },
  eventText: {
    fontSize: 14,
    fontFamily: 'monospace',
    backgroundColor: '#f0f0f0',
    padding: 10,
    borderRadius: 5,
    marginTop: 5,
  },
});
