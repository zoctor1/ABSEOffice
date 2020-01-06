import Vue from 'vue';
import VueI18n from 'vue-i18n';
import {messages} from 'vue-bootstrap4-calendar';

Vue.use(VueI18n);

// const messages = {
//     '1': {},
//     '2': {},
//     '3': {}
// };
const i18n = new VueI18n({
    locale: 'en', // set locale
    messages, // set locale messages
});

export default i18n;
