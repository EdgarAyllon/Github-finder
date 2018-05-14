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

            expect( Github.checkParams( 'EdgarAyllon' , viewHTML ) ).toBe( true )
        })
        it('- Github.checkParams - Return false if at least one param ( query, callback ) is invalid - query must be String, callback must be Function', () => {

            const paramOne = 3, paramTwo = 'Welcome Fail'
            
            expect( Github.checkParams( paramOne, paramTwo )).toBe( false )
        })
        it('- Github.checkParams - Throw Error if one of the params are undefined', () => {

            expect( () => Github.checkParams( viewHTML ) ).toThrow(new Error('Github: Params needed ( query , callback )'))
        })
        it('- Github.checkParams - Must be instantiated throught class otherwise throw ReferenceError', ()=>{

            expect( ()=> checkParams( 'EdgarAyllon', viewHTML)).toThrow(new ReferenceError('checkParams is not defined'))
        })
  
    })
})

