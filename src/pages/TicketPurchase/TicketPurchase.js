import React, { useState } from 'react';
import { View, ScrollView } from 'react-native';
import { TextInput, Button, HelperText, Snackbar, ActivityIndicator,Text } from 'react-native-paper';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

const PaymentScreen = ({ navigation, route }) => {
  const [cardNumber, setCardNumber] = useState('');
  const [cardName, setCardName] = useState('');
  const [expiryMonth, setExpiryMonth] = useState('');
  const [expiryYear, setExpiryYear] = useState('');
  const [cvv, setCvv] = useState('');
  const [loading, setLoading] = useState(false);
  const [snackbarVisible, setSnackbarVisible] = useState(false);
  const [snackbarText, setSnackbarText] = useState('');
  const{totalPrice,selectedSeats}=route.params
  console.log(selectedSeats)
  const handlePayButtonPress = () => {
   
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      setSnackbarText('Ödeme Başarılı ');
      setSnackbarVisible(true);
      setTimeout(() => {
        setSnackbarVisible(false);
        navigation.navigate('TicketSearch');
      }, 2000);
    }, 1000);
  };

  return (
    <ScrollView style={{ margin: 10, marginTop: 50 }}>
   <Text style={{ textAlign: 'center', marginBottom: 10, fontSize: 50,color:'gray' }}>
  {selectedSeats.length > 0 ? selectedSeats.join("-") : ""}
</Text>

    <Text style={{ textAlign: 'center', marginBottom: 10, fontSize: 20,color:'gray' }}>Numaralı Koltuk</Text>
    <View style={{ padding: 5, margin: 5 }}>
      <TextInput
        label="Kart Numarası"
        value={cardNumber}
        onChangeText={setCardNumber}
        keyboardType="numeric"
        maxLength={16}
        style={{ marginBottom: 10 }}
        left={
          <TextInput.Icon
            name="credit-card"
            style={{marginRight: 10,}}
            icon={({ size, color }) => (
              <Icon name={'credit-card'} size={size} color={color} />
            )}
          />
        }
      />
      <TextInput
        label="Kart Sahibi Adı"
        value={cardName}
        onChangeText={setCardName}
        style={{ marginBottom: 10 }}
        left={
          <TextInput.Icon
            name="account"
            style={{marginRight: 10,}}
            icon={({ size, color }) => (
              <Icon name={'account'} size={size} color={color} />
            )}
          />
        }
      />
      <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginBottom: 10 }}>
        <TextInput
          label="Son Kullanma Ayı"
          value={expiryMonth}
          onChangeText={setExpiryMonth}
          keyboardType="numeric"
          maxLength={2}
          style={{ flex: 1, marginRight: 8 }}
          left={
            <TextInput.Icon
              name="calendar-month"
              style={{marginRight: 10,}}
              icon={({ size, color }) => (
                <Icon name={'calendar-month'} size={size} color={color} />
              )}
            />
          }
        />
        <TextInput
          label="Son Kullanma Yılı"
          value={expiryYear}
          onChangeText={setExpiryYear}
          keyboardType="numeric"
          maxLength={4}
          style={{ flex: 1 }}
          left={
            <TextInput.Icon
              name="calendar"
              style={{marginRight: 10,}}
              icon={({ size, color }) => (
                <Icon name={'calendar'} size={size} color={color} />
              )}
            />
          }
        />
      </View>
      <TextInput
        label="CVV"
        value={cvv}
        onChangeText={setCvv}
        keyboardType="numeric"
        maxLength={3}
        style={{ marginBottom: 10 }}
        left={
          <TextInput.Icon
            name="lock"
            style={{marginRight: 10,}}
            icon={({ size, color }) => (
              <Icon name={'lock'} size={size} color={color} />
            )}
          />
        }
      />
      <Button mode="contained" onPress={handlePayButtonPress} style={{ marginTop: 16 }}>
        Öde {totalPrice}$
      </Button>
    </View>
    <Snackbar visible={snackbarVisible} onDismiss={() => setSnackbarVisible(false)}>
      {snackbarText}
    </Snackbar>
    {loading && (
      <View style={{ position: 'absolute', top: 0, left: 0, right: 0, bottom: 0, alignItems: 'center', justifyContent: 'center' }}>
        <ActivityIndicator animating={true} />
      </View>
    )}
  </ScrollView>
  
  );
};

export default PaymentScreen;
