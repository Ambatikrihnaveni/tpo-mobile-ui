import React, { useState } from 'react';
import { arrayMove, SortableContainer } from 'react-sortable-hoc';
import Div from '../../../../../../client/ui/@jumbo/shared/Div';
import 'react-toastify/dist/ReactToastify.css';
import LessonListCell from './lessonListCell';

const Lessons = SortableContainer(({ lessons }) => {
   ;

    return (
        <Div>
            {lessons?.map((lesson, index) => (
                <LessonListCell key={index} index={index} lesson={lesson}/>
            ))}
            
           
        </Div>
    );
});

const LessonList = ({ lessons,onDragandDropLesson,productId }) => {
 
const [lessonsList,setLessonList]= useState(lessons);

React.useEffect(()=>{
    setLessonList(lessons)
},[lessons])

    const onSortEnd = ({ oldIndex, newIndex }) => {
        setLessonList(arrayMove(lessonsList, oldIndex, newIndex));
        onDragandDropLesson(productId,oldIndex,newIndex)
    };

    return (
        <Div>
            <Lessons lessons={lessonsList} onSortEnd={onSortEnd} useDragHandle={true} />
        </Div>
    );
};

export default LessonList;