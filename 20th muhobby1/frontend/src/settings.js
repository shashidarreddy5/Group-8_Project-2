let DEBUG = false;
if (window.location.hostname === "127.0.0.1" || window.location.hostname === "localhost") {
  DEBUG = true
}
let API_URL = ""; // add production API url
let STATIC_URL = API_URL;
let DOMAIN_URL = ""

if (DEBUG) {
  API_URL = "http://localhost:8000";
  STATIC_URL = API_URL;
  DOMAIN_URL = "http://localhost:3000"
}

function get_headers() {
  var headers = {
    "Content-Type": "application/json",
  };
  if (localStorage.getItem('token')) {
    headers = {
      "Content-Type": "application/json",
      Authorization: `Bearer ${localStorage.getItem('token')}`,
    };
  }
  return headers
}



export { API_URL, STATIC_URL, DOMAIN_URL, get_headers };
