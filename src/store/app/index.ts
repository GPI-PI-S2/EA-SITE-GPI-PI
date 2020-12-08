import { Module } from 'vuex';
import { StateInterface } from '../index';
import mutations from './mutations';
import state, { State } from './state';

const AppModule: Module<State, StateInterface> = {
	namespaced: true,
	mutations,
	state,
};

export default AppModule;
