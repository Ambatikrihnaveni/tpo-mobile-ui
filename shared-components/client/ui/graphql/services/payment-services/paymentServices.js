import React, { Component } from 'react'
import BaseService from '../base-service';
import placeOrder from './mutations/placeOrder';
import paymentRecords from './queries/paymentRecords'
import transferredPayments from './mutations/transferredPaymnets';
import transactions from './mutations/transactions';
import getTransactions from './queries/getTransactions';
import manualPaymentsStatus from './mutations/manualPaymentStatus';
import paymentsHistory from './queries/paymentsHistory';
import studentManualPayments from './mutations/studentManualPayments';

export class PaymentServices extends Component {

  static async createOrder(accountId,
    shopId,
    name,
    email, phoneNumber,
    studentData, groupData,
    billingAddress,
    price,
    totalAmount,
    discount,
    taxes,
    batchId,
    programId,
    paymentMethod,
    address,
    currencyCode,
    orderId,
    role,
    manualPayment
  ) {

    const { data } = await BaseService.executeMutationWithVariables(placeOrder, {
      input: {
        accountId,
        shopId,
        name,
        email, phoneNumber,
        studentData, groupData,
        billingAddress,
        price,
        totalAmount,
        discount,
        taxes,
        batchId,
        programId,
        paymentMethod,
        address,
        currencyCode,
        orderId,
        role,
        manualPayment
      }
    });
    return data;
  }

  static async transferredPaymentsStatus(orderId, transferredPaymentsStatus) {
    const data = await BaseService.executeMutationWithVariables(transferredPayments, {
      input: {
        orderId,
        transferredPaymentsStatus
      }
    })
    return data
  }
  static async manualPaymentsStatus(orderId, status, paymentMethod) {
    const data = await BaseService.executeMutationWithVariables(manualPaymentsStatus, {
      input: {
        orderId,
        status,
        paymentMethod
      }
    })
    return data
  }

  static async transactionsList(accountId, institute, amount, date, transactionId, currencyCode) {
    const data = await BaseService.executeMutationWithVariables(transactions, {
      input: {
        accountId,
        institute,
        amount,
        date,
        transactionId,
        currencyCode
      }
    })
    return data
  }

  static async studentManualPayments(accountId, batchId, shopId, studentEmail, manualPayment, groupId) {
    const { data } = await BaseService.executeMutationWithVariables(studentManualPayments, {
      input: {
        accountId,
        batchId,
        shopId,
        studentEmail,
        manualPayment,
        groupId
      }

    })
    return data
  }

  static async transactionsHistory(accountId, { page, limit, queryParams }, recordsType, role, shopId) {
    const institute = queryParams?.filterPrms?.institute
    const date = queryParams?.filterPrms?.date
    const { data } = await BaseService.executeQueryWithVariables(getTransactions, {
      accountId,
      role,
      shopId
    });

    const records = {};
    //const payments = paymentData
    const payments = data?.getTransactions ?
      data?.getTransactions
        .map((data) => (
          {
            date: data?.date,
            institute: data?.instituteName,
            amount: data?.amount,
            transactionId: data?.transactionId,
            currencyCode: data?.currencyCode

          }
        )) : []

    let Transaction = []

    if (searchKeywords?.length > 2) {
      for (let i = 0; i < payments.length; i++) {
        if (payments?.date?.includes(searchKeywords?.toLowerCase()) ||
          (payments?.date?.includes(searchKeywords)) ||
          (payments?.transactionId?.toLowerCase()?.includes(searchKeywords?.toLowerCase())) ||
          (payments?.amount?.includes(searchKeywords)) ||
          (payments?.instituteName?.includes(searchKeywords?.toLowerCase()))) {
          Transaction.push(modules[i])
        }

      }
    } else {
      Transaction = payments
    }

    if (institute) {
      Transaction = Transaction.filter(item => item.institute === institute);
    } else if (date) {
      let filteredData;

      switch (date) {
        case "Today":
          filteredData = Transaction.filter((item) => isToday(new Date(item.date)));
          break;
        case "Yesterday":
          filteredData = Transaction.filter((item) => isYesterday(new Date(item.date)));
          break;
        case "This Week":
          filteredData = Transaction.filter((item) => isThisWeek(new Date(item.date)));
          break;
        case "Last Week":
          filteredData = Transaction.filter((item) => isLastWeek(new Date(item.date)));
          break;
        case "This Month":
          filteredData = Transaction.filter((item) => isThisMonth(new Date(item.date)));
          break;
        case "Last Month":
          filteredData = Transaction.filter((item) => isLastMonth(new Date(item.date)));
          break;
        case "This Year":
          filteredData = Transaction.filter((item) => isThisYear(new Date(item.date)));
          break;
        case "Last Year":
          filteredData = Transaction.filter((item) => isLastYear(new Date(item.date)));
          break;
        default:
          filteredData = Transaction;
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
      Transaction = filteredData;
    }

    Transaction.sort((a, b) => new Date(b.date) - new Date(a.date));

    Transaction = Transaction
    if (page >= 0) {
      if (limit) {
        const from = page * limit;
        const to = page > 0 ? (limit + from) : limit;

        records["transactions"] = Transaction.slice(from, to)
        records['count'] = Transaction.length
      }
    } else {
      records["transactions"] = Transaction
      records['count'] = Transaction.length
    }
    return records;
  }

  static async getManualPayments(accountId, { page, limit, queryParams }, recordsType, role) {
    const status = queryParams?.filterPrms?.paymentStatus

    const { data } = await BaseService.executeQueryWithVariables(paymentRecords, {
      accountId,
      role
    });

    const records = {};
    const manualPayments = data?.ordersByAccountId || [];

    if (role === "Admin") {
      records["manualPayments"] = manualPayments
        .filter((item) => item.manualPayment === true)
        .map((data) => ({
          date: data?.date,
          programName: data?.programName,
          batchName: data?.batchName,
          price: data?.price,
          groupName: data?.groupName,
          studentData: data?.studentData,
          isPayment: data?.isPayment,
          institute: data?.instituteName,
          orderId: data?.orderId,
          status: data?.manualPaymentStatus,
          studentName: data?.studentName,
          trainingPartner: data?.trainingPartner,
          currencyCode: data?.currencyCode
        }))
    }
    records['count'] = records.manualPayments.length;

    let tpManualpayment = (searchKeywords?.length > 2) ?

      manualPayments.filter(manualPayments =>
        manualPayments?.date?.includes(searchKeywords) ||
        (manualPayments?.studentName?.toLowerCase()?.includes(searchKeywords?.toLowerCase())) ||
        (manualPayments?.groupName?.toLowerCase()?.includes(searchKeywords?.toLowerCase())) ||
        (manualPayments?.institute?.toLowerCase()?.includes(searchKeywords?.toLowerCase())) ||
        (manualPayments?.programName?.toLowerCase()?.includes(searchKeywords?.toLowerCase())) ||
        (manualPayments?.batchName?.toLowerCase()?.includes(searchKeywords?.toLowerCase())) ||
        (manualPayments?.price?.toString()?.toLowerCase()?.includes(searchKeywords?.toLowerCase())) ||
        (manualPayments?.status?.toLowerCase()?.includes(searchKeywords?.toLowerCase()))
      )
      : manualPayments;
    if (status) {
      tpManualpayment = []
      tpManualpayment = manualPayments.filter(payment => payment.manualPaymentStatus === status);
    }


    if (page >= 0 && limit) {
      const from = page * limit;
      const to = page > 0 ? (limit + from) : limit;
      records["manualPayments"] = tpManualpayment.slice(from, to);
      records['count'] = tpManualpayment.length

    } else {
      records["manualPayments"] = tpManualpayment;
      records['count'] = tpManualpayment.length;
    }

    return records;
  }

  static async getPaymentsRecord(accountId, { page, limit, queryParams }, recordsType, role, searchKeywords) {
    const date = queryParams?.filterPrms?.date

    const { data } = await BaseService.executeQueryWithVariables(paymentRecords, {
      accountId,
      role
    });

    const records = {};

    const payments = data?.ordersByAccountId || [];

    if (role === "Admin") {
      records["payments"] = payments
        .filter((item) => item.isPayment === true && item.transferredPaymentsStatus === "Pending")
        .map((data) => ({
          date: data?.date,
          programName: data?.programName,
          batchName: data?.batchName,
          price: data?.price,
          groupName: data?.groupName,
          studentData: data?.studentData,
          isPayment: data?.isPayment,
          institute: data?.instituteName,
          currencyCode: data?.currencyCode

        }));
    }
    else {
      records["payments"] = payments.map((data) => ({
        date: data?.date,
        programName: data?.programName,
        batchName: data?.batchName,
        price: data?.price,
        groupName: data?.groupName,
        studentData: data?.studentData,
        isPayment: data?.isPayment,
        transferredPaymentsStatus: data?.transferredPaymentsStatus,
        currencyCode: data?.currencyCode
      }));
    }

    records['count'] = records.payments.length;

    let caPayments = []

    if (searchKeywords?.length > 2) {
      for (let i = 0; i < payments.length; i++) {
        if (payments[i]?.batchName?.toLowerCase()?.includes(searchKeywords?.toLowerCase()) ||
          (payments[i]?.groupName?.toLowerCase()?.includes(searchKeywords?.toLowerCase())) ||
          (payments[i]?.programName?.toLowerCase()?.includes(searchKeywords?.toLowerCase())) ||
          (payments[i]?.date?.toString()?.includes(searchKeywords)) ||
          ((payments[i]?.price?.toString())?.includes(searchKeywords)) ||
          ((payments[i]?.studentData?.toString())?.includes(searchKeywords))) {
          caPayments.push(payments[i])
        }

      }
    } else {
      caPayments = payments
    }
    if (date) {
      let filteredData;

      switch (date) {
        case "Today":
          filteredData = caPayments.filter((item) => isToday(new Date(item.date)));
          break;
        case "Yesterday":
          filteredData = caPayments.filter((item) => isYesterday(new Date(item.date)));
          break;
        case "This Week":
          filteredData = caPayments.filter((item) => isThisWeek(new Date(item.date)));
          break;
        case "Last Week":
          filteredData = caPayments.filter((item) => isLastWeek(new Date(item.date)));
          break;
        case "This Month":
          filteredData = caPayments.filter((item) => isThisMonth(new Date(item.date)));
          break;
        case "Last Month":
          filteredData = caPayments.filter((item) => isLastMonth(new Date(item.date)));
          break;
        case "This Year":
          filteredData = caPayments.filter((item) => isThisYear(new Date(item.date)));
          break;
        case "Last Year":
          filteredData = caPayments.filter((item) => isLastYear(new Date(item.date)));
          break;
        default:
          filteredData = caPayments;
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

      caPayments = filteredData;
    }
    caPayments.sort((a, b) => new Date(b.date) - new Date(a.date));

    caPayments = caPayments
    if (page >= 0 && limit) {
      const from = page * limit;
      const to = page > 0 ? (limit + from) : limit;
      records["payments"] = caPayments.slice(from, to);
    }

    return records;
  }

  static async paymentHistory(accountId, startDate, endDate, role) {
    const { data } = await BaseService.executeQueryWithVariables(paymentsHistory, {
      accountId,
      startDate,
      endDate,
      role
    });
    if (role == "Student") {
      if (data) {
        return data
      } else {
        return "No data found"
      }
    } else if (role == "College-Admin") {
      if (data) {
        return data
      } else {
        return "No data found"
      }

    } else {
      var records = {};
      var history = data?.paymentHistory ? data?.paymentHistory?.map((data) => (
        {
          date: data?.date,
          programName: data?.programName,
          programType: data?.type,
          studentData: data?.students,
          trainingPartner: data?.trainingPartner,
          price: data?.price
        }
      )) : [];
      if (data != "" || data != null) {
        return history; // Add this line to return the history array

      } else {
        return "No data found"
      }
    }
  }



  static async getReceivedPaymentsRecord(accountId, { page, limit, queryParams }, recordsType, role, searchKeywords) {
    const date = queryParams?.filterPrms?.date
    const institute = queryParams?.filterPrms?.institute


    const { data } = await BaseService.executeQueryWithVariables(paymentRecords, {
      accountId,
      role
    })

    const records = {};
    //const payments = paymentData
    const payments = data?.ordersByAccountId || [];

    if (role === "Admin") {
      records["received"] = payments
        .filter((item) => item.isPayment === true && item.transferredPaymentsStatus === "Settled")
        .map((data) => ({
          date: data?.date,
          programName: data?.programName,
          batchName: data?.batchName,
          price: data?.price,
          groupName: data?.groupName,
          studentData: data?.studentData,
          isPayment: data?.isPayment,
          institute: data?.instituteName,
          transferredPaymentsStatus: data?.transferredPaymentsStatus,
          currencyCode: data?.currencyCode

        }));
    } else {
      records["received"] = payments.map((data) => ({
        date: data?.date,
        programName: data?.programName,
        batchName: data?.batchName,
        price: data?.price,
        groupName: data?.groupName,
        studentData: data?.studentData,
        isPayment: data?.isPayment,
        institute: data?.instituteName,
        transferredPaymentsStatus: data?.transferredPaymentsStatus,
        manualPayment: data?.manualPayment,
        trainingPartner: data?.trainingPartner,
        currencyCode: data?.currencyCode
      }));
    }

    let receivedPayment = []

    if (searchKeywords?.length > 2) {
      for (let i = 0; i < payments.length; i++) {
        if (payments[i]?.trainingPartner?.toLowerCase()?.includes(searchKeywords?.toLowerCase()) ||
          (payments[i]?.programName?.toLowerCase()?.includes(searchKeywords?.toLowerCase())) ||
          (payments[i]?.groupName?.toLowerCase()?.includes(searchKeywords?.toLowerCase())) ||
          (payments[i]?.batchName?.toLowerCase()?.includes(searchKeywords?.toLowerCase())) ||
          (payments[i]?.date?.toString()?.includes(searchKeywords)) ||
          ((payments[i]?.price?.toString())?.includes(searchKeywords)) ||
          ((payments[i]?.studentData?.toString())?.includes(searchKeywords))) {
          receivedPayment.push(payments[i])
        }

      }
    } else {
      receivedPayment = payments
    }


    if (date) {
      let filteredData;

      switch (date) {
        case "Today":
          filteredData = receivedPayment.filter((item) => isToday(new Date(item.date)));
          break;
        case "Yesterday":
          filteredData = receivedPayment.filter((item) => isYesterday(new Date(item.date)));
          break;
        case "This Week":
          filteredData = receivedPayment.filter((item) => isThisWeek(new Date(item.date)));
          break;
        case "Last Week":
          filteredData = receivedPayment.filter((item) => isLastWeek(new Date(item.date)));
          break;
        case "This Month":
          filteredData = receivedPayment.filter((item) => isThisMonth(new Date(item.date)));
          break;
        case "Last Month":
          filteredData = receivedPayment.filter((item) => isLastMonth(new Date(item.date)));
          break;
        case "This Year":
          filteredData = receivedPayment.filter((item) => isThisYear(new Date(item.date)));
          break;
        case "Last Year":
          filteredData = receivedPayment.filter((item) => isLastYear(new Date(item.date)));
          break;
        default:
          filteredData = receivedPayment;
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
      receivedPayment = filteredData;
    } else if (institute) {

      receivedPayment = payments.filter((payment, index) => payment.trainingPartner === institute);

    }

    records['count'] = records.received.length;

    receivedPayment.sort((a, b) => new Date(b.date) - new Date(a.date));

    receivedPayment = receivedPayment
    if (page >= 0 && limit) {
      const from = page * limit;
      const to = page > 0 ? (limit + from) : limit;
      records["received"] = receivedPayment.slice(from, to);
    }

    return records;
  }


  static async getReceivedPayableRecord(accountId, { page, limit, queryParams }, recordsType, role, searchKeywords) {

    const status = queryParams?.filterPrms?.payableStatus
    const { data } = await BaseService.executeQueryWithVariables(paymentRecords, {
      accountId,
      role
    })

    const records = {};
    //const payments = paymentData
    const payments = data?.ordersByAccountId ?
      data?.ordersByAccountId
        // .filter((item) => item.isPayment === true)
        .map((data) => (
          {
            orderId: data?.orderId,
            date: data?.date,
            programName: data?.programName,
            batchName: data?.batchName,
            price: data?.price,
            groupName: data?.groupName,
            studentData: data?.studentData,
            isPayment: data?.isPayment,
            transferredPaymentsStatus: data?.transferredPaymentsStatus,
            institute: data?.instituteName,
            trainingPartner: data?.trainingPartner,
            currencyCode: data?.currencyCode

          }
        )) : []


    let receivedPayment = []

    if (searchKeywords?.length > 2) {
      for (let i = 0; i < payments.length; i++) {
        if (payments[i]?.batchName?.toLowerCase()?.includes(searchKeywords?.toLowerCase()) ||
          (payments[i]?.groupName?.toLowerCase()?.includes(searchKeywords?.toLowerCase())) ||
          (payments[i]?.institute?.toLowerCase()?.includes(searchKeywords?.toLowerCase())) ||
          (payments[i]?.programName?.toLowerCase()?.includes(searchKeywords?.toLowerCase())) ||
          (payments[i]?.date?.toString()?.includes(searchKeywords)) ||
          ((payments[i]?.price?.toString())?.includes(searchKeywords)) ||
          ((payments[i]?.studentData?.toString())?.includes(searchKeywords)) ||
          (payments[i]?.trainingPartner?.toLowerCase()?.includes(searchKeywords?.toLowerCase()))) {
          receivedPayment.push(payments[i])
        }

      }
    } else {
      receivedPayment = payments
    }

    if (status) {
      receivedPayment = [];

      receivedPayment = payments.filter(payment => payment.transferredPaymentsStatus === status);
    }
    receivedPayment.sort((a, b) => new Date(b.date) - new Date(a.date));

    receivedPayment = receivedPayment

    if (page >= 0) {
      if (limit) {
        const from = page * limit;
        const to = page > 0 ? (limit + from) : limit;

        records["payable"] = receivedPayment.slice(from, to)
        records['count'] = receivedPayment.length
      }
    } else {
      records["payable"] = receivedPayment
      records['count'] = receivedPayment.length
    }
    return records;
  }

}



