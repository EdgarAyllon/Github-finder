function formatHTML( { user , repos , error } ){
    
    // - Block info initial definitions
    const
        userInfo = {},
        repoInfo = {},
        errorInfo = {};

    // - Error
    if( error ) 
        Object.assign( errorInfo, { name: 'error' , data:  error })
    
    // - User Info
    if( user.login ){

        const 
            { avatar_url, login, name, bio } = user;
            
        Object.assign( userInfo, { data : `<figure>
                                                <img src='${ avatar_url }' alt='${ name }' />
                                                <figcaption>
                                                    <p>@${ login }</p>
                                                    <h3>${ name || 'No name provided' }</h3>
                                                    <p>${ bio || 'This user did not provide any bio'}</p>
                                                </figcaption>
                                            </figure>` });
    }
    
    // - Repos Info
    if( repos ){
        
        let data = `<header>Repositories</header>
                    <hr/>
                    <ul>`;
        // - Has repos
        if ( repos.length )
            repos.map( ( { name, stargazers_count, forks_count } ) => 

                data +=`<li>
                            <h3>${ name }</h3>
                            <div>
                                <span class='starred'>${ stargazers_count }</span>
                                <span class='forked'>${ forks_count }</span>
                            </div>
                        </li>`
            )
        // - No repos or repos are private
        else 
            data +=`<li style='border: none'>
                        <h4>User has no repos or they are private</h4>
                    </li>`
        
        data += '</ul>'
        
        Object.assign( repoInfo, { data } )
    }

    // Filter wich info is filled, select SECTIONS different from 'form', clean it and build new sections.
    let 
        content = [ errorInfo, userInfo, repoInfo ].filter( filled => !!filled.data ),
        
        sections = document.querySelectorAll('SECTION:not([name="form"])');
        
    if ( sections.length ) sections.forEach( section => main.removeChild( section ) )

    content.map( ({ data, name }) => {
        
        const 
            info = document.createElement('SECTION');

        if( name ) info.setAttribute( 'name', name )

        info.innerHTML = data

        main.appendChild( info )
    })
}