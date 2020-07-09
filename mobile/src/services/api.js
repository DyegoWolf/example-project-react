import axios from 'axios';

const api = axios.create({
    baseURL: '192.168.1.7'
});

export default api;

/*
    Tipos de baseURL

    iOS com emulador: localhost
    iOS com disp. físico: IP da máquina
    Android com emulador: localhost (adb reverse)
    Android com emulador: 10.0.2.2 (Android Studio)
    Android com emulador: 10.0.3.2 (Genymotion)
    Android com disp. físico: IP da máquina
*/