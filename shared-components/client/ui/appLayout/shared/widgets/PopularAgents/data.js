import {ASSET_AVATARS} from "../../../utils/constants/paths";
import {getAssetPath} from "../../../utils/appHelpers";

export const agents = [
    {
        id: 1,
        avatar: getAssetPath(`${ASSET_AVATARS}/avatar10.jpg`, `60x60`),
        title: "Albert Hall",
        rating: "(3.50)",
        desc: "23 deals",
        studentCount:"1230 students"
    },
    {
        id: 2,
        avatar: getAssetPath(`${ASSET_AVATARS}/avatar6.jpg`, `60x60`),
        title: "John Hall",
        rating: "(4.20)",
        desc: "23 deals",
        studentCount:"1544 students"
    },
    {
        id: 3,
        avatar: getAssetPath(`${ASSET_AVATARS}/avatar3.jpg`, `60x60`),
        title: "Jackson Hall",
        rating: "(4.40)",
        desc: "23 deals",
        studentCount:"4230 students"
    },
    {
        id: 4,
        avatar: getAssetPath(`${ASSET_AVATARS}/avatar7.jpg`, `60x60`),
        title: "Jonty Hall",
        rating: "(4.50)",
        desc: "23 deals",
        studentCount:"954 students"
    },
    {
        id: 5,
        avatar: getAssetPath(`${ASSET_AVATARS}/avatar10.jpg`, `60x60`),
        title: "Albert Hall",
        rating: "(4.60)",
        desc: "23 deals",
        studentCount:"1230 students"
    },
    {
        id: 6,
        avatar: getAssetPath(`${ASSET_AVATARS}/avatar6.jpg`, `60x60`),
        title: "John Hall",
        rating: "(5.00)",
        desc: "23 deals",
        studentCount:"1544 students"
    },

];
