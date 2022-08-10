/**
 * Set input corresponding to the state parameter
 * @param {String} state state property
 * @param {Boolean} validation corresponding state validation
 * @param {Function} callback setState
 */
export default function setInputColor(state, validation, callback) {
	if (state) callback(validation ? '' : 'inputErr');
}

/* Username Validator
 * Valid Characters: Alphanumeric and SpecialCharacters: { _ .}
 * Length: [3,20]
 * Special Characters: can't be together or at the start
 */
const usernameValidator = RegExp(
	'^(?=[a-zA-Z0-9._]{3,20}$)(?!.*[_.]{2})[^._].*[^.]$'
);

/* Email Validator
 *  Credits to 'manishsaraan/email-validator' (https://github.com/manishsaraan/email-validator)
 */
const emailValidator = email => {
	var tester =
		/^[-!#$%&'*+/0-9=?A-Z^_a-z`{|}~](\.?[-!#$%&'*+/0-9=?A-Z^_a-z`{|}~])*@[a-zA-Z0-9](-*\.?[a-zA-Z0-9])*\.[a-zA-Z](-?[a-zA-Z0-9])+$/;

	if (!email) return false;

	var emailParts = email.split('@');

	if (emailParts.length !== 2) return false;

	var account = emailParts[0];
	var address = emailParts[1];

	if (account.length > 64) return false;
	else if (address.length > 255) return false;

	var domainParts = address.split('.');
	if (
		domainParts.some(function (part) {
			return part.length > 63;
		})
	)
		return false;

	if (!tester.test(email)) return false;

	return true;
};

/* Passwd Validator
 * Valid Character: Alpanumeric and Special Characters { @$!%*?&^#~$ }
 * Required Characters: 1 capital letter, 1 lowercase letter, 1 number
 * Length: [8, 28]
 */
const passwdValidator =
	/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d@$!%*?&^#~$]{8,28}$/;

const signUpHints = msgNumb => {
	if (msgNumb === 1)
		return 'Username must contain at least 3 characters. Only supports . and _ as special characters (nonconsecutive)';

	if (msgNumb === 2) return 'Invalid email.';

	if (msgNumb === 3)
		return 'Password must contain 1 capital and lowercase letter, 1 number and it must be at least 8 length.';

	if (msgNumb === 4) return `Password doesn't match.`;

	return '';
};

export { usernameValidator, emailValidator, passwdValidator, signUpHints };
