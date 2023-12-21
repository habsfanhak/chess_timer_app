import { StyleSheet, Text, View, TouchableOpacity } from 'react-native';
import React, { useState, useEffect, useRef } from 'react';
import { useNavigation } from '@react-navigation/native';


const CustomButton = ({ title, onPress}) => {

  return (
    <TouchableOpacity style={styles.button} onPress={onPress}>
      <Text style={styles.buttonText}>{title}</Text>
    </TouchableOpacity>
  );
};

export default function Clock({route})
{
    const { minutes, additional } = route.params;
    const [countdownPlayer1, setCountdownPlayer1] = useState(minutes*60);
    const [countdownPlayer2, setCountdownPlayer2] = useState(minutes*60);
    const [player1Turn, setPlayer1Turn] = useState(true)
    const [player2Turn, setPlayer2Turn] = useState(false)
    const [buttonTitle, setButtonTitle] = useState('| |')
    const [paused, setPaused] = useState(false)
    const [lastTurn, setLastTurn] = useState(null)
    const navigation = useNavigation();

    const [textStylesPlayer1, setTextStylesPlayer1] = useState({
        backgroundColor: 'lightgreen',
        color: 'black',
        width: '100%',
        height: '100%',
        justifyContent: 'center',
        alignItems: 'center',
      });
    
      const [textStylesPlayer2, setTextStylesPlayer2] = useState({
        backgroundColor: 'lightgrey',
        color: 'black',
        width: '100%',
        height: '100%',
        justifyContent: 'center',
        alignItems: 'center',
      });

      const startTimeRef = useRef(Date.now()); // Keep track of start time

      useEffect(() => {
        const timer = setInterval(() => {
          const currentTime = Date.now();
          const elapsedTime = (currentTime - startTimeRef.current) / 1000;
    
          if (player1Turn) {
            setCountdownPlayer1((prevCountdown) => {
              const remaining = prevCountdown - elapsedTime;
              return remaining > 0 ? remaining : 0;
            });
          } else if (player2Turn) {
            setCountdownPlayer2((prevCountdown) => {
              const remaining = prevCountdown - elapsedTime;
              return remaining > 0 ? remaining : 0;
            });
          }
    
          startTimeRef.current = currentTime; 
        }, 100); 
    
        return () => clearInterval(timer);
      }, [player1Turn, player2Turn]);

    const formatTime = seconds => {
        const minutes = Math.floor(seconds / 60);
        const remainingSeconds = seconds % 60;

        if (minutes <= 0 && seconds <= 0)
        { 
          navigation.navigate('EndScreen', { p1: countdownPlayer1, p2: countdownPlayer2 });
        }

        if (minutes == 0 && remainingSeconds < 30)
        {
            return `${minutes}:${remainingSeconds.toFixed(1) < 10 ? '0' : ''}${remainingSeconds.toFixed(1)}`;
        }
        return `${minutes}:${Math.trunc(remainingSeconds) < 10 ? '0' : ''}${Math.trunc(remainingSeconds)}`;
    };

    function back()
    {
      navigation.navigate('Home', { minutes: minutes, additional: additional });
    }

    function pauseToggle()
    {
      if (!paused)
      {
        setButtonTitle('▶')
        if (player1Turn) setLastTurn('player1')
        if (player2Turn) setLastTurn('player2')
        setPlayer1Turn(false)
        setPlayer2Turn(false)
        setPaused(true)
  
        setTextStylesPlayer1({
          backgroundColor: 'lightgrey',
          color: 'white',
          width: '100%',
          height: '100%',
          justifyContent: 'center',
          alignItems: 'center',
        })
  
        setTextStylesPlayer2({
          backgroundColor: 'lightgrey',
          color: 'black',
          width: '100%',
          height: '100%',
          justifyContent: 'center',
          alignItems: 'center',
        })  
      }
      else
      {
        setButtonTitle('| |')
        if (lastTurn == "player1")
        {
          setPlayer1Turn(true)

          setTextStylesPlayer1({
            backgroundColor: 'lightgreen',
            color: 'white',
            width: '100%',
            height: '100%',
            justifyContent: 'center',
            alignItems: 'center',
          })
        } 
        else 
        {
          setPlayer2Turn(true)

          setTextStylesPlayer2({
            backgroundColor: 'lightgreen',
            color: 'black',
            width: '100%',
            height: '100%',
            justifyContent: 'center',
            alignItems: 'center',
          }) 
        }
        setPaused(false)
      }
    }

    function turnChangep1()
    {
        if (player2Turn) return 0;
        if (paused) return 0;
        setPlayer1Turn(!player1Turn)
        setPlayer2Turn(!player2Turn)

        setCountdownPlayer1(countdownPlayer1 + additional)

        setTextStylesPlayer1({
            backgroundColor: 'lightgrey',
            color: 'white',
            width: '100%',
            height: '100%',
            justifyContent: 'center',
            alignItems: 'center',
        })

        setTextStylesPlayer2({
            backgroundColor: 'lightgreen',
            color: 'black',
            width: '100%',
            height: '100%',
            justifyContent: 'center',
            alignItems: 'center',
        })       
    }

    function turnChangep2()
    {
        if (player1Turn) return 0
        if (paused) return 0
        setPlayer1Turn(!player1Turn)
        setPlayer2Turn(!player2Turn)

        setCountdownPlayer2(countdownPlayer2 + additional)

        setTextStylesPlayer1({
            backgroundColor: 'lightgreen',
            color: 'black',
            width: '100%',
            height: '100%',
            justifyContent: 'center',
            alignItems: 'center',
        })

        setTextStylesPlayer2({
            backgroundColor: 'lightgrey',
            color: 'black',
            width: '100%',
            height: '100%',
            justifyContent: 'center',
            alignItems: 'center',
        })   
    }

    return (
        <View style={{ height: '100%', width: '100%', position: 'relative', backgroundColor: '#3A3B3C'}}>
          <View style={{ height: '50%' }}>
            <TouchableOpacity onPress={turnChangep2} style={styles.overlay}>
              <View
                style={{...textStylesPlayer2}}>
                <Text style={{ fontSize: 110, transform: [{ rotate: '180deg' }] }}>
                  {formatTime(countdownPlayer2)}
                </Text>
              </View>
            </TouchableOpacity>
          </View>

          <View style={styles.inlineButtons}>
          <CustomButton title={buttonTitle} onPress={() => pauseToggle()}/>
          <CustomButton title="Exit" onPress={() => back()}/>
          </View>

          <View style={{ height: '50%' }}>
            <TouchableOpacity onPress={turnChangep1} style={styles.overlay}>
              <View style={{...textStylesPlayer1}}>
                <Text style={{ fontSize: 110 }}>{formatTime(countdownPlayer1)}</Text>
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