const express = require('express');
const router = express.Router();
const argon2 = require('argon2');
const jwt = require('jsonwebtoken');
const verifyToken = require('../middleware/auth');
const User = require('../models/User');

// @route GET api/auth/
// @desc Check if user login
// @access Public
router.get('/', verifyToken, async (req, res) => {
	try {
		const user = await User.findById(req.userId).select('-password');

		if (!user) {
			return res.status(400).json({ success: false, message: 'User not found' });
		}

		res.json({ success: true, user: user });
	} catch (error) {
		console.log(err);
		res.status(500).json({ success: false, message: 'Internal Server Erorr' })
	}
});

// @route POST api/auth/register
// @desc Register user
// @access Public
router.post('/register', async (req, res) => {
	const { username, password } = req.body;

	if (!username || !password)
		return res
			.status(400)
			.json({ success: false, message: 'Missing Username or password' });
	try {
		// check for existing user
		const user = await User.findOne({ username });

		if (user) {
			return res
				.status(400)
				.json(
					{ success: false, message: 'Username has existing' }
				);
		}

		const hashedPassword = await argon2.hash(password);
		const newUser = new User({
			username,
			password: hashedPassword,
		})
		await newUser.save();

		// Return Token
		const accessToken = jwt.sign({
			userId: newUser._id
		}, process.env.ACCESS_TOKEN_SECRET);

		return res
			.status(200)
			.json({
				success: true,
				message: 'User created Sucessfully',
				accessToken: accessToken,
			});
	} catch (err) {
		console.log(err);
		res.status(500).json({ success: false, message: 'Internal Server Erorr' })
	}
})

// @route POST api/auth/login
// @desc Login user
// @access Public
router.post('/login', async (req, res) => {
	const { username, password } = req.body;

	if (!username || !password)
		return res
			.status(400)
			.json({ success: false, message: 'Missing Username or password' });

	try {
		//check for existing username
		const user = await User.findOne({ username });
		if (!user)
			return res
				.status(400)
				.json({ success: false, message: 'Incorrect username or password' });

		// username found
		const passwordValid = await argon2.verify(user.password, password);

		if (!passwordValid)
			return res
				.status(400)
				.json({ success: false, message: 'Incorrect username or password' });
		const accessToken = jwt.sign({
			userId: user._id,
		},
			process.env.ACCESS_TOKEN_SECRET);

		res.json({
			success: true,
			message: 'Login successfuly',
			accessToken: accessToken
		});

	} catch (err) {
		console.log(err);
		res.status(500).json({ success: false, message: 'Internal Server Erorr' })
	}
});


module.exports = router;