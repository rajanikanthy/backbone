var http=require('http');
var filesystem=require('fs');

var contacts = [{
	id : '1',
	firstName : 'Thomas',
	lastName : 'Hunter',
	phoneNumber : '123456789',
	email : 'th@ge.com'
}, {
	id : '2',
	firstName : 'Rupert',
	lastName : 'Styx',
	phoneNumber : '12345678910',
	email: 'rs@ge.com'
}];

http.createServer(function(req,res){
	console.log(req.method +' '+ req.url);
	if ( req.url === '/'  && req.method === 'GET') {
		filesystem.readFile(__dirname + '/index.html', function(err, data){
			if (err) throw err;
			res.end(data);
		});
		return;
	} else if ( req.url.indexOf('/contacts') === 0){
		res.writeHead(200,{ 'Content-Type' : 'application/json'});
		res.end(JSON.stringify(contacts));
	} else if ( req.method === 'POST') {
		var body = '';
		req.on('data', function(data){
			body += data;
		});
		req.on('end', function(){
			var contact = JSON.parse(body);
			contact.id = Math.random().toString(36).substr(2);
			contacts.push(contact);
			res.end(JSON.stringify(contact));
			console.log('CONTACT ADD:' + contact);
		});
	} else if ( req.method === 'DELETE') {
		var id = req.url.split('/')[2];
		console.log('DELETE CONTACT:' + id);
		for(var index in contacts){
			if ( contacts[index].id === id) {
				contacts.slice(index,1);
				break;
			}
		}
		res.end();
		return;
	} else {
		var filename = __dirname + req.url;
		filesystem.lstat(filename, function(err,stat){
			if (err || !stat.isFile()) {
				if ( req.url != '/favicon.ico'){
					console.log('404: ' + filename);
				}
				res.writeHead(404, {'Content-Type' : 'text/plain'});
				res.write('404 Not Found');
				res.end();
				return;
			}
		});
		filesystem.readFile(filename, function(err,data){
			res.writeHead(200, {'Content-Type' : 'text/javascript'});
			res.end(data);
		});
		return;
	}
	return;
}).listen(1337);
console.log('http://localhost:1337/');
