import React, { useEffect, useState } from "react";
import { EditorState } from "draft-js";
import 'react-draft-wysiwyg/dist/react-draft-wysiwyg.css';
import JumboDemoCard from "@jumbo/components/JumboDemoCard";
import { Grid, Typography, Card, TableContainer, Table, TableHead, TableRow, TableCell } from "@mui/material";
import { Accordion, AccordionDetails, AccordionSummary, Divider } from "@mui/material";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import Div from "@jumbo/shared/Div";
import Stack from "@mui/material/Stack";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";

let Editor = () => <React.Fragment />

function AdditionalData() {
    const [editorState, setEditorState] = useState(EditorState.createEmpty());
    useEffect(() => {
        Editor = require('react-draft-wysiwyg').Editor;
        setEditorState(EditorState.createEmpty());
    }, []);

    return (
        <Grid container>
            <Grid xs={12} md={8}>
                <Card>

                    <Typography style={{ margin: "3% 1%" }} variant={"h4"}>
                        Course Info
                    </Typography>
                    <hr />


                    <Typography style={{ margin: "2%" }} variant={"h5"}>
                        Module Title
                    </Typography>

                    <Typography style={{ margin: "2% 1%" }} variant={"h3"}>
                        Dtastructures
                    </Typography>


                    <Grid item xs={2} md={4} lg={8}>
                        <p style={{ marginTop: "5%", marginLeft: "25px" }}>Description</p>
                        <textarea rows="2" cols="30" style={{ padding: "20% 42%" }}></textarea>
                    </Grid>

                    <Typography style={{ margin: "3% 1%" }} variant={"h4"}>
                        Module Builder
                    </Typography>
                    <hr />

                    <Grid spacing={3.25} item xs={2} md={4} lg={8}></Grid>

                    <JumboDemoCard sx={{ marginLeft: "2%", padding: "5%" }}>
                        <Div sx={{ flex: 1 }}>
                            <Accordion>
                                <AccordionSummary
                                    expandIcon={<ExpandMoreIcon />}
                                    aria-controls="panel1a-content"
                                    id="panel1a-header"
                                >
                                    <Typography>Accordion 1</Typography>
                                </AccordionSummary>
                                <AccordionDetails>
                                    <Typography>
                                        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse
                                        malesuada lacus ex, sit amet blandit leo lobortis eget.
                                    </Typography>
                                </AccordionDetails>
                            </Accordion>
                            <Accordion>
                                <AccordionSummary
                                    expandIcon={<ExpandMoreIcon />}
                                    aria-controls="panel2a-content"
                                    id="panel2a-header"
                                >
                                    <Typography>Accordion 2</Typography>
                                </AccordionSummary>
                                <AccordionDetails>
                                    <Typography>
                                        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse
                                        malesuada lacus ex, sit amet blandit leo lobortis eget.
                                    </Typography>
                                </AccordionDetails>
                            </Accordion>
                            <Accordion>
                                <AccordionSummary
                                    expandIcon={<ExpandMoreIcon />}
                                    aria-controls="panel3a-content"
                                    id="panel3a-header"
                                >
                                    <Typography>Accordion 3</Typography>
                                </AccordionSummary>
                                <AccordionDetails>
                                    <Typography>
                                        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse
                                        malesuada lacus ex, sit amet blandit leo lobortis eget.
                                    </Typography>
                                </AccordionDetails>
                            </Accordion>
                            <Accordion disabled>
                                <AccordionSummary
                                    expandIcon={<ExpandMoreIcon />}
                                    aria-controls="panel4a-content"
                                    id="panel4a-header"
                                >
                                    <Typography>Disabled Accordion</Typography>
                                </AccordionSummary>
                            </Accordion>
                        </Div>
                    </JumboDemoCard>


                    <Typography style={{ margin: "3% 1%" }} variant={"h4"}>
                        Video
                    </Typography>
                    <hr />



                    <p style={{ margin: "3% 1%", padding: "5px" }}>Module-video</p>
                    <input type="text" style={{ width: "100%", border: " dashed solid", marginLeft: "25px", padding: "5px" }} placeholder="HTML5(mp4)" />


                    <Typography sx={{}}>Select your perferred video type(mp4 YouTube. voo Player etc)</Typography>

                    <Grid style={{ marginTop: "2%", marginLeft: "25px", }}>
                        <JumboDemoCard
                            wrapperSx={{ backgroundColor: 'background.paper', pt: 10 }}
                        >

                            <Stack direction="row" alignItems="center" spacing={2}>
                                <Button variant="contained" component="label">
                                    Upload Video
                                    <input hidden accept="image/*" multiple type="file" />
                                </Button>

                            </Stack>
                        </JumboDemoCard>
                    </Grid>

                    <Grid container spacing={2}>
                        <Grid item xs={12} md={4} sm={4} lg={4}>
                            <Typography variant="h4">AdditionalData</Typography>

                        </Grid>
                    </Grid>
                    <Divider />

                    <Grid container sx={{ mt: 2 }}>
                        <Grid item xs={12} md={4} sm={4} lg={4} >
                            <Typography variant="h5">
                                Total Module Duration
                            </Typography>
                        </Grid>

                        <Grid item xs={12} md={4} sm={4} lg={2} >
                            <TextField style={{ width: "10ch" }} />
                        </Grid>
                        <Grid item xs={12} md={2} sm={2} lg={2} >
                            <TextField style={{ width: "10ch", }} />
                        </Grid>
                        <Grid item xs={12} md={4} sm={4} lg={2} >
                            <TextField style={{ width: "10ch", }} />
                        </Grid>
                    </Grid><hr></hr>
                    <Grid container spacing={2}>
                        <Grid item xs={12} md={4} sm={4} lg={4}  >
                            <Typography variant="h5">
                                What Will your learn?
                            </Typography>
                        </Grid>
                        <Grid item xs={12} md={4} sm={4} lg={4} >
                            <TextField style={{ width: "45ch", }} />
                        </Grid>
                    </Grid><hr></hr>
                    <Grid container spacing={2}>
                        <Grid item xs={12} md={4} sm={4} lg={4}  >
                            <Typography variant="h5">
                                Prerequisites
                            </Typography>
                        </Grid>
                        <Grid item xs={12} md={4} sm={4} lg={4} >
                            <TextField style={{ width: "45ch", }} />
                        </Grid>
                    </Grid><hr></hr>
                </Card>
            </Grid>

            <Grid xs={12} md={4}>
                <Card>
                    <Grid >
                        <Typography>
                            <Card sx={{ p: 9 }}
                                wrapperSx={{ backgroundColor: 'background.paper' }}
                            >
                                <Typography variant={"h4"}>
                                    Module Thumbnail
                                </Typography>
                            </Card>
                            <Grid sx={{ mt: 2, float: 'right', alignItems: 'right', }}
                            >
                                <Stack direction="row" alignItems="center" spacing={2}>
                                    <Button variant="contained" component="label">
                                        Upload image
                                        <input hidden accept="image/*" multiple type="file" />
                                    </Button>
                                </Stack>
                            </Grid>
                        </Typography>

                        <TableContainer>
                            <Table>
                                <TableHead>
                                    <TableRow>
                                        <TableCell>
                                            <TableCell>Calories</TableCell>
                                            <TableCell>Calories</TableCell>
                                            <TableCell>Calories</TableCell>
                                            <TableCell>Calories</TableCell>
                                            <TableCell>Calories</TableCell>
                                            <TableCell>Calories</TableCell>
                                        </TableCell>
                                    </TableRow>
                                </TableHead>
                            </Table>
                        </TableContainer>
                    </Grid>
                </Card>
            </Grid>
        </Grid>
    );
};
export default AdditionalData