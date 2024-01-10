import express from "express";
import dotenv from 'dotenv'
dotenv.config()
import config from "config";
import cors from 'cors'

import logger from "./utils/logger";
import connectDB from "./utils/connect";
import userRoute from "./routes/user.route";
import deserializeUser from "./middlewares/deserializeUser";
import adsRoute from "./routes/ads.route";
import bookmarkRoute from "./routes/bookmark.route";
import reviewRoute from "./routes/review.route";
import packageRoute from "./routes/admin/package.route";
import categoryRoute from "./routes/admin/category.route";
import emailRoute from "./routes/admin/email.route";
import filterRoute from "./routes/admin/filter.route";
import announcementRoute from "./routes/admin/announcement.route";
import topLocationRoute from "./routes/admin/topLocation.route";
import userManage from "./routes/admin/userManage.route";
import sellerRoute from "./routes/seller.route";
import notificationRoute from "./routes/notification.route";
import adStatusRoute from "./routes/admin/adStatus.route";
import adAlertRoute from "./routes/adAlert.route";
import blogsRoute from "./routes/admin/blogs.route";
import subscriptionRoute from "./routes/subscription.route";
import messageRoute from "./routes/message.route";
import expireAds from "./utils/cronAdsExpire";
import cronAdsAlert from "./utils/cronAdsAlert";

const port = config.get("port") as number;

const app = express();

// enable cors for all routes
app.use(cors())

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(deserializeUser);

app.listen(port, async () => {
    logger.info(`Server is running on port: ${port}`);

    connectDB();

    //User route
    userRoute(app)

    //Seller route
    sellerRoute(app)

    //Package route
    packageRoute(app)

    // Ads route
    adsRoute(app)

    // Category route
    categoryRoute(app)

    // Email route
    emailRoute(app)

    // Filter route
    filterRoute(app)

    // Announcement route
    announcementRoute(app)

    // Top Location route
    topLocationRoute(app)

    // Bookmark route
    bookmarkRoute(app)

    // User management route
    userManage(app)

    // notifion catalog route
    notificationRoute(app)

    // Ads status route
    adStatusRoute(app)

    // Ads alert route
    adAlertRoute(app)

    // Review route
    reviewRoute(app)

    // Blogs route
    blogsRoute(app)

    // Subscription route
    subscriptionRoute(app)

    // Message route
    messageRoute(app)

    // Expire ads cron
    expireAds()

    // Ad Alert cron
    cronAdsAlert()
});
