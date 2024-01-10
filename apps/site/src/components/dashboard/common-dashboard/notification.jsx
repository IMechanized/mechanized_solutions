import _ from 'lodash';
import React from 'react';
import Moment from "react-moment";
import { ThemeContext } from '../../../context/ThemeContext';

const data = ["1", "2", "3", "4", "5", "6", "7", "8"]

const Notification = () => {
  const { recentNotification, recentNotificationError } = React.useContext(ThemeContext);
  const notificationData = recentNotification?.notification

  return (
    <div className="bg-white p-7 rounded-xl shadow-boxShadow ">
      <h1 className="text-xl font-bold text-themeBlackDarker">Latest Notification</h1>
      <div className="pt-6 space-y-1 overflow-auto  h-[489px]">
        {_.map(notificationData, (notify, index) => (
          <div key={index} className="bg-themeWhiteLight p-5 rounded ">
            <span className="text-themeWhiteLighter text-sm font-normal">
              <Moment fromNow>{notify.timestamp}</Moment>
            </span>
            <p className="text-lg font-normal text-themeBlackDarker truncate">
              {notify.message}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Notification;