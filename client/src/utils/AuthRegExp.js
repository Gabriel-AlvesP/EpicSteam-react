/* Username Validator
 * Characters: Alphanumeric and SpecialCharacters: { _ .}
 * Length: [3,20]
 * Special Characters: can't be together or at the start
 */
const usernameValidator = RegExp(
	'^(?=[a-zA-Z0-9._]{3,20}$)(?!.*[_.]{2})[^._].*[^.]$'
);

/* Email Validator
 *
 */
const emailValidator = RegExp(`^[a-zA-Z0-9.]+@[a-zA-Z0-9.]+\.[a-zA-Z]{1,4}$`);

/* Passwd Validator
 *
 */
//`^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d@$!%*?&^#~$]{8,28}$`
const passwdValidator = RegExp(
	`^(?=.*[A-Z])(?=.*[0-9])(?=.*[a-z].*[a-z].*[a-z]).{8,24}$`
);

export { usernameValidator, emailValidator, passwdValidator };
