const state = {
  fileNo: ""
};

const mutations = {
  setFileNo(state, fileNo) {
    state.fileNo = fileNo;
  }
};

export default {
  namespaced: true,
  state,
  mutations
}
