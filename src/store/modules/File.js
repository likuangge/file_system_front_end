const state = {
  fileNo: null,
  threadId: null
};

const mutations = {
  setFileNo(state, fileNo) {
    state.fileNo = fileNo;
  },
  setThreadId(state, threadId) {
    state.threadId = threadId;
  }
};

export default {
  namespaced: true,
  state,
  mutations
}
