var nav;

if (typeof navigator !== 'undefined') {
  nav = navigator;
} else {
  nav = {};
}

module.exports = nav;
