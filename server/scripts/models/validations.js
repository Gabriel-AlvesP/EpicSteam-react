/* Username Validator
 * Valid Characters: Alphanumeric and SpecialCharacters: { _ .}
 * Length: [3,20]
 * Special Characters: can't be together or at the start
 */
const usernameValidator = RegExp(
	'^(?=[a-zA-Z0-9._]{3,20}$)(?!.*[_.]{2})[^._].*[^.]$'
);

module.exports = { usernameValidator };
