import { compare, genSalt, hash } from 'bcryptjs';

class PasswordBcrypt {
  async hash(value) {
    return hash(value, await genSalt(12));
  }

  async verify(value, hashed) {
    return compare(value, hashed);
  }
}

const passwordBcrypt = new PasswordBcrypt();
export default passwordBcrypt;
