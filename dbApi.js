import mongoose from 'mongoose'

mongoose.connect('mongodb://localhost:27017/test');

const Payment = mongoose.model('Payment', {
	CardNumber: String,
	ExpDate: String,
	Cvv: String,
	Amount: Number
});

export function writePayment(paymentData) {
	const payment = new Payment(paymentData);
	return new Promise((resolve, reject) => {
		payment.save()
			.then(request => {
				console.log(request._id);
				resolve(request._id);
			})
			.catch(err => {
				console.error(err);
				reject(err);
			})

	})

} 