let appData = {};

export function loadData(callback) {
  fetch('data/countries.json')
      .then((response) => response.json())
      .then((data) => {
        appData = data;
        if (callback) {
          callback();
        }
      })
      .catch(() => {
        appData = {};
        if (callback) {
          callback();
        }
      });
}

export function getCountriesByRegion(region) {
  return appData[region] || {};
}
