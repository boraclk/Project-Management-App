

module.exports = {
  get strings() {
    return require('./strings').default;
  },
  get images() {
    return require('./images').default;
  },
  get colors() {
    return require('./colors').default;
  },
  get fonts() {
    return require('./fonts').default;
  },
};
