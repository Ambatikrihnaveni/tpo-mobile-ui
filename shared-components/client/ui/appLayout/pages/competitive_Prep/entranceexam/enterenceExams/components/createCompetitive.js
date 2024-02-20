import React, { useState } from "react";
import { Card, Box, Button, } from "@mui/material";
import Div from '@jumbo/shared/Div';
import IconButton from "@mui/material/IconButton";
import TabContext from '@mui/lab/TabContext';
import TabList from '@mui/lab/TabList';
import TabPanel from '@mui/lab/TabPanel';
import Tab from '@mui/material/Tab';
import ExamName from "./examName";
import ExamPattern from "./examPattern";
import AiServices from "../../../../../services/ai-services";
import CloseIcon from '@mui/icons-material/Close';
import draftToHtml from 'draftjs-to-html';
import { useLocation, useNavigate } from "react-router-dom";
import CompitetiveEligibility from "./compitetiveEligibility";
import { convertToRaw, EditorState, ContentState, convertFromHTML } from 'draft-js';
import ExamDates from "./examDates";
import { ToastContainer, toast } from 'react-toastify';
import CutoffMarks from "./cutoffMarks";
import CompetitiveFAQs from "./competitiveFAQs";
import EntranceLearn from "./entranceLearn";
import { useParams } from "react-router-dom";
import { useMutation } from "@apollo/react-hooks";
import updateCompetitivePrepMuataion from "../../../../../../graphql/services/competitive_Prep/mutations/updateCompetitivePrep";
import ModulesService from "../../../../../../graphql/services/modules/modules-service";
import useCurrentShopId from "../../../../../../hooks/useCurrentShopId";
import CompetitiveService from "../../../../../../graphql/services/competitive_Prep/entranceexam";


export default function CreateCompetitive() {

  const routeParams = useParams();
  const entranceexamId = routeParams.entranceexamId

  const [updateCompetitivePrep] = useMutation(updateCompetitivePrepMuataion);
  const [value, setValue] = useState('1');
  const [examName, setExamName] = useState('');
  const { shopId } = useCurrentShopId();
  const [descriptionText, setDescriptionText] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [editorState, setEditorState] = useState(EditorState.createEmpty());
  const [newEditorState, setNewEditorState] = useState(EditorState.createEmpty());
  const [eligibilEditorState, setEligibilEditorState] = useState(EditorState.createEmpty())
  const [prompt, setPrompt] = useState('');
  const [prompts, setPrompts] = useState('');
  const [promptss, setPromptss] = useState('');
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isSubmited, setIsSubmited] = useState(false);
  const [isSubmiting, setIsSubmiting] = useState(false);
  const [isSubmit, setIsSubmit] = useState(false);

  const [eligibility, setEligibility] = useState('');
  const [isTextFieldVisible, setIsTextFieldVisible] = useState(false);
  const [TextFieldVisible, setTextFieldVisible] = useState(false);

  const [syllabus, setSyllabus] = useState('');
  const [inputFields, setInputFields] = React.useState([{ subjectName: "", numberOfQuestions: "", marksPerSubject: "" }]);
  const [module, setModule] = React.useState('')
  const [modulesData, setModulesData] = React.useState([])
  const [selectedModuleData, setSelectedModuleData] = React.useState([])
  const [lessons, setLessons] = React.useState([])
  const [selectedLessons, setSelectedLessons] = React.useState([]);
  const [fields, setFields] = useState([{}]); // Initial state with one set of fields
  const [selectedFromTime, setSelectedFromTime] = React.useState(' ');
  const [selectedToTime, setSelectedToTime] = React.useState(' ');
  const [selectedModule, setSelectedModule] = React.useState(
    [
      {
        title: '',
        productId: '',
        productLessons: [{ lessonIds: [], lessonDuration: '' }],
        module: {}
      }
    ])

  const [selectedDate, setSelectedDate] = useState(new Date);
  const [selectedValues, setSelectedValues] = React.useState([]);
  const [faqRows, setFaqRows] = useState([
    {
      faqType: '',
      qAndA: [{ question: '', answer: '' }]
    },
  ]);
  const [faqData, setFaqData] = useState([])

  React.useEffect(async () => {
    ;
    const { modules } = await ModulesService.modules(shopId);
    setModulesData(modules);
  }, [])

  React.useEffect(async () => {
    
    if (entranceexamId) {
      const entranceexamData = await CompetitiveService.getEntranceExam(shopId, entranceexamId,);
      if (entranceexamData) {

        setExamName(entranceexamData?.title)
        setDescriptionText(entranceexamData?.overview)

        setEligibility(entranceexamData?.eligibility)
        setSyllabus(entranceexamData?.syllabus)

        setSelectedDate(entranceexamData?.examDate);
        setSelectedFromTime(entranceexamData?.examStartTime);
        setSelectedToTime(entranceexamData?.examEndTime);

        if (entranceexamData?.faqs) {
          let faqdata = []
          for (let i = 0; i < entranceexamData?.faqs?.length; i++) {
            let qAndAData = []
            for (let x = 0; x < entranceexamData?.faqs[i].qAndA.length; x++) {
              const data = { answer: entranceexamData?.faqs[i].qAndA[x].answer, question: entranceexamData?.faqs[i].qAndA[x].question }
              qAndAData.push(data)
            }
            const data = { faqType: entranceexamData?.faqs[i].faqType, qAndA: qAndAData }
            faqdata.push(data)
          }
          setFaqRows(faqdata)
          setFaqData(faqdata)
        }

        let products = [];

        for (let x = 0; x < entranceexamData?.products.length; x++) {
          let productLessons = [];
          const title = entranceexamData?.products[x].title;
          const productId = entranceexamData?.products[x]._id;
          const module = await ModulesService.getModule(shopId, productId)
          for (let i = 0; i < entranceexamData?.products[x].lessonsDuration.length; i++) {
            let lesson = []
            for (let k = 0; k < entranceexamData?.products[x].lessonsDuration[i].lesson.length; k++) {
              lesson.push(entranceexamData?.products[x].lessonsDuration[i].lesson[k]._id)
            }

            const lessonDuration = entranceexamData?.products[x].lessonsDuration[i].lessonDuration
            const lessonData = { lessonIds: lesson, lessonDuration: lessonDuration }
            productLessons.push(lessonData)
          }
          const productData = { title: title, productId: productId, productLessons: productLessons, module: module }
          products.push(productData)
        }

        setSelectedModuleData(products)
        setSelectedModule(products)

        if (entranceexamData?.examPattern) {
          let examPatternData = [];
          for (let i = 0; i < entranceexamData?.examPattern.length; i++) {
            let patternData = {
              marksPerSubject: entranceexamData?.examPattern[i].marksPerSubject,
              numberOfQuestions: entranceexamData?.examPattern[i].numberOfQuestions,
              subjectName: entranceexamData?.examPattern[i].subjectName,
            };
            examPatternData.push(patternData);
          }
          setInputFields(examPatternData);
        }

        if (entranceexamData?.cutOffMarksAllotment) {
          let cutOffMarksAllotmentData = [];
          for (let i = 0; i < entranceexamData?.cutOffMarksAllotment.length; i++) {
            let cutOffMarksAllotment = {
              collegeLocation: entranceexamData?.cutOffMarksAllotment[i].collegeLocation,
              collegeName: entranceexamData?.cutOffMarksAllotment[i].collegeName,
              marks_GPA: entranceexamData?.cutOffMarksAllotment[i].marks_GPA,
            };
            cutOffMarksAllotmentData.push(cutOffMarksAllotment);
          }
          setFields(cutOffMarksAllotmentData);
        }

      }

    }

  }, [entranceexamId])

  const handleTabChange = (event, newValue) => {
    setValue(newValue);
  };
  const location = useLocation();
  const navigate = useNavigate();
  const url = location.pathname;
  const recordType = url.substring(url.lastIndexOf('/') + 1);

  const handleClose = () => {

    navigate(-1);

  };

  const addDescription = (event) => {
    setDescriptionText(event);
  };

  const addSyllabus = (event) => {
    setSyllabus(event);
  };

  const addEligibility = (event) => {
    setEligibility(event);
  };

  const onEditorChange = () => {
    const bioContent = draftToHtml(convertToRaw(editorState.getCurrentContent()));
    addDescription(bioContent);
  };

  const onEditorsChange = () => {
    const bioContent = draftToHtml(convertToRaw(eligibilEditorState.getCurrentContent()));
    addEligibility(bioContent);
  };

  const onEditorssChange = () => {
    const bioContent = draftToHtml(convertToRaw(newEditorState.getCurrentContent()));
    addSyllabus(bioContent);
  };

  const handlePromptChange = (event) => {
    setPrompt(event.target.value);
  };

  const handlePromptsChange = (event) => {
    setPrompts(event.target.value);
  };

  const handlePromptssChange = (event) => {
    setPromptss(event.target.value);
  };


  const onSubmited = async () => {
    setIsSubmitting(true);
    const { data } = await AiServices.generateBio(prompt);

    if (data) {
      const html = `<p>${data}</p>`;
      const contentBlock = convertFromHTML(html);
      if (contentBlock) {
        const contentState = ContentState.createFromBlockArray(contentBlock);
        const editorState = EditorState.createWithContent(contentState);
        setEditorState(editorState);
        const bioContent = draftToHtml(convertToRaw(editorState.getCurrentContent()));
        setDescriptionText(bioContent);
      }
      setIsTextFieldVisible(false);
      setIsSubmitting(false);
      setIsSubmitted(false);
    }
  };

  const onSubmit = async () => {

    setIsSubmit(true);
    const { data } = await AiServices.generateBio(prompts);

    if (data) {
      const html = `<p>${data}</p>`;
      const contentBlock = convertFromHTML(html);
      if (contentBlock) {
        const contentState = ContentState.createFromBlockArray(contentBlock);
        const newEditorState = EditorState.createWithContent(contentState);
        setNewEditorState(newEditorState);
        const bioContent = draftToHtml(convertToRaw(newEditorState.getCurrentContent()));
        setSyllabus(bioContent);
      }
      setTextFieldVisible(false);
      setIsSubmit(false);
      setIsSubmited(false);
    }
  };

  const onSubmiting = async () => {

    setIsSubmiting(true);
    const { data } = await AiServices.generateBio(promptss);

    if (data) {
      const html = `<p>${data}</p>`;
      const contentBlock = convertFromHTML(html);
      if (contentBlock) {
        const contentState = ContentState.createFromBlockArray(contentBlock);
        const eligibilEditorState = EditorState.createWithContent(contentState);
        setEligibilEditorState(eligibilEditorState);
        const bioContent = draftToHtml(convertToRaw(eligibilEditorState.getCurrentContent()));
        setEligibility(bioContent);
      }
      setTextFieldVisible(false);
      setIsSubmiting(false);
      setIsSubmited(false);
    }
  };

  const handleAddField = () => {
    setInputFields([...inputFields, { subjectName: "", numberOfQuestions: "", marksPerSubject: "" }]);
  };
  const handleCancelField = (index) => {
    const updatedFields = [...inputFields];
    updatedFields.splice(index, 1);
    setInputFields(updatedFields);
  };

  const handleAddFields = () => {
    const newFields = [...fields, {}]; // Adding a new set of fields
    setFields(newFields);
  };

  const handleRemoveFields = (index) => {
    const filteredFields = fields.filter((_, i) => i !== index); // Removing fields based on index
    setFields(filteredFields);
  };

  const handleFieldChange = (index, fieldName, value) => {
    const updatedFields = [...fields];
    updatedFields[index][fieldName] = value;
    setFields(updatedFields);

    console.log(`Field ${fieldName} in set ${index} changed:`, value);
  };


  const handleFaqQuestionChange = (index, i, e) => {
    const question = e.target.value
    let data = [...faqRows]
    data[index].qAndA[i].question = question
    setFaqRows(data)
    setFaqData(data)
  };

  const handleFaqTypeChange = (index, e) => {
    const type = e.target.value
    let data = [...faqRows]
    data[index].faqType = type
    setFaqRows(data)
    setFaqData(data)
  };

  const handleFaqanswerChange = (index, i, e) => {
    const answer = e.target.value
    let data = [...faqRows]
    data[index].qAndA[i].answer = answer
    setFaqRows(data)
    setFaqData(data)
  };

  const handleAddFAQ = () => {
    const newFAQ = {
      faqType: '',
      qAndA: [{ question: '', answer: '' }]
    }
    setFaqRows([...faqRows, newFAQ])
  };

  const handleDeleteUser = (index) => {
    const list = [...faqRows];
    list.splice(index, 1);
    setFaqRows(list);
  };


  const handleDeleteFAQ = (index, questionIndex) => {
    const updatedData = [...faqRows];
    updatedData[index].qAndA.splice(questionIndex, 1);
    setFaqRows(updatedData);
    setFaqData(updatedData);
  };

  const handleAddQuestion = (index) => {
    const data = [...faqRows];
    const newQuestion = { question: '', answer: '' };
    data[index].qAndA.push(newQuestion);
    setFaqRows(data);
  };

  const handleChange = async (event, i) => {
    if (event.target.value !== 'null') {
      let data = selectedModule;
      const productId = event.target.value
      const module = await ModulesService.getModule(shopId, productId)
      if (data.length >= 1) {

        data[i].title = module.title;
        data[i].productId = productId;
        data[i].module = module;
      }
      setSelectedModuleData(data);
      setModule(event.target.value);
      setSelectedModule(data);
      setLessons(event.target.value?.lessons);
    }
  };

  const addRow = () => {
    setSelectedModule([...selectedModule, { title: '', productId: '', module: {}, productLessons: [{ lessonIds: [], lessonDuration: '' }] }]);
  };

  const handleRemoveClick = (i) => {
    const list = [...selectedModule];
    list.splice(i, 1)
    setSelectedModule(list);
  }

  const addlessonCell = (i) => {
    let data = [...selectedModule];
    const lessonCell = { lessonIds: '', lessonDuration: '' };
    data[i].productLessons.push(lessonCell);
    setSelectedModule(data);
  };

  const handleRemoveLessonCell = (i, index) => {

    let data = [...selectedModule];
    let removedLessonIds = data[i].productLessons[index].lessonIds; // Assuming lessonids is an array of lesson ids
    let selectedLessonsData = selectedLessons.filter(lesson => !removedLessonIds.includes(lesson._id));
    setSelectedLessons(selectedLessonsData); // Update selectedLessons with filtered array

    data[i].productLessons.splice(index, 1);
    setSelectedModule(data);

  };


  const onLessonsAdd = (e, value, i, index) => {

    let data = [...selectedModule];

    data[i].productLessons[index].lessonIds = e.target.value;
    setSelectedModule(data);
    setSelectedModuleData(data);
    let totalSelectedLessons = []
    for (let i = 0; i < data.length; i++) {
      for (x = 0; x < data[i].productLessons.length; x++) {
        totalSelectedLessons.push(...data[i].productLessons[x].lessonIds)
      }
    }
    setSelectedLessons(totalSelectedLessons)
  };

  const addDuration = (e, i, index) => {
    let data = [...selectedModule];
    const lessonDuration = e.target.value;
    data[i].productLessons[index].lessonDuration = lessonDuration;
    setSelectedModule(data);
    setSelectedModuleData(data);
  };



  const toggleCheckbox = (value) => {
    return selectedValues === value ? '' : value;
  };

  const handleCheckboxChange = (value) => {
    setSelectedValues(toggleCheckbox(value));
    console.log(value)
  };

  const handleDateChange = (newValue) => {
    setSelectedDate(newValue);

  };

  const handleBack = () => {
    if (value === '1') {
    } else {
      setValue((prevValue) => String(parseInt(prevValue, 10) - 1));
    }
  };

  const handleContinue = () => {
    if (value === '7') {
    } else {
      setValue((prevValue) => String(parseInt(prevValue, 10) + 1));
    }
  };

  const handleFromTimeChange = (e) => {
    setSelectedFromTime(e.target.value);

  }
  const handleToTimeChange = (event) => {
    setSelectedToTime(event.target.value)
  }
  const submit = async () => {
    // ... (existing code)

    try {
        const modules = [];
        for (let x = 0; x < selectedModuleData?.length; x++) {
            const moduleData = {
                productId: selectedModuleData[x].productId,
                productLessons: selectedModuleData[x].productLessons,
            };
            modules.push(moduleData);
        }

        const inputData = {
            id:entranceexamId,
            shopId: shopId,
            title: examName,
            overview: descriptionText,
            eligibility: eligibility,
            syllabus: syllabus,
            examPattern: inputFields,
            examDate: selectedDate,
            examStartTime: selectedFromTime,
            examEndTime: selectedToTime,
            cutOffMarksAllotment: fields,
            faqs: faqData,
            productIds: modules,
        };
        toast.success('Successfully Created', {
          position: "bottom-right",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "colored",
      });
      
      navigate('/competitivepreep/entranceexam');

        if (entranceexamId) {
            // If entranceexamId exists, it means we are updating an existing entry
            await updateCompetitivePrep({
                variables: {
                    input: inputData, // Use the correct input data
                },
            });

            toast.success("Updated successfully", {
                position: "bottom-right",
                autoClose: 3000,
                hideProgressBar: true,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "colored",
            });
            navigate('/competitivepreep/entranceexam');
        } else {
            // If entranceexamId doesn't exist, it means we are creating a new entry
            const data = await CompetitiveService.createEntranceexam(inputData);
            if (data) {
                toast.success('Successfully Created', {
                    position: "bottom-right",
                    autoClose: 5000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                    theme: "colored",
                });
                navigate('/competitivepreep/entranceexam');
            }
        }
    } catch (error) {
        toast.error('Unable to Create/Update', {
            position: "bottom-right",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "colored",
        });
    }
};


  return (
    <Card sx={{ width: '100%', p: 2, }}>
      <Div className="container">
        <Div style={{ color: 'white', alignSelf: 'flex-end', textAlign: 'end' }}>
          <IconButton
            onClick={handleClose}
            aria-label="close"
            sx={{ color: "black", mr: 2 }}
          >
            <CloseIcon
              onClick={handleClose}
            />
          </IconButton>
        </Div>
        <Div >
          <Box sx={{ width: '100%', typography: 'body1' }}>
            <TabContext value={value}>
              <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
                <TabList onChange={(entranceexamId) ? handleTabChange : ''} aria-label="lab API tabs example">
                  <Tab label="Title" value="1" sx={{ fontWeight: 'bold', fontSize: '15px' }} />
                  <Tab label="Eligibility" value="2" sx={{ fontWeight: 'bold', fontSize: '15px', marginLeft: '20px' }} />
                  <Tab label="Learn" value="3" sx={{ fontWeight: 'bold', fontSize: '15px', marginLeft: '20px' }} />
                  <Tab label="Exam Pattern" value="4" sx={{ fontWeight: 'bold', fontSize: '15px', marginLeft: '20px' }} />
                  <Tab label="Exam Dates" value="5" sx={{ fontWeight: 'bold', fontSize: '15px', marginLeft: '20px' }} />
                  <Tab label="Cut-off Marks" value="6" sx={{ fontWeight: 'bold', fontSize: '15px', marginLeft: '20px' }} />
                  <Tab label="FAQ's" value="7" sx={{ fontWeight: 'bold', fontSize: '15px', marginLeft: '20px' }} />
                </TabList>
              </Box>
              <TabPanel value="1">
                <Div sx={{ marginBottom: '40px' }}>
                  <ExamName
                    examName={examName}
                    setExamName={setExamName}
                    editorState={editorState}
                    descriptionText={descriptionText}
                    onEditorChange={onEditorChange}
                    setEditorState={setEditorState}
                    onSubmited={onSubmited}
                    setDescriptionText={setDescriptionText}
                    isSubmitted={isSubmitted}
                    isSubmitting={isSubmitting}
                    isTextFieldVisible={isTextFieldVisible}
                    handlePromptChange={handlePromptChange}
                    setIsTextFieldVisible={setIsTextFieldVisible}
                    prompt={prompt}
                    addDescription={addDescription}
                  />
                </Div>
              </TabPanel>

              <TabPanel value="2">
                <Div sx={{ marginBottom: '40px' }}>
                  <CompitetiveEligibility
                    eligibility={eligibility}
                    onEditorChange={onEditorChange}
                    onEditorsChange={onEditorsChange}
                    onEditorssChange={onEditorssChange}
                    setEditorState={setEditorState}
                    addEligibility={addEligibility}
                    setEligibility={setEligibility}
                    isSubmitted={isSubmitted}
                    isSubmitting={isSubmitting}
                    isTextFieldVisible={isTextFieldVisible}
                    TextFieldVisible={TextFieldVisible}
                    setTextFieldVisible={setTextFieldVisible}
                    handlePromptChange={handlePromptChange}
                    setIsTextFieldVisible={setIsTextFieldVisible}
                    prompt={prompt}
                    promptss={promptss}
                    onSubmited={onSubmited}
                    onSubmit={onSubmit}
                    onSubmiting={onSubmiting}
                    addSyllabus={addSyllabus}
                    handlePromptsChange={handlePromptsChange}
                    handlePromptssChange={handlePromptssChange}
                    syllabus={syllabus}
                    newEditorState={newEditorState}
                    setNewEditorState={setNewEditorState}
                    eligibilEditorState={eligibilEditorState}
                    setEligibilEditorState={setEligibilEditorState}
                    isSubmited={isSubmited}
                    isSubmiting={isSubmiting}
                    isSubmit={isSubmit}
                  />
                </Div>
              </TabPanel>

              <TabPanel value="3">
                <Div sx={{ marginTop: '40px' }}>
                  <EntranceLearn
                    module={module}
                    modulesData={modulesData}
                    selectedModule={selectedModule}
                    handleChange={handleChange}
                    addRow={addRow}
                    handleRemoveClick={handleRemoveClick}
                    addlessonCell={addlessonCell}
                    handleRemoveLessonCell={handleRemoveLessonCell}
                    onLessonsAdd={onLessonsAdd}
                    addDuration={addDuration}
                    selectedLessons={selectedLessons}
                    setSelectedLessons={setSelectedLessons}
                    setSelectedModule={setSelectedModule}
                    setSelectedModuleData={setSelectedModuleData}
                  />
                </Div>
              </TabPanel>
              <TabPanel value="4">
                <Div sx={{ marginBottom: '40px' }}>
                  <ExamPattern
                    handleAddField={handleAddField}
                    handleCancelField={handleCancelField}
                    setInputFields={setInputFields}
                    inputFields={inputFields}
                  />
                </Div>
              </TabPanel>
              <TabPanel value="5">
                <Div sx={{ marginBottom: '40px' }}>
                  <ExamDates
                    selectedDate={selectedDate}
                    setSelectedDate={setSelectedDate}
                    selectedValues={selectedValues}
                    handleCheckboxChange={handleCheckboxChange}
                    toggleCheckbox={toggleCheckbox}
                    handleDateChange={handleDateChange}
                    selectedToTime={selectedToTime}
                    selectedFromTime={selectedFromTime}
                    handleFromTimeChange={handleFromTimeChange}
                    handleToTimeChange={handleToTimeChange}
                  />
                </Div>
              </TabPanel>
              <TabPanel value="6">
                <Div sx={{ marginBottom: '40px' }}>
                  <CutoffMarks
                    fields={fields}
                    setFields={setFields}
                    handleAddFields={handleAddFields}
                    handleFieldChange={handleFieldChange}
                    handleRemoveFields={handleRemoveFields}
                  />
                </Div>
              </TabPanel>
              <TabPanel value="7">
                <Div sx={{ marginBottom: '40px' }}>
                  <CompetitiveFAQs
                    FAQdata={faqRows}
                    handleFaqQuestionChange={handleFaqQuestionChange}
                    handleFaqTypeChange={handleFaqTypeChange}
                    handleFaqanswerChange={handleFaqanswerChange}
                    handleAddFAQ={handleAddFAQ}
                    handleDeleteUser={handleDeleteUser}
                    handleDeleteFAQ={handleDeleteFAQ}
                    handleAddQuestion={handleAddQuestion}
                  />
                </Div>
              </TabPanel>
            </TabContext>
          </Box>
          <Div style={{ marginTop: '20px', float: "right" }}>
            <Box sx={{ display: 'flex' }}>
              {value !== '1' && (
                <Button onClick={handleBack} variant="contained">
                  Back
                </Button>
              )}&nbsp;&nbsp;
              <Button onClick={value === '7' ? submit : handleContinue} variant="contained" color="primary">
                {value === '7' ? 'Finish' : 'Continue'}
              </Button>
            </Box>
          </Div>
        </Div>
      </Div>
      <ToastContainer
        position="bottom-right"
        autoClose={3000}
        hideProgressBar
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="colored"
      />
    </Card>
  );
}
