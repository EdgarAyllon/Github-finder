describe('Test Github Finder', () => {
    
    describe('Github class constructor tests:', () => {
        
        it('- Create a new instance of class with correct API version - new Github(\'v3\')', () => {
            
            let test = new Github('v3')
            
            expect( test instanceof Github ).toBeTruthy()
            
        });
        
        it('- New instance retrieves Object and Object.baseUri must be https://api.github.com', () => {
            
            const provider = new Github('v3')
            
            expect( provider instanceof Object ).toBeTruthy()
            
            expect( provider.baseUrl ).toBe('https://api.github.com')
            
        })

        it('- Throw Error on wrong API version - new Github(\'v2\')', () => {
            
        expect( () => new Github('v2') ).toThrow(new Error('Github : API version not defined / wrong API version'))
        
        })
        
        it('- Throw Error on NO API version - new Github()', () => {
            
            expect( () => new Github() ).toThrow(new Error('Github : API version not defined / wrong API version'))
        
        })
        it('- Throw Type Error when \'new\' is omited to invoke constructor', () => {
            
            expect( () => Github('v3') ).toThrow(new Error('Class constructor Github cannot be invoked without \'new\''))
        
        })
        it('- Throw Reference Error when version type is passed by reference , not string - new Github(v3)', () => {
            
            expect( () => new Github(v3) ).toThrow(new Error('v3 is not defined'))
        
        })
    })
    describe('Github class Functions', () =>{
        
        //-- Check Github.checkParams
        it('- Github.checkParams - Return true if params are valid', () => {

            expect( Github.checkParams( 'EdgarAyllon' , build ) ).toBe( true )
        })
        it('- Github.checkParams - Return false if at least one param ( query, callback ) is invalid - query must be String, callback must be Function', () => {

            const paramOne = 3, paramTwo = 'Welcome Fail'
            expect( Github.checkParams( paramOne, paramTwo )).toBe( false )
        })
        it('- Github.checkParams - Throw Error if one of the params are undefined', () => {

            expect( () => Github.checkParams( build )).toThrow(new Error('Github: Params needed'))
        })
        it('- Github.checkParams - Must be instantiated throught class otherwise throw ReferenceError', ()=>{

            expect( ()=> checkParams( 'EdgarAyllon', build)).toThrow(new ReferenceError('checkParams is not defined'))
        })

        //-- Check Github.template
        it('- Github.template - 404 , return html template containing Not Found error response', ()=>{

            const template = Github.template( null, 404, true )
            
            expect( template instanceof Object ).toBeTruthy()
            
            expect( template.data ).toContain('<h3>User not found')
        })
        it('- Github.template - 403 , return html template containing Forbidden error response', ()=>{

            const template = Github.template( null, 403, true )
            
            expect( template instanceof Object ).toBeTruthy()
            
            expect( template.data ).toContain('<h3>Keep calm and wait one minute to query')
        })
        it('- Github.template - User , return html template containing user info', ()=>{

            const  data = { avatar_url : '' , name : 'Edgar Ayllon', login: 'edgarayllon' , html_url: '', bio: '', blog:'' };

            const template = Github.template( 'user', data , false )
            
            expect( template instanceof Object ).toBeTruthy()

            expect( template.data ).toContain('Edgar Ayllon</a>')
           
        })
        it('- Github.template - Repos , return html template containing repository info', ()=>{

            const  data = [{ owner : { login : '' } ,stargazers_count : 2 , forks_count : 2 , html_url : '' , language : 'javascript' , description : 'description test', name : 'test' }];

            const template = Github.template( 'repos', data , false )
            
            expect( template instanceof Object ).toBeTruthy()

            expect( template.data ).toContain('javascript</mark>')

            expect( template.nested ).toBeTruthy()
           
        })
       
    })
    describe('Common functions - Request() response OK', ()=>{

        let timeout, test;

        beforeEach( done => {

            const provider = new Github('v3'), queryTest = 'edgarayllon',

                  endpoint = providers.github[provider.apiVersion].user( queryTest );
                  
            timeout =  jasmine.DEFAULT_TIMEOUT_INTERVAL;
            
            jasmine.DEFAULT_TIMEOUT_INTERVAL = 2000;


                  request( `${provider.baseUrl}${ endpoint }`, provider.options )
                
                                .then( response => { 
                                                    test = response
                                                    
                                                    done()
                                 })
                                .catch( done );

        })

        afterEach( ()=> jasmine.DEFAULT_TIMEOUT_INTERVAL = timeout )


        it('- Make request to \'user\' endpoint and return JSON Object containing data, also checks if \'login\' contains user login', () => {
                        
            expect( test ).toBeTruthy()

            expect( test instanceof Object ).toBeTruthy()

            expect( test.login ).toContain('EdgarAyllon')

        
        })
        
    })
    describe('Common functions - Request() response 404', ()=>{

        let timeout, test;

        beforeEach( done => {

            const provider = new Github('v3'), queryTest = 'ño',

                  endpoint = providers.github[provider.apiVersion].user( queryTest );
                  
            timeout =  jasmine.DEFAULT_TIMEOUT_INTERVAL;
            
            jasmine.DEFAULT_TIMEOUT_INTERVAL = 2000;


                  request( `${provider.baseUrl}${ endpoint }`, provider.options )
                
                                .then( response => { 
                                                    test = response
                                                    
                                                    done()
                                 })
                                .catch( error => {
                                                    test = error.message 
                                                    
                                                    fail()
                                });

        })

        afterEach( ()=> jasmine.DEFAULT_TIMEOUT_INTERVAL = timeout )


        it('- Make request to \'user\' endpoint with param that fails , and expect 404 message', () => {
                        
            expect( test ).toBeTruthy()
            
            expect( test ).toEqual(404)

        
        })
        
    })
})

