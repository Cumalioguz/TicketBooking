import React, { useState } from 'react';
import { View, StyleSheet, Alert ,Image} from 'react-native';
import { TextInput, Button, Text } from 'react-native-paper';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

//import users from '../../Datas/Users.json'

const LoginScreen = ({ navigation, route }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [emailError, setEmailError] = useState(false);
  const [passwordError, setPasswordError] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const { newUser } = route.params || {
    firstName: '',
    lastName: '',
    gender: '',
    email: '',
    password: '',
    birthDate: '',
  };
  console.log("yeni kullanıcı" + newUser)

  const handleSelect = () => {

    navigation.navigate('UserRegistration');
  };


  const handleLogin = () => {
    let emailMatched = false;
    let passwordMatched = false;

    if (email.trim() === '') {
      setEmailError(true);
    } else {
      setEmailError(false);
      if (newUser.email === email) {
        emailMatched = true;
        if (newUser.password === password) {
          passwordMatched = true;
        }
      }
    }

    if (!emailMatched) {
      Alert.alert('Hata', 'Kullanıcı bulunamadı.');
    } else if (!passwordMatched) {
      Alert.alert('Hata', 'Şifre yanlış.');
    } else {
      //Alert.alert('Başarılı', 'Giriş başarılı!');
      navigation.navigate('TicketSearch');
      setEmail('');
      setPassword('');
    }
  };

  return (
    <View style={styles.container}>
        <Image source={require('../../e-bUS.png')} style={styles.logo} resizeMode="contain" />
        <Text style={styles.girisYapText}>Giriş Yap</Text>
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
        
      />
      {emailError && <Text style={styles.errorMessage}>E-posta alanı boş bırakılamaz.</Text>}
      <TextInput
        label="Şifre"
        value={password}
        secureTextEntry={!showPassword}
        onChangeText={text => setPassword(text)}
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
        right={

          <TextInput.Icon
            name={showPassword ? 'eye-off' : 'eye'}
            onPress={() => setShowPassword(!showPassword)}
            style={{ marginRight: 10 }}
            icon={({ size, color }) => (
              <Icon name={showPassword ? 'eye-off' : 'eye'} size={size} color={color} />
            )}
          />
        }
      />
      <View style={{flexDirection:'row'}}> 
      
      <Button mode="outlined" onPress={handleSelect} style={styles.button}>
        Kayıt Ol
      </Button><Button mode="contained" onPress={handleLogin} style={styles.button}>
        Giriş Yap
      </Button>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 16,
    backgroundColor:'white'
  },
  input: {
    marginBottom: 16,
    width: '100%',
  },
  button: {
    marginBottom: 16,
    marginRight:16,
    marginLeft:16,
    width: '40%',
  },
  logo: {
    width: 200,
    height: 200,
    marginBottom: 16,
  },
  girisYapText: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 16,
  },
  errorMessage: {
    color: 'red',
    marginBottom: 16,
    alignSelf: 'flex-start',
  },
  inputIcon: {
    marginRight: 10,
  },
});

export default LoginScreen;
