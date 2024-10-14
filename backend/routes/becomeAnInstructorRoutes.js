import express from 'express';
import protect from "../middlewere/protectMiddleware.js";

import {
   createInstructorRequest,
    getAllInstructorRequests,
    getInstructorRequest,
    updateInstructorRequest,
    deleteInstructorRequest,
    approveInstructorRequest,
    rejectInstructorRequest,
} from '../controllers/instructorRequestController.js';


const router = express.Router();

router.route('/').post(protect(), createInstructorRequest).get(protect(['admin']), getAllInstructorRequests);
router.route('/:id').get(protect(['admin']), getInstructorRequest).patch(protect(['admin']), updateInstructorRequest).delete(protect(['admin']), deleteInstructorRequest);
router.route('/:id/approve').put(protect(['admin']), approveInstructorRequest);
router.route('/:id/reject').put(protect(['admin']), rejectInstructorRequest);

export default router;
