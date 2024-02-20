import React, { useState } from "react";
import { Select, MenuItem, Grid, Button, InputBase, ListItemText, Checkbox, OutlinedInput, Typography } from '@mui/material';
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';
import AddIcon from '@mui/icons-material/Add';
import { recordService } from "../../../../../../services/record-services";
import useListViewPage from "../../../../../../../appLayout/pages/list-views/listViewPage/hooks/useListViewPage";
import { useMutation } from "react-query";
import withStyles from "@material-ui/core/styles/withStyles";
import Div from "../../../../../../../@jumbo/shared/Div";
import PlacementcellFilter from "./placementcellFilter";
import RecordDetail from "../../RecordDetail/RecordDetail";
import useAuth from "../../../../../../../hooks/useAuth";
import MyDashboardService from "../../../../../../../graphql/services/dashboard/dashboard-services";
import { EmojiFlags } from "@mui/icons-material";
const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
      width: 250,
    },
  },
};


const filterCategories = [
  {
    label: "Status",
    value: "Status",
  },
  {
    label: "Course Category",
    value: "Course Category",
  },
  {
    label: "Program Mode",
    value: "Program Mode"
  },
  {
    label: "Program Type",
    value: "Program Type"
  },
  {
    label: "Quizzes",
    value: "Quizzes"
  },
  {
    label: "Assignments",
    value: "Assignments"
  },
  {
    label: "Colleges",
    value: "Colleges"
  },
  {
    label: "Reg Date",
    value: 'Reg Date'
  },
  {
    label: "Date",
    value: "Date"
  },
  {
    label: "Training Partner",
    value: "Training Partner"
  },
  {
    label: "Created At",
    value: "Created At"
  },
  {
    label: "Invite Date",
    value: "Invite Date"
  }

]
const groupsfilters = [
  {
    label: "Invited",
    value: "Invited"
  },
  {
    label: "Verified",
    value: "Verified"
  }
]

const courseCategory = [
  {
    label: "MERN Stack",
    value: "MERN Stack",
  },
  {
    label: "Frontend Development",
    value: "Frontend Development",
  },
  {
    label: "Wordpress Development",
    value: "Wordpress Development",
  },
  {
    label: "Manual Testing",
    value: "Manual Testing",
  },
  {
    label: "Digital Marketing",
    value: "Digital Marketing",
  },
  {
    label: "ITES Non-Voice or BPO Non-Voice",
    value: "ITES Non-Voice or BPO Non-Voice",
  },
  {
    label: "Banking and Financial",
    value: "Banking and Financial"
  },
  {
    label: "Python",
    value: "Python"
  },
  {
    label: " Java",
    value: " Java"
  },
  {
    label: "JavaScript",
    value: "JavaScript"
  },
  {
    label: "C",
    value: "C"
  },
  {
    label: "C++",
    value: "C++"
  },
  {
    label: "C#",
    value: "C#"
  },
  {
    label: "Ruby",
    value: "Ruby"
  },
  {
    label: " Swift",
    value: " Swift"
  },

  {
    label: "Kotlin",
    value: "Kotlin"
  },
  {
    label: " Go (Golang)",
    value: " Go (Golang)"
  },

  {
    label: " PHP",
    value: "PHP"
  },
  {
    label: "R",
    value: "R"
  },
  {
    label: "MATLAB",
    value: "MATLAB"
  },
  {
    label: "SQL",
    value: "SQL"
  },

  {
    label: " HTML",
    value: " HTML"
  },

  {
    label: "CSS",
    value: "CSS"
  },
  {
    label: "Bash",
    value: "Bash"
  },
  {
    label: "TypeScript",
    value: "TypeScript"
  },
  {
    label: "Objective-C",
    value: "Objective-C"
  },
  {
    label: "Rust",
    value: "Rust"
  },
  {
    label: "JavaScript",
    value: "JavaScript"
  },
  {
    label: "DOM(Document Object Module)",
    value: "DOM(Document Object Module)"
  },
  {
    label: "Ajax (Asynchronous JavaScript and XML)",
    value: "Ajax (Asynchronous JavaScript and XML)"
  },
  {
    label: "JSON (JavaScript Object Notation)",
    value: "JSON (JavaScript Object Notation)"
  },
  {
    label: "RESTful APIs (Representational State Transfer)",
    value: "RESTful APIs (Representational State Transfer)"
  },
  {
    label: "Web Servers (e.g., Apache, Nginx)",
    value: "Web Servers (e.g., Apache, Nginx)"
  },
  {
    label: "Web Browsers (e.g., Chrome, Firefox, Safari)",
    value: "Web Browsers (e.g., Chrome, Firefox, Safari)"
  },
  {
    label: "Node.js",
    value: "Node.js"
  },
  {
    label: "React.js",
    value: "React.js"
  },
  {
    label: "Angular",
    value: "Angular"
  },
  {
    label: "Vue.js",
    value: "Vue.js"
  },
  {
    label: "WebSockets",
    value: "WebSockets"
  },
  {
    label: "Responsive Web Design",
    value: "Responsive Web Design"
  },
  {
    label: "WebAssembly (Wasm)",
    value: "WebAssembly (Wasm)"
  },
  {
    label: "GraphQL",
    value: "GraphQL"
  },
  {
    label: "Content Management Systems (CMS)",
    value: "Content Management Systems (CMS)"
  },
  {
    label: "SSL/TLS (Secure Socket Layer/Transport Layer Security)",
    value: "SSL/TLS (Secure Socket Layer/Transport Layer Security)"
  },
  {
    label: "Django (Python)",
    value: "Django (Python)"
  },
  {
    label: "Ruby on Rails (Ruby)",
    value: "Ruby on Rails (Ruby)"
  },
  {
    label: "Express.js (JavaScript - Node.js)",
    value: "Express.js (JavaScript - Node.js)"
  },
  {
    label: "Spring Boot (Java)",
    value: "Spring Boot (Java)"
  },
  {
    label: "Flask (Python)",
    value: "Flask (Python)"
  },
  {
    label: "Angular (JavaScript/TypeScript)",
    value: "Angular (JavaScript/TypeScript)"
  },
  {
    label: "React (JavaScript)",
    value: "React (JavaScript)"
  },
  {
    label: "Vue.js (JavaScript)",
    value: "Vue.js (JavaScript)"
  },
  {
    label: "React Native (JavaScript)",
    value: "React Native (JavaScript)"
  },
  {
    label: "Flutter (Dart)",
    value: "Flutter (Dart)"
  },
  {
    label: "Xamarin (C#)",
    value: "Xamarin (C#)"
  },
  {
    label: "FastAPI (Python)",
    value: "FastAPI (Python)"
  },
  {
    label: "TensorFlow (Python)",
    value: "TensorFlow (Python)"
  },
  {
    label: "PyTorch (Python)",
    value: "PyTorch (Python)"
  },
  {
    label: "Scikit-Learn (Python)",
    value: "Scikit-Learn (Python)"
  },
  {
    label: "Unity (C#)",
    value: "Unity (C#)"
  },
  {
    label: "Unreal Engine (C++)",
    value: "Unreal Engine (C++)"
  },
  {
    label: "Selenium",
    value: "Selenium"
  },
  {
    label: "JUnit",
    value: "JUnit"
  },
  {
    label: "TestNG",
    value: "TestNG"
  },
  {
    label: " Pytest",
    value: " Pytest"
  },
  {
    label: "Mocha (JavaScript)",
    value: "Mocha (JavaScript)"
  },
  {
    label: "Jasmine (JavaScript)",
    value: "Jasmine (JavaScript)"
  },
  {
    label: "Jest (JavaScript)",
    value: "Jest (JavaScript)"
  },
  {
    label: "NUnit (C#)",
    value: "NUnit (C#)"
  },
  {
    label: "xUnit (Multiple languages)",
    value: "xUnit (Multiple languages)"
  },
  {
    label: "Appium",
    value: "Appium"
  },
  {
    label: "TestComplete",
    value: "TestComplete"
  },
  {
    label: "Protractor",
    value: "Protractor"
  },
  {
    label: "Cypress (JavaScript)",
    value: "Cypress (JavaScript)"
  },
  {
    label: "Apache JMeter",
    value: "Apache JMeter"
  },
  {
    label: "SoapUI",
    value: "SoapUI"
  },
  {
    label: "Postman",
    value: "Postman"
  },
  {
    label: "JIRA",
    value: "JIRA"
  },
  {
    label: "TestRail",
    value: "TestRail"
  },
  {
    label: "Robot Framework",
    value: "Robot Frameworks"
  },

];

const statusFilters = [
  {
    label: "Pending",
    status: "Pending",
  },
  {
    label: "Approved",
    status: "Approved",
  },
  {
    label: "Reject",
    status: "Reject",
  },
]

const modeFilter = [
  {
    label: "Online",
    value: "Online"
  },
  {
    label: "Offline",
    value: "Offline"
  },
  {
    label: "Self Paced",
    value: "Self Paced"
  }

]

const admissionFilter = [
  {
    label: "Completed",
    value: "Completed"
  },
  {
    label: "In Progress",
    value: "In Progress"
  },
]

const paymentFilter = [
  {
    label: "Paid",
    value: "Paid"
  },
  {
    label: "Pending",
    value: "Pending"
  }
]

const programFilter = [
  {
    label: "Course",
    value: "courses"
  },
  {
    label: "Internship",
    value: "internships"
  },
  {
    label: "Project",
    value: "projects"
  }
]

const payableFIlter = [
  {
    label: "Settled",
    value: "Settled"
  },
  {
    label: "Pending",
    value: "Pending"
  },
  {
    label: "Failed",
    value: "Failed"
  }
]

const quizFilter = [
  {
    label: "No Quizzes",
    value: "No Quizzes"
  },
  {
    label: "Submitted",
    value: "Submitted"
  },
  {
    label: "Start Quiz",
    value: "Start Quiz"
  }
]

const assignmentFilter = [
  {
    label: "No Assignments",
    value: "No Assignments"
  },
  {
    label: "Submitted",
    value: "Submitted"
  },
  {
    label: "View",
    value: "View"
  }
]

const dateFilter = [
  {
    label: 'Today',
    value: 'Today'
  },
  {
    label: 'Yesterday',
    value: 'Yesterday'
  },
  {
    label: 'This Week',
    value: 'This Week'
  },
  {
    label: 'Last Week',
    value: 'Last Week'
  },
  {
    label: 'This Month',
    value: 'This Month'
  },
  {
    label: 'Last Month',
    value: 'Last Month'
  },
  {
    label: 'This Year',
    value: 'This Year'
  },
  {
    label: "Last Year",
    value: 'Last Year'
  }
]

function Filter({ courseHandleChange, statusHandleInputChange, status, course, handleRemove, recordsType, modeHandleInputChange, mode, admissionStatus, admissionStatusHandleInputChange, paymentHandleInputChange, paymentStatus, programTypeHandleInputChange, programType, PayablePaymentHandleInputChange, payableStatus, assignmentHandleInputChange,
  quizHandleInputChange,
  quiz,
  assignment,
  groupsstatussHandleInputChange, groupstatus,
  collegesHandleInputChange, colleges, dateHandleInputChange, date, instituteStatusHandleInputChange, institute }) {

  const [collegesData, setCollegesData] = React.useState([]);
  const [inputList, setInputList] = useState([{ category: "", subCat: [] }]);
  const { viewer } = useAuth()
  const [institutesData, setInstitutesData] = React.useState([]);

  // const[count,setCount]=React.useState(filters)
  React.useEffect(() => {
    /*  if(inputList.length>=1){
       if(inputList[0].category != ""){
         setCount(inputList.length)
         filterCount(inputList.length)
       }
        
     } */

    if (status) {
      setInputList([
        { category: "Status" }
      ])
    } else if (status && course.length == 0 && programType && mode) {
      setInputList([{
        category: "Status"
      },
      { category: "Program Type" },
      { category: "Program Mode" }
      ])
    } else if (status && programType) {
      setInputList([{
        category: "Status"
      },
      { category: "Program Type" }
      ])
    } else if (
      status && mode
    ) {
      setInputList([{
        category: "Status"
      },
      { category: "Program Mode" }
      ])
    }
    else if (!status && course.length >= 1) {
      setInputList([{
        category: "Course Category",

      }])
    }
    else if (course.length >= 1 && status) {
      setInputList(
        [
          { category: "Status" },
          { category: "Course Category" }
        ]
      )
    } else if (status && programType && mode) {
      setInputList(
        [
          { category: "Status" },
          { category: "Program Type" },
          { category: "Program Mode" }
        ]
      )
    } else if (status && programType && !mode) {
      setInputList(
        [
          { category: "Status" },
          { category: "Program Type" }
        ]
      )
    } else if (
      !status && programType && mode
    ) {
      setInputList(
        [
          { category: "Program Type" },
          { category: "Program Mode" }
        ]
      )
    } else if (
      !status && programType && !mode
    ) {
      setInputList(
        [{ category: "Program Type" }]
      )
    } else if (
      !programType && mode
    ) {
      setInputList(
        [
          { category: "Program Mode" }
        ]
      )
    } else if (quiz && assignment) {
      setInputList([{ category: "Quiz" }, { category: "Assignment" }]);
    } else if (
      !quiz && assignment
    ) {
      setInputList([{ category: "Assignment" }])
    } else if (quiz && !assignment) {
      setInputList([{ category: "Quiz" }])
    } else if (colleges) {
      setInputList([{ category: "College" }])
    } else if (date) {
      setInputList([
        { category: "Date" },
      ]);
    }
    else if (institute) {
      setInputList([{ category: "Training Partner" }])
    } else if (date) {
      setInputList([{ category: "Created At" }])
    } else if (date) {
      setInputList([{ category: "Invited At" }])
    } else if (date) {
      setInputList([{ category: "Reg Date" }])
    }


  }, [course, status, programType, mode, quiz, assignment, date, institute]);

  const handleInputChange = (e, index) => {

    const { name, value } = e.target;
    const list = [...inputList];
    list[index][name] = value;
    setInputList(list);




  };
  // handle click event of the Remove button
  const handleRemoveClick = index => {

    const list = [...inputList];
    list.splice(index, 1);
    setInputList(list);
    const removeData = inputList[index].category
    handleRemove(removeData)
  };

  // handle click event of the Add button
  const handleAddClick = () => {
    setInputList([...inputList, { category: "", subCat: "" }]);
  };

  const ShopSelectorInput = withStyles(() => ({
    input: {
      "&:focus": {
        // background: "transparent",

      }
    }
  }))(InputBase);


  React.useEffect(async () => {
    const data = await MyDashboardService.getCollegesData();
    if (data) {
      setCollegesData(data);
    }
  }, []);


  React.useEffect(async () => {
    let data = await MyDashboardService.getTrainingPartnersData();
    if (data) {
      setInstitutesData(data);
    }
  }, [])

  return (
    <>
      {(recordsType == "placements" || recordsType == "jobmatches" || recordsType == "appliedjobs" || recordsType == "rejectedjobs" || recordsType == "placedjobs") ? <PlacementcellFilter /> :
        <Grid >
          {inputList.length === 0 &&
            <Grid container spacing={1} sx={{ mb: 1 }} >
              <Grid item xs={2.5}>
                <Button onClick={handleAddClick} size="small" sx={{ fontSize: "15px" }}>Add Filter</Button>
              </Grid>
            </Grid>
          }
          {inputList.map((x, i) => {
            return (
              <Grid container spacing={1} sx={{ mb: 1 }} >
                <Grid item xs={2.5}>
                  {inputList.length - 1 === i && <Button onClick={handleAddClick} size="small" sx={{ fontSize: "15px" }}>Add Filter</Button>}
                </Grid>
                <Grid item xs={4}>
                  <Select
                    name="category"
                    value={x.category}
                    size="small"
                    fullWidth
                    onChange={(e) => handleInputChange(e, i)}
                    displayEmpty
                    inputProps={{ 'aria-label': 'Without label' }}
                    renderValue={x.category !== "" ? undefined : () => <em>Select Filter</em>}
                  >
                    {filterCategories
                      .filter((data) => {
                        if (recordsType === 'todaysclass') {
                          return data.value === 'Quizzes' || data.value === 'Assignments';
                        } else if (
                          (recordsType === 'groupList' ||
                            recordsType === 'programs' ||
                            recordsType === 'tutors' || recordsType === 'myadmissions' || recordsType === 'classes' || recordsType == "admissions" || recordsType === 'manualPayments' || recordsType === 'payable') &&
                          data.value === 'Status'
                        ) {
                          return true;
                        } else if (recordsType === 'myprograms' && viewer?.role === "College-Admin") {
                          return data.value === 'Program Type' || data.value === 'Program Mode'
                        } else if (recordsType === 'myprograms' && viewer?.role === "Admin") {
                          return data.value === 'Program Type' || data.value === 'Program Mode' || data.value === "Status"
                        } else if (recordsType === "programsList" && viewer?.role === "Master-Admin") {
                          return data.value === 'Status' || data.value === 'Program Type';
                        } else if (recordsType === "students" && viewer?.role === "Master-Admin") {
                          return data.value === 'Colleges'
                        } else if ((recordsType === "collegeadmins" || recordsType === "trainingpartners") && viewer?.role === "Master-Admin") {
                          return data.value === "Reg Date"
                        } else if ((recordsType === "received" || recordsType === "transactions") && viewer?.role === "Master-Admin") {
                          return data.value === "Training Partner" || data.value === "Date"
                        } else if (recordsType === "modules" && (viewer?.role === "Admin" || viewer?.role === "Tutor")) {
                          return data.value === "Created At"
                        } else if ((recordsType === "payments" || recordsType === "received" || recordsType == "transactions") && (viewer?.role === "Admin" || viewer?.role === "College-Admin")) {
                          return data.value === "Date"
                        } else if (recordsType === "groups" && viewer?.role === "Student") {
                          return data.value === "Invite Date"
                        } else if (recordsType === "groups" && viewer?.role === "Invited Date") {
                          return data.value === "Created At"
                        }
                        return false;
                      })
                      .map((data, index) => (
                        <MenuItem key={index} value={data.value}>
                          {data.label}
                        </MenuItem>
                      ))}
                  </Select>

                </Grid>


                <Grid item xs={4}>
                  {x.category ?
                    x.category === "Status" && (recordsType === "tutors" || recordsType == "programsList" || recordsType === "myprograms") ?
                      <Select
                        name="subCat"
                        value={status}
                        fullWidth
                        size="small"
                        onChange={e => statusHandleInputChange(e, i)}
                        displayEmpty
                        inputProps={{ 'aria-label': 'Without label' }}
                        renderValue={status !== "" ? undefined : () => "Select Status"}
                      >
                        {statusFilters.map((data, index) => (
                          <MenuItem key={index} value={data.label}>
                            {data.label}
                          </MenuItem>
                        ))}
                      </Select> :
                      x.category === "Status" && viewer?.role === "College-Admin" && recordsType === "groupList" ?
                        <Select
                          name="subCat"
                          value={groupstatus}
                          fullWidth
                          size="small"
                          onChange={e => groupsstatussHandleInputChange(e, i)}
                          displayEmpty
                          inputProps={{ 'aria-label': 'Without label' }}
                          renderValue={groupstatus !== "" ? undefined : () => "Select Status"}
                        >
                          {groupsfilters.map((data, index) => (
                            <MenuItem key={index} value={data.label}>
                              {data.label}
                            </MenuItem>
                          ))}
                        </Select> :
                        x.category === "Course Category" ?
                          <Select
                            name="subCat"
                            value={course}
                            size="small"
                            multiple
                            fullWidth
                            onChange={e => courseHandleChange(e, i)}
                            displayEmpty
                            inputProps={{ 'aria-label': 'Without label' }}
                            renderValue={(selected) => {
                              if (selected.length === 0) {
                                return <em>Select Course</em>;
                              }
                              return selected.join(', ');
                            }}
                            MenuProps={MenuProps}
                          >
                            {courseCategory.map((data, index) => (
                              <MenuItem key={index} value={data.label}>
                                <Checkbox checked={course.indexOf(data.label) > -1} />
                                <ListItemText primary={data.label} />
                              </MenuItem>
                            ))}
                          </Select> :
                          x.category === "Program Mode" ?
                            <Select
                              name="subCat"
                              value={mode}
                              fullWidth
                              size="small"
                              onChange={e => modeHandleInputChange(e, i)}
                              displayEmpty
                              inputProps={{ 'aria-label': 'Without label' }}
                              renderValue={mode !== "" ? undefined : () => "Select Program Mode"}
                            >
                              {modeFilter.map((data, index) => (
                                <MenuItem key={index} value={data.label}>
                                  {data.label}
                                </MenuItem>
                              ))}
                            </Select> :
                            x.category === "Status" && (recordsType === "myadmissions" || recordsType === "admissions" || recordsType === "classes") ?
                              <Select
                                name="subCat"
                                value={admissionStatus}
                                fullWidth
                                size="small"
                                onChange={e => admissionStatusHandleInputChange(e, i)}
                                displayEmpty
                                inputProps={{ 'aria-label': 'Without label' }}
                                renderValue={admissionStatus !== "" ? undefined : () => "Select Status"}
                              >
                                {admissionFilter.map((data, index) => (
                                  <MenuItem key={index} value={data.label}>
                                    {data.label}
                                  </MenuItem>
                                ))}
                              </Select> :
                              x.category === "Status" && (recordsType === "manualPayments" || recordsType === "groupList") ?
                                <Select
                                  name="subCat"
                                  value={paymentStatus}
                                  fullWidth
                                  size="small"
                                  onChange={e => paymentHandleInputChange(e, i)}
                                  displayEmpty
                                  inputProps={{ 'aria-label': 'Without label' }}
                                  renderValue={paymentStatus !== "" ? undefined : () => "Select Status"}
                                >
                                  {paymentFilter.map((data, index) => (
                                    <MenuItem key={index} value={data.label}>
                                      {data.label}
                                    </MenuItem>
                                  ))}
                                </Select> :
                                x.category === "Program Type" ?
                                  <Select
                                    name="subCat"
                                    value={programType}
                                    fullWidth
                                    size="small"
                                    onChange={e => programTypeHandleInputChange(e, i)}
                                    displayEmpty
                                    inputProps={{ 'aria-label': 'Without label' }}
                                    renderValue={programType !== "" ? undefined : () => "Select Type"}
                                  >
                                    {programFilter.map((data, index) => (
                                      <MenuItem key={index} value={data.value}>
                                        {data.label}
                                      </MenuItem>
                                    ))}
                                  </Select> :
                                  x.category === "Status" && recordsType === "payable" ?
                                    <Select
                                      name="subCat"
                                      value={payableStatus}
                                      fullWidth
                                      size="small"
                                      onChange={e => PayablePaymentHandleInputChange(e, i)}
                                      displayEmpty
                                      inputProps={{ 'aria-label': 'Without label' }}
                                      renderValue={payableStatus !== "" ? undefined : () => "Select Status"}
                                    >
                                      {payableFIlter.map((data, index) => (
                                        <MenuItem key={index} value={data.label}>
                                          {data.label}
                                        </MenuItem>
                                      ))}
                                    </Select> :
                                    x.category === "Quizzes" ?
                                      <Select
                                        name="subCat"
                                        value={quiz}
                                        fullWidth
                                        size="small"
                                        onChange={e => quizHandleInputChange(e, i)}
                                        displayEmpty
                                        inputProps={{ 'aria-label': 'Without label' }}
                                        renderValue={quiz !== "" ? undefined : () => "Select Status"}
                                      >
                                        {quizFilter.map((data, index) => (
                                          <MenuItem key={index} value={data.label}>
                                            {data.label}
                                          </MenuItem>
                                        ))}
                                      </Select> :
                                      x.category === "Assignments" ?
                                        <Select
                                          name="subCat"
                                          value={assignment}
                                          fullWidth
                                          size="small"
                                          onChange={e => assignmentHandleInputChange(e, i)}
                                          displayEmpty
                                          inputProps={{ 'aria-label': 'Without label' }}
                                          renderValue={assignment !== "" ? undefined : () => "Select Status"}
                                        >
                                          {assignmentFilter.map((data, index) => (
                                            <MenuItem key={index} value={data.label}>
                                              {data.label}
                                            </MenuItem>
                                          ))}
                                        </Select> :
                                        x.category === "Colleges" ?
                                          <Select
                                            name="subCat"
                                            value={colleges}
                                            fullWidth
                                            size="small"
                                            onChange={e => collegesHandleInputChange(e, i)}
                                            displayEmpty
                                            inputProps={{ 'aria-label': 'Without label' }}
                                            renderValue={colleges !== "" ? undefined : () => "Select Collge"}
                                          >
                                            {collegesData.map((data, index) => (
                                              <MenuItem key={index} value={data.name}>
                                                {data.name}
                                              </MenuItem>
                                            ))}
                                          </Select> :
                                          x.category === "Reg Date" ?
                                            <Select
                                              name="subCat"
                                              value={date}
                                              fullWidth
                                              size="small"
                                              onChange={e => dateHandleInputChange(e, i)}
                                              displayEmpty
                                              inputProps={{ 'aria-label': 'Without label' }}
                                              renderValue={date !== "" ? undefined : () => "Select Date"}
                                            >
                                              {dateFilter.map((data, index) => (
                                                <MenuItem key={index} value={data.value}>
                                                  {data.label}
                                                </MenuItem>
                                              ))}
                                            </Select> :
                                            x.category === "Date" ?
                                              <Select
                                                name="subCat"
                                                value={date}
                                                fullWidth
                                                size="small"
                                                onChange={e => dateHandleInputChange(e, i)}
                                                displayEmpty
                                                inputProps={{ 'aria-label': 'Without label' }}
                                                renderValue={date !== "" ? undefined : () => "Select Date"}
                                              >
                                                {dateFilter.map((data, index) => (
                                                  <MenuItem key={index} value={data.value}>
                                                    {data.label}
                                                  </MenuItem>
                                                ))}
                                              </Select> :
                                              x.category === "Training Partner" ?
                                                <Select
                                                  name="subCat"
                                                  value={institute}
                                                  fullWidth
                                                  size="small"
                                                  onChange={e => instituteStatusHandleInputChange(e, i)}
                                                  displayEmpty
                                                  inputProps={{ 'aria-label': 'Without label' }}
                                                  renderValue={colleges !== "" ? undefined : () => "Select Collge"}
                                                >
                                                  {institutesData.map((data, index) => (
                                                    <MenuItem key={index} value={data.name}>
                                                      {data.name}
                                                    </MenuItem>
                                                  ))}
                                                </Select> :
                                                x.category === "Created At" ?
                                                  <Select
                                                    name="subCat"
                                                    value={date}
                                                    fullWidth
                                                    size="small"
                                                    onChange={e => dateHandleInputChange(e, i)}
                                                    displayEmpty
                                                    inputProps={{ 'aria-label': 'Without label' }}
                                                    renderValue={date !== "" ? undefined : () => "Select Date"}
                                                  >
                                                    {dateFilter.map((data, index) => (
                                                      <MenuItem key={index} value={data.value}>
                                                        {data.label}
                                                      </MenuItem>
                                                    ))}
                                                  </Select> :
                                                  x.category === "Invite Date" ?
                                                    <Select
                                                      name="subCat"
                                                      value={date}
                                                      fullWidth
                                                      size="small"
                                                      onChange={e => dateHandleInputChange(e, i)}
                                                      displayEmpty
                                                      inputProps={{ 'aria-label': 'Without label' }}
                                                      renderValue={date !== "" ? undefined : () => "Select Date"}
                                                    >
                                                      {dateFilter.map((data, index) => (
                                                        <MenuItem key={index} value={data.value}>
                                                          {data.label}
                                                        </MenuItem>
                                                      ))}
                                                    </Select> :

                                                    ""
                    : ""}
                </Grid>
                <Grid item xs={1} >
                  <Button
                    onClick={() => handleRemoveClick(i)} size="small" sx={{ fontSize: "8px", width: "10px" }}><DeleteOutlineIcon fontSize="small" /></Button>

                </Grid>
              </Grid>
            );
          })}

        </Grid >
      }
    </>
  );
}

export default Filter;