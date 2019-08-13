//import '@babel/polyfill';
import {github} from './api/github';
import {formatHTML} from './views/formatHTML';

import '../styles/main.scss';

/* -- Global vars -- */
const form = document.querySelector("form");
const input = document.querySelector('input[type="search"]');

async function apiCall(e) {
  e.preventDefault();
  
  let repos;
  let error;
  const user = await github.user(input.value);
  
  /*  const user = {
    "avatar_url": "https://robohash.org/explicabodoloressed.jpg?size=150x150&set=set1",
    "login": "spesticcio",
    "followers": 82,
    "following": 87,
    "hireable": false,
    "location": "Barcelona",
    "bio": "In congue. Etiam justo. Etiam pretium iaculis justo.\n\nIn hac habitasse platea dictumst. Etiam faucibus cursus urna. Ut tellus.",
    "name": "Sisile",
    "type": "User",
    "html_url": "http://stumbleupon.com/id/consequat/in/consequat/ut.jsp"
  }

  repos = [{
    "name": "Stim",
    "forks_count": 20,
    "stargazers_count": 33
  }, {
    "name": "Alpha",
    "forks_count": 74,
    "stargazers_count": 79
  }, {
    "name": "Toughjoyfax",
    "forks_count": 63,
    "stargazers_count": 91
  }, {
    "name": "Subin",
    "forks_count": 56,
    "stargazers_count": 82
  }, {
    "name": "Vagram",
    "forks_count": 87,
    "stargazers_count": 65
  }, {
    "name": "Lotstring",
    "forks_count": 5,
    "stargazers_count": 65
  }, {
    "name": "Redhold",
    "forks_count": 59,
    "stargazers_count": 10
  }, {
    "name": "Ronstring",
    "forks_count": 9,
    "stargazers_count": 5
  }, {
    "name": "Fintone",
    "forks_count": 69,
    "stargazers_count": 28
  }, {
    "name": "Lotlux",
    "forks_count": 70,
    "stargazers_count": 67
  }, {
    "name": "Vagram",
    "forks_count": 5,
    "stargazers_count": 7
  }, {
    "name": "Tampflex",
    "forks_count": 97,
    "stargazers_count": 11
  }, {
    "name": "Y-Solowarm",
    "forks_count": 63,
    "stargazers_count": 65
  }, {
    "name": "Hatity",
    "forks_count": 68,
    "stargazers_count": 46
  }, {
    "name": "Overhold",
    "forks_count": 12,
    "stargazers_count": 18
  }, {
    "name": "Bigtax",
    "forks_count": 72,
    "stargazers_count": 74
  }, {
    "name": "Opela",
    "forks_count": 71,
    "stargazers_count": 62
  }, {
    "name": "Flexidy",
    "forks_count": 72,
    "stargazers_count": 90
  }, {
    "name": "Flexidy",
    "forks_count": 22,
    "stargazers_count": 98
  }, {
    "name": "Asoka",
    "forks_count": 13,
    "stargazers_count": 19
  }] */
   user
    ? user.message // used when user not found.
      ? (error = user.message)
      : (repos = await github.repos(user.login))
    : (error = "Value must be filled and follow Github API username specs (A-Z, 0-9).");

  console.log('USER:', user, 'REPOS:',repos);
  formatHTML({ user, repos, error });
  input.value = "";
  input.focus();
}

form.addEventListener("submit", apiCall, false);