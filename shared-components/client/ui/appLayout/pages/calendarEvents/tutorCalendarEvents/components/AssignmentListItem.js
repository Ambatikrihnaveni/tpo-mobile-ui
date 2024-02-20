import React from 'react';
import {
    ListItemText,
    Typography,
    Stack,
    Button,
    ButtonGroup,
} from "@mui/material";
import styled from "@emotion/styled";
import Span from "@jumbo/shared/Span";
import JumboListItem from "@jumbo/components/JumboList/components/JumboListItem";
import { Meteor } from "meteor/meteor";
import { useNavigate } from 'react-router-dom';
import useAuth from '../../../../../hooks/useAuth';

const Item = styled(Span)(({ theme }) => ({
    minWidth: 0,
    flexGrow: 0,
    padding: theme.spacing(0, 1),
}));



const { filesBaseUrl } = Meteor.settings.public;

const AssignmentListItem = ({ record, recordType }) => {
    const { viewer } = useAuth()
    const [assignmentQuestions, setAssignmentQuestions] = React.useState([])
    const [totalMarks, setTotalMarks] = React.useState("")
    const [totalSubmit, setTotalSubmit] = React.useState("")
    const [data, setData] = React.useState([])
    const navigate = useNavigate();
    const assignmentId = record?.assignmentId
    const handleDetailsClick = () => {
        navigate(`/assignments/${assignmentId}/questions`)
    }

    return (
        <JumboListItem
            componentElement={"div"}
            itemData={record}
            recordType={recordType}
            secondaryAction={

                <ButtonGroup>
                    <Button sx={{
                        bgcolor: 'white',
                        '&:hover': {
                            color: 'white',
                            bgcolor: '#50C2C9',
                        },
                        textTransform: 'capitalize'

                    }}
                        onClick={handleDetailsClick} disabled={parseFloat(record?.totalSubmit) == 0}>Details</Button>
                </ButtonGroup>
            }
            sx={{
                cursor: 'pointer',
                borderTop: 1,
                borderColor: 'divider',
                '&:hover': {
                    bgcolor: 'action.hover',
                }
            }}
        >


            <ListItemText
                primary={
                    <Typography variant={"body1"} component={"div"}>
                        <Stack direction={"row"} alignItems={"center"} >
                            <Item
                                sx={{
                                    flexBasis: { xs: '100%', sm: '50%', md: '50%' },
                                    flexShrink: 0, px: 1,
                                }}
                            >

                                <Typography variant={"h4"} mb={.5} >{record?.assignmentName}</Typography>
                                <Typography variant={"h5"} sx={{ marginTop: '5%' }}>
                                    <b> Course :</b> {record?.course}
                                </Typography>

                            </Item>
                            <Item
                                sx={{
                                    flexBasis: { sm: '50%', md: '20%' },
                                    display: { xs: 'none', sm: 'block' },
                                    textTransform: 'capitalize',
                                    textAlign:'center'
                                }}
                            >
                                <Typography variant={"body1"} noWrap

                                >{record?.totalMarks}</Typography>
                            </Item>

                            <Item
                                sx={{
                                    flexBasis: { sm: '50%', md: '20%' },
                                    display: { xs: 'none', sm: 'block' },
                                    textTransform: 'capitalize',
                                    textAlign:'center'
                                }}
                            >
                                <Typography variant={"body1"} noWrap

                                >{record?.totalSubmit}</Typography>
                            </Item>





                        </Stack>
                    </Typography>
                }
            />

        </JumboListItem>
    );
};
export default AssignmentListItem;