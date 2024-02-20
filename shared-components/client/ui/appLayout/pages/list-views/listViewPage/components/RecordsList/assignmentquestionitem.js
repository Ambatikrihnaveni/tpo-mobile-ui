import React, { useState } from 'react';
import {
    ListItem,
    ListItemText,
    ListItemAvatar,
    FormControl,
    MenuItem,
    Typography,
    Avatar,
    Stack,
    Select,
    Button,
    ButtonGroup,
} from "@mui/material";
import styled from "@emotion/styled";
import Span from "@jumbo/shared/Span";
import JumboListItem from "@jumbo/components/JumboList/components/JumboListItem";
import { Meteor } from "meteor/meteor";
import { useNavigate } from 'react-router-dom';


const Item = styled(Span)(({ theme }) => ({
    minWidth: 0,
    flexGrow: 0,
    "@media (max-width: 600px)": {
        padding: theme.spacing(0.5),
    },
}));



const { filesBaseUrl } = Meteor.settings.public;
;
const AssignmentQuestionItem = ({ record, recordType }) => {

    const [status, setStatus] = useState(record?.result || "Pending");
    const navigate = useNavigate();

    const handleChange = async (event) => {

        const lessonStatus = event.target.value;
        setStatus(lessonStatus);
        const data = await MyProgramService.updateLessonStatus(shopId, programId, batchID, productId, lessonIds, lessonStatus);
        setRecordsListRefresh(true)
    };
    const assignmentId = record?.assignmentId
    const studentId = record?.studentId
    const handleDetailsClick = () => {
        navigate(`/assignments/questions/${assignmentId}/${studentId}/evaluation`)

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
                    }}
                        onClick={handleDetailsClick}  >Evaluate</Button>
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
                // onClick={showtutorDetail}
                primary={
                    <Typography variant={"body1"} component={"div"}>
                        <Stack direction={"row"} alignItems={"center"} >
                            <Item
                                sx={{
                                    display: 'flex',
                                    flexBasis: { xs: '100%', sm: '50%', md: '28%' },
                                    flexShrink: 0, px: 1,
                                }}
                            >

                                <div>
                                    <Typography variant={"h5"} mb={.5} >{record?.date}</Typography>
                                    <Typography fontSize={"14px"} variant={"body1"} >
                                        Course : {record?.time}
                                    </Typography>
                                </div>
                            </Item>
                            <Item
                                sx={{
                                    display: 'flex',
                                    flexBasis: { xs: '100%', sm: '50%', md: '28%' },
                                    flexShrink: 0, px: 1,
                                    //display: { xs: 'none', md: 'block' },

                                }}
                            >
                                <ListItemAvatar

                                >
                                    <Avatar src={''} alt={record?.name} />
                                </ListItemAvatar>

                                <div>
                                    <Typography variant={"h5"} mb={.5} fontSize={"16px"} fontWeight={"bold"}>{record?.studentname}</Typography>
                                    <Typography fontSize={"14px"} variant={"body1"} >
                                        {record?.studentemail}
                                    </Typography>
                                </div>
                            </Item>

                            <Item
                                sx={{
                                    // marginLeft:'5%',
                                    marginRight: '10%',
                                    flexBasis: { sm: '50%', md: '20%' },
                                    display: { xs: 'none', sm: 'block' },
                                    textTransform: 'capitalize'
                                }}
                            >
                                <Typography variant={"body1"} noWrap

                                >{record?.TotalPoints}</Typography>
                            </Item>

                            <ListItem
                                sx={{ width: "20%", varticalAlign: "middle", marginRight: '15%', display: { xs: 'none', md: 'block' } }}
                            >

                                <FormControl sx={{ m: 1, minWidth: 60 }} >

                                    <Select
                                        value={status}
                                        size="small"
                                        sx={{ '.MuiOutlinedInput-notchedOutline': { border: 0 }, "&.Mui-focused .MuiOutlinedInput-notchedOutline": { border: 0 }, color: "white", borderRadius: "30px", width: "auto", height: "30px", fontSize: 12, textAlign: "center", backgroundColor: status === 'Pass' ? '#28a745' : '#f29339', minWidth: '80px' }}
                                        inputProps={{ IconComponent: () => null }}
                                        onChange={handleChange}

                                    >
                                        <MenuItem value="Pass" style={{ fontWeight: 'bold' }}>Pass</MenuItem>
                                        <MenuItem value="Pending" style={{ fontWeight: 'bold' }}>Pending</MenuItem>
                                        <MenuItem value="Fail" style={{ fontWeight: 'bold' }}>Fail</MenuItem>


                                    </Select>
                                </FormControl>
                            </ListItem>



                        </Stack>
                    </Typography>
                }
            />

        </JumboListItem>
    );
};
export default AssignmentQuestionItem;