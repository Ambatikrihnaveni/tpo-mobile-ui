import React, { useEffect, useState } from 'react';
import Box from '@mui/material/Box';
import { Tab, Tabs } from '@mui/material';
import { TabContext, TabPanel } from '@mui/lab';
import Button from '@mui/material/Button';
import Card from '@mui/material/Card';
import ProgramDescription from './programDescription';
import useProgram from './hooks/useProgram';
import ModulesService from '../../../../client/ui/graphql/services/modules/modules-service';
import SelectModules from './components/createModule/selectModules';
import ProgramImage from './components/programImage';
import ProgramTitle from './components/programTitle';
import ProgramType from './components/programType';
import ProgramField from './components/programField';
import { useParams, useNavigate, useLocation } from "react-router-dom";
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import ProgramDuration from './durationNumber'
import FAQ from './components/FAQ';
import Pricing from './components/pricing';


export default function EditProgram() {

  const navigate = useNavigate()
  const routeParams = useParams();
  const programId = routeParams.program_id
  const { shopId, onUpdateProgram, program, } = useProgram({ programId });
  const [programTitle, setProgramTitle] = useState('');
  const [value, setValue] = React.useState('1');
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
  const location = useLocation();
  const url = location.pathname;
  //  const shopId = localStorage.getItem('accounts:shopId')
  const recordType = url.substring(url.lastIndexOf('/') + 1);
  const handleFaqTypeChange = (index, e) => {
    const type = e.target.value
    let data = [...faqRows]
    data[index].faqType = type
    setFaqRows(data)
    setFaqData(data)
  };


  const handleTabChange = (event, newValue) => {
    setValue(newValue);
  };

  const handleFaqQuestionChange = (index, i, e) => {
    const question = e.target.value
    let data = [...faqRows]
    data[index].qAndA[i].question = question
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


  useEffect(async () => {

    const { modules } = await ModulesService.modules(shopId);
    setModulesData(modules);
  }, [])

  useEffect(async () => {

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




  const submit = async () => {
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

  return (
    <Card sx={{ width: '100%', p: 2, }}>
      <TabContext value={value}>
        <Box sx={{ borderBottom: 2, borderColor: 'divider', mb: 1, fontSize: '1.2rem', color: 'blue', pl: 8.5, }}>
          <Tabs onChange={handleTabChange} aria-label="basic tabs example" value={value} variant="scrollable"
            scrollButtons="auto" sx={{ textAlign: 'center' }}>
            <Tab label="Image & Type" value="1" sx={{ fontWeight: 'bold', color: 'black', ml: 8, }} />
            <Tab label="Name & Field" value="2" sx={{ fontWeight: 'bold', color: 'black', ml: 8, }} />
            <Tab label="Description & Pricing" value="3" sx={{ fontWeight: 'bold', color: 'black', ml: 8, }} />
            <Tab label="Duration" value="4" sx={{ fontWeight: 'bold', color: 'black', ml: 8, }} />
            <Tab label="Modules" value="5" sx={{ fontWeight: 'bold', color: 'black', ml: 8, }} />
            <Tab label="FAQs" value="6" sx={{ fontWeight: 'bold', color: 'black', ml: 8, }} />
          </Tabs>
        </Box>
        <TabPanel value="1">
          <>
            <ProgramImage data={programImage} handleChange={handleProgramImageChange} />
            <br />
            <br />
            <ProgramType data={programType} handleChange={handleProgramTypeChange} />
          </>
        </TabPanel>
        <TabPanel value="2">
          <>
            <ProgramTitle data={programTitle} handleChange={handleProgramTitleChange} />
            <ProgramField data={selectedFields} handleChange={handleFieldSelectionChange} customField={customField} />
          </>
        </TabPanel>
        <TabPanel value="3">
          <>
            <ProgramDescription data={programDescription} handleChange={handleProgramDescriptionChange} program={program} recordType={recordType} />
            <Pricing currency={currency} price={price} handleCurrencyChange={handleCurrencyChange} handlePriceChange={handlePriceChange} />

          </>
        </TabPanel>
        <TabPanel value="4">
          <ProgramDuration duration={duration}
            recordType={recordType}
            handleModeChange={handleModeChange}
            selectedModes={selectedModes}
            setSelectedModes={setSelectedModes}
            durationType={durationType}
            addDuration={addProgramDuration}
            AddDurationType={addProgramDurationType} />
        </TabPanel>
        <TabPanel value="5">
          <SelectModules
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
            program={program}
            setSelectedModule={setSelectedModule}
            setSelectedModuleData={setSelectedModuleData}
          />
        </TabPanel>
        <TabPanel value="6">
          <FAQ recordType={recordType}
            FAQdata={faqRows}
            handleFaqQuestionChange={handleFaqQuestionChange}
            handleFaqTypeChange={handleFaqTypeChange}
            handleFaqanswerChange={handleFaqanswerChange}
            handleAddFAQ={handleAddFAQ}
            handleDeleteUser={handleDeleteUser}
            handleDeleteFAQ={handleDeleteFAQ}
            handleAddQuestion={handleAddQuestion} />
        </TabPanel>
      </TabContext>
      <Box sx={{ textAlign: 'center' }}> <Button variant='contained' onClick={submit}>Save</Button></Box>
    </Card>
  );
}