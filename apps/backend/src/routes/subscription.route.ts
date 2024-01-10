import { Express } from 'express'
import { createSubscriptionHandler, findSubscriptionHandler } from '../controller/subscription.controller'
import { subscriptionValidate } from '../middlewares/subscription.validate'

function subscriptionRoute(app: Express) {
    // create a subscription route
    app.post(
        '/api/v1/users/subscription',
        subscriptionValidate,
        createSubscriptionHandler
    )

    // Find all subscription route
    app.get(
        '/api/v1/users/subscription',
        findSubscriptionHandler
    )

}
export default subscriptionRoute
