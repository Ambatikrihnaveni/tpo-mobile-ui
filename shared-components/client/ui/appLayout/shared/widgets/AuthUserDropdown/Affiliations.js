import React, { useState, useEffect } from 'react'
import { useRef } from 'react';
import Container from '@mui/material/Container';
import Div from "@jumbo/shared/Div";
import SearchIcon from "@mui/icons-material/Search";
import styled from 'styled-components';
import Divider from "@mui/material/Divider";
import { Form, Formik, Field, ErrorMessage, FieldArray } from "formik";
import { useQuill } from 'react-quilljs';
import 'quill/dist/quill.snow.css';
import { Grid, Typography } from '@mui/material'
import JumboScrollbar from "@jumbo/components/JumboScrollbar";
import JumboCardQuick from "@jumbo/components/JumboCardQuick";
import { useTranslation } from "react-i18next";
import { Button } from "@mui/material";
import Quill from 'quill';

const SearchWrapper = styled.div`
  display: flex;
  align-items: center;
`;
const StyledInputBase = styled.input`
  padding: 10px;
  border: 1px solid gray;
  border-radius: 4px;
  outline: none;
  width: 400px; /* Adjust the width as per your requirement */
  background-color: white;
`;

const SearchButton = styled.button`
  background-color: lightblue;
  border: none;
  cursor: pointer;
  padding: 8px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: background-color 0.3s ease;
  &:hover {
    background-color: skyblue;
  }
`;
const EditorContainer = styled.div`
  width: 500px;
  height: 400px;
  border: 1px solid gray;
  border-radius: 15px;

  .ql-toolbar .ql-fill,
  .ql-toolbar .ql-stroke {
    fill: #0058ac !important;
    color: #0058ac !important;
  }
`;
const SearchIconStyled = styled(SearchIcon)`
  color: #0058ac;
`;
const initialAffiliations = [
  'American Society of Safety Professionals',
  'International Council of Nurses',
  'Jaycees',
  'Society of Women Engineers',
  'Rotary International'
];

export default function Affiliations({ scrollHeight }) {

  const { t } = useTranslation();
  const { quill } = useQuill();
  const [searchTerm, setSearchTerm] = useState('');
  const quillRef = useRef(null);
  const [filteredAffiliations, setFilteredAffiliations] = useState([]);
  const [selectedAffiliations, setSelectedAffiliations] = useState([]);

  const addAffiliations = (affiliations) => {
    if (!selectedAffiliations.includes(affiliations)) {
      setSelectedAffiliations([...selectedAffiliations, affiliations]);
    }
  };

  const handleSearch = (event) => {
    event.preventDefault();
    // Replace `predefinedData` with the actual data object containing the predefined skills
    const predefinedData = {
      'Frontend developer': ['Achieved [Result] through effectively helping with [Task]', 'Achieved [Result] by introducing [Software] for [Type] tasks.', 'Supervised team of [Number] staff members.', 'Collaborated with team of [Number] in the development of [Project name].', 'Used Microsoft Excel to develop inventory tracking spreadsheets.'],

    };
    const filteredAffiliations = predefinedData[searchTerm] || [];
    setFilteredAffiliations(filteredAffiliations);
  };


  useEffect(() => {
    if (quillRef.current) {
      const quill = new Quill(quillRef.current, {
      });
      const listContent = selectedAffiliations?.map((affiliations) => `<li style={{color:'red'}}>${affiliations}</li>`).join('');
      quill.clipboard.dangerouslyPasteHTML(`<ul >${listContent}</ul>`);
    }
  }, [selectedAffiliations]);
  const handleChange1 = (event) => {
    setSearchTerm(event.target.value)
  };
  const showInitialAffiliations = searchTerm === '';

  return (
    <Formik initialValues={{}} onSubmit={(values, { setSubmitting }) => {
      setSubmitting(false);
    }}
    >
      <Form>
        <Div style={{ margin: '50px ', }}>
          <br />
          <br />
          <Grid container spacing={1}>
            <Grid item xs={12} sm={6} md={6}>
              <Container>
                <Div sx={{ bgcolor: '#f6f5f0', height: '100vh', borderRadius: '10px', width: '90%' }}>
                  <br />
                  <h4 style={{ color: '#475259', marginLeft: '30px', }}>SEARCH BY JOB TITLE FOR PRE-WRITTEN EXAMPLES</h4>
                  <br />
                  <SearchWrapper style={{ marginLeft: '30px' }}>
                    <StyledInputBase
                      placeholder="Search by job title"
                      aria-label="search"
                      value={searchTerm}
                      onChange={handleChange1}
                      style={{ marginRight: '10px' }}
                    />
                    <SearchButton onClick={handleSearch}>
                      <SearchIcon />
                    </SearchButton>
                  </SearchWrapper>
                  <br />
                  <Divider style={{ color: 'black' }} />
                  <Div style={{ marginLeft: '10px' }}>
                    <Typography variant="h4" style={{ padding: '5px', margin: '10px', color: '#3c5769', fontSize: "smaller" }}>Popular Job Titles</Typography>
                    <Grid container >
                      <Grid style={{ padding: '5px 10px' }}>
                        <Typography style={{ color: '#50C2C9', fontSize: "smaller" }}> <SearchIcon style={{ marginBottom: '-8px', color: '#50C2C9' }} />Frontend developer</Typography>
                      </Grid>
                      <Grid style={{ padding: '5px 10px' }}>

                        <Typography style={{ color: '#50C2C9', fontSize: "smaller" }}> <SearchIcon style={{ marginBottom: '-8px', color: '#50C2C9' }} />Backenddeveloper</Typography>
                      </Grid>
                      <Grid style={{ padding: '5px 10px' }}>

                        <Typography style={{ color: '#50C2C9', fontSize: "smaller" }}> <SearchIcon style={{ marginBottom: '-8px', color: '#50C2C9' }} />Software tester</Typography>
                      </Grid>
                      <Grid style={{ padding: '5px 10px' }}>
                        <Typography style={{ color: '#50C2C9', fontSize: "smaller" }}><SearchIcon style={{ marginBottom: '-8px', color: '#50C2C9' }} />Mern stack developer</Typography>
                      </Grid>
                    </Grid>
                  </Div>
                  <JumboCardQuick
                    wrapperSx={{ p: 0 }}
                    style={{ border: '1px solid gray', margin: '20px' }}
                  >
                    <p style={{ color: '#475259', margin: '15px' }}>{t("Showing results for " + " " + searchTerm)}</p>
                    <Divider style={{ color: 'black' }} />
                    <JumboScrollbar
                      autoHeight
                      autoHeightMin={scrollHeight ? scrollHeight : 480}
                      autoHide
                      autoHideDuration={200}
                      autoHideTimeout={500}
                    >
                      {filteredAffiliations?.length > 0 ? (
                        <div style={{ backgroundColor: 'white' }}>
                          <ul style={{ marginLeft: '2px', listStyleType: 'none' }}>
                            {filteredAffiliations?.map((affiliations, index) => (
                              <React.Fragment key={index}>
                                <li style={{ margin: '20px' }}>
                                  <button style={{ border: 'none', background: '#50C2C9', color: 'white', fontSize: '16px', fontWeight: 'bold', width: '40px', height: '30px', marginRight: '5px', borderRadius: '5px' }} onClick={() => addAffiliations(affiliations)} type="button">Add</button>
                                  <button style={{ border: 'none', background: 'white', fontSize: '16px', color: '#475259' }} >{affiliations}</button>
                                </li>
                                {index !== filteredAffiliations?.length - 1 && <Divider style={{ backgroundColor: 'black' }} />}
                              </React.Fragment>
                            ))}
                          </ul>
                        </div>
                      ) : (
                        (filteredAffiliations?.length === 0 && searchTerm !== '') && <p>No Affiliations found</p>
                      )}
                      {showInitialAffiliations && (
                        <div style={{ backgroundColor: 'white' }}>
                          <ul style={{ marginLeft: '2px', listStyleType: 'none' }}>
                            {initialAffiliations.map((affiliations, index) => (
                              <React.Fragment key={index}>
                                <li style={{ margin: '20px' }}>
                                  <button style={{ border: 'none', background: ' #50C2C9', color: 'white', fontSize: '16px', fontWeight: 'bold', width: '40px', height: '30px', marginRight: '10px', borderRadius: '5px' }} onClick={() => addAffiliations(affiliations)} type="button">Add</button>
                                  <button style={{ border: 'none', background: 'white', fontSize: '16px', color: '#475259' }} >{affiliations}</button>
                                </li>
                                {index !== initialAffiliations.length - 1 && <Divider style={{ backgroundColor: 'black' }} />}
                              </React.Fragment>

                            ))}
                          </ul>
                        </div>
                      )}
                    </JumboScrollbar>
                  </JumboCardQuick>
                </Div>
              </Container>
            </Grid>
            <Grid item xs={12} sm={6}>
              <h4 style={{ color: '#475259', }}>Tell us about your Affiliations</h4>
              <div style={{ width: '70%', height: 400, border: '1px solid gray', borderRadius: '15px' }}>
                <div ref={quillRef} style={{ border: 'none' }}>
                </div>
              </div>


            </Grid>
          </Grid>
        </Div >
      </Form>
    </Formik>
  )
}