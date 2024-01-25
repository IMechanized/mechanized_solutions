"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
exports.__esModule = true;
var express_1 = __importDefault(require("express"));
var dotenv_1 = __importDefault(require("dotenv"));
dotenv_1["default"].config();
var config_1 = __importDefault(require("config"));
var cors_1 = __importDefault(require("cors"));
var logger_1 = __importDefault(require("./utils/logger"));
var connect_1 = __importDefault(require("./utils/connect"));
var user_route_1 = __importDefault(require("./routes/user.route"));
var deserializeUser_1 = __importDefault(require("./middlewares/deserializeUser"));
var ads_route_1 = __importDefault(require("./routes/ads.route"));
var bookmark_route_1 = __importDefault(require("./routes/bookmark.route"));
var review_route_1 = __importDefault(require("./routes/review.route"));
var package_route_1 = __importDefault(require("./routes/admin/package.route"));
var category_route_1 = __importDefault(require("./routes/admin/category.route"));
var email_route_1 = __importDefault(require("./routes/admin/email.route"));
var filter_route_1 = __importDefault(require("./routes/admin/filter.route"));
var announcement_route_1 = __importDefault(require("./routes/admin/announcement.route"));
var topLocation_route_1 = __importDefault(require("./routes/admin/topLocation.route"));
var userManage_route_1 = __importDefault(require("./routes/admin/userManage.route"));
var seller_route_1 = __importDefault(require("./routes/seller.route"));
var notification_route_1 = __importDefault(require("./routes/notification.route"));
var adStatus_route_1 = __importDefault(require("./routes/admin/adStatus.route"));
var adAlert_route_1 = __importDefault(require("./routes/adAlert.route"));
var blogs_route_1 = __importDefault(require("./routes/admin/blogs.route"));
var subscription_route_1 = __importDefault(require("./routes/subscription.route"));
var message_route_1 = __importDefault(require("./routes/message.route"));
var cronAdsExpire_1 = __importDefault(require("./utils/cronAdsExpire"));
var cronAdsAlert_1 = __importDefault(require("./utils/cronAdsAlert"));
var port = config_1["default"].get("port");
var app = (0, express_1["default"])();
// enable cors for all routes
app.use((0, cors_1["default"])());
app.use(express_1["default"].json());
app.use(express_1["default"].urlencoded({ extended: true }));
app.use(deserializeUser_1["default"]);
app.listen(port, function () { return __awaiter(void 0, void 0, void 0, function () {
    return __generator(this, function (_a) {
        logger_1["default"].info("Server is running on port: ".concat(port));
        (0, connect_1["default"])();
        //User route
        (0, user_route_1["default"])(app);
        //Seller route
        (0, seller_route_1["default"])(app);
        //Package route
        (0, package_route_1["default"])(app);
        // Ads route
        (0, ads_route_1["default"])(app);
        // Category route
        (0, category_route_1["default"])(app);
        // Email route
        (0, email_route_1["default"])(app);
        // Filter route
        (0, filter_route_1["default"])(app);
        // Announcement route
        (0, announcement_route_1["default"])(app);
        // Top Location route
        (0, topLocation_route_1["default"])(app);
        // Bookmark route
        (0, bookmark_route_1["default"])(app);
        // User management route
        (0, userManage_route_1["default"])(app);
        // notifion catalog route
        (0, notification_route_1["default"])(app);
        // Ads status route
        (0, adStatus_route_1["default"])(app);
        // Ads alert route
        (0, adAlert_route_1["default"])(app);
        // Review route
        (0, review_route_1["default"])(app);
        // Blogs route
        (0, blogs_route_1["default"])(app);
        // Subscription route
        (0, subscription_route_1["default"])(app);
        // Message route
        (0, message_route_1["default"])(app);
        // Expire ads cron
        (0, cronAdsExpire_1["default"])();
        // Ad Alert cron
        (0, cronAdsAlert_1["default"])();
        return [2 /*return*/];
    });
}); });
