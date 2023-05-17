import React, { useState, useEffect } from 'react';
import { View, Text, FlatList } from 'react-native';
import { List, Divider, Card, Button, Title, Subheading } from 'react-native-paper';
import Icon from 'react-native-vector-icons/Ionicons';
import Sefers from '../../Datas/Sefers.json';


const JourneyList = ({ navigation, route }) => {
  const { from, to } = route.params;
  //console.log(date)
  const [sefers, setSefers] = useState([]);

  useEffect(() => {
   
    const filteredSefers = Sefers.filter((sefer) => {
      return sefer.from === from && sefer.to === to;
    });

    setSefers(filteredSefers);
  }, []);

  const handleSelect = (id) => {
    navigation.navigate('JourneyDetail',{id});
  };
  const countEmptySeats = (seats) => {
    const emptySeats = seats.filter((seat) => seat === 'empty');
    return emptySeats.length;
  };

  //console.log(sefers.from)
  const renderItem = ({ item }) => (
    <Card style={{ margin: 10 }}>
      <Card.Title title={item.bus} />
     
      <Card.Content>
        <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
          <Text>Tarih: {item.date}</Text>
          <Text>Saat: {item.time}</Text>
        </View>
        <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
        <Text>Boş Koltuk: {countEmptySeats(item.seats)}</Text>
          <Text>Fiyat: {item.seatPrice}</Text>
        </View>
      </Card.Content>
      <Card.Actions>
        <Button onPress={()=>handleSelect(item.id)}>SELECT</Button>
      </Card.Actions>
    </Card>
  );
   
  return (
    <View style={{ flex: 1 }}>
      <View style={{ backgroundColor: '#F9F9F9', padding: 20, flex: 1, backgroundColor: '#fff8dc' }}>
        <Title style={{ fontSize: 20, textAlign: 'center', marginBottom: 10, fontWeight: '800' }}>{from}</Title>
        <Icon name="swap-vertical" size={50} color="black" style={{ textAlign: 'center', marginBottom: 20, fontSize: 30 }} />
        <Title style={{ fontSize: 20, textAlign: 'center', marginBottom: 10, fontWeight: '800' }}>{to}</Title>
       
      </View>
      <View style={{ flex: 3 }}>
        {sefers.length > 0 ? (
          <FlatList
            data={sefers}
            renderItem={renderItem}
            keyExtractor={(item) => item.id ? item.id.toString() : ''}

            ItemSeparatorComponent={() => <Divider />}
            contentContainerStyle={{ paddingBottom: '25%' }}
          />
        ) : (
          <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
            <Subheading>Seçilen tarih ve konum için sefer bulunamadı.</Subheading>
          </View>
        )}
      </View>
    </View>
  );
};

export default JourneyList;
