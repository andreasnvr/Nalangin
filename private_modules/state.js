var profpicURL     = '/images/users/profile_picture/'
var url            = require('url');

// add query functions
module.exports = {
  fullUrl       : fullUrl,
  getProfpicURL : getProfpicURL,
};

function getProfpicURL(username) {
  var realURL = profpicURL + username + '.jpg'
  return realURL;
};


function fullUrl() {
  return url.host
}
