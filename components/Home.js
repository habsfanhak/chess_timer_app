import { View, Text, TouchableOpacity, StyleSheet, Button } from "react-native";
import { useState } from "react";
import { useNavigation } from '@react-navigation/native';

const CustomButton = ({ title, onPress, isSelected }) => {
    const buttonStyles = isSelected ? styles.selectedButton : styles.button;
  
    return (
      <TouchableOpacity style={buttonStyles} onPress={onPress}>
        <Text style={styles.buttonText}>{title}</Text>
      </TouchableOpacity>
    );
  };

export default function Home() {
    const [minutes, setMinutes] = useState(0)
    const [additional, setAdditional] = useState(0)
    const [selectedButton, setSelectedButton] = useState(null);
    const navigation = useNavigation();

    const handleButtonPress = (mins, adds) => {
        setMinutes(mins)
        setAdditional(adds)
        setSelectedButton(`${mins}_${adds}`); // Set the selected button identifier
    }

    function handleSubmit()
    {
        navigation.navigate('Clock', { minutes: minutes, additional: additional });
    }

  return (
    <View style={styles.container}>
        <View style={styles.buttonContainer}>
            <Text style={styles.textStyle}>
                Bullet
            </Text>
            <View style={styles.inlineButtons}>
                <CustomButton title="1 min" onPress={() => handleButtonPress(1, 0)} isSelected={selectedButton === '1_0'}/>
                <View style={styles.buttonSpacing} />
                <CustomButton title="1 | 1" onPress={() => handleButtonPress(1, 1)} isSelected={selectedButton === '1_1'}/>
                <View style={styles.buttonSpacing} />
                <CustomButton title="2 | 1" onPress={() => handleButtonPress(2, 1)} isSelected={selectedButton === '2_1'}/>
            </View>
        </View>

        <View style={styles.buttonContainer}>
            <Text style={styles.textStyle}>
                Blitz
            </Text>
            <View style={styles.inlineButtons}>
                <CustomButton title="3 min" onPress={() => handleButtonPress(3, 0)} isSelected={selectedButton === '3_0'}/>
                <View style={styles.buttonSpacing} />
                <CustomButton title="3 | 2" onPress={() => handleButtonPress(3, 2)} isSelected={selectedButton === '3_2'}/>
                <View style={styles.buttonSpacing} />
                <CustomButton title="5 min" onPress={() => handleButtonPress(5, 0)} isSelected={selectedButton === '5_0'}/>
            </View>
        </View>

        <View style={styles.buttonContainer}>
            <Text style={styles.textStyle}>
                Rapid
            </Text>
            <View style={styles.inlineButtons}>
                <CustomButton title="10 min" onPress={() => handleButtonPress(10, 0)} isSelected={selectedButton === '10_0'}/>
                <View style={styles.buttonSpacing} />
                <CustomButton title="15 | 10" onPress={() => handleButtonPress(15, 10)} isSelected={selectedButton === '15_10'}/>
                <View style={styles.buttonSpacing} />
                <CustomButton title="30 min" onPress={() => handleButtonPress(30, 0)} isSelected={selectedButton === '30_0'}/>
            </View>
        </View>

        <Button 
            title="Start Match"
            color="#5DBB63"
            onPress={handleSubmit}
            >            
        </Button>

    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "flex-start",
    alignItems: "center",
    backgroundColor: '#3A3B3C',
    paddingTop: '15%',
  },
  buttonContainer: {
    width: "100%",
    height: "25%",
    justifyContent: "center",
    alignItems: "center",
  },
  inlineButtons: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
  },
  button: {
    width: 100, 
    height: 40, 
    backgroundColor: 'grey',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 5,
  },
  buttonText: {
    color: 'white',
    fontSize: 16,
    textAlign: 'center',
  },
  buttonSpacing: {
    marginHorizontal: 5,
  },
  textStyle: {
    textAlign: 'left',
    color: 'white',
    alignSelf: 'flex-start', 
    marginLeft: 20,
    marginBottom: 5,
    fontSize: 20
  },
  topPadding: {
    marginTop: 60,
    paddingTop: 60
  },
  selectedButton: {
    width: 100,
    height: 40,
    backgroundColor: '#5DBB63', 
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 5,
  },
});
