import React, {useEffect, useState} from 'react';
import {
    SafeAreaView,
    StyleSheet,
    View,
    Text,
    ImageBackground,
    Dimensions,
} from 'react-native';
import backgroundImage from '../assets/background.png';
import Head from '../components/head';
import Characters from '../dictionary/characters.json';
import Sentences from '../dictionary/sentences.json';
import AsyncStorage from '@react-native-community/async-storage';
import {TouchableOpacity} from 'react-native-gesture-handler';

const getRandom = (min, max) => {
    return Math.floor(Math.random() * (max - min) + min);
};

function shuffle(a) {
    let j, x, i;
    for (i = a.length - 1; i > 0; i--) {
        j = Math.floor(Math.random() * (i + 1));
        x = a[i];
        a[i] = a[j];
        a[j] = x;
    }
    return a;
}
const getSetting = async (key, setStateFunction, defaultValue) => {
    try {
        const value = await AsyncStorage.getItem(key);
        if (value !== null) {
            setStateFunction(value);
        } else if (defaultValue) {
            setStateFunction(defaultValue);
        }
    } catch (e) {
        console.error(e);
        setStateFunction(defaultValue);
    }
};

const getCurrentSentence = currentCharacter => {
    const exampleSentences = Object.keys(Sentences)
        .map(index => {
            if (
                Sentences[index].simplified.indexOf(
                    currentCharacter.simplified,
                ) >= 0
            ) {
                return Sentences[index];
            }
            return null;
        })
        .filter(sentence => sentence !== null)
        .sort((a, b) => {
            return a.simplified.length - b.simplified.length;
        })
        .slice(0, 6);

    // get a random sentence from the list of possible ones
    let sentence = exampleSentences[getRandom(0, exampleSentences.length)];

    //bold the current character
    //this will be interesting

    return sentence;
};

const getAnswers = (currentCharacter, maxCharacters) => {
    // initialize with correct answer
    let answers = [currentCharacter];

    // add 3 wrong answers
    while (answers.length < 4) {
        answers = [
            ...new Set([
                ...answers,
                Characters[getRandom(0, parseInt(maxCharacters, 10))],
            ]),
        ];
    }

    return shuffle(answers);
};

const renderAnswers = (answers, setStateFunction) => {
    return answers.map(answer => {
        return (
            <TouchableOpacity
                onPress={() => setStateFunction(answer)}
                style={styles.answer}>
                <Text style={styles.answerText}>{answer.pinyin}</Text>
            </TouchableOpacity>
        );
    });
};

const Study = ({navigation}) => {
    const [maxCharacters, setCharacterCount] = useState(1000);

    useEffect(() => {
        getSetting('@CharacterCount', setCharacterCount);
    }, []);

    const [currentCharacter, setCurrentCharacter] = useState(
        Characters[getRandom(0, maxCharacters)],
    );
    const [currentSentence, setCurrentSentence] = useState(
        getCurrentSentence(currentCharacter),
    );
    const [pinyinAnswer, setPinyinAnswer] = useState(null);
    const [meaningAnswer, setMeaningAnswer] = useState(null);

    const answers = getAnswers(currentCharacter, maxCharacters);

    return (
        <ImageBackground
            source={backgroundImage}
            style={styles.backgroundImage}>
            <SafeAreaView style={styles.safeArea}>
                <Head />
                <View>
                    <Text style={styles.character}>
                        {currentCharacter.traditional}
                    </Text>
                    <Text style={styles.sentence}>
                        {currentSentence.traditional}
                    </Text>
                    <Text style={styles.sentence}>
                        {currentSentence.pinyin}
                    </Text>
                    <Text style={styles.sentence}>
                        {currentSentence.english}
                    </Text>
                </View>
                <View style={styles.answers}>
                    {renderAnswers(answers, setPinyinAnswer)}
                </View>
                <Text style={styles.sentence}>
                    {pinyinAnswer && pinyinAnswer.pinyin}
                </Text>
            </SafeAreaView>
        </ImageBackground>
    );
};

const styles = StyleSheet.create({
    safeArea: {
        flex: 1,
        flexDirection: 'column',
    },
    answers: {
        justifyContent: 'center',
        flexDirection: 'row',
        flexWrap: 'wrap',
        borderWidth: 1,
        padding: 5,
    },
    answer: {
        width: Dimensions.get('window').width / 2 - 20,
        borderWidth: 1,
    },
    answerText: {
        fontSize: 25,
        padding: 20,
        textAlign: 'center',
    },
    character: {
        margin: 35,
        fontSize: 100,
        textAlign: 'center',
    },
    sentence: {
        textAlign: 'center',
        fontSize: 25,
        margin: 20,
    },
    backgroundImage: {
        flex: 1,
        resizeMode: 'cover', // or 'stretch'
    },
});

export default Study;
