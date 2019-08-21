function repoView(repos, totalRepos) {
  
  let repositories = `
    <div class="mt--30 flex__row justify--center fs--14 fw--b">
      User has no repos or they are private
    </div>`;
  
  if (repos.length) {
    
    const mostStarred = repos.sort((a, b) => b.stargazers_count - a.stargazers_count)[0];
    const mostForked = repos.sort((a, b) => b.forks_count - a.forks_count)[0];

    const { totalStars, totalForks } = repos.reduce(
      (acc, current) => ({
        totalStars: (acc.totalStars += current.stargazers_count),
        totalForks: (acc.totalForks += current.forks_count)
      }),
      { totalStars: 0, totalForks: 0 }
    );

    repositories = `
      <div class="flex__row mt--30">
        <span class="flex__column">
          <p class="fs--14-xxl f fw--b">${totalRepos}</p>
          <p class="c--accent fw--xb">Total</p>
        </span>
        <span class="flex__column mr--30 ml--30">
          <p class="fs--14-xxl f fw--b">${totalStars}</p>
          <p class="fas fa-star f fw--xb c--accent"></p>
        </span>
        <span class="flex__column">
          <p class="fs--14-xxl f fw--b">${totalForks}</p>
          <p class="fas fa-code-branch f fw--xb c--accent"></p>
        </span>
      </div>
      
      <div class="flex__row justify--evently mt--30">
        <span class="flex__column mr--10">
          <a href="${mostStarred.html_url}" target="_blank" class="fs--14-lg fw--xb mb--20 c--primary">
            <i class="fas fa-link"></i> ${mostStarred.name}
          </a>
          <p class="c--accent fw--xb">Top <i class="fas fa-star f"></i></p>
        </span>
        
        <span class="flex__column">
          <a href="${mostForked.html_url}" target="_blank" class="fs--14-lg fw--xb mb--20 c--primary">
            <i class="fas fa-link"></i> ${mostForked.name}
          </a>
          <p class="c--accent fw--xb">Top <i class="fas fa-code-branch f"></i></p>
        </span>
      </div>`  
  }

  return `<section class="mt--30">
      <header class="flex__row justify--center c--accent pt--20 fw--xb fs--14-xxl">Repositories</header>
      ${repositories}
    </section>`;
}
export { repoView };