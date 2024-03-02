import { actuser } from '../server/controllers/userController'
let activeuser=0;
actuser();
module.exports = {
    get: () => activeuser,
    increment: () => activeuser=1,
    decrement: () => activeuser=0
};