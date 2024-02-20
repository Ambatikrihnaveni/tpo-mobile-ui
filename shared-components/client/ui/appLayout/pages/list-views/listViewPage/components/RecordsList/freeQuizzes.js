import { ListItemText } from '@material-ui/core'
import { Typography, Stack, LinearProgress } from '@mui/material'
import React, { useState } from 'react';
import JumboListItem from "@jumbo/components/JumboList/components/JumboListItem";
import styled from "@emotion/styled";
import Span from "@jumbo/shared/Span";
import useAuth from '../../../../../../hooks/useAuth';
import Chip from '@reactioncommerce/catalyst/Chip';
import { useJumboDialog } from "@jumbo/components/JumboDialog/hooks/useJumboDialog";
import SubmissionQuiz from './submissionQuiz';
import { useNavigate } from 'react-router';
const Item = styled(Span)(({ theme }) => ({
  minWidth: 0,
  flexGrow: 0,
  padding: theme.spacing(0, 1),
}));

export default function FreeQuizzes(record) {
  const { viewer } = useAuth()
  const quizzes = record.record?.quizzes
  const viewerQuizzes = viewer?.quizzes
  const [buttonText, setButtonText] = useState('')
  const [totalMarks, setTotalMarks] = useState(record.record?.quizzes?.length)
  const [obtainedMarks, setObtainedMarks] = useState(0)
  const { showDialog, hideDialog } = useJumboDialog();
  const lessonId = record?.record?.lessonId
  const productId = record?.record?.productId
  const navigate = useNavigate();

  const showRecordDetail = React.useCallback(() => {
    showDialog({
      fullScreen: true,
      content: <SubmissionQuiz record={record?.record} onClose={hideDialog} lessonId={lessonId} />
    })
  }, [showDialog, record]);


  const handleDetailsClick = () => {
    localStorage.removeItem('lessonId')
    localStorage.setItem('lessonId', lessonId)
    localStorage.setItem('lessonId', productId)

    navigate(`/todaysclass/${lessonId}/${productId}/quiz`)

  }
  React.useEffect(() => {
    let submittedQuizzes = 0
    let obtainedMarks = 0
    for (let i = 0; i < record.record?.quizzes?.length; i++) {
      for (let j = 0; j < viewerQuizzes?.length; j++) {
        if (
          record.record?.quizzes[i]._id == viewerQuizzes[j].quizId
        ) {
          submittedQuizzes++
          if (viewerQuizzes[j].result) {
            obtainedMarks++
          }
        }


      }
    }
    setObtainedMarks(obtainedMarks)
    if (submittedQuizzes == record.record?.quizzes?.length) {
      setButtonText('Submitted')
    } else if (record.record?.quizzes?.length == 0) {
      setButtonText('No Quizzes')
    } else {
      setButtonText('Start Quiz')
    }
  }, [])


  return (
    <React.Fragment>
      <JumboListItem
        componentElement={"div"}
        itemData={record}>
        <ListItemText
          primary={
            <div>
              <Typography variant={"body1"} component={"div"}>
                <Stack direction={"row"} alignItems={"center"}>
                  <Item sx={{
                    flexBasis: { xs: '100%', sm: '50%', md: '25%' }
                  }}>
                    <Typography variant={"h5"} fontSize={16} lineHeight={1.25} mb={0} noWrap>
                      {record?.record?.moduleName}
                    </Typography>
                  </Item>
                  <Item sx={{
                    flexBasis: { xs: '100%', sm: '50%', md: '25%' }
                  }}>
                    <Typography variant={"h5"} fontSize={16} lineHeight={1.25} mb={0} noWrap>
                      {record?.record?.name}
                    </Typography>
                  </Item>

                  <Item
                    sx={{
                      flexBasis: { sm: '50%', md: '45%' },
                      display: { xs: 'none', md: 'block' }
                    }}
                  >
                    <Typography variant={"body1"} noWrap>
                      {record?.record?.quizzes?.length === 0 ? (
                        <Chip label={"No Quizzes"} size={"small"} style={{ backgroundColor: "#e53353", color: "white" }} />
                      ) : (
                        <>
                          {buttonText === 'Submitted' ? (
                            <Chip label={"Submitted"} size={"small"} onClick={showRecordDetail} style={{ backgroundColor: "#19c46e", color: "white" }} />
                          ) : (
                            <Chip
                              label={"Start Quiz"}
                              size={"small"}
                              onClick={handleDetailsClick}
                              style={{ backgroundColor: '#4285f4', color: "white" }}
                            // Disable the button if there are no quizzes
                            />
                          )}
                        </>
                      )}
                    </Typography>
                  </Item>

                  <Item
                    sx={{
                      flexBasis: { sm: '50%', md: '50%' },
                      display: { xs: 'none', md: 'block' }
                    }}
                  >
                    <Typography variant={"body1"} noWrap sx={{ color: 'rgb(156, 5, 135)', fontWeight: "bold", fontSize: "16px" }}>
                      {`${obtainedMarks} out of ${totalMarks}`}
                    </Typography>
                    <LinearProgress
                      variant="determinate"
                      value={obtainedMarks / totalMarks || 0}  // Ensure a fallback value of 0 to avoid NaN
                      sx={{
                        width: '70%',
                        borderRadius: 4,
                        height: 9,
                        mb: 2,
                        mt: 1,
                        ml: -8,
                        textAlign: "center",
                      }}
                    />

                  </Item>
                </Stack>
              </Typography>
            </div>
          }
        />

      </JumboListItem>
    </React.Fragment>
  )
}
