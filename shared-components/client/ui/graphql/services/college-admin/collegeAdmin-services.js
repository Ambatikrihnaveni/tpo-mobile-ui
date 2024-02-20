import React, { Component } from 'react'
import createStudentGroup from '../studentGroups/mutations/createStudentGroup';
import BaseService from '../base-service';
import studentGroupQuery from '../../services/studentGroups/queries/studentGroup'
import assignStudentsToBatch from '../studentGroups/mutations/assignStudentsToBatch';
import deleteStudentGroup from '../studentGroups/mutations/deleteStudentGroup';
import removeStudentsFromGroup from '../studentGroups/mutations/deleteStudentsFromGroup'
import updateStudentGroup from '../studentGroups/mutations/updateStudentGroup';
import collegeAdminRecord from './queries/collegeAdminRecord';




export class CollegeAdmin extends Component {

  static async createStudentGroup(groupName, shopId, stream, selectedStartYear, selectedEndYear) {

    const { data } = await BaseService.executeMutationWithVariables(createStudentGroup, {
      input: {
        name: groupName,
        shopId: shopId,
        stream: stream,
        selectedStartYear: selectedStartYear,
        selectedEndYear: selectedEndYear
      }
    });
    const records = {}
    return records;
  }




  static async updateStudentGroup(groupName, shopId, stream, selectedStartYear, selectedEndYear, groupId) {

    const { data } = await BaseService.executeMutationWithVariables(updateStudentGroup, {
      input: {
        id: groupId,
        name: groupName,
        stream: stream,
        selectedStartYear: selectedStartYear,
        selectedEndYear: selectedEndYear
      }
    });
    const records = {}
    return records;
  }

  static async getGroupStudents(groupId, { page, limit, queryParams }) {

    ;
    const status = queryParams?.filterPrms?.groupstatus
    const { data } = await BaseService.executeQueryWithVariables(studentGroupQuery, {
      id: groupId

    })
    const records = {};

    const studentGroup = data?.studentGroup
      ? data.studentGroup?.studentEmailIds?.map((data1) => {
        return {
          studentEmail: data1.studentEmail,
          logged: data1.isLogged,
          invited: data1.isInvited,
          verified: data1.isLogged,
          id: data1?.student?._id,
          batch: data1.batchIds,
          name: data1?.student?.name,
          phoneNumber: data1?.student?.phoneNumber,
          createdAt: data.studentGroup.createdAt,
          updatedAt: data.studentGroup.updatedAt,
          groupName: data.studentGroup.name,
          programs: data1.programs
        };
      })
      : [];


    let groupStudents = []

    if (searchKeywords?.length > 2) {
      for (let i = 0; i < studentGroup.length; i++) {
        if (studentGroup[i]?.name?.toLowerCase()?.includes(searchKeywords?.toLowerCase()) ||
          studentGroup[i]?.studentEmail?.toLowerCase()?.includes(searchKeywords?.toLowerCase()) ||
          studentGroup[i]?.phoneNumber?.toString()?.includes(searchKeywords) ||
          studentGroup[i]?.createdAt?.toString()?.includes(searchKeywords)) {
          groupStudents.push(studentGroup[i])
        }

      }
    } else {
      groupStudents = studentGroup
    }


    if (status == "Invited") {
      groupStudents = studentGroup.filter(group => group.invited == true)
    } else if (status == "Verified") {
      groupStudents = studentGroup.filter(group => group.logged == true)
    }

    if (page >= 0) {
      if (limit) {
        const from = page * limit;
        const to = page > 0 ? (limit + from) : limit;

        records["groupList"] = groupStudents.slice(from, to)
        records['count'] = groupStudents.length
      }
    } else {
      records["groupList"] = groupStudents
      records['count'] = groupStudents.length
    }
    return records;
  }

  static async assignStudentsToBatch(studentGroupId, batchId,
    manualPayment) {

    const { data } = await BaseService.executeMutationWithVariables(assignStudentsToBatch, {
      input: {
        studentGroupId: studentGroupId,
        batchId: batchId.batchId,
        studentEmails: batchId.studentEmails,
        manualPayment: manualPayment
      }
    });
    const records = {}
    return records;
  }


  
  static async deleteStudentGroup(groupId) {

    const { data } = await BaseService.executeMutationWithVariables(deleteStudentGroup, {
      input: {
        id: groupId
      }
    });
  }

  static async removeStudents(inputData) {

    const { data } = await BaseService.executeMutationWithVariables(removeStudentsFromGroup, {
      input: {
        id: inputData.id,
        studentEmails: inputData.emails
      }
    });
  }

  static async getCollegeAdminRecords(shopId, { page, limit, queryParams }, searchKeywords) {

    const date = queryParams?.filterPrms?.date
    const { data } = await BaseService.executeQueryWithVariables(collegeAdminRecord)


    const records = {};
    //const payments = paymentData
    const collegeadmins = data?.collegeAdmins ?
      data?.collegeAdmins
        .map((data) => (
          {
            id: data?._id,
            date: data?.createdAt,
            contact: data?.phoneNumber,
            location: data?.profile?.address,
            institute: data?.name,
            city: data?.profile?.city,
            students: data?.students
          }
        )) : []


    let collegeData = []

    if (searchKeywords?.length > 2) {
      for (let i = 0; i < collegeadmins.length; i++) {
        if (collegeadmins[i]?.city?.toLowerCase()?.includes(searchKeywords?.toLowerCase()) ||
          (collegeadmins[i]?.contact?.toLowerCase()?.includes(searchKeywords?.toLowerCase())) ||
          (collegeadmins[i]?.institute?.toLowerCase()?.includes(searchKeywords?.toLowerCase())) ||
          (collegeadmins[i]?.date?.toString()?.includes(searchKeywords)) ||
          (collegeadmins[i]?.students?.toString()?.includes(searchKeywords))) {
          collegeData.push(collegeadmins[i])
        }

      }
    } else {
      collegeData = collegeadmins
    }

    if (date) {
      let filteredData;

      switch (date) {
        case "Today":
          filteredData = collegeData.filter((item) => isToday(new Date(item.date)));
          break;
        case "Yesterday":
          filteredData = collegeData.filter((item) => isYesterday(new Date(item.date)));
          break;
        case "This Week":
          filteredData = collegeData.filter((item) => isThisWeek(new Date(item.date)));
          break;
        case "Last Week":
          filteredData = collegeData.filter((item) => isLastWeek(new Date(item.date)));
          break;
        case "This Month":
          filteredData = collegeData.filter((item) => isThisMonth(new Date(item.date)));
          break;
        case "Last Month":
          filteredData = collegeData.filter((item) => isLastMonth(new Date(item.date)));
          break;
        case "This Year":
          filteredData = collegeData.filter((item) => isThisYear(new Date(item.date)));
          break;
        case "Last Year":
          filteredData = collegeData.filter((item) => isLastYear(new Date(item.date)));
          break;
        default:
          filteredData = collegeData;
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

      // Assign filtered data back to collegeData
      collegeData = filteredData;

    }

    collegeData.sort((a, b) => new Date(b.date) - new Date(a.date));

    collegeData = collegeData

    if (page >= 0) {
      if (limit) {
        const from = page * limit;
        const to = page > 0 ? (limit + from) : limit;

        records["collegeadmins"] = collegeData.slice(from, to)
        records['count'] = collegeData.length
      } else {
        records["collegeadmins"] = collegeData
        records['count'] = collegeData.length
      }
    } else {
      records["collegeadmins"] = collegeData
      records['count'] = collegeData.length
    }
    return records;
  }
}



