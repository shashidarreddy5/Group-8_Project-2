let Helpers = {
  setLocalStorageData: (key, data) => {
    localStorage.setItem(key, JSON.stringify(data));
  },
  getLocalStorageData: (key) => {
    return JSON.parse(localStorage.getItem(key));
  },
};

export default Helpers;