"use strict";
exports.__esModule = true;
var subscription_controller_1 = require("../controller/subscription.controller");
var subscription_validate_1 = require("../middlewares/subscription.validate");
function subscriptionRoute(app) {
    // create a subscription route
    app.post('/api/v1/users/subscription', subscription_validate_1.subscriptionValidate, subscription_controller_1.createSubscriptionHandler);
    // Find all subscription route
    app.get('/api/v1/users/subscription', subscription_controller_1.findSubscriptionHandler);
}
exports["default"] = subscriptionRoute;
