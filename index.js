import express, { json, urlencoded } from 'express'
import favicon from 'express-favicon'
import cors from 'cors'

import { writePayment } from './dbApi.js'

import path from 'path'
import { fileURLToPath } from 'url';
// import delay from './delay.js'
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const PORT = process.env.PORT || 8000

const app = express()
app.use(favicon(path.resolve(__dirname, 'favicon.ico')));
app.use(cors());
app.use(json())
app.use(urlencoded({ extended: true }))

app.route('/api/payments')
	.post(async (req, res) => {
		console.log('post:', req.body);

		const payment = req.body;
		if (!(payment.CardNumber &&
			payment.ExpDate &&
			payment.Cvv &&
			payment.Amount)) {
			return res.status(400)
				.send({ message: 'Bad request.' })
		}

		try {
			const paymentId = await writePayment(payment);
			// await delay(2000);
			return res.status(200)
				.send({
					RequestId: paymentId,
					Amount: payment.Amount
				})
		}
		catch (error) {
			return res.status(500)
				.send({ message: 'DB error.' })
		}

	})

app.listen(PORT, () => {
	console.log(`Server listens port:${PORT}`);
})