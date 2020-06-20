import Vue from 'vue';

import { library } from '@fortawesome/fontawesome-svg-core';
import { faLink, faEnvelope, faMobile, faMobileAlt, faCaretDown, faThumbsUp, faThumbsDown, faCheck, faTimes } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon, FontAwesomeLayers } from '@fortawesome/vue-fontawesome';

library.add(faLink, faEnvelope, faMobile, faMobileAlt, faCaretDown, faThumbsUp, faThumbsDown, faCheck, faTimes);

Vue.component('font-awesome-icon', FontAwesomeIcon);
Vue.component('font-awesome-layers', FontAwesomeLayers);