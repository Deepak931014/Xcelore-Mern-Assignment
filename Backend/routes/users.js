import * as express from 'express';
const router = express.Router();
import { loginController, registerController, listingController, deleteController, updateController } from '../controller.js';

/* POST user login. */
router.post('/login', loginController);


/* POST user registration. */
router.post('/register', registerController);


/* GET user listing. */
router.get('/listing', listingController);

/* DELETE user by id. */

router.delete('/:id', deleteController);

/* UPDATE user by id. */

router.put('/:id', updateController);

export default router;
