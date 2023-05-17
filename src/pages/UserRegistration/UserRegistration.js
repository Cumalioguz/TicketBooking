import React, { useState } from 'react';
import { View, StyleSheet } from 'react-native';
import { TextInput, Button, RadioButton, Text } from 'react-native-paper';
import DateTimePickerModal from "react-native-modal-datetime-picker";
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';



const RegisterScreen = ({navigation}) => {
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [selectedGender, setSelectedGender] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [birthDate, setBirthDate] = useState(new Date());
  const [isDatePickerVisible, setDatePickerVisibility] = useState(false);
  const [passwordError, setPasswordError] = useState(false);
  const [emailError, setEmailError] = useState(false);

  const showDatePicker = () => {
    setDatePickerVisibility(true);
  };

  const hideDatePicker = () => {
    setDatePickerVisibility(false);
  };

  const handleConfirm = (date) => {
    setBirthDate(date);
    hideDatePicker();
  };

  const handleRegister = () => {
    if (email.trim() === '') {
      setEmailError(true);
    } else {
      setEmailError(false);
    
    if (password !== confirmPassword) {
      setPasswordError(true);
      
      return;

    }

    const newUser = {
      firstName,
      lastName,
      gender: selectedGender,
      email,
      password,
      birthDate :new Date().toISOString(), 
    };

    //console.log(newUser); 
    navigation.navigate('UserLogin',{newUser});
    }
  };

  return (
    <View style={styles.container}>
       <Text style={styles.girisYapText}>Kayıt Ol</Text>
      
      <TextInput
        label="Ad"
        value={firstName}
        onChangeText={text => setFirstName(text)}
        style={styles.input}
        left={
          <TextInput.Icon
            name="account"
            style={styles.inputIcon}
            icon={({ size, color }) => (
              <Icon name={'account'} size={size} color={color} />
            )}
          />
        }
      />
      <TextInput
        label="Soyad"
        value={lastName}
        onChangeText={text => setLastName(text)}
        style={styles.input}
        
        left={
          <TextInput.Icon
            name="account"
            style={styles.inputIcon}
            icon={({ size, color }) => (
              <Icon name={'account'} size={size} color={color} />
            )}
          />
        }
      />
      
      <TextInput
        label="E-posta"
        value={email}
        onChangeText={text => setEmail(text)}
        style={styles.input}
        error={emailError}
        left={
          <TextInput.Icon
            name="email"
            style={styles.inputIcon}
            icon={({ size, color }) => (
              <Icon name={'email'} size={size} color={color} />
            )}
          />
        }
        keyboardType="email-address"
      />
      {emailError && <Text style={styles.errorMessage}>E-posta alanı boş bırakılamaz.</Text>}
      <TextInput
        label="Şifre"
        value={password}
        secureTextEntry
        onChangeText={text => setPassword(text)}
        style={styles.input}
        left={
          <TextInput.Icon
            name="lock"
            style={styles.inputIcon}
            icon={({ size, color }) => (
              <Icon name={'lock'} size={size} color={color} />
            )}
          />
        }
        
      />
      <TextInput
        label="Şifre Tekrarı"
        value={confirmPassword}
        secureTextEntry
        onChangeText={text => setConfirmPassword(text)}
        style={styles.input}
        error={passwordError}
        left={
          <TextInput.Icon
            name="lock"
            style={styles.inputIcon}
            icon={({ size, color }) => (
              <Icon name={'lock'} size={size} color={color} />
            )}
          />
        }
      />
      {passwordError && <Text style={styles.errorMessage}>Şifreler uyuşmuyor.</Text>}
      <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
  <View style={styles.radioContainer}>
    <Text style={styles.radioTitle}>Cinsiyet</Text>
    <RadioButton.Group onValueChange={value => setSelectedGender(value)} value={selectedGender}>
      <View style={styles.innerContainer}>
        <View style={styles.radioRow}>
          <Text style={styles.radioDesc}>Erkek</Text>
          <RadioButton value="male" />
        </View>
        <View style={styles.radioRow}>
          <Text style={styles.radioDesc}>Kadın</Text>
          <RadioButton value="female" />
        </View>
      </View>
    </RadioButton.Group>
  </View>
  <View>
    
    <Text style={styles.radioTitle}>Doğum Tarihi</Text>
    <Button onPress={showDatePicker} style={styles.dateButton}>
      <Text style={styles.radioDesc}>  {birthDate.toLocaleDateString()}</Text>
     
    </Button>
    <DateTimePickerModal
      isVisible={isDatePickerVisible}
      mode="date"
      onConfirm={handleConfirm}
      onCancel={hideDatePicker}
    />
  </View>
</View>
      <Button mode="contained" onPress={handleRegister} style={styles.button}>
        
        Kayıt Ol
</Button>
</View>
);
};

const styles = StyleSheet.create({
container: {
flex: 1,
padding: 20,
margin:10,
marginTop:60
},
girisYapText: {
  fontSize: 24,
  fontWeight: 'bold',
  marginBottom: 16,
},
input: {
marginBottom: 10,
color:'blue'
},
radioContainer: {
marginBottom: 10,
},
innerContainer: {
  flexDirection:'row'
  },
radioTitle: {
fontSize: 16,
fontWeight: 'bold',
marginBottom: 5,


},
radioDesc: {
  fontSize: 14,
 
  marginBottom: 5,
  
  
  },
radioRow: {
flexDirection: 'row',
alignItems: 'center',
marginBottom: 5,
},
dateButton: {
//marginTop: 10,
marginBottom: 12,
marginRight:5,
width:'100%',
},
button: {
marginTop: 10,
},
errorMessage: {
color: 'red',
marginBottom: 10,
},
});

export default RegisterScreen;