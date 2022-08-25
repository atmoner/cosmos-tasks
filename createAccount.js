import fs from 'fs'
import crypto from 'crypto'

console.log('Create account!')

const stream = fs.createWriteStream('./auth.config.js');
let r = crypto.randomBytes(20).toString('hex');
stream.write("export default [{ user: 'cosmonaut', pass: 'cosmonaut', jwtKey: '" + r + "' } ]");
