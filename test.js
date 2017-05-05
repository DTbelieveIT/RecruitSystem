function test(request){
	console.log(request)
}

test({method:'POST'})
test({method:'POST'},{method:'GET'})
