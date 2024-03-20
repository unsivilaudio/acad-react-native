import { registerRootComponent } from 'expo';
import { StatusBar } from 'expo-status-bar';
import { LinearGradient } from 'expo-linear-gradient';
import { useEffect, useState } from 'react';
import {
    ImageBackground,
    StyleSheet,
    SafeAreaView,
    Platform,
    StatusBar as RNStatusBar,
} from 'react-native';
import { useFonts } from 'expo-font';
import { hideAsync, preventAutoHideAsync } from 'expo-splash-screen';

import StartGameScreen from '@/screens/StartGameScreen';
import GameScreen from '@/screens/GameScreen';
import { Colors } from '@/constants/colors';
import GameOverScreen from '@/screens/GameOverScreen';

registerRootComponent(App);
preventAutoHideAsync();

export default function App() {
    const [gameIsOver, setGameIsOver] = useState(true);
    const [userNumber, setUserNumber] = useState<number | null>(null);
    const [guessRounds, setGuessRounds] = useState(0);

    const [fontsLoaded] = useFonts({
        'open-sans': require('./assets/fonts/OpenSans-Regular.ttf'),
        'open-sans-bold': require('./assets/fonts/OpenSans-Bold.ttf'),
    });

    useEffect(() => {
        async function hideSplashScreen() {
            await hideAsync();
        }

        if (fontsLoaded) {
            hideSplashScreen();
        }
    }, [fontsLoaded]);

    if (!fontsLoaded) return null;

    function pickedNumberHandler(pickedNumber: number) {
        setUserNumber(pickedNumber);
        setGameIsOver(false);
    }

    function gameOverHandler(numRounds: number) {
        setGameIsOver(true);
        setGuessRounds(numRounds);
    }

    function startNewGameHandler() {
        setUserNumber(null);
        setGuessRounds(0);
    }

    let screen = <StartGameScreen onPickNumber={pickedNumberHandler} />;

    if (userNumber) {
        screen = (
            <GameScreen
                chosenNumber={userNumber}
                onGameOver={gameOverHandler}
            />
        );
    }

    if (gameIsOver && userNumber) {
        screen = (
            <GameOverScreen
                userNumber={userNumber}
                roundsNumber={guessRounds}
                onStartNewGame={startNewGameHandler}
            />
        );
    }

    return (
        <>
            <StatusBar style='light' />
            <LinearGradient
                colors={[Colors.primary700, Colors.accent500]}
                style={styles.rootScreen}
            >
                <ImageBackground
                    source={require('./assets/images/background.png')}
                    resizeMode='cover'
                    style={styles.rootScreen}
                    imageStyle={{ opacity: 0.15 }}
                >
                    <SafeAreaView style={styles.safeArea}>
                        {screen}
                    </SafeAreaView>
                </ImageBackground>
            </LinearGradient>
        </>
    );
}

const styles = StyleSheet.create({
    rootScreen: {
        flex: 1,
    },
    safeArea: {
        flex: 1,
        marginTop: Platform.OS === 'android' ? RNStatusBar.currentHeight : 0,
    },
});

