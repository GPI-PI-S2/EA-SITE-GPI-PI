import { GetterTree } from 'vuex';
import { StateInterface } from '../index';
import { ExampleStateInterface } from './state';

const getters: GetterTree<ExampleStateInterface, StateInterface> = {
  name(state) {
    return state.prop ? 'Juanito' : 'Fredes';
    // your code
  }
};

export default getters;
