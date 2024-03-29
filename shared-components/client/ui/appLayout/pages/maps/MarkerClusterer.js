import React from 'react';
import fetch from 'isomorphic-fetch';
import Typography from "@mui/material/Typography";
import {GoogleMap, Marker, MarkerClusterer, useLoadScript,} from "@react-google-maps/api";
import JumboCardQuick from "@jumbo/components/JumboCardQuick";
import JumboDemoCard from "@jumbo/components/JumboDemoCard";
import {useTranslation} from "react-i18next";

const MarkClustererExampleMap = () => {
    const [markers, setMarkers] = React.useState([]);
    const {isLoaded} = useLoadScript({
        googleMapsApiKey: "AIzaSyCJM0a8oSaRMwxthozENQg1euRI51aNXJQ",
    });

    React.useEffect(() => {
        const mapApiUrl = `https://gist.githubusercontent.com/farrrr/dfda7dd7fccfec5474d3/raw/758852bbc1979f6c4522ab4e92d1c92cba8fb0dc/data.json`;
        const abortController = new AbortController();

        fetch(mapApiUrl, {signal: abortController.signal})
            .then(res => res.json())
            .then(data => {
                setMarkers(data.photos);
            });
        return () => {
            abortController.abort();
        }
    }, []);

    return (
        <React.Fragment>
            {
                isLoaded &&
                <GoogleMap
                    mapContainerStyle={{width: '100%', height: "400px"}}
                    center={{lat: 25.0391667, lng: 121.525}}
                    zoom={3}
                >
                    <MarkerClusterer
                        enableRetinaIcons
                        averageCenter
                        gridSize={60}
                    >
                        {(clusterer) =>
                            markers.map(marker => (
                                <Marker
                                    position={{lat: marker.latitude, lng: marker.longitude}}
                                    key={marker.photo_id}
                                    clusterer={clusterer}
                                />
                            ))
                        }
                    </MarkerClusterer>
                </GoogleMap>
            }
        </React.Fragment>
    )

}
const MarkerClustererExample = ({isExample}) => {
    const {t} = useTranslation();
    if (!isExample)
        return (
            <JumboCardQuick noWrapper>
                <MarkClustererExampleMap/>
            </JumboCardQuick>
        );
    return (
        <React.Fragment>
            <Typography variant={"h1"} mb={3}>{t('pages.title.mapMarkerCluster')}</Typography>
            <JumboDemoCard  wrapperSx={{pt: 0, backgroundColor: 'background.paper'}}>
                <MarkClustererExampleMap/>
            </JumboDemoCard>
        </React.Fragment>
    );
};

MarkerClustererExample.defaultProps = {
    isExample: true
};

export default MarkerClustererExample;
