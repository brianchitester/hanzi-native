import React, {Component} from 'react';
import {
    SafeAreaView,
    StyleSheet,
    View,
    Text,
    ImageBackground,
    Dimensions,
    FlatList,
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
        .slice(0, 4);

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
        console.log('reset');
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

    render() {
        const {
            currentCharacter,
            currentSentence,
            pinyinAnswer,
            pinyinAnswers,
            meaningAnswer,
            meaningAnswers,
        } = this.state;
        if (!currentCharacter) {
            return null;
        }
        return (
            <ImageBackground
                source={backgroundImage}
                style={styles.backgroundImage}>
                <SafeAreaView style={styles.safeArea}>
                    <Head />
                    <View style={styles.currentCharacter}>
                        <View style={styles.topRow}>
                            {pinyinAnswer ? (
                                <Text
                                    style={[
                                        styles.displayAnswer,
                                        pinyinAnswer.pinyin ===
                                        currentCharacter.pinyin
                                            ? styles.correct
                                            : styles.incorrect,
                                    ]}>
                                    {currentCharacter.pinyin}
                                </Text>
                            ) : (
                                <Text style={styles.displayAnswer}>•</Text>
                            )}
                            <Text style={styles.character}>
                                {currentCharacter &&
                                    currentCharacter.simplified}
                            </Text>
                            {meaningAnswer ? (
                                <Text
                                    style={[
                                        styles.displayAnswer,
                                        meaningAnswer.definition ===
                                        currentCharacter.definition
                                            ? styles.correct
                                            : styles.incorrect,
                                    ]}>
                                    {currentCharacter.definition}
                                </Text>
                            ) : (
                                <Text style={styles.displayAnswer}>•</Text>
                            )}
                        </View>
                        <Text style={styles.sentence}>
                            {currentSentence && currentSentence.simplified}
                        </Text>
                        {pinyinAnswer && (
                            <Text style={styles.sentence}>
                                {currentSentence && currentSentence.pinyin}
                            </Text>
                        )}
                        {pinyinAnswer && meaningAnswer && (
                            <Text style={styles.sentence}>
                                {currentSentence && currentSentence.english}
                            </Text>
                        )}
                    </View>
                    <View style={styles.currentAnswers}>
                        {!pinyinAnswer && (
                            <FlatList
                                data={pinyinAnswers}
                                numColumns={2}
                                renderItem={({item}) => (
                                    <TouchableOpacity
                                        onPress={() =>
                                            this.setState({
                                                pinyinAnswer: item,
                                            })
                                        }
                                        key={item.pinyin}>
                                        <Text style={styles.answerText}>
                                            {item.pinyin}
                                        </Text>
                                    </TouchableOpacity>
                                )}
                            />
                        )}
                        {pinyinAnswer && !meaningAnswer && (
                            <FlatList
                                data={meaningAnswers}
                                numColumns={2}
                                renderItem={({item}) => (
                                    <TouchableOpacity
                                        onPress={() =>
                                            this.setState({
                                                meaningAnswer: item,
                                            })
                                        }
                                        key={item.definition}>
                                        <Text style={styles.answerText}>
                                            {item.definition}
                                        </Text>
                                    </TouchableOpacity>
                                )}
                            />
                        )}

                        {pinyinAnswer && meaningAnswer && (
                            <TouchableOpacity
                                style={styles.next}
                                onPress={() => this.reset()}>
                                <Text style={styles.nextText}>Next</Text>
                            </TouchableOpacity>
                        )}
                    </View>
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
    topRow: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
    },
    displayAnswer: {
        textAlign: 'center',
        flexWrap: 'wrap',
        fontSize: 25,
        width: Dimensions.get('window').width / 4,
    },
    answerText: {
        width: Dimensions.get('window').width / 2 - 20,
        height: 120,
        fontSize: 26,
        textAlign: 'center',
        textAlignVertical: 'center',
        padding: 20,
        margin: 10,
        borderWidth: 1,
        borderRadius: 15,
    },
    currentCharacter: {
        flex: 2,
    },
    currentAnswers: {
        flex: 2,
        justifyContent: 'center',
        alignItems: 'center',
    },
    nextText: {
        borderWidth: 1,
        padding: 20,
        marginTop: 20,
        textAlign: 'center',
        fontSize: 35,
        width: Dimensions.get('window').width / 2 - 20,
        borderRadius: 15,
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
