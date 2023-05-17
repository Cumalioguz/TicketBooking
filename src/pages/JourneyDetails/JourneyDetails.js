
import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ToastAndroid, ScrollView, Alert } from 'react-native';
import { Avatar, Button, Card, Paragraph } from 'react-native-paper';

import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import Sefers from '../../Datas/Sefers.json';

const JourneyDetails = ({ route, navigation }) => {
  const [selectedSeats, setSelectedSeats] = useState([]);
  const [totalPrice, setTotalPrice] = useState(0);
  const [isMaleSelected, setIsMaleSelected] = useState(false);
  const [isFemaleSelected, setIsFemaleSelected] = useState(false);
  const [genderSelect, setGenderSelect] = useState(null)




  const { id } = route.params;
  /*const [sefer, setSefer] = useState({
    from: 'Source',
    to: 'Destination',
    date: '01/01/2023',
    time: '12:00 PM',
    seatPrice: 10,
    seats: {
      1: 'male',
      2: 'female',
      3: 'empty',
      4: 'empty',
      5: 'empty',
      6: 'empty',
      7: 'male',
      8: 'empty',
      9: 'female',
      10: 'empty',
      11: 'male',
      12: 'female',
      13: 'empty',
      14: 'empty',
      15: 'empty',
      16: 'empty',
      17: 'male',
      18: 'empty',
    },
  });*/
  const [sefer, setSefer] = useState(null);

  const convertSeferToFormat = (sefer) => {
    const { from, to, date, time, seatPrice, seats } = sefer;

    const formattedSeats = {};
    for (let i = 0; i < seats.length; i++) {
      formattedSeats[i + 1] = seats[i];
    }

    const formattedSefer = {
      id: sefer.id,
      bus: sefer.bus,
      from: from,
      to: to,
      date: date,
      time: time,
      seatPrice: seatPrice,
      seats: formattedSeats,
    };

    return formattedSefer;
  };


  useEffect(() => {
    const tempsefer = Sefers.find((sefer) => sefer.id === id);
    if (tempsefer) {
      setSefer(convertSeferToFormat(tempsefer))
      console.log(sefer);
    } else {
      console.log('Sefer bulunamadı');
    }
  }, [id]);
  console.log(sefer);

  const temizle = () => {
    
    const updatedSeats = { ...sefer.seats };
    selectedSeats.forEach((seatNumber) => {
      updatedSeats[seatNumber] = 'empty';
    });

   
    setSefer((prevSefer) => ({
      ...prevSefer,
      seats: updatedSeats,
    }));

   
    setSelectedSeats([]);
    setIsMaleSelected(false);
    setIsFemaleSelected(false);
    tempTotal = totalPrice
    if (selectedSeats.length > 0) {
      setTotalPrice(0);
    }
    else { setTotalPrice(tempTotal) }
  };

  const handleGenderSelection = (gender) => {
    if (gender === 'male') {
      setIsMaleSelected(true);
      setIsFemaleSelected(false);
      setGenderSelect("male");
    } else if (gender === 'female') {
      setIsMaleSelected(false);
      setIsFemaleSelected(true);
      setGenderSelect("female")
    } else {
      setIsMaleSelected(false);
      setIsFemaleSelected(false);
    }
    setSefer((prevSefer) => ({
      ...prevSefer,
      selectedGender: gender,
    }));
  };


  const handleSeatSelection = (seatNumber, seatPrice, genderSelect) => {
    if (isMaleSelected || isFemaleSelected) {
      if (selectedSeats.includes(seatNumber)) {
        setSefer((prevSefer) => ({
          ...prevSefer,
          seats: {
            ...prevSefer.seats,
            [seatNumber]: prevSefer.selectedGender,
          },
        }));
      } else if (selectedSeats.length < 5) {
        setSelectedSeats((prevSelectedSeats) => [...prevSelectedSeats, seatNumber]);
        setTotalPrice((prevTotalPrice) => prevTotalPrice + seatPrice);
      } else {
        ToastAndroid.show('En fazla 5 koltuk seçebilirsiniz', ToastAndroid.SHORT);
      }
    } else {
      Alert.alert('Cinsiyet Seçimi', 'Lütfen önce cinsiyetinizi seçin.');
    }
  };
  

  console.log(selectedSeats.length)

  const handleProceedToPayment = () => {
    if (selectedSeats.length === 0) {
      ToastAndroid.show('Lütfen Bir koltuk seçin', ToastAndroid.SHORT);
      return;
    }
   
    navigation.navigate('TicketPurchase', { sefer, selectedSeats ,totalPrice});
  };
  if (!sefer) {
    return <Text>Sefer bilgileri yükleniyor...</Text>;
  }
  return (
    <ScrollView style={styles.container}>
      <Card style={styles.card}>
        <Card.Title title={`${sefer.from} - ${sefer.to}`} subtitle={`Tarih: ${sefer.date}, Saat: ${sefer.time}`} />

        <Card.Content >
          <View style={styles.genderContainer}>
            <TouchableOpacity
              style={[styles.genderButton, isMaleSelected && styles.selectedGenderButton]}
              onPress={() => handleGenderSelection('male')}
            >

              <Avatar.Icon size={40} icon="human-male" color="#fff" />
            </TouchableOpacity>
            <TouchableOpacity
              style={[styles.genderButton, isFemaleSelected && styles.selectedGenderButton]}
              onPress={() => handleGenderSelection('female')}
            >
              <Avatar.Icon size={40} icon="human-female" color="#fff" />
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.genderButton}
              onPress={temizle}
            >
              <Avatar.Icon size={40} icon="bucket-outline" color="#fff" />
            </TouchableOpacity>
          </View>

          <View style={styles.seatRow}>
            <View style={styles.iconConteiner}>

              <Icon name="steering" size={50} color="black" />

            </View>
            {Array.from({ length: 6 }, (_, index) => (

              <View key={index} style={styles.seatRowContainer}>
                <TouchableOpacity
                  style={[
                    styles.seat,
                    selectedSeats.includes(3 * index + 1) && styles.selectedSeat,
                    sefer.seats[3 * index + 1] !== 'empty' && styles.disabledSeat,
                  ]}
                  disabled={sefer.seats[3 * index + 1] !== 'empty'}
                  onPress={() => handleSeatSelection(3 * index + 1, sefer.seatPrice)}
                >
                  {sefer.seats[3 * index + 1] === 'empty' && (
                    <Avatar.Icon
                      size={40}
                      icon={
                        selectedSeats.includes(3 * index + 1)
                          ? (genderSelect === 'male' ? 'human-male' : 'human-female') : 'seat'}
                      color="#fff"
                    />
                  )}
                  {sefer.seats[3 * index + 1] === 'male' && <Avatar.Icon size={40} icon="human-male" color="#fff" />}
                  {sefer.seats[3 * index + 1] === 'female' && <Avatar.Icon size={40} icon="human-female" color="#fff" />}

                  <Text>{3 * index + 1}</Text>
                </TouchableOpacity>

                <View />

                <TouchableOpacity
                  style={[
                    styles.seat,
                    selectedSeats.includes(3 * index + 2) && styles.selectedSeat,
                    sefer.seats[3 * index + 2] !== 'empty' && styles.disabledSeat,
                  ]}
                  disabled={sefer.seats[3 * index + 2] !== 'empty'}
                  onPress={() => handleSeatSelection(3 * index + 2, sefer.seatPrice, genderSelect)}
                >
                  {sefer.seats[3 * index + 2] === 'empty' && (
                    <Avatar.Icon
                      size={40}
                      icon={
                        selectedSeats.includes(3 * index + 2)
                          ? (genderSelect === 'male' ? 'human-male' : 'human-female') : 'seat'}
                      color="#fff"
                    />
                  )}
                  {sefer.seats[3 * index + 2] === 'male' && <Avatar.Icon size={40} icon="human-male" color="#fff" />}
                  {sefer.seats[3 * index + 2] === 'female' && <Avatar.Icon size={40} icon="human-female" color="#fff" />}
                  <Text>{3 * index + 2}</Text>
                </TouchableOpacity>

                <View style={styles.seatSpacer} />

                <TouchableOpacity
                  style={[
                    styles.seat,
                    selectedSeats.includes(3 * index + 3) && styles.selectedSeat,
                    sefer.seats[3 * index + 3] !== 'empty' && styles.disabledSeat,
                  ]}
                  disabled={sefer.seats[3 * index + 3] !== 'empty'}
                  onPress={() => handleSeatSelection(3 * index + 3, sefer.seatPrice)}
                >
                  {sefer.seats[3 * index + 3] === 'empty' && (
                    <Avatar.Icon
                      size={40}
                      icon={
                        selectedSeats.includes(3 * index + 3)
                          ? (genderSelect === 'male' ? 'human-male' : 'human-female') : 'seat'}
                      color="#fff"
                    />
                  )}
                  {sefer.seats[3 * index + 3] === 'male' && <Avatar.Icon size={40} icon="human-male" color="#fff" />}
                  {sefer.seats[3 * index + 3] === 'female' && <Avatar.Icon size={40} icon="human-female" color="#fff" />}
                  <Text>{3 * index + 3}</Text>
                </TouchableOpacity>
              </View>
            ))}
          </View>
        </Card.Content>
        <Card.Actions>
          <Button mode="contained" onPress={handleProceedToPayment}>
            Satın Al {totalPrice}
          </Button>

        </Card.Actions>
      </Card>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    margin: 16

  },
  iconConteiner: {
    flex: 1,

    flexDirection: 'row',
    justifyContent: 'flex-end',
    marginBottom: 40,
    marginTop: 5,



  },
  card: {
    marginVertical: 20,
    flex: 1,


  },
  genderContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginBottom: 16,

  },
  genderButton: {
    backgroundColor: '#BDBDBD',
    paddingHorizontal: 20,
    paddingVertical: 15,
    borderRadius: 20,
  },
  selectedGenderButton: {
    backgroundColor: '#81C784',
  },

  genderButtonText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#fff',

  },
  seatRow: {
    flex: 1,
    //flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 16,

    alignItems: 'center',
    backgroundColor: '#dcdcdc',
    borderWidth: 1,
    borderColor: 'gray',
    borderRadius: 5,
    paddingBottom: 20,
    borderTopLeftRadius:100,
    borderTopRightRadius:100


  },
  seatRowContainer: {
    flexDirection: 'row',
    margin: 5,
    padding: 2

    //alignItems: 'center',
  },
  seat: {
    width: 70,
    height: 70,
    borderRadius: 20,
    backgroundColor: '#ccc',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 4,

  },
  selectedSeat: {
    backgroundColor: 'green',
  },
  disabledSeat: {
    backgroundColor: '#e74c3c',
  },
  seatSpacer: {
    width: 50, // Boşluk genişliği
  },
});

export default JourneyDetails;