/**
 * @name Main
 * 
 * @author Edgar Ayllon
 *
 * - Main file
 * 
 **/

// Select elements ( form, input[name='search']) from the DOM 

const form = document.querySelector('form'),

      input = document.querySelector('input[name="search"]');

document.addEventListener('DOMContentLoaded', ()=> {
   
    const config = document.createElement('SCRIPT'),

          loader = document.createElement('SCRIPT');
    
    config.setAttribute('src' , './scripts/api/config.js')

    loader.setAttribute('src' , './scripts/api/loader.js')

    document.body.appendChild( config )

    document.body.appendChild( loader )

}, false )

// Adds listener to event submit on form element, prevent the default action, and cancel event bubble ( false ).

form.addEventListener('submit', function (e) {
    
    e.preventDefault()
    // Assign value from input ( Destructuring assignment )
    const { value } = input
    input.value = ''
    
    // Create new instance to Github class provider
    const provider = new Github('v3')

    // Send request with query( value ) and use callback( build ) to show results.
   provider.retrieve( value, build )
 
}, false)