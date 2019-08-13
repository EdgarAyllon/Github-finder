import {userView} from './user.view';
import {repoView} from './repo.view';

function formatHTML({ user, repos, error }) {

  const main = document.createElement('main');  
  const previousMain = document.querySelector('main');
  
  if(previousMain){
    document.body.removeChild(previousMain);
  }
  
  document.body.appendChild(main);
  
  if( error ){
    main.setAttribute('data-error', '');
    main.innerText = error;
  }
  else {
    main.innerHTML = userView(user) + repoView(repos);
  }
}
export { formatHTML };