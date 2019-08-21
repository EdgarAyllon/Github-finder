import {github} from './api/github';
import {formatHTML} from './views/formatHTML';
import '../styles/main.scss';

const form = document.querySelector("form");
const input = document.querySelector('input[type="search"]');

async function apiCall(e) {
  e.preventDefault();
  let repos;
  let error;
  const user = await github.user(input.value);
    
  user
    ? user.message // used when user not found.
      ? (error = user.message)
      : (repos = await github.repos(user.login))
    : (error = "Value must be filled and follow Github API username specs (A-Z, 0-9).");

  formatHTML({ user, repos, error });
  input.value = "";
  input.focus();
}

form.addEventListener("submit", apiCall, false);