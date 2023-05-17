import React from 'react';
import { View, StyleSheet } from 'react-native';
import { Button, Text, TextInput } from 'react-native-paper';
import DateTimePicker from '@react-native-community/datetimepicker'
import Icon from 'react-native-vector-icons/Entypo';;

const TicketSearch = ({navigation,route}) => {
  const [from, setFrom] = React.useState('');
  const [to, setTo] = React.useState('');
  const [date, setDate] = React.useState(new Date());
  const [showDatePicker, setShowDatePicker] = React.useState(false);
  

  const handleSearch = () => {
    if (!from || !to || !date) {
      alert('Please fill in all fields.');
      return;
    }
    else
    navigation.navigate('JourneyList',{from,to,date});

    
  };
  const handleSwap = () => {
    const temp = from;
    setFrom(to);
    setTo(temp);
  };

  const handleDateChange = (_, selectedDate) => {
    const currentDate = selectedDate || date;
    setShowDatePicker(false);
    setDate(currentDate);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.girisYapText}>Bilet Ara</Text>
      
      <TextInput
        label="Nereden"
        value={from}
        onChangeText={(text) => setFrom(text)}
        style={styles.input}
        left={
          <TextInput.Icon
            name="location-pin"
            style={styles.inputIcon}
            icon={({ size, color }) => (
              <Icon name={'location-pin'} size={size} color={color} />
            )}
          />
        }
      />
      <Button icon="swap-vertical"  onPress={handleSwap} style={styles.swapButton}>
        
      </Button>
      <TextInput
        label="Nereye"
        value={to}
        onChangeText={(text) => setTo(text)}
        style={styles.input}
        left={
          <TextInput.Icon
            name="location-pin"
            style={styles.inputIcon}
            icon={({ size, color }) => (
              <Icon name={'location-pin'} size={size} color={color} />
            )}
          />
        }
      />
      <Button
        icon="calendar"
        mode="outlined"
        onPress={() => setShowDatePicker(true)}
        style={styles.datePickerButton}
      >
        {date.toDateString()}
      </Button>
      {showDatePicker && (
        <DateTimePicker
          value={date}
          mode="date"
          display="default"
          onChange={handleDateChange}
        />
      )}
      <Button mode="contained" onPress={handleSearch} style={styles.searchButton}>
        Otobüs Bileti Bul
      </Button>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  girisYapText: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 16,
  },
  title: {
    marginBottom: 20,
    fontSize:15
  },
  input: {
    marginBottom: 20,
    width: '100%',
  },
  datePickerButton: {
    marginBottom: 20,
    width: '100%',
  },
  searchButton: {
    width: '100%',
  },
  swapButton: {
    width: '10%',
    alignSelf: 'flex-end',
    alignItems:'center',
    marginBottom:6
  },
});

export default TicketSearch;
