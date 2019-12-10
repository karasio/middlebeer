const capitalize = (value) => {
  return value.toLowerCase()
  .split(/ /)
  .map((s) => s.charAt(0).toUpperCase() + s.substring(1))
  .join(' ');
};

const checkForCommas = (value) => {
  if (typeof value === 'string') {
    value = value.replace(',', '.');
  }
  return value;
};

module.exports = {capitalize, checkForCommas};