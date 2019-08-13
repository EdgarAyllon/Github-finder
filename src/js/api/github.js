let github = {};
(() => {
  
  /**
   * @description check if param is valid to make request
   * @param {String} param parameter to test, must accomplish Github API username specification
   *
   * Github API specs:
   *  username allow only alphanumeric chars A to Z, 0 to 9.
   *  Also hyphen (-) between begin and start characters, NOT begin or START with it.
   *  The max length allowed is 39 characters
   * @returns {Boolean} if user match pattern
   */
  function isValid(param) {
    
    try{
      if(!param || typeof param !== 'string') throw Error();
    }catch(e){
      return false
    }

    const githubUserPattern = new RegExp(/^[a-z0-9](?:[a-z0-9]|-(?=[a-z0-9])){0,38}$/,'i');  
    return param.match(githubUserPattern)
  }


  /**
   * @description common fetch promise based
   * @param {String} endpoint to send request
   * @returns {Promise} resolve or reject containing data/error response
   */
  function retrieve(endpoint) {
    return new Promise((resolve, reject) =>
      fetch(`https://api.github.com/${endpoint}`, {
        headers: {
          Accept: "application/vnd.github.mercy-preview+json"
        }
      })
        .then(data => resolve(data.json()))
        .catch(error => reject(error.message))
    );
  }


  // API client, first check if user param follow Github specs. if valid make request, otherwise rejects and returns error.
  github = {
    endpoint: (user,...restParams) => isValid(user) && retrieve(`users/${user}${restParams}`),
    user: user => github.endpoint(user),
    repos: user => github.endpoint(user,'/repos')
  };
})();
export { github };