import React, { useEffect, useState } from 'react';
import Box from '@mui/material/Box';
import Stepper from '@mui/material/Stepper';
import Step from '@mui/material/Step';
import Grid from '@mui/material/Grid';
import StepContent from '@mui/material/StepContent';
import Button from '@mui/material/Button';
import Card from '@mui/material/Card';
import Typography from '@mui/material/Typography';
import ProgramDescription from './programDescription';
import useProgram from './hooks/useProgram';
import ModulesService from '../../../../client/ui/graphql/services/modules/modules-service';
import SelectModules from './components/createModule/selectModules';
import ProgramImage from './components/programImage';
import ProgramTitle from './components/programTitle';
import ProgramType from './components/programType';
import ProgramField from './components/programField';
import { useParams, useNavigate } from "react-router-dom";
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Div from '../../../../client/ui/@jumbo/shared/Div/Div';
import ProgramDuration from './durationNumber'
import FAQ from './components/FAQ';
import Pricing from './components/pricing';


export default function AddProgram() {
  ;
  const navigate = useNavigate()
  const routeParams = useParams();
  const programId = routeParams.program_id
  const { shopId, onUpdateProgram, program, } = useProgram({ programId });
  const [programTitle, setProgramTitle] = useState('');
  const [activeStep, setActiveStep] = useState(0);
  const [stepTitle, setStepTitle] = useState('');
  const [selectedFields, setSelectedFields] = useState('');
  const [programImage, setProgramImage] = React.useState([]);
  const [programType, setProgramType] = useState('');
  const [programDescription, setProgramDescription] = useState('');
  const [batchStrength, setBatchStrength] = useState('');
  const [programBatchRow, setProgramBatchRow] = useState([]);
  const [programBatch, setProgramBatch] = useState([]);
  const [module, setModule] = React.useState('')
  const [modulesData, setModulesData] = React.useState([])
  const [lessons, setLessons] = React.useState([])
  const [selectedModuleData, setSelectedModuleData] = React.useState([])
  const [selectedLessonsData, SetselectedLessonsDate] = React.useState([])
  const [duration, setDuration] = React.useState('');
  const [durationType, setDurationType] = useState('');
  const [date, setDate] = React.useState('');
  const [dateNumber, setDateNumber] = useState('');
  const [programBatches, setProgramBatches] = useState('')
  const [peoplesCount, setPeoplesCount] = useState('')
  const [currency, setCurrency] = React.useState('')
  const [price, setPrice] = React.useState('')
  const [error, setError] = useState({ hasError: false, message: '' });
  const [customField, setCustomField] = useState('');
  const [selectedLessons, setSelectedLessons] = React.useState([]);
  const [selectedModes, setSelectedModes] = useState([]);
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

  const handleFaqTypeChange = (index, e) => {
    const type = e.target.value
    let data = [...faqRows]
    data[index].faqType = type
    setFaqRows(data)
    setFaqData(data)
  };

  const handleFaqQuestionChange = (index, i, e) => {
    const question = e.target.value && e.target.value[0].toUpperCase() + e.target.value.slice(1)
    let data = [...faqRows]
    data[index].qAndA[i].question = question
    setFaqRows(data)
    setFaqData(data)
  };

  const handleFaqanswerChange = (index, i, e) => {
    const answer = e.target.value && e.target.value[0].toUpperCase() + e.target.value.slice(1)
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

  const handleAddQuestion = (index) => {
    const data = [...faqRows];
    const newQuestion = { question: '', answer: '' };
    data[index].qAndA.push(newQuestion);
    setFaqRows(data);
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
  const handleProgramTypeChange = (value) => {
    setProgramType(value);
  };

  const handleProgramImageChange = (event, values) => {
    setProgramImage(values);
  };



  const handleProgramTitleChange = (value) => {
    setProgramTitle(value);
  };


  const handleFieldSelectionChange = (event, values) => {
    setSelectedFields(values);
  };

  const addProgramDuration = (e) => {

    setDuration(e.target.value)
  }

  const addProgramDurationType = (e) => {

    setDurationType(e.target.value)
  }

  const handleCurrencyChange = (e) => {
    setCurrency(e.target.value)
  }
  const handlePriceChange = (e) => {
    if (e?.target?.value) {
      setPrice(e.target.value)
    } else {
      setPrice(e)
    }

  }

  const handleProgramDescriptionChange = (value) => {
    setProgramDescription(value);
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



  useEffect(() => {
    switch (activeStep) {
      case 0:
        setStepTitle('Build Your Program');
        break;
      case 1:
        setStepTitle('');
        break;
      case 2:
        setStepTitle('');
        break;
      case 3:
        setStepTitle('');
        break;
      case 4:
        setStepTitle('');
        break;
      case 5:
        setStepTitle('');
        break;
      case 6:
        setStepTitle('');
        break;
    }
  }, [activeStep]);

  useEffect(async () => {
    const { modules } = await ModulesService.modules(shopId);
    setModulesData(modules);
    if (program) {
      setProgramTitle(program.name)
      setProgramType(program.type)
      setProgramImage(program.programMedia)
      setProgramDescription(program?.program_content)
      setPrice(program.price)
      setCurrency(program.priceType)
      setPeoplesCount()
      setDuration(program.duration)
      setSelectedFields(program.field)
      setSelectedModes(program.modes)
      let string = program?.duration;
      let position = string?.search('-');
      let durationCount = string?.slice(0, position);
      let durationType = string?.slice(position + 1, string?.length);
      setDuration(durationCount);
      setDurationType(durationType);
      setBatchStrength(program.batches ? program.batches[0]?.batch_max_limit : '')
      setProgramBatchRow(program.batches);
      setProgramBatch(program.batches)
      if (program.faqs) {
        let faqdata = []
        for (let i = 0; i < program.faqs.length; i++) {
          let qAndAData = []
          for (let x = 0; x < program.faqs[i].qAndA.length; x++) {
            const data = { answer: program.faqs[i].qAndA[x].answer, question: program.faqs[i].qAndA[x].question }
            qAndAData.push(data)
          }
          const data = { faqType: program.faqs[i].faqType, qAndA: qAndAData }
          faqdata.push(data)
        }
        setFaqRows(faqdata)
        setFaqData(faqdata)
      }
      let data = [];
      for (let x = 0; x < program.products.length; x++) {
        let productLessons = [];
        const title = program.products[x].title;
        const productId = program.products[x]._id;
        const module = await ModulesService.getModule(shopId, productId)
        for (let i = 0; i < program.products[x].lessonsDuration.length; i++) {
          let lesson = []
          for (let k = 0; k < program.products[x].lessonsDuration[i].lesson.length; k++) {
            lesson.push(program.products[x].lessonsDuration[i].lesson[k]._id)
          }

          const lessonDuration = program.products[x].lessonsDuration[i].lessonDuration
          const lessonData = { lessonIds: lesson, lessonDuration: lessonDuration }
          productLessons.push(lessonData)
        }
        const productData = { title: title, productId: productId, productLessons: productLessons, module: module }
        data.push(productData)
      }

      setSelectedModuleData(data)
      setSelectedModule(data)


      if (data) {
        let lessons = []
        for (let i = 0; i < data.length; i++) {
          for (let x = 0; x < data[i].productLessons.length; x++) {
            for (let y = 0; y < data[i].productLessons[x].lessonIds.length; y++) {
              let lessonId = data[i].productLessons[x].lessonIds[y]
              lessons.push(lessonId)

            }
          }
        }
        setSelectedLessons(lessons)
      }

    }


  }, [program]);

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

  const handleNext = async () => {
    setActiveStep((prevActiveStep) => prevActiveStep + 1);
  };


  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };



  // modes of program

  const modesArray = Array.isArray(selectedModes) ? selectedModes : [];

  const handleModeChange = (mode) => {
    ;
    const updatedModes = [...modesArray];
    if (updatedModes.includes(mode)) {
      updatedModes.splice(updatedModes.indexOf(mode), 1);
    } else {
      updatedModes.push(mode);
    }

    setSelectedModes(updatedModes);
  };


  const steps = [
    {
      title: 'Upload image',
      content: (
        <>
          <ProgramImage data={programImage} handleChange={handleProgramImageChange} />
          <br />
          <br />
          <ProgramType data={programType} handleChange={handleProgramTypeChange} />
        </>
      ),
      fields: ['programType', 'programImage'], // Add this line
    },
    {
      title: 'Program Name',
      content: (
        <>
          <ProgramTitle data={programTitle} handleChange={handleProgramTitleChange} />
          <ProgramField data={selectedFields} handleChange={handleFieldSelectionChange} customField={customField} />
        </>
      ),
      fields: ['programTitle', 'selectedFields'], // Add this line
    },
    {
      title: 'Program Description',
      content: (
        <>
          <ProgramDescription datas={programDescription} handleChange={handleProgramDescriptionChange} program={program} />
          <Pricing currency={currency} price={price} handleCurrencyChange={handleCurrencyChange} handlePriceChange={handlePriceChange} />

        </>
      ),
      fields: ['programDescription', 'price', 'currency'], // Add this line
    },
    {
      title: 'Set Duration',
      content: (<>
        <ProgramDuration duration={duration}
          handleModeChange={handleModeChange}
          selectedModes={selectedModes}
          setSelectedModes={setSelectedModes}
          durationType={durationType}
          addDuration={addProgramDuration}
          AddDurationType={addProgramDurationType} />
      </>),
      fields: ['duration', 'durationType']
    },
    {
      title: 'Modules',
      content: (
        <SelectModules
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
          program={program}
          setSelectedModule={setSelectedModule}
          setSelectedModuleData={setSelectedModuleData}
        />
      ),
      fields: ['selectedModule', 'selectedLessons'], // Add this line
    },
    {
      title: 'FAQ',
      content: (<FAQ FAQdata={faqRows} handleFaqQuestionChange={handleFaqQuestionChange} handleFaqTypeChange={handleFaqTypeChange} handleFaqanswerChange={handleFaqanswerChange} handleAddFAQ={handleAddFAQ} handleDeleteUser={handleDeleteUser} handleDeleteFAQ={handleDeleteFAQ} handleAddQuestion={handleAddQuestion} />
      ),
      fields: ['faqData']
    },

  ];




  const submit = async () => {
    ;
    const modules = []
    for (let x = 0; x < selectedModuleData?.length; x++) {
      const data = { productId: selectedModuleData[x].productId, productLessons: selectedModuleData[x].productLessons }
      modules.push(data)
    }
    const programDuration = duration.concat("-", durationType)
    const data = {
      id: programId,
      shopId: shopId,
      type: programType,
      image: programImage,
      title: programTitle,
      fieldOfStudy: selectedFields,
      description: programDescription,
      //  batches: programBatchIds,
      modules: modules,
      modes: selectedModes,
      duration: programDuration,
      // batchCount: batchStrength,
      price: price,
      priceType: currency,
      faqData: faqData

    }
    try {
      await onUpdateProgram({
        program: data
      })
      navigate('/myprograms')
      setTitleErr('');
      setTypeErr("");
      setFieldErr("");
      onClose()

      toast.success('updated successfully', {
        position: "top-right",
        autoClose: 3000,
        hideProgressBar: true,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "colored",
      });
    } catch (error) {

    }

  }
  const isStepValid = () => {
    if (activeStep !== 8) {
      const currentStep = steps[activeStep];
      const fields = currentStep?.fields;

      for (const field of fields) {
        if (field === 'programImage' && programImage === '') {
          return false;
        }
        if (field === 'programType' && programType === '') {
          return false;
        }
        if (field === 'selectedModule' && !selectedModuleData.some(module => module.productLessons.length > 0 && module.productLessons.every(lesson => lesson.lessonIds && lesson.lessonDuration))) {
          return false;
        }
        if (field === 'programTitle' && programTitle === '') {
          return false;
        }
        if (field === 'selectedFields' && selectedFields === '') {
          return false
        }
        if (field === 'programDescription' && programDescription === '') {
          return false
        }
        if (field === 'duration' && duration === '') {
          return false
        }
        if (field === 'durationType' && durationType === '') {
          return false
        }
        if (field === 'price' && price === '') {
          return false
        }
        if (field === 'currency' && currency === '') {
          return false
        }

        if (field === 'programBatch' && programBatch.length === 0) {
          return false
        }
        if (field === 'batchStrength' && batchStrength === '') {
          return false
        }
      }
      return true;
    }
  }

  const isFinishButtonDisabled = () => {
    for (const faq of faqData) {
      for (const qAndA of faq.qAndA) {
        if (qAndA.answer === '') {
          return true;
        }
      }
    }
  }


  return (
    <Card sx={{ minHeight: '70vh' }}>


      <Grid container spacing={1}>
        <Grid item xs={12} lg={10} sx={{ p: 3 }}>
          <Typography variant="h1" sx={{ textTransform: 'capitalize', fontWeight: 'bold', p: 1, color: '#0aa8ad', textAlign: 'left', ml: 2, mt: 2 }}>
            {stepTitle}
          </Typography>

          <Stepper activeStep={activeStep} orientation="vertical" sx={{
            height: '70vh', '& .MuiStepConnector-line': {
              border: 'none',
              marginLeft: '0px'
            }
          }}>
            {steps.map((step, index) => (

              <Step key={index} completed={step.isCompleted || index < activeStep} sx={{
                '& .MuiStepContent-root': {
                  border: 'none',
                  marginLeft: '0px'
                }
              }}>
                <StepContent TransitionProps={{ unmountOnExit: false }}>
                  <Div  >{step.content}</Div>
                </StepContent>
              </Step>
            ))}
          </Stepper>

          <Box sx={{ textAlign: 'right' }}>
            <div>
              <Button disabled={activeStep === 0} onClick={handleBack} sx={{ mt: 1, mr: 1 }}>
                Back
              </Button>
              <Button disabled={!isStepValid() || isFinishButtonDisabled()} variant="contained" onClick={activeStep === steps.length - 1 ? submit : handleNext} sx={{ mt: 1, mr: 1 }}>
                {activeStep === steps.length - 1 ? 'Finish' : 'Continue'}
              </Button>
            </div>
          </Box>
        </Grid>

        <Grid item lg={2} sx={{ backgroundImage: "url('https://www.bworldonline.com/wp-content/uploads/2022/05/front-view-stacked-books-graduation-cap-ladders-education-day-1.jpg')", backgroundSize: 'cover' }}></Grid>
      </Grid>

    </Card>
  );
}