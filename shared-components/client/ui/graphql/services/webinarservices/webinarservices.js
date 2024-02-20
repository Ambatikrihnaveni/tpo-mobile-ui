
import React, { Component } from 'react'
import BaseService from '../base-service';
import webinarsQuery from './queries/webinars';
import eventsQuery from './queries/events';
import webinar from './queries/webinar'

export class WebinarServicess extends Component {

  static async getWebinarRecord(shopId, { page, limit, queryParams }, searchKeywords) {
    const { data } = await BaseService.executeQueryWithVariables(webinarsQuery, {})

    const records = {};
    const webinars = data.webinars ? data.webinars.map((webinar) => {
      return {
        id: webinar?._id,
        title: webinar.title,
        description: webinar?.description,
        url: webinar.url,
        date: webinar.date,
        startTime: webinar.startTime,
        endTime: webinar.endTime,
        audiences: webinar.audiences,
        createdAt: webinar.createdAt,
        acceptCount: webinar.acceptedCount
      }
    }

    ) : []



    let webinarData = []

    if (searchKeywords?.length > 2) {
      for (let webinar of webinars) {
        if (
          (webinar?.title?.toLowerCase()).includes(searchKeywords?.toLowerCase()) ||
          (webinar?.createdAt?.toString())?.includes(searchKeywords) ||
          (webinar?.endTime?.toString())?.includes(searchKeywords) ||
          (webinar?.startTime?.toString())?.includes(searchKeywords) ||
          (webinar?.date?.toString())?.includes(searchKeywords)
        ) {
          webinarData.push(webinar)
        } else {
          webinar?.audiences?.forEach((ele) => {
            if ((ele?.toLowerCase()).includes(searchKeywords?.toLowerCase())) {
              webinarData.push(webinar)
            }
          });
        }
      }

    } else {
      webinarData = webinars
    }

    webinars.sort((a, b) => new Date(b.date) - new Date(a.date));

    webinarData = webinars;


    if (page >= 0) {
      if (limit) {
        const from = page * limit;
        const to = page > 0 ? (limit + from) : limit;

        records["webinars"] = webinarData.slice(from, to)
        records['count'] = webinarData.length
      }
    } else {
      records["webinars"] = webinarData
      records['count'] = webinarData.length
    }
    return records;
  }

  static async getWebinar(webinarId) {
    const { data } = await BaseService.executeQueryWithVariables(webinar, {
      webinarId: webinarId
    })

    return data.webinar

  }

  static async getEvrnts(shopId, { page, limit, queryParams }, userId, searchKeywords, recordsType) {
    
    const { data } = await BaseService.executeQueryWithVariables(eventsQuery, {
      shopId: shopId
    })

    const records = {};
    let events = data.events ? data.events.map((event) => {
      return {
        id: event?._id,
        title: event.title,
        description: event.description,
        url: event.url,
        date: event.date,
        startTime: event.startTime,
        endTime: event.endTime,
        audiences: event.audiences,
        createdAt: event.createdAt,
        accept: event.accept,
        deny: event.deny
      }
    }

    ) : []


    let joinData = []

    if (searchKeywords?.length > 2) {
      for (let i = 0; i < events.length; i++) {
        if (events[i]?.title?.toLowerCase()?.includes(searchKeywords?.toLowerCase()) ||
          (events[i]?.date.toString()?.includes(searchKeywords)) ||
          (events[i]?.startTime?.toString()?.includes(searchKeywords))) {
          joinData.push(events[i])
        }

      }
    } else {
      joinData = events
    }
    const currentDate = new Date();
    events = events.filter((event) => event.deny !== true);
    events = events.filter(event => new Date(event.date) >= currentDate);
    events.sort((a, b) => new Date(b.date) - new Date(a.date));

    joinData = events;


    joinData = events

    if (page >= 0) {
      if (limit) {
        const from = page * limit;
        const to = page > 0 ? (limit + from) : limit;

        if (recordsType == "join") {
          records["join"] = joinData.slice(from, to)
          records['count'] = joinData.length
        } else {
          records["webinars"] = joinData.slice(from, to)
          records['count'] = joinData.length
        }

      } else {
        if (recordsType == "join") {
          records["join"] = joinData
          records['count'] = joinData.length
        } else {
          records["webinars"] = joinData
          records['count'] = joinData.length
        }
      }
      return records;
    }

  }




}
