export default function delay(delayInms) {
	return new Promise(resolve => {
		setTimeout(() => {
			resolve(delayInms);
		}, delayInms);
	});
}