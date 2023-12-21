import { StyleSheet, Text, View, TouchableOpacity, BackHandler } from 'react-native';
import React, { useState, useEffect } from 'react';
import { useNavigation, useFocusEffect } from '@react-navigation/native';


const CustomButton = ({ title, onPress}) => {

  return (
    <TouchableOpacity style={styles.button} onPress={onPress}>
      <Text style={styles.buttonText}>{title}</Text>
    </TouchableOpacity>
  );
};

export default function EndScreen({route})
{
    const { p1, p2 } = route.params;
    const [p1Message, setp1Message] = useState("")
    const [p2Message, setp2Message] = useState("")

    useEffect(() => {
        if (p1 > 0)
        {
            setp1Message("You Won")
            setp2Message("You Lost")
        }
        else
        {
            setp2Message("You Won")
            setp1Message("You Lost")
        }
      }, []);

    const navigation = useNavigation();

    const handleBackButton = () => {
        return true; 
      };

      useFocusEffect(
        React.useCallback(() => {      
          BackHandler.addEventListener('hardwareBackPress', handleBackButton);
    
          return () => {           
            BackHandler.removeEventListener('hardwareBackPress', handleBackButton);
          };
        }, [])
      );

    const [textStylesPlayer1, setTextStylesPlayer1] = useState({
        backgroundColor: 'lightgrey',
        color: 'black',
        width: '100%',
        height: '100%',
        justifyContent: 'center',
        alignItems: 'center',
      });

    function back()
    {
        navigation.navigate('Home');
    }
    
    return (
        <View style={{ height: '100%', width: '100%', position: 'relative', backgroundColor: '#3A3B3C' }}>
          <View style={{ height: '50%' }}>
            <TouchableOpacity style={styles.overlay}>
              <View style={{ ...textStylesPlayer1 }}>
                <Text style={{ fontSize: 50, transform: [{ rotate: '180deg' }] }}>
                  <Text>{p2Message}</Text>
                </Text>
              </View>
            </TouchableOpacity>
          </View>
    
          <View style={styles.inlineButtons}>
            <CustomButton title={'| |'} />
            <CustomButton title="Exit" onPress={() => back()} />
          </View>
    
          <View style={{ height: '50%' }}>
            <TouchableOpacity style={styles.overlay}>
              <View style={{ ...textStylesPlayer1 }}>
                <Text style={{ fontSize: 50 }}>
                  <Text>{p1Message}</Text>
                </Text>
              </View>
            </TouchableOpacity>
          </View>
        </View>
      );
    }
    
    const styles = StyleSheet.create({
      overlay: {
        ...StyleSheet.absoluteFillObject, 
        backgroundColor: 'transparent', 
      },
      button: {
        width: 100, 
        height: 40, 
        backgroundColor: 'grey',
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 5,
        margin: 5
      },
      buttonText: {
        color: 'white',
        fontSize: 16,
        textAlign: 'center',
      },
      inlineButtons: {
        flexDirection: "row",
        justifyContent: "center",
        alignItems: "center",
      },
    });