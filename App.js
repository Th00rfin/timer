      import React, { useState, useEffect } from 'react';
      import { Text, View, ScrollView, StyleSheet, Button } from 'react-native';

      const TimerComponent = () => {
        const [seconds, setSeconds] = useState(59);
        const [minutes, setMinutes] = useState(59);
        const [hours, setHours] = useState(23);
        const [isRunning, setIsRunning] = useState(false);

        useEffect(() => {
          let timer;
          if (isRunning) {
            timer = setInterval(() => {
              if (seconds > 0) {
                setSeconds(prevSeconds => prevSeconds - 1);
              } else {
                if (minutes > 0) {
                  setMinutes(prevMinutes => prevMinutes - 1);
                  setSeconds(59);
                } else {
                  if (hours > 0) {
                    setHours(prevHours => prevHours - 1);
                    setMinutes(59);
                    setSeconds(59);
                  } else {
                    setIsRunning(false);
                  }
                }
              }
            }, 1000);
          }
          return () => clearInterval(timer);
        }, [isRunning, seconds, minutes, hours]);

        const handleStart = () => {
          setIsRunning(true);
        };

        const handleStop = () => {
          setIsRunning(false);
        };

        const createScrollItems = (num) => {
          let items = [];
          for (let i = 0; i <= num; i++) {
            items.push(<Text key={i} style={styles.text}>{i}</Text>);
          }
          return items;
        };

        return (
          <View style={styles.container}>
            <ScrollView contentContainerStyle={styles.scrollContainer}>
              <View>
                {createScrollItems(23)}
              </View>
              <View>
                {createScrollItems(59)}
              </View>
              <View>
                {createScrollItems(59)}
              </View>
            </ScrollView>
            <View style={styles.timerDisplay}>
              <Text style={styles.timerText}>{`${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`}</Text>
            </View>
            <View style={styles.buttonContainer}>
              <Button onPress={handleStart} title="Start" />
              <Button onPress={handleStop} title="Stop" />
            </View>
          </View>
        );
      };

      const styles = StyleSheet.create({
        container: {
          flex: 1,
          justifyContent: 'center',
          alignItems: 'center',
          padding: 16,
        },
        scrollContainer: {
          flexDirection: 'row',
          justifyContent: 'center',
          alignItems: 'center',
        },
        text: {
          fontSize: 24,
          margin: 5,
        },
        timerDisplay: {
          marginVertical: 20,
        },
        timerText: {
          fontSize: 48,
          fontWeight: 'bold',
        },
        buttonContainer: {
          flexDirection: 'row',
          justifyContent: 'space-between',
          width: '60%',
        },
      });

      export default TimerComponent;
