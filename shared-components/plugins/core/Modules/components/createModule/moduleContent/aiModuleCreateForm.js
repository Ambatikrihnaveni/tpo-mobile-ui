import React, { useEffect, useState, useCallback, } from "react";
import { Button, Typography, Box, Grid, TextField, Dialog } from "@mui/material";
import Div from "../../../../../../client/ui/@jumbo/shared/Div";
import { useMutation } from "@apollo/react-hooks";
import PropTypes from 'prop-types';
import createLessonMutation from "../../../../../../client/ui/graphql/services/modules/mutations/createLesson";
import createTopicMutation from "../../../../../../../imports/client/ui/graphql/services/modules/mutations/createTopic";
import { SyncLoader } from "react-spinners";
import AiServices from "../../../../../../client/ui/appLayout/services/ai-services";
import AutoAwesomeIcon from '@mui/icons-material/AutoAwesome';
import IconButton from "@mui/material/IconButton";
import CloseIcon from '@mui/icons-material/Close';
import useProduct from "../../../hooks/useProduct";
import ModulesService from "../../../../../../client/ui/graphql/services/modules/modules-service";


export default function AiModuleCreateForm(props) {

  const { productId, shopId, product, onClose, refreshLessonList, value: valueProp, open, ...other } = props
  const [value, setValue] = React.useState(valueProp);
  const [buttonTitle, setButtonTitle] = useState("Generate");
  const [description, setDescription] = React.useState('');
  const [createLesson, { error: createLessonError }] = useMutation(createLessonMutation);
  const [createTopic, { error: createTopicError }] = useMutation(createTopicMutation);
  let lessonId = "";
  let [loading, setLoading] = useState(false);
  const [moduleTitle, setModuleTitle] = useState(product?.title);
  const [isSubmitting, setIsSubmitting] = useState(false);
  let aiResponseData;

  const onNewLessonClick = async (name) => {
    ;
    const { data } = await createLesson({ variables: { input: { shopId, productId, name } } });
    if (data) {
      const { createLesson: lesson } = data;
      lessonId = lesson._id;
      return lesson;
    }

    if (createLessonError) {
      enqueueSnackbar(i18next.t("admin.productTable.bulkActions.error", { variant: "error" }));
    }
  };

  const onSubmit = useCallback(async () => {
    setLoading(true)
    setIsSubmitting(true);
  }, []);

  const onKeyDown = (event) => {
    const message = event.target.value.trim();
    if (event.key === "Enter" && message) {
      setIsSubmitting(true);
    }
  };

  function parseJSON(jsonString) {
    return new Promise((resolve, reject) => {
      try {
        const data = JSON.parse(jsonString);
        resolve(data);
      } catch (error) {
        reject(error);
      }
    });
  }

  const handleCancel = () => {
    onClose();
  };

  const aiTopicCreation = async (title, content) => {
    ;
    await createTopic({
      variables: {
        input: { shopId, productId, lessonId, topic_name: title, topic_content: content }
      }
    }).then(async (data) => {
      ;
      let createTopicPayload = data;
      if (createTopicPayload) {
        return createTopicPayload;
      }
    })
      .catch(async (err) => {
        console.log(err);
      })
  }

  const getAiData = async (lessonTitle) => {
    await AiServices.createTopicContent(`${lessonTitle} in ${product?.title}`)
      .then(async (data) => {
        let aiTopicData = data;
        console.log(aiTopicData);
        parseJSON(aiTopicData)
          .then(async (result) => {
            if (result != null || result != undefined) {
              let topics = (result?.topics?.length > 0) ? result.topics : result;
              for (let topicDetais of topics) {
                let topic = topicDetais;
                let topicName = (topic?.topic) ? topic.topic : topic.title;
                let topicDescription = topic.description;
                let topicPayload = await aiTopicCreation(topicName, topicDescription);
                if (topicPayload) {
                  //refreshLessonList()
                }
              }
            }
          })
          .catch(async (err) => {
            if (err) {
              console.log(err);
              return null;
            }
          });
      })
      .catch(async (err) => {
        if (err) {
          return null;
        }
      })

  }

  useEffect(async () => {
    let input = {
      userReq: product?.title,
      serviceType: 'AiModuleCreation',
      shopId: shopId,
      productId: productId
    }
    if (!open) {
      setValue(valueProp);
    }
    if (product?.title.length >= 3 && isSubmitting) {
      ;
      await ModulesService.createAiService(input)
        .then(async (data) => {

          console.log(data);
          setButtonTitle("Preparing...");
          if (data == true || data != undefined) {

            onClose()
          }
        }).catch(async (err) => {
          if (err) {
            setLoading(false)
            setIsSubmitting(false);
            setButtonTitle("Regenerate");
          }
        })
    }
  }, [isSubmitting]);

  return (
    <Dialog
      style={{ borderRadius: "15px", backgroundColor: loading ? 'rgba(0, 0, 0, 0.1)' : 'transparent' }}
      fullWidth="true"
      maxWidth="sm"
      open={open}
      {...other}
    >
      <Div sx={{ p: 3 }}>
        <Div sx={{ display: loading ? 'block' : 'none', textAlign: 'right' }}><IconButton onClick={handleCancel}><CloseIcon /></IconButton></Div>
        <Div sx={{ display: loading ? 'none' : 'block' }}>
          <Grid container >
            <Grid xs={11}>
              <Typography variant={"h5"} fontSize={23} sx={{ fontWeight: "bold" }}> <AutoAwesomeIcon />  Create with AI</Typography>
            </Grid>
            <Grid xs={1}><IconButton onClick={handleCancel}><CloseIcon /></IconButton></Grid>
          </Grid>
          <Div>
            <Typography>Enter a topic, some key words or even a course summary.</Typography>
          </Div>
          <Div style={{ marginTop: "20px" }}>
            <Box
              component="form"
              sx={{
                '& .MuiTextField-root': { m: 1, width: '25ch' },
              }}
              noValidate
              autoComplete="off"
            >
              <div>
                <TextField
                  value={product?.title}
                  onChange={(e) => { setModuleTitle(e.target.value) }}
                  placeholder='Enter Module Title'
                  style={{
                    height: "80px",
                    borderWidth: 1,
                    borderColor: 'lightgray',
                    borderRadius: "10px",
                    width: '100%'
                  }}

                />
              </div>
            </Box>
          </Div>
          <Grid container style={{ marginTop: "20px" }}>
            <Grid xs={8} >
              <span style={{ color: "success" }}>How does this work?</span>
            </Grid>
            <Grid xs={4} style={{ display: "flex" }}>
              <Button variant="outlined" onClick={handleCancel}>Cancel</Button>
              <Button variant="contained" sx={{ marginLeft: "10px", textTransform: "none", fontWeight: "bold" }} disabled={!product?.title} onClick={onSubmit}> {buttonTitle}</Button>
            </Grid>
          </Grid>
        </Div>
        <Div sx={{ textAlign: 'center', }}>
          <SyncLoader
            color="#17a69c"
            loading={loading}
            aria-label="Loading Spinner"
            data-testid="loader"
          />
          <Typography sx={{ display: loading ? 'block' : 'none', mt: 3 }}>{`We are preparing lessons for ${product?.title}`} </Typography>
        </Div>
      </Div>
    </Dialog>
  );
}
AiModuleCreateForm.propTypes = {
  onClose: PropTypes.func.isRequired,
  open: PropTypes.bool.isRequired,
  value: PropTypes.string.isRequired,
}
