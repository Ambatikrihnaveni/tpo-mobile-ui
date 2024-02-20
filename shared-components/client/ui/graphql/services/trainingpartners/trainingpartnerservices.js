
import React, { Component } from 'react'
import BaseService from '../base-service';
import trainingpartnerRecord from './queries/trainingpartnerRecord';

export class TrainingPartnerServies extends Component {


  static async getTrainingPartnersRecord(accountId, { page, limit, queryParams }, searchKeywords) {
    const date = queryParams?.filterPrms?.date

    const { data } = await BaseService.executeQueryWithVariables(trainingpartnerRecord)

    const records = {};
    //const payments = paymentData
    const trainingpartners = data?.trainingPartners ?
      data?.trainingPartners
        .map((data) => (
          {
            id: data?._id,
            date: data?.createdAt,
            contact: data?.phoneNumber,
            location: data?.profile?.address,
            institute: data?.name,
            city: data?.profile?.city

          }
        )) : []

    let trainingPartnersData = []

    if (searchKeywords?.length > 2) {
      for (let i = 0; i < trainingpartners.length; i++) {
        if (trainingpartners[i]?.city?.toLowerCase()?.includes(searchKeywords?.toLowerCase()) ||
          (trainingpartners[i]?.contact?.toLowerCase()?.includes(searchKeywords?.toLowerCase())) ||
          (trainingpartners[i]?.institute?.toLowerCase()?.includes(searchKeywords?.toLowerCase())) ||
          (trainingpartners[i]?.date?.toString()?.includes(searchKeywords))) {
          trainingPartnersData.push(trainingpartners[i])
        }

      }
    } else {
      trainingPartnersData = trainingpartners
    }


    if (date) {
      let filteredData;

      switch (date) {
        case "Today":
          filteredData = trainingPartnersData.filter((item) => isToday(new Date(item.date)));
          break;
        case "Yesterday":
          filteredData = trainingPartnersData.filter((item) => isYesterday(new Date(item.date)));
          break;
        case "This Week":
          filteredData = trainingPartnersData.filter((item) => isThisWeek(new Date(item.date)));
          break;
        case "Last Week":
          filteredData = trainingPartnersData.filter((item) => isLastWeek(new Date(item.date)));
          break;
        case "This Month":
          filteredData = trainingPartnersData.filter((item) => isThisMonth(new Date(item.date)));
          break;
        case "Last Month":
          filteredData = trainingPartnersData.filter((item) => isLastMonth(new Date(item.date)));
          break;
        case "This Year":
          filteredData = trainingPartnersData.filter((item) => isThisYear(new Date(item.date)));
          break;
        case "Last Year":
          filteredData = trainingPartnersData.filter((item) => isLastYear(new Date(item.date)));
          break;
        default:
          filteredData = trainingPartnersData;
          break;
      }

      // Helper functions to check date conditions
      function isToday(date) {
        const today = new Date();
        return (
          date.getDate() === today.getDate() &&
          date.getMonth() === today.getMonth() &&
          date.getFullYear() === today.getFullYear()
        );
      }

      function isYesterday(date) {
        const yesterday = new Date();
        yesterday.setDate(yesterday.getDate() - 1);
        return (
          date.getDate() === yesterday.getDate() &&
          date.getMonth() === yesterday.getMonth() &&
          date.getFullYear() === yesterday.getFullYear()
        );
      }

      function isThisWeek(date) {
        const today = new Date();
        const firstDayOfWeek = new Date(today.setDate(today.getDate() - today.getDay()));
        const lastDayOfWeek = new Date(firstDayOfWeek);
        lastDayOfWeek.setDate(lastDayOfWeek.getDate() + 6);

        return date >= firstDayOfWeek && date <= lastDayOfWeek;
      }

      function isLastWeek(date) {
        const today = new Date();
        const firstDayOfLastWeek = new Date(today.setDate(today.getDate() - today.getDay() - 7));
        const lastDayOfLastWeek = new Date(firstDayOfLastWeek);
        lastDayOfLastWeek.setDate(lastDayOfLastWeek.getDate() + 6);

        return date >= firstDayOfLastWeek && date <= lastDayOfLastWeek;
      }

      function isThisMonth(date) {
        const today = new Date();
        return date.getMonth() === today.getMonth() && date.getFullYear() === today.getFullYear();
      }

      function isLastMonth(date) {
        const today = new Date();
        const lastMonth = new Date(today.getFullYear(), today.getMonth() - 1, today.getDate());
        return date.getMonth() === lastMonth.getMonth() && date.getFullYear() === lastMonth.getFullYear();
      }

      function isThisYear(date) {
        const today = new Date();
        return date.getFullYear() === today.getFullYear();
      }

      function isLastYear(date) {
        const today = new Date();
        const lastYear = new Date(today.getFullYear() - 1, today.getMonth(), today.getDate());
        return date.getFullYear() === lastYear.getFullYear();
      }
      trainingPartnersData = filteredData;
    }

    trainingPartnersData.sort((a, b) => new Date(b.date) - new Date(a.date));

    trainingPartnersData = trainingPartnersData
    if (page >= 0) {
      if (limit) {
        const from = page * limit;
        const to = page > 0 ? (limit + from) : limit;

        records["trainingpartners"] = trainingPartnersData.slice(from, to)
        records['count'] = trainingPartnersData.length
      }
    } else {
      records["trainingpartners"] = trainingPartnersData
      records['count'] = trainingPartnersData.length
    }
    return records;
  }

 

}



