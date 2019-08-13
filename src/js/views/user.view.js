function userView({
  avatar_url,
  bio,
  followers,
  following,
  html_url,
  location,
  login,
  name,
  type,
}) {
  const follows = type === 'User' && (
    `<span class="flex__column mr--30 ml--30">
      <p class="fs--14-xxl f fw--b c--accent">${following}</p>
      <p>Following</p>
    </span>

    <span class="flex__column">
      <p class="fs--14-xxl f fw--b c--accent">${followers}</p>
      <p>Followers</p>
    </span>`
  );

  return `
  <img src="${avatar_url || 'https://robohash.org/explicabodoloressed.jpg?size=150x150&set=set1'}" alt="image"/>
  <section>

    <div class="flex__column justify--center mt--20">
      <p class="c--accent f fs--14-xxl2 fw--xb">${name || 'No name provided'}</p>
      <a class="c--primary f fs--14-sm fw-l" href=${html_url} target="_blank">
        <i class="fas fa-link"></i> ${login}
      </a>
    </div>
    
    <div class="flex__row mt--30">
      
      <span class="flex__column">
        <p class="fas fa-map-marker-alt f fs--14-xxl fw--b c--accent"></p>
        <p class="f fw--xb c--accent-l5">${location || 'Unknown'}</p>
      </span>
    ${follows || ''}
    </div>

    <div id="bio" class="flex__row align--to-center mt--30">
      <p class="sublime-first-letter">${bio || 'This user did not provide any bio'}</p>
    </div>
  
  </section>`;
}
export { userView };
