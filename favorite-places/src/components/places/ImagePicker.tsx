import { useState } from 'react';
import { View, Text, StyleSheet, Alert, Image } from 'react-native';
import {
    launchCameraAsync,
    useCameraPermissions,
    PermissionStatus,
} from 'expo-image-picker';

import { Colors } from '@/constants/styles';

import OutlinedButton from '@/components/ui/OutlinedButton';

interface ImagePickerProps {
    onTakeImage(uri: string): void;
}

export default function ImagePicker({ onTakeImage }: ImagePickerProps) {
    const [pickedImage, setPickedImage] = useState('');
    const [cameraPermissions, requestPermission] = useCameraPermissions();

    async function verifyPermission() {
        if (cameraPermissions?.status === PermissionStatus.UNDETERMINED) {
            const permissionResponse = await requestPermission();

            return permissionResponse.granted;
        }

        if (cameraPermissions?.status === PermissionStatus.DENIED) {
            Alert.alert(
                'Insufficient Permissions',
                'You need to grant camera permissions to use this app.'
            );
            return false;
        }

        return true;
    }

    async function takeImageHandler() {
        const hasPermission = await verifyPermission();

        if (!hasPermission) {
            return;
        }

        const image = await launchCameraAsync({
            allowsEditing: true,
            aspect: [16, 9],
            quality: 0.5,
        });

        if (!image.assets) {
            return;
        }

        setPickedImage(image.assets[0].uri);
        onTakeImage(image.assets[0].uri);
    }

    let imagePreview = <Text>No image taken yet.</Text>;

    if (pickedImage) {
        imagePreview = (
            <Image style={styles.image} source={{ uri: pickedImage }} />
        );
    }

    return (
        <View>
            <View style={styles.imagePreview}>{imagePreview}</View>
            <OutlinedButton icon='camera' onPress={takeImageHandler}>
                Take Image
            </OutlinedButton>
        </View>
    );
}

const styles = StyleSheet.create({
    imagePreview: {
        width: '100%',
        height: 200,
        marginVertical: 8,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: Colors.primary100,
        borderRadius: 4,
    },
    image: {
        width: '100%',
        height: '100%',
        borderRadius: 4,
    },
});
