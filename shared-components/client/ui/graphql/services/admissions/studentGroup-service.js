import BaseService from "../base-service";
import studentGroupsQuery from "../studentGroups/queries/groups";


export default class StudentGroup {
    static async getBatches(shopId, { page = 0, limit = 8, queryParams }, searchKeywords) {
        const date = queryParams?.filterPrms?.date

        const { data } = await BaseService.executeQueryWithVariables(studentGroupsQuery, {
            shopId: shopId,
        })

        const records = {};
        const groups = data?.studentGroups
            ? data.studentGroups.map((data) => {
                return {
                    id: data._id,
                    groupName: data.name,
                    authorName: data.account.name,
                    createdBy: data.createdBy,
                    createdAt: data.createdAt,
                    studentEmails: data.studentEmailIds,
                    students: data.students,
                    updatedAt: data.updatedAt,
                    updatedBy: data.updatedBy,
                    trainingPartners: data.trainingPartners,
                    stream: data.stream,
                    selectedStartYear: data.selectedStartYear,
                    selectedEndYear: data.selectedEndYear,
                    socialMediaLinks: data?.profile?.socialMediaLinks,
                    groupPrograms: data.groupPrograms,
                    inviteLink: data?.inviteLink
                };
            })
            : [];

        let studentData = []

        if (searchKeywords?.length > 2) {
            for (let i = 0; i < groups.length; i++) {
                if (groups[i]?.groupName?.toLowerCase()?.includes(searchKeywords?.toLowerCase()) ||
                    (groups[i]?.createdAt?.toString()?.includes(searchKeywords))) {
                    studentData.push(groups[i])
                }

            }
        } else {
            studentData = groups
        }

        groups.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));

        studentData = groups
        if (date) {
            let filteredData;

            switch (date) {
                case "Today":
                    filteredData = studentData.filter((item) => isToday(new Date(item.createdAt)));
                    break;
                case "Yesterday":
                    filteredData = studentData.filter((item) => isYesterday(new Date(item.createdAt)));
                    break;
                case "This Week":
                    filteredData = studentData.filter((item) => isThisWeek(new Date(item.createdAt)));
                    break;
                case "Last Week":
                    filteredData = studentData.filter((item) => isLastWeek(new Date(item.createdAt)));
                    break;
                case "This Month":
                    filteredData = studentData.filter((item) => isThisMonth(new Date(item.createdAt)));
                    break;
                case "Last Month":
                    filteredData = studentData.filter((item) => isLastMonth(new Date(item.createdAt)));
                    break;
                case "This Year":
                    filteredData = studentData.filter((item) => isThisYear(new Date(item.createdAt)));
                    break;
                case "Last Year":
                    filteredData = studentData.filter((item) => isLastYear(new Date(item.createdAt)));
                    break;
                default:
                    filteredData = studentData;
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
            studentData = filteredData;
        }


        if (page >= 0) {
            if (limit) {
                const from = page * limit;
                const to = page > 0 ? (limit + from) : limit;

                records["groups"] = studentData.slice(from, to)
                records['count'] = studentData.length
            }
        } else {
            records["groups"] = studentData
            records['count'] = studentData.length
        }
        return records;


    }
}