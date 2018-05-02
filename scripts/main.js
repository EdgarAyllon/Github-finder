/**
 * @name Main
 * 
 * @author Edgar Ayllon
 *
 * - Main file
 * 
 **/
addEventListener('DOMContentLoaded', ()=> {
    
   // document.querySelector('logo').setAttribute('style', 'background: url("https://cdn.rawgit.com/konpa/devicon/master/icons/github/github-original.svg") no-repeat center top;' )
    
    const config = document.createElement('SCRIPT')

    const loader = document.createElement('SCRIPT')
    
    config.setAttribute('src' , './scripts/api/config.js')

    loader.setAttribute('src' , './scripts/api/providers.js')

    document.body.appendChild( config )

    document.body.appendChild( loader )

}, false )
 // Select elements ( form, input[name='search']) from the DOM 

const form = document.querySelector('form')

const input = document.querySelector('input[name="search"]')

// Adds listener to event submit on form element, prevent the default action, and cancel event bubble ( false ).
form.addEventListener('submit', function (e) {
    
    e.preventDefault()
    // Assign value from input ( Destructuring assignment )
    const { value } = input
    input.value = ''
    // Create new instance to Github provider
    const provider = new Github('v3')

    // Send request with query( value ) and use callback( build ) to show results.
   provider.retrieve( value, build )

   // provider.retrieve( v3.repos, value, build )
    
}, false)