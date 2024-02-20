import BaseService from "../base-service";
import { mails } from '../../../appLayout/services/mock-data/mails';
import notificationsQuery from "./queries/notifications";
import notificationQuery from "./queries/notification";
import notificationsHistory from "./queries/notificationsHistory";
//import {getCustomDate} from "@jumbo/utils";
//import {ASSET_AVATARS} from "../../utils/constants/paths";

const Announcement = [
  {
    id: 1,
    title: 'MongoDB',
    date: "1/1/2023",
    audiance: 'Entair list',
    count: "100"
  },
  {
    id: 2,
    title: 'React',
    date: "1/2/2023",
    audiance: 'Students list',
    count: "200"
  },
  {
    id: 3,
    title: 'Add new features',
    date: "1/3/2023",
    audiance: 'Colleges list',
    count: "300"
  },

]

export default class Notifications {

  static async getNotifications(shopId, { page, limit, queryParams }, userId, searchKeywords) {

    const { data } = await BaseService.executeQueryWithVariables(notificationsQuery)
    const records = {};
    //  const notifications = mails
    const notificationsData = data?.notifications ?
      data.notifications.map((data) => {
        return {
          id: data._id,
          message: data.message,
          from: data.fromAccount,
          to: data.toAccount,
          date: data.timeSent,
          status: data.status
        };
      })
      : []
    const notifications = notificationsData.reverse()


    let notificationData = []

    if (searchKeywords?.length > 2) {
      for (let i = 0; i < notifications.length; i++) {
        if (notifications[i]?.from?.name?.toLowerCase()?.includes(searchKeywords?.toLowerCase()) ||
          (notifications[i]?.to?.name?.toLowerCase()?.includes(searchKeywords?.toLowerCase())) ||
          (notifications[i]?.message?.toLowerCase()?.includes(searchKeywords?.toLowerCase())) ||
          (notifications[i]?.from?.primaryEmailAddress?.toLowerCase()?.includes(searchKeywords?.toLowerCase())) ||
          (notifications[i]?.to?.primaryEmailAddress?.toLowerCase()?.includes(searchKeywords?.toLowerCase()))) {
          notificationData.push(notifications[i])
        }

      }
    } else {
      notificationData = notifications
    }




    if (page >= 0) {
      if (limit) {
        const from = page * limit;
        const to = page > 0 ? (limit + from) : limit;

        records["notifications"] = notificationData.slice(from, to)
        records['count'] = notificationData.length
      }
    } else {
      records["notifications"] = notificationData
      records['count'] = notificationData.length
    }

    return records;

  }

  static async notificationsHistory(shopId, { page, limit, queryParams }, userId, searchKeywords, recordsType) {
          ;
    const { data } = await BaseService.executeQueryWithVariables(notificationsHistory)
    const records = {};
    //  const notifications = mails
    const notificationsData = data?.notificationsHistory ?
      data.notificationsHistory.map((data) => {
        return {
          id: data._id,
          message: data.message,
          from: data.fromAccount,
          to: data.toAccount,
          date: data.timeSent,
          status: data.status,
          title:data.title,
          count:data.count,
          audiance:data.sendTo
        };
      })
      : []
    const notifications = notificationsData.reverse()


    let notificationSent = []

    if (searchKeywords?.length > 2) {
      for (let notification of notifications) {
        if (
          notification?.from?.name?.toLowerCase()?.includes(searchKeywords?.toLowerCase()) ||
          (notification?.to?.name?.toLowerCase()?.includes(searchKeywords?.toLowerCase())) ||
          (notification?.message?.toLowerCase()?.includes(searchKeywords?.toLowerCase())) ||
          (notification?.from?.primaryEmailAddress?.toLowerCase()?.includes(searchKeywords?.toLowerCase())) ||
          (notification?.to?.primaryEmailAddress?.toLowerCase()?.includes(searchKeywords?.toLowerCase()))||
          (notification?.title?.toLowerCase()?.includes(searchKeywords?.toLowerCase()))||
          (notification?.date?.toString())?.includes(searchKeywords)
        ) {
          notificationSent.push(notification)
        } else {
          notification?.audiance?.forEach((ele) => {
            if ((ele?.toLowerCase()).includes(searchKeywords?.toLowerCase())) {
              notificationSent.push(notification)
            }
          });
        }
      }
  
    } else {
      notificationSent = notifications
    }


    if (page >= 0) {
      if (limit) {
        const from = page * limit;
        const to = page > 0 ? (limit + from) : limit;
        if (recordsType == "sent") {
          records["sent"] = notificationSent.slice(from, to)
          records['count'] = notificationSent.length
        } else {
          records["announcement"] = notificationSent.slice(from, to)
          records['count'] = notificationSent.length
        }


      }
    } else {

      if (recordsType == "sent") {
        records["sent"] = notificationSent
        records['count'] = notificationSent.length
      } else {
        records["announcement"] = notificationSent
        records['count'] = notificationSent.length
      }
    }

    return records;

  }

  static async SendAnnouncement(shopId, { page, limit, queryParams }, userId, searchKeywords) {

    //const { data } = await BaseService.executeQueryWithVariables(notificationsHistory) 
    const records = {};



    if (page >= 0) {
      if (limit) {
        const from = page * limit;
        const to = page > 0 ? (limit + from) : limit;

        records["announcement"] = Announcement.slice(from, to)
        records['count'] = Announcement.length
      }
    } else {
      records["announcement"] = Announcement
      records['count'] = Announcement.length
    }

    return records;

  }



  static async getNotificationDetail(id) {
    const { data } = await BaseService.executeQueryWithVariables(notificationQuery, {
      id: id
    })
   
    return data;
  }




  static async notifications() {

    const { data } = await BaseService.executeQueryWithVariables(notificationsQuery)
    // const records = mails;

    const notifications = data?.notifications ?
      data.notifications.map((data) => {
        return {
          id: data._id,
          message: data.message,
          from: data.fromAccount,
          to: data.toAccount,
          date: data.timeSent,
          status: data.status
        };
      })
      : []

    return notifications;

  };

  static async deleteMail(mailID) {
   
  };
  static async deleteMultiple(selectedIDs) {
   
  };

  static async multipleMoveSpam(selectedIDs) {
    
  };

  static async assignLabel(params) {
    
  };



}
