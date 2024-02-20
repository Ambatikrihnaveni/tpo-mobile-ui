import React, { useCallback, useState } from 'react';
import { Button } from "@mui/material";
import { useNavigate } from "react-router-dom";
import AddIcon from '@mui/icons-material/Add';
import Div from "@jumbo/shared/Div";
import TaskIcon from '@mui/icons-material/Task';
import { useMutation } from "@apollo/react-hooks";
import JumboDdPopover from "@jumbo/components/JumboDdPopover";
import { ThemeProvider } from "@mui/material";
import useJumboTheme from "@jumbo/hooks/useJumboTheme";
import createProductMutation from '../../../../../../client/ui/graphql/services/modules/mutations/createProduct';
import createLessonMutation from "../../../../../../client/ui/graphql/services/modules/mutations/createLesson"
import EngineeringIcon from '@mui/icons-material/Engineering';

const CreateBtn = (props) => {
    const { shopId } = props
    const [showSettings, setShowSettings] = useState(false);
    const { theme } = useJumboTheme();
    const navigate = useNavigate();
    const [createLesson, { error: createLessonError }] = useMutation(createLessonMutation);
    const [createProduct, { error: createProductError }] = useMutation(createProductMutation);
    const [anchorEl, setAnchorEl] = React.useState(null);
    const isOpen = Boolean(anchorEl);

    const handleClick = React.useCallback((event) => {
        setAnchorEl(event.currentTarget);
    }, []);

    const handleClose = React.useCallback(() => {
        setAnchorEl(null);
    }, []);

    const toggleSettingWindow = useCallback(() => {
        setShowSettings(showSettings => !showSettings);
    }, [setShowSettings]);


    const onManualCreate = async () => {

        const { data } = await createProduct({ variables: { input: { shopId } } });
        if (data) {
            const { createProduct: { product } } = data;
            navigate(`/modules/${product._id}/addmodule/manualcreate`);
        }

        if (createProductError) {
            enqueueSnackbar(i18next.t("admin.productTable.bulkActions.error", { variant: "error" }));
        }
    }

    const onAiCreate = async () => {
        const { data } = await createProduct({ variables: { input: { shopId } } });
        if (data) {
            const { createProduct: { product } } = data;
            navigate(`/modules/${product._id}/addmodule/aicreate`);
        }

        if (createProductError) {
            enqueueSnackbar(i18next.t("admin.productTable.bulkActions.error", { variant: "error" }));
        }
    }



    return (
        <ThemeProvider theme={theme}>
            <JumboDdPopover
                triggerButton={<Button variant="contained" sx={{ textTransform: 'none' }}><AddIcon /> Create</Button>}
                disableInsideClick
                anchorEl={anchorEl}
                isOpen={isOpen}
                handleClick={handleClick}
                handleClose={handleClose}
            >

                <Div sx={{ width: 260, maxWidth: '100%', padding: 2 }}>
                    <Button sx={{ mb: 1, textTransform: 'none', fontSize: "18px" }} onClick={onAiCreate} startIcon={<TaskIcon />} >Create with AI </Button>
                    <Button sx={{ mb: 1, textTransform: 'none', fontSize: "18px" }} onClick={onManualCreate} startIcon={<EngineeringIcon />} > Manual Create</Button>
                </Div>

            </JumboDdPopover>
        </ThemeProvider>
    );
};


export default CreateBtn;
