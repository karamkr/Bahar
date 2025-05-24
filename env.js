(function(){
  const parts = [
    "aHR0cHM6Ly9yYXcu", 
    "Z2l0aHVidXNlcmNv", 
    "bnRlbnQuY29tL0th",
    "cmFtLVNhYmFoL2pz",
    "b24vcmVmcy9oZWFk",
    "cy9tYWluL2RhdGEu",
    "anNvbg=="
  ];

  const joined = parts.join('');
  const decoded = atob(joined);

  window.getDataUrl = function() {
    let shuffled = decoded.split('').map((c, i) => String.fromCharCode(c.charCodeAt(0))).join('');
    return shuffled;
  };
})();
