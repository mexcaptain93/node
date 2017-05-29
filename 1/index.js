var ChatApp = require('./chat');

let chatOnMessage = (message) => {
	console.log(message);
};
let preparingAnswer = () => {
	let msg = 'Готовлюсь к ответу';
	console.log(msg);
}

let webinarChat =  new ChatApp('webinar');

webinarChat.on('message', preparingAnswer);
webinarChat.on('message', chatOnMessage);

webinarChat.on('close', () =>{
	console.log('Закрываю вебинар...');
	webinarChat.removeListener('message', chatOnMessage);
	webinarChat.removeListener('message', preparingAnswer);
	console.log('Вебинар закрылся :(');
});

setTimeout( ()=> {
	webinarChat.close();
},30000)


let vkChat = new ChatApp('---------vk').setMaxListeners(2);

vkChat.on('message', preparingAnswer);
vkChat.on('message', chatOnMessage);

vkChat.on('close', () => {
	console.log('Закрываю вконтакте...');
	vkChat.removeListener('message', chatOnMessage);
	vkChat.removeListener('message', preparingAnswer);
	console.log('Чат вконтакте закрылся :(');
});
vkChat.close();





let facebookChat = new ChatApp('=========facebook');

facebookChat.on('message', chatOnMessage);

// Закрыть фейсбук
setTimeout( ()=> {
	console.log('Закрываю фейсбук, все внимание — вебинару!');
facebookChat.removeListener('message', chatOnMessage);
}, 15000 );