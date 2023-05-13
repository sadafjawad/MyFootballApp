import React, { useState } from 'react';
// import { Linking } from 'react-native';
import { ActionSheetIOS } from 'react-native';
import { View, Text, StyleSheet, SafeAreaView, Modal, TouchableOpacity } from 'react-native';
import TransferFeed from './TransferFeed';
import OtherFeed from './OtherFeed';
import FixtureFeed from './FixtureFeed';

const Home = () => {
    const [modalVisible, setModalVisible] = useState(false);
    const [settingsModalVisible, setSettingsModalVisible] = useState(false);
    const [newsTitle, setNewsTitle] = useState('Transfer News');
    const [feedContent, setFeedContent] = useState(<TransferFeed/>);

    return (
        <View style={styles.container}>
          {/* Header */}
          <SafeAreaView style={styles.header}>
            <Text style={styles.title}>{newsTitle}</Text>
          </SafeAreaView>
    
          {/* Changing Content */}
          <View style={styles.newsFeed}>
            {feedContent}
          </View>
    
          {/* Bottom Menu Bar */}
          <View style={styles.bottomMenu}>
            <SafeAreaView style={styles.bottomMenuButton}>
              <Text style={styles.bottomMenuButtonText} 
              onPress={() =>
                ActionSheetIOS.showActionSheetWithOptions(
                  {
                    options: ['Transfer News', 'Fixture News', 'Other News', 'Cancel'],
                    cancelButtonIndex: 3,
                  },
                  (buttonIndex) => {
                    if (buttonIndex === 0) {
                      // Handle Option 1 press
                      setNewsTitle('Transfer News');
                      // change feed content
                      setFeedContent(<TransferFeed/>);
                      
                    } else if (buttonIndex === 1) {
                      // Handle Option 2 press
                      setNewsTitle('Fixture News');
                      // change feed content\
                      setFeedContent(<FixtureFeed/>);
                      
                    } else if (buttonIndex === 2) {
                      // Handle Option 3 press
                      setNewsTitle('Other News');
                      // change feed content
                      setFeedContent(<OtherFeed/>);

                    }
                  }
                )
              }>
                News
              </Text>
            </SafeAreaView>
            <SafeAreaView style={styles.bottomMenuButton}>
              <Text style={styles.bottomMenuButtonText} onPress={() => setModalVisible(true)}>My Teams</Text>
            </SafeAreaView>
            <SafeAreaView style={styles.bottomMenuButton}>
              <Text style={styles.bottomMenuButtonText} onPress={() => setSettingsModalVisible(true)}>Settings</Text>
            </SafeAreaView>
          </View>
          {/* My TeamsModal */}
            <Modal
              visible={modalVisible}
              animationType="slide"
              presentationStyle="pageSheet"
            >
              <View style={styles.modal}>
                <TouchableOpacity style={styles.modalCloseButton} onPress={() => setModalVisible(false)}>
                  <Text style={styles.modalCloseButtonText}>Close</Text>
                </TouchableOpacity>
                <Text style={styles.modalContent}>Settings Screen</Text>
              </View>
            </Modal>
        {/* Settings Modal */}
        <Modal
            visible={settingsModalVisible}
            animationType="slide"
            presentationStyle="pageSheet"
          >
            <View style={styles.modal}>
              <TouchableOpacity style={styles.modalCloseButton} onPress={() => setSettingsModalVisible(false)}>
                <Text style={styles.modalCloseButtonText}>Close</Text>
              </TouchableOpacity>
              <Text style={styles.modalContent}>Settings Screen</Text>
            </View>
          </Modal>
        </View>
      );


}
export default Home

const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#ffffff',
    },
    header: {
      height: 90,
      justifyContent: 'center',
      alignItems: 'center',
      backgroundColor: '#ffffff',
      borderBottomWidth: 1,
      borderBottomColor: '#ccc',
    },
    title: {
      fontSize: 24,
      fontWeight: 'bold',
      color: '#000',
    },
    text: {
        color: '#000',
    },
    newsFeed: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
    },
    bottomMenu: {
      backgroundColor: '#fff',
      flexDirection: 'row',
      height: 80,
      borderTopWidth: 1,
      borderTopColor: '#ccc',
    },
    bottomMenuButton: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
    },
    bottomMenuButtonText: {
      fontSize: 18,
      color: '#2196f3',
    },
    modal: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        // backgroundColor: 'rgba(0, 0, 0, 0.5)',
        backgroundColor: '#fff',
      },
      modalCloseButton: {
        position: 'absolute',
        top: 40,
        right: 20,
      },
      modalCloseButtonText: {
        color: '#000000',
        fontSize: 16,
        fontWeight: 'bold',
      },
      modalContent: {
        color: '#ffffff',
        fontSize: 24,
        fontWeight: 'bold',
      },
  });