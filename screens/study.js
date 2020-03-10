import React, {Component} from 'react';
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

const shuffle = a => {
    let j, x, i;
    for (i = a.length - 1; i > 0; i--) {
        j = Math.floor(Math.random() * (i + 1));
        x = a[i];
        a[i] = a[j];
        a[j] = x;
    }
    return a;
};
const getSetting = async (key, defaultValue) => {
    try {
        const value = await AsyncStorage.getItem(key);
        if (value !== null) {
            return value;
        }
    } catch (e) {
        console.error(e);
        return defaultValue;
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

class Study extends Component {
    constructor(props) {
        super(props);
        this.state = {
            maxCharacters: null,
            currentCharacter: null,
            currentSentence: null,
            pinyinAnswer: null,
            meaningAnswer: null,
            pinyinAnswers: [],
            meaningAnswers: [],
        };
    }

    reset = async () => {
        let {maxCharacters} = this.state;
        if (!maxCharacters) {
            maxCharacters = await getSetting('@CharacterCount', 1000);
        }
        const currentCharacter = Characters[getRandom(0, maxCharacters)];
        this.setState({
            maxCharacters,
            currentCharacter,
            currentSentence: getCurrentSentence(currentCharacter),
            pinyinAnswers: getAnswers(currentCharacter, maxCharacters),
            meaningAnswers: getAnswers(currentCharacter, maxCharacters),
            pinyinAnswer: null,
            meaningAnswer: null,
        });
    };

    componentDidMount() {
        this.reset();
    }

    renderAnswers = (answers, answerType) => {
        return answers.map(answer => {
            return (
                <TouchableOpacity
                    onPress={() =>
                        this.setState({
                            [answerType]: answer,
                        })
                    }
                    style={styles.answer}
                    key={answer.pinyin}>
                    <Text style={styles.answerText}>
                        {answer && answerType === 'pinyinAnswer'
                            ? answer.pinyin
                            : answer.definition}
                    </Text>
                </TouchableOpacity>
            );
        });
    };

    render() {
        const {
            currentCharacter,
            currentSentence,
            pinyinAnswer,
            pinyinAnswers,
            meaningAnswer,
            meaningAnswers,
        } = this.state;
        return (
            <ImageBackground
                source={backgroundImage}
                style={styles.backgroundImage}>
                <SafeAreaView style={styles.safeArea}>
                    <Head />
                    <View>
                        <Text style={styles.character}>
                            {currentCharacter && currentCharacter.traditional}
                        </Text>
                        <Text style={styles.sentence}>
                            {currentSentence && currentSentence.traditional}
                        </Text>
                        <Text style={styles.sentence}>
                            {currentSentence && currentSentence.pinyin}
                        </Text>
                        <Text style={styles.sentence}>
                            {currentSentence && currentSentence.english}
                        </Text>
                    </View>
                    {!pinyinAnswer && (
                        <View style={styles.answers}>
                            {this.renderAnswers(pinyinAnswers, 'pinyinAnswer')}
                        </View>
                    )}
                    {pinyinAnswer && (
                        <Text
                            style={[
                                styles.sentence,
                                pinyinAnswer.pinyin === currentCharacter.pinyin
                                    ? styles.correct
                                    : styles.incorrect,
                            ]}>
                            {pinyinAnswer.pinyin}
                        </Text>
                    )}
                    {pinyinAnswer && !meaningAnswer && (
                        <View style={styles.answers}>
                            {this.renderAnswers(
                                meaningAnswers,
                                'meaningAnswer',
                            )}
                        </View>
                    )}
                    {meaningAnswer && (
                        <Text
                            style={[
                                styles.sentence,
                                meaningAnswer.definition ===
                                currentCharacter.definition
                                    ? styles.correct
                                    : styles.incorrect,
                            ]}>
                            {meaningAnswer.definition}
                        </Text>
                    )}
                    {pinyinAnswer && meaningAnswer && (
                        <TouchableOpacity onPress={() => this.reset()}>
                            <Text>Next</Text>
                        </TouchableOpacity>
                    )}
                </SafeAreaView>
            </ImageBackground>
        );
    }
}

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
        flexWrap: 'wrap',
        flexDirection: 'row',
        justifyContent: 'center',
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
    correct: {
        color: 'green',
    },
    incorrect: {
        color: 'red',
    },
});

export default Study;
