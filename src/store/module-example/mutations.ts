import { MutationTree } from 'vuex';
import { ExampleStateInterface } from './state';

const mutation: MutationTree<ExampleStateInterface> = {
  change(state, value: boolean) {
    state.prop = value;
  }
};

export default mutation;
