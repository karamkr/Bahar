(function(){
const parts = [
  "aHR0cHM6Ly9yYXcu",
  "Z2l0aHVidXNlcmNv",
  "bnRlbnQuY29tL2th",
  "cmFta3IvQmFoYXIv",
  "cmVmcy9oZWFkcy9t",
  "YWluL2RhdGEuanNvbg=="
];

  const joined = parts.join('');
  const decoded = atob(joined);

  window.getDataUrl = function() {
    let shuffled = decoded.split('').map((c, i) => String.fromCharCode(c.charCodeAt(0))).join('');
    return shuffled;
  };
})();
