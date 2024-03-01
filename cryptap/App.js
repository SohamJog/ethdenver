import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import * as particleAuth from "@particle-network/rn-auth";
import { LoginType, SupportAuthType } from '@particle-network/rn-auth'

const chainInfo = Ethereum;
const env = Env.Production;
particleAuth.init(chainInfo, env);

const type = LoginType.Phone;
const supportAuthType = [SupportAuthType.All];

const userInfo = await particleAuth.login(type, '', supportAuthType);


export default function App() {
  return (
    <View style={styles.container}>
      <Text>Open up App.js to start working on your app!</Text>
      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
