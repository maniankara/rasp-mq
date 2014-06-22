var zmq 	 = require('zmq')
  , workerServer = process.argv[2] 
  , is_producer = (workerServer == 'producer')
  , producerPort = (process.argv[3] == null)
  	? '8124'
  	: process.argv[3]
  , workerPort = (process.argv[3] == null)
  	? '8125' 
  	: process.argv[3] 
  , pushSock = zmq.socket('push')
  , pullSock = zmq.socket('pull');

console.log('process: ' + is_producer);

if (is_producer) {
	// Producer
	pushSock.bindSync('tcp://127.0.0.1:' + producerPort);
	console.log('Producer bound to port ' + producerPort);

	console.log('sending work');
	pushSock.send('some work');

} else {
	// worker
	pullSock.connect('tcp://' + workerServer + ':' + workerPort);
	console.log('Worker connected to port ' + workerPort);

	pullSock.on('message', function(msg){
	  console.log('work: %s', msg.toString());
	});

}


