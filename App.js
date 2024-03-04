import React, { useState } from 'react';
import { View, Text, Picker, Button, StyleSheet, Alert } from 'react-native';

const App = () => {
  const [moedaBase, setMoedaBase] = useState('BRL');
  const [moedaReferencia, setMoedaReferencia] = useState('USD');
  const [taxaCambio, setTaxaCambio] = useState(null);

  const consultarTaxaCambio = async () => {
    try {
      const response = await fetch(
        `https://economia.awesomeapi.com.br/last/${moedaBase}-${moedaReferencia}`
      );

      if (!response.ok) {
        throw new Error('Não foi possível obter a taxa de câmbio.');
      }

      const data = await response.json();
      const taxa = data[`${moedaBase}${moedaReferencia}`];

      if (taxa) {
        setTaxaCambio(taxa);
      } else {
        throw new Error('Taxa de câmbio não encontrada.');
      }
    } catch (error) {
      Alert.alert('Erro', error.message);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.label}>Moeda Base:</Text>
      <Picker
        selectedValue={moedaBase}
        onValueChange={(itemValue) => setMoedaBase(itemValue)}
        style={styles.picker}
      >
        <Picker.Item label="Real (BRL)" value="BRL" />
        <Picker.Item label="Dólar Americano (USD)" value="USD" />
        <Picker.Item label="Euro (EUR)" value="EUR" />
        <Picker.Item label="Bitcoin (BTC)" value="BTC" />
      </Picker>

      <Text style={styles.label}>Moeda de Referência:</Text>
      <Picker
        selectedValue={moedaReferencia}
        onValueChange={(itemValue) => setMoedaReferencia(itemValue)}
        style={styles.picker}
      >
        <Picker.Item label="Real (BRL)" value="BRL" />
        <Picker.Item label="Dólar Americano (USD)" value="USD" />
        <Picker.Item label="Euro (EUR)" value="EUR" />
        <Picker.Item label="Bitcoin (BTC)" value="BTC" />
      </Picker>

      <Button title="Consultar Taxa de Câmbio" onPress={consultarTaxaCambio} />

      {taxaCambio && (
        <View style={styles.resultadoContainer}>
          <Text style={styles.labelResultado}>Taxa de Câmbio:</Text>
          <Text>{`1 ${moedaBase} = ${taxaCambio.bid} ${moedaReferencia}`}</Text>
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 20,
  },
  label: {
    fontSize: 16,
    marginBottom: 5,
  },
  picker: {
    width: '100%',
    height: 40,
    marginBottom: 10,
    borderWidth: 1,
    borderColor: '#ccc',
  },
  resultadoContainer: {
    marginTop: 20,
  },
  labelResultado: {
    fontSize: 18,
    fontWeight: 'bold',
  },
});

export default App;
