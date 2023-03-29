import { HOMEBRIDGE_IP, HOMEBRIDGE_PASSWORD, HOMEBRIDGE_PORT, HOMEBRIDGE_USERNAME } from './apikey.js';

const axios = window.axios;

async function getHomebridgeToken() {
  const url = `http://${HOMEBRIDGE_IP}:${HOMEBRIDGE_PORT}/api/auth/login`;
  const data = {
    username: HOMEBRIDGE_USERNAME,
    password: HOMEBRIDGE_PASSWORD,
  };

  try {
    const response = await axios.post(url, data);
    return response.data.access_token;
  } catch (error) {
    console.error('Error fetching Homebridge token:', error);
    return null;
  }
}

async function getAccessories(accessToken) {
  const url = `http://${HOMEBRIDGE_IP}:${HOMEBRIDGE_PORT}/api/accessories`;
  const headers = {
    Authorization: `Bearer ${accessToken}`,
  };

  try {
    const response = await axios.get(url, { headers: headers });
    return response.data.accessories;
  } catch (error) {
    console.error('Error fetching accessories:', error);
    return null;
  }
}

async function controlAccessory(accessToken, aid, characteristic, value) {
  const url = `http://${HOMEBRIDGE_IP}:${HOMEBRIDGE_PORT}/api/accessories/${aid}/characteristics`;
  const headers = {
    Authorization: `Bearer ${accessToken}`,
  };
  const data = [
    {
      aid: aid,
      iid: characteristic,
      value: value,
    },
  ];

  try {
    await axios.put(url, data, { headers: headers });
  } catch (error) {
    console.error('Error controlling accessory:', error);
  }
}

export { getHomebridgeToken, getAccessories, controlAccessory }