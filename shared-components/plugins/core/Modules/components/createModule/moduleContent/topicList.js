import React, { useState } from 'react';
import { arrayMove, SortableContainer } from 'react-sortable-hoc';
import Div from '../../../../../../client/ui/@jumbo/shared/Div';
import 'react-toastify/dist/ReactToastify.css';
import TopicListCell from './topicListCell';

const Topics = SortableContainer(({ topics, onTopicDelete, topicEdit }) => {
    ;

    return (
        <Div>
            {topics?.map((topic, index) => (
                <TopicListCell key={index} index={index} topic={topic} topicEdit={topicEdit} onTopicDelete={onTopicDelete} />
            ))}
        </Div>
    );
});

const TopicList = ({ topics, onTopicDelete, topicEdit, onDragAndDrop, lessonId }) => {

    const [topicsList, setTopicsList] = useState(topics);

    React.useEffect(() => {
        setTopicsList(topics)
    }, [topics])

    const onSortEnd = ({ oldIndex, newIndex }) => {
        setTopicsList(arrayMove(topicsList, oldIndex, newIndex));
        onDragAndDrop(lessonId, oldIndex, newIndex)
    };

    return (
        <Div>
            <Topics topics={topicsList} onSortEnd={onSortEnd} useDragHandle={true} topicEdit={topicEdit} onTopicDelete={onTopicDelete} />
        </Div>
    );
};

export default TopicList;