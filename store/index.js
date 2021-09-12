export const state = () => {
  isMaster: true;
}
export const getters = {
  isMaster: state => {
    return state.isMaster;
  }
}
export const mutations = {
  isMaster (state, value) {
    state.isMaster = value;
  }
}
