import * as React from 'react';
import {
  Image,
  ImageBackground,
  StyleSheet,
  TouchableOpacity,
  FlatList,
} from 'react-native';
import { useNavigation } from '@react-navigation/native'
import { Text, View } from '../components/Themed';
import NoteListItem from '../components/NoteListItem/NoteListItem'
import { Ionicons } from '@expo/vector-icons'

export default function AddNoteScreen(props) {

    const navigation = useNavigation()
    
    const currentBook = props.currentPassage.book
    const currentChapter = props.currentPassage.chapter
    const currentVerse = props.currentPassage.verse

    const separator = () => {
      return <View style={{height: 1, backgroundColor: 'rgb(50,50,50)'}} />
    }

    const renderItem = ({item, index}) => {
        if (
            item.book === props.currentPassage.book
            && item.chapter === props.currentPassage.chapter
            && item.verse === props.currentPassage.verse
        ) {
            return (
                <NoteListItem 
                    item={item}
                    index={index}
                    noteState={props.noteState}
                    setNoteState={props.setNoteState}
                    addNoteToList={props.addNoteToList}
                    handleUpdate={props.handleUpdate}
                    handleDelete={props.handleDelete}
                    currentPassage={props.currentPassage}
                    setCurrentPassage={props.setCurrentPassage}
                />
            )
        }
    }

    return (
      <ImageBackground source={require('../assets/images/parchmenttile.jpeg')} style={styles.backgroundImage}>
        <View style={styles.flatListView}>
          <Text style={styles.chapterHeader}>{currentBook} {currentChapter}:{currentVerse}</Text>
          <View style={styles.backBtnContainer}>
            <TouchableOpacity 
              onPress={() => navigation.goBack()}
              style={styles.backBtn}
            >
              <View style={styles.backBtnGroup}>
                <View style={styles.backBtnCaretContainer}>
                  <Ionicons name="chevron-back" size={25} color="#B2081C" style={styles.backCaret} />
                </View>
                <Text style={styles.backBtnText}> Verses </Text>
              </View>
            </TouchableOpacity>
          </View>
          <FlatList
              data={props.noteState}
              keyExtractor={(e, i) => i.toString()}
              renderItem={renderItem}
              ItemSeparatorComponent={separator}
          />
          <TouchableOpacity
              style={styles.addButton}
              onPress={() => {
                navigation.navigate('Add Note', {
                  paramKey: [currentBook, currentChapter]
                })}}
          >
              <Image
                  style={styles.addButtonIcon}
                  source={require('../assets/images/addnoteicon.png')}
              />
          </TouchableOpacity>
        </View>
      </ImageBackground>
    )
}

const styles = StyleSheet.create({
    container: {
      flex: 1,
      alignItems: 'center',
      justifyContent: 'center',
    },
    tabContainer: {
      flex: 1,
      paddingHorizontal: 10,
      justifyContent: 'center'
    },
    title: {
      fontSize: 20,
      fontWeight: 'bold',
    },
    separator: {
      marginVertical: 30,
      height: 1,
      width: '80%',
    },
    listTab: {
      flexDirection: 'row',
      alignSelf: 'center',
      marginBottom: 20,
    },
    textTab: {
      fontSize: 16
    },
    textTabActive: {
      color: '#fff'
    },
    itemContainer: {
      flexDirection: 'row',
      paddingVertical: 15
    },
    itemButton: {
      flex: 1,
      paddingHorizontal: 2,
      paddingVertical: 12,
      justifyContent: 'center'
    },
    itemButtonActive: {
      flex: 1,
      paddingHorizontal: 2,
      paddingVertical: 12,
      justifyContent: 'center',
      backgroundColor: '#B2081C'
    },
    itemName: {
      fontSize: 16
    },
    chapterHeader: {
        alignSelf: 'center',
        fontSize: 20,
        fontWeight: '600',
        marginTop: 52,
        marginBottom: 20
    },
    addButton: {
        height: 40,
        width: 40,
        alignSelf: 'flex-start',
        position: 'absolute',
        top: 44,
        right: 5
    },
    addButtonIcon: {
        height: 40,
        width: 40,
    },
    addField: {
        position: 'absolute',
        bottom: 70,
        width: '80%',
        height: 60
    },
    flatListView: {
      height: '100%',
      top: 10,
      backgroundColor: 'transparent',
    },
    backgroundImage: {

    },
    itemView: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      backgroundColor: 'transparent',
    },
    caret: {
      fontSize: 23,
      right: 10
    },
    backBtnContainer: {
      position: 'absolute',
      marginTop: 52,
      backgroundColor: 'rgba(0,0,0,0)'
    },
    backBtn: {
      width: 100,
      height: 40,
      justifyContent: 'center',
      backgroundColor: 'rgba(0,0,0,0)'
    },
    backBtnGroup: {
      flexDirection: 'row',
      backgroundColor: 'rgba(0,0,0,0)'
    },
    backBtnText: {
      fontWeight: '600',
      fontSize: 18,
      color: '#B2081C',
      marginLeft: -8
    },
    backCaret: {
      marginTop: -3
    },
    backBtnCaretContainer: {
      height: 40,
      backgroundColor: 'rgba(0,0,0,0)'
    },
    deleteView: {
      backgroundColor: 'transparent',
      justifyContent: 'center',
      alignItems: 'flex-end',
    },
    deleteBtnContainer: {
      height: '100%',
      backgroundColor: 'transparent',
      // justifyContent: 'space-around',
      // alignContent: 'space-between',
      // paddingHorizontal: 30,
      // width: '100%'
    },
    deleteConfirm: {
      borderStyle: 'solid',
      backgroundColor: 'transparent',
      height: '49%',
      justifyContent: 'center',
      paddingHorizontal: 30
    },
    deleteCancel: {
      backgroundColor: 'transparent',
      height: '49%',
      justifyContent: 'center',
      paddingHorizontal: 30
    }
  });