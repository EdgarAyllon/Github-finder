/* -- Global vars -- */
const 
      main = document.querySelector('MAIN'),
      form = document.querySelector('form'),
      input = document.querySelector('input[name="search"]');

form.addEventListener( 'submit', async e => {
      
      e.preventDefault()
      // first fetch 'user' and await response, if github api message is 'Not found' don't fetch repos
      const 
            { value } = input,
            user  = await github.user( value ),
            repos = user.login ? await github.repos( value ) : null;
      
      // Assign error variable values using 3 cases:
      //  - Param validation on api-client fails , due bad params, returns user === false .
      //  - Param Validation on api-client ok but Github has no user, returns 'Not Found' in user.message or other error messages.
      //  - Param Validation on api-client ok and user exist on Github, assign null to error ( no errors)
      let error = user === false ?
                              'Value must be filled and follow Github API username specs (A-Z, 0-9).'
                              : user.message ? 
                                    user.message
                                    : null;
      
      
      formatHTML( { user , repos , error })

      input.value=''
      
      input.focus()

}, false)