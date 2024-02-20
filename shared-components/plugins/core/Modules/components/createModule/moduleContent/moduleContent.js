import React, { useEffect, useState, } from "react";
import { Button } from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import Div from "../../../../../../client/ui/@jumbo/shared/Div";
import CreateLessonForm from "./createLessonForm";
import { useMutation } from "@apollo/react-hooks";
import LessonList from "./lessonList";
import { useJumboDialog } from "@jumbo/components/JumboDialog/hooks/useJumboDialog";
import createLessonMutation from "../../../../../../client/ui/graphql/services/modules/mutations/createLesson";
import createTopicMutation from "../../../../../../../imports/client/ui/graphql/services/modules/mutations/createTopic";
import useProduct from "../../../hooks/useProduct";
import useLesson from "../../../hooks/useLesson";
import ModulesService from "../../../../../../client/ui/graphql/services/modules/modules-service";
import AiModuleCreateForm from "./aiModuleCreateForm";
import { useParams } from "react-router";

export default function ModuleContent({ handleTabChange,createState }) {
  const { product, shopId } = useProduct();
  const productId = product?._id;
  let  {lessons,onDragandDropLesson}  = useLesson();
  const [buttonTitle, setButtonTitle] = useState("Create with AI");
  const [createLesson, { error: createLessonError }] = useMutation(createLessonMutation);
  const [createTopic, { error: createTopicError }] = useMutation(createTopicMutation);
  let lessonId = "";
  const { showDialog, hideDialog } = useJumboDialog();
  const[open,setOpen]= useState(false)
  let aiResponseData;
  const params = useParams();
  const groupId = params.groupId

const refreshLessonList= async()=>{
  
  const { data } = await ModulesService.getLessons(shopId,productId )
  lessons= data?.data?.lessons
}

const handleClose = (newValue) => {
  setOpen(false);

};

useEffect(()=>{
  if(createState=="aicreate"){
    setOpen(true)
    
  }
},[createState])

  const onNewLessonClick = async () => {
    const { data } = await createLesson({ variables: { input: { shopId, productId } } });

    if (data) {
        const { createLesson: lesson } = data;
        lessonId = lesson._id
        showDialog({
            fullScreen: true,
            content: <CreateLessonForm onClose={hideDialog} module={lesson} lessonId={lesson._id} Id={productId} />,
            sx: {
                borderRadius: 0
            }
        })
        if (createLessonError) {
            enqueueSnackbar(i18next.t("admin.productTable.bulkActions.error", { variant: "error" }));
        }

}
}

  return (
    <Div sx={{ p: 3 }}>
     
      <Div sx={{ mb: 2 }}>
        <LessonList groupId={groupId} lessons={lessons} onDragandDropLesson={onDragandDropLesson} productId={productId}/>
      </Div>

      <Div sx={{ textAlign: "center", mb: 2, mt:3  }}>
                <Button variant='contained' onClick={onNewLessonClick}><AddIcon />add New Lesson</Button>
            </Div> 
      <Div sx={{ marginTop: "30px", textAlign: "left" }}>
        <Button variant="contained" sx={{ textTransform: "none", fontWeight: "bold" }} onClick={handleTabChange}>
          Back
        </Button>
      </Div>
      <AiModuleCreateForm
          id="ringtone-menu"
          keepMounted
          open={open}
          onClose={handleClose}
          productId={productId}
          shopId={shopId}
          product={product}
          refreshLessonList={refreshLessonList}
        />
    </Div>
  );
}
