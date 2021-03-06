var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var bcrypt = require('bcrypt');
var SALT_WORK_FACTOR = 10;

var UserSchema = new Schema({
	username: { type: String, required: true, trim: true, index: { unique: true  }},
	password: { type: String, required: true },
	email: { type: String, required: true, lowercase: true, trim: true, unique: true },
	address: {
		street: { type: String, required: true, trim: true },
		state: { type: String, required: true, trim: true },
		zip: { type: Number, required: true, trim: true },
		country: { type: String, required: true, trim: true }
	}
});

UserSchema.pre('save', function(next) {
	var user = this;
	if (!user.isModified('password')) return next();

	bcrypt.genSalt(SALT_WORK_FACTOR, function(err, salt) {
		if (err)	return next(err);

		bcrypt.hash(user.password, salt, function(err, hash) {
			if (err) return next(err);
			user.password = hash;
			next();
		});
	});
});

UserSchema.methods.comparePasswords = function(incomingPassword, cb) {
	bcrypt.compare(incomingPassword, this.password, function(err, isMatch) {
		if (err) return cb(err);
		cb(null, isMatch);
	});
};

UserSchema.virtual('userinfo').get(function() {
	return this.username + ' ' + this.email;
});

module.exports = mongoose.model('User', UserSchema);
