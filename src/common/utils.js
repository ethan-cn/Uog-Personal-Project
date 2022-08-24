/* Verify the account  */
export function validateUsername(rule, value, callback) {
	if (value.length < 6 || value.length > 20) {
		return callback(new Error("The user name must not be less than 6 characters or more than 20 characters!"))
	} else {
		callback()
	}
}

/* Verify the password */
export function validatePassword(rule, value, callback) {
	if (value.length < 6) {
		return callback(new Error("The password must be at least six characters long"))
	} else {
		callback()
	}
}

/* Enter a valid email address*/
export function validateEmail(rule, value, callback) {
	const emailReg = /^(([a-zA-Z0-9_\-.]+)@([a-zA-Z0-9_\-.]+)\.([a-zA-Z]{2,5}){1,25})$/
	if (!value) {
		return callback(new Error("Email address cannot be empty!"))
	}
	setTimeout(() => {
		if (!emailReg.test(value)) {
			return callback(new Error("Illegal format error"))
		} else {
			callback()
		}
	}, 100)
}

/* Enter a valid phone number */
export function validatePhone(rule, value, callback) {
	const phoneReg = /^[1][3,4,5,7,8][0-9]{9}$/
	if (!value) {
		return callback(new Error("Mobile phone number cannot be empty!"))
	}
	setTimeout(() => {
		if (!phoneReg.test(value)) {
			return callback(new Error("Invalid format of mobile phone number"))
		} else {
			callback()
		}
	}, 100)
}

/* Legal real name */
export function validateRealName(rule, value, callback) {
	const realnameReg = /^([a-zA-Z0-9\u4e00-\u9fa5·]{1,10})$/
	if (!value) {
		return callback(new Error("Real name cannot be empty!"))
	}
	setTimeout(() => {
		if (!realnameReg.test(value)) {
			return callback(new Error("Your real name format is wrong, please input English or Chinese!"))
		} else {
			callback()
		}
	}, 100)
}

/* Legal identity card */
export function validateIdNumber(rule, value, callback) {
	const idNumberReg = /^[1-9]\d{7}((0\d)|(1[0-2]))(([0|1|2]\d)|3[0-1])\d{3}$|^[1-9]\d{5}[1-9]\d{3}((0\d)|(1[0-2]))(([0|1|2]\d)|3[0-1])\d{3}([0-9]|X)$/
	if (!value) {
		return callback(new Error("Id number cannot be empty!"))
	}
	setTimeout(() => {
		if (!idNumberReg.test(value)) {
			return callback(new Error("Your ID number format is wrong!"))
		} else {
			callback()
		}
	}, 100)
}
