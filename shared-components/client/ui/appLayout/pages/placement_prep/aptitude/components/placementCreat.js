import React, { useEffect, useState } from "react";
import { Card, Box} from "@mui/material";
import Div from '@jumbo/shared/Div'
import IconButton from "@mui/material/IconButton";
import { useTranslation } from "react-i18next";
import Button from '@mui/material/Button';
import TabContext from '@mui/lab/TabContext';
import TabList from '@mui/lab/TabList';
import TabPanel from '@mui/lab/TabPanel';
import Tab from '@mui/material/Tab';
import CloseIcon from '@mui/icons-material/Close';
import { useParams, useNavigate, useLocation } from "react-router-dom";
import PlacementModules from "./placementmodules";
import ModulesService from "../../../../../graphql/services/modules/modules-service";
import useCurrentShopId from "../../../../../hooks/useCurrentShopId";
import PlacementFAQ from "./placementFaQs";
import TitleForm from "./titleForm";
import AiServices from "../../../../services/ai-services";
import { convertToRaw, EditorState, ContentState, convertFromHTML } from 'draft-js';
import { useMutation } from "@apollo/react-hooks";
import createInterviewPrepMuataion from "../../../../../graphql/services/placement-prep/mutations/createInterviewPrep";
import updateInterviewPrepMutation from "../../../../../graphql/services/placement-prep/mutations/updateInterviewPrep";
import { ToastContainer, toast } from 'react-toastify';
import draftToHtml from 'draftjs-to-html';
import PlacementService from "../../../../../graphql/services/placement-prep/placement";

export default function PlacementCreat() {
    const navigate = useNavigate()
    const routeParams = useParams();
    const { shopId } = useCurrentShopId();
    const aptitudeId = routeParams.aptitudeId
    const technicalId = routeParams.technicalId


    // const { shopId, program, } = useProgram({ programId });

    const { t } = useTranslation();
    const [value, setValue] = React.useState('1');

    const [module, setModule] = React.useState('')
    const [modulesData, setModulesData] = React.useState([])
    const [selectedModuleData, setSelectedModuleData] = React.useState([])
    const [lessons, setLessons] = React.useState([])
    const [selectedLessons, setSelectedLessons] = React.useState([]);
    const [isTextFieldVisible, setIsTextFieldVisible] = React.useState(false);
    const [isSubmitted, setIsSubmitted] = React.useState(false);
    const [isSubmitting, setIsSubmitting] = React.useState(false);
    const [title, setTitle] = React.useState('');
    const [editorState, setEditorState] = React.useState(EditorState.createEmpty());
    const [descriptionText, setDescriptionText] = React.useState('');
    const [prompt, setPrompt] = React.useState('')
    const [createInterviewPrep] = useMutation(createInterviewPrepMuataion);
    const [updateInterviewPrep] = useMutation(updateInterviewPrepMutation);

    const handlePromptChange = (event) => {
        setPrompt(event.target.value)
    }



    const addDescription = (event) => {
        setDescriptionText(event)
    }

    const onEditorChange = () => {
        const bioContent = draftToHtml(convertToRaw(editorState.getCurrentContent()));
        addDescription(bioContent)
    };

    const location = useLocation();
    const url = location.pathname;
    const [selectedModule, setSelectedModule] = React.useState(
        [
            {
                title: '',
                productId: '',
                productLessons: [{ lessonIds: [], lessonDuration: '' }],
                module: {}
            }
        ])
    const [faqRows, setFaqRows] = useState([
        {
            faqType: '',
            qAndA: [{ question: '', answer: '' }]
        },
    ]);
    const [faqData, setFaqData] = useState([])


    useEffect(async () => {

        const { modules } = await ModulesService.modules(shopId);
        setModulesData(modules);
    }, [])

    //  const shopId = localStorage.getItem('accounts:shopId')
    const recordType = url.substring(url.lastIndexOf('/') + 1);
    const handleTabChange = (event, newValue) => {
        setValue(newValue);
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

    const tabValues = ['1', '2', '3'];

    const handleNext = () => {
        const currentIndex = tabValues.indexOf(value);
        const nextIndex = currentIndex + 1;
        if (nextIndex < tabValues.length) {
            setValue(tabValues[nextIndex]);
        }
    };

    const handleBack = () => {
        const currentIndex = tabValues.indexOf(value);
        const previousIndex = currentIndex - 1;
        if (previousIndex >= 0) {
            setValue(tabValues[previousIndex]);
        }
    };
    const onSubmited = async () => {
        setIsSubmitting(true)
        const { data } = await AiServices.generateBio(prompt)

        if (data) {
            const html = `<p>${data}</p>`
            const contentBlock = convertFromHTML((html));
            if (contentBlock) {
                const contentState = ContentState.createFromBlockArray(contentBlock);
                const editorState = EditorState.createWithContent(contentState);
                setEditorState(editorState)
                const bioContent = draftToHtml(convertToRaw(editorState.getCurrentContent()));
                setDescriptionText(bioContent)
            }
            setIsTextFieldVisible(false);
            setIsSubmitting(false)
            setIsSubmitted(false)
        }

    };
    const handleClose = () => {
       
            navigate(-1);
    
    };

    const handleClose1 = () => {
        navigate(-1);
        }


    const submit = async () => {
        try {
            const modules = [];
            for (let x = 0; x < selectedModuleData?.length; x++) {
                const data = {
                    productId: selectedModuleData[x].productId,
                    productLessons: selectedModuleData[x].productLessons,
                };
                modules.push(data);
            }
    
            let type;
            if (recordType === "createaptitude") {
                type = "Aptitude";
            } else if (recordType === "createtechnical") {
                type = "Technical";
            }
    
            const data = {
                shopId: shopId,
                productIds: modules,
                faqs: faqData,
                title: title,
                description: descriptionText,
                type: type,
                id:aptitudeId || technicalId
            };
    
            if (aptitudeId || technicalId) {
                await updateInterviewPrep({
                    variables: {
                        input: data,
                    },
                });
    
                toast.success("Updated successfully", {
                    position: "top-right",
                    autoClose: 3000,
                    hideProgressBar: true,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                    theme: "colored",
                });
                setTimeout(() => {
                    if (recordType === "editaptitude") {
                        navigate('/placementpreep/aptitude');
                    } else if (recordType === "edittechnical") {
                        navigate('/placementpreep/technical');
                    }
                }, 2500);
                
            } else {
                await createInterviewPrep({
                    variables: {
                        input: data,
                    },
                });
    
                toast.success("Created successfully", {
                    position: "top-right",
                    autoClose: 3000,
                    hideProgressBar: true,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                    theme: "colored",
                });
            }
    
            setTimeout(() => {
                if (recordType === "createaptitude") {
                    navigate('/placementpreep/aptitude');
                } else if (recordType === "createtechnical") {
                    navigate('/placementpreep/technical');
                }
            }, 2500);
    
        } catch (error) {
            toast.error('Unable to Create/Update', {
                position: "top-right",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "colored",
            });
    
            setTimeout(() => {
                if (recordType === "createaptitude") {
                    navigate('/placementpreep/aptitude');
                } else if (recordType === "createtechnical") {
                    navigate('/placementpreep/technical');
                }
            }, 2500);
        }
    };


    React.useEffect(async () => {
        if (aptitudeId) {
            const { data } = await PlacementService.getAptitude(shopId, aptitudeId)
            const aptitudeData = data?.interviewPrep
            setTitle(aptitudeData?.title)
            setDescriptionText(aptitudeData?.description)

            if (aptitudeData?.faqs) {
                let faqdata = []
                for (let i = 0; i < aptitudeData?.faqs?.length; i++) {
                    let qAndAData = []
                    for (let x = 0; x < aptitudeData?.faqs[i].qAndA.length; x++) {
                        const data = { answer: aptitudeData?.faqs[i].qAndA[x].answer, question: aptitudeData?.faqs[i].qAndA[x].question }
                        qAndAData.push(data)
                    }
                    const data = { faqType: aptitudeData?.faqs[i].faqType, qAndA: qAndAData }
                    faqdata.push(data)
                }
                setFaqRows(faqdata)
                setFaqData(faqdata)
            }
            let products = [];
            for (let x = 0; x < aptitudeData?.products.length; x++) {
                let productLessons = [];
                const title = aptitudeData?.products[x].title;
                const productId = aptitudeData?.products[x]._id;
                const module = await ModulesService.getModule(shopId, productId)
                for (let i = 0; i < aptitudeData?.products[x].lessonsDuration.length; i++) {
                    let lesson = []
                    for (let k = 0; k < aptitudeData?.products[x].lessonsDuration[i].lesson.length; k++) {
                        lesson.push(aptitudeData?.products[x].lessonsDuration[i].lesson[k]._id)
                    }

                    const lessonDuration = aptitudeData?.products[x].lessonsDuration[i].lessonDuration
                    const lessonData = { lessonIds: lesson, lessonDuration: lessonDuration }
                    productLessons.push(lessonData)
                }
                const productData = { title: title, productId: productId, productLessons: productLessons, module: module }
                products.push(productData)
            }

            setSelectedModuleData(products)
            setSelectedModule(products)


            console.log(aptitudeData)

        } else if (technicalId) {
            const data = await PlacementService.getTech(shopId, aptitudeId)
            const technicalData = data?.interviewPrep
            setTitle(technicalData?.title)
            setDescriptionText(technicalData?.description)

            if (technicalData?.faqs) {
                let faqdata = []
                for (let i = 0; i < technicalData?.faqs?.length; i++) {
                    let qAndAData = []
                    for (let x = 0; x < technicalData?.faqs[i].qAndA.length; x++) {
                        const data = { answer: technicalData?.faqs[i].qAndA[x].answer, question: technicalData?.faqs[i].qAndA[x].question }
                        qAndAData.push(data)
                    }
                    const data = { faqType: technicalData?.faqs[i].faqType, qAndA: qAndAData }
                    faqdata.push(data)
                }
                setFaqRows(faqdata)
                setFaqData(faqdata)
            }

            let products = [];
            for (let x = 0; x < technicalData?.products.length; x++) {
                let productLessons = [];
                const title = technicalData?.products[x].title;
                const productId = technicalData?.products[x]._id;
                const module = await ModulesService.getModule(shopId, productId)
                for (let i = 0; i < technicalData?.products[x].lessonsDuration.length; i++) {
                    let lesson = []
                    for (let k = 0; k < technicalData?.products[x].lessonsDuration[i].lesson.length; k++) {
                        lesson.push(technicalData?.products[x].lessonsDuration[i].lesson[k]._id)
                    }

                    const lessonDuration = technicalData?.products[x].lessonsDuration[i].lessonDuration
                    const lessonData = { lessonIds: lesson, lessonDuration: lessonDuration }
                    productLessons.push(lessonData)
                }
                const productData = { title: title, productId: productId, productLessons: productLessons, module: module }
                products.push(productData)
            }

            setSelectedModuleData(products)
            setSelectedModule(products)


            console.log(technicalData)

        }

    }, [aptitudeId, technicalId])




    return (
        <Card sx={{ width: '100%', p: 2, }}>
            <Div style={{ color: 'white', alignSelf: 'flex-end', textAlign: 'end' }}>
                <IconButton
                   // onClick={aptitudeId ? handleClose1 : handleClose}
                    aria-label="close"
                    sx={{ color: "black", mr: 2 }}
                >
                    <CloseIcon
                        onClick={ handleClose1}
                    />
                </IconButton>
            </Div>
            <Div >
                <Box sx={{ width: '100%', typography: 'body1' }}>
                    <TabContext value={value}>
                        <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
                            <TabList onChange={(aptitudeId || technicalId) ? handleTabChange : ''} aria-label="lab API tabs example">
                                <Tab label="Title" value="1" sx={{ fontWeight: 'bold', fontSize: '15px' }} />
                                <Tab label="Learn" value="2" sx={{ fontWeight: 'bold', fontSize: '15px', marginLeft: '20px' }} />
                                <Tab label="FAQ's" value="3" sx={{ fontWeight: 'bold', fontSize: '15px', marginLeft: '20px' }} />
                            </TabList>
                        </Box>

                        <TabPanel value="1">
                            <TitleForm
                                aptitudeId={aptitudeId}
                                title={title}
                                editorState={editorState}
                                descriptionText={descriptionText}
                                onEditorChange={onEditorChange}
                                setEditorState={setEditorState}
                                setTitle={setTitle}
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
                        </TabPanel>

                        <TabPanel value="2">
                            <PlacementModules
                                aptitudeId={aptitudeId}
                                recordType={recordType}
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
                                // program={program}
                                setSelectedModule={setSelectedModule}
                                setSelectedModuleData={setSelectedModuleData}
                            />
                        </TabPanel>

                        <TabPanel value="3">
                            <PlacementFAQ
                                aptitudeId={aptitudeId}
                                recordType={recordType}
                                FAQdata={faqRows}
                                handleFaqQuestionChange={handleFaqQuestionChange}
                                handleFaqTypeChange={handleFaqTypeChange}
                                handleFaqanswerChange={handleFaqanswerChange}
                                handleAddFAQ={handleAddFAQ}
                                handleDeleteUser={handleDeleteUser}
                                handleDeleteFAQ={handleDeleteFAQ}
                                handleAddQuestion={handleAddQuestion}
                            />
                        </TabPanel>
                    </TabContext>
                </Box>
            </Div>
            <Div sx={{ display: "flex", alignItems: 'center', justifyContent: 'center' }}>
                {value !== "1" && (
                    <Button variant="contained" onClick={handleBack}>
                        Back
                    </Button>
                )}
                {value !== "3" && (
                    <Button variant="contained" onClick={handleNext} sx={{ ml: 5 }}
                    >
                        Next
                    </Button>
                )}
                {value === "3" && (
                    <Button variant="contained" sx={{ ml: 5 }} onClick={submit}>Save</Button>
                )}
            </Div>
            <ToastContainer
                position="top-right"
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
};
