import { StyleSheet, Text, View, TouchableOpacity } from 'react-native';
import React, { useState, useEffect } from 'react';

export default function TopSquare()
{
    const [countdownPlayer1, setCountdownPlayer1] = useState(300);
    const [countdownPlayer2, setCountdownPlayer2] = useState(300);
    const [player1Turn, setPlayer1Turn] = useState(true)
    const [player2Turn, setPlayer2Turn] = useState(false)

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

    useEffect(() => {
        const timer = setInterval(() => {
            if (player1Turn)
            {
                setCountdownPlayer1(prevCountdown => {
                    if (prevCountdown > 0) {
                        return prevCountdown - 0.1;
                    }
                    return 0;
                    });
            }
            else if (player2Turn)
            {
                setCountdownPlayer2(prevCountdown => {
                    if (prevCountdown > 0) {
                        return prevCountdown - 0.1;
                    }
                    return 0;
                    });
            }
        }, 100); 
    
        return () => clearInterval(timer); 
      }, [player1Turn, player2Turn, countdownPlayer1, countdownPlayer2]);

    const formatTime = seconds => {
        const minutes = Math.floor(seconds / 60);
        const remainingSeconds = seconds % 60;

        if (minutes <= 0 && seconds <= 0)
        {
            return "L"
        }

        if (minutes == 0 && remainingSeconds < 30)
        {
            return `${minutes}:${remainingSeconds.toFixed(1) < 10 ? '0' : ''}${remainingSeconds.toFixed(1)}`;
        }
        return `${minutes}:${Math.trunc(remainingSeconds) < 10 ? '0' : ''}${Math.trunc(remainingSeconds)}`;
    };

    function turnChangep1()
    {
        if (player2Turn) return 0;
        setPlayer1Turn(!player1Turn)
        setPlayer2Turn(!player2Turn)

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
        setPlayer1Turn(!player1Turn)
        setPlayer2Turn(!player2Turn)

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
        <View style={{ height: '100%', width: '100%', position: 'relative' }}>
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
        ...StyleSheet.absoluteFillObject, // Overlay the entire view
        backgroundColor: 'transparent', // Make it invisible
      },
    });