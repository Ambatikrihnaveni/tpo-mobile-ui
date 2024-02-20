import gql from "graphql-tag";

export default gql`
query studentTodaysClass($query: String) {
    studentTodaysClass(query: $query) {
        _id
        name
        isCourseComplete
        lessonsDuration{
            lessonScheduleDate
            lesson{
                productId
                _id
                name
                scheduleDate
                quizScore
                passedQuizzes
                submittedDate
                quizStatus
                quizs{
                    quiz_title
                    quiz_question
                    quiz_options{
                        optionA
                        optionB
                        optionC
                        optionD
                    }
                    quiz_answer
                }
                assignments{
                    _id

                    assignment_title
                
                    summary
                
                    time_limit
                
                    time_limit_type
                
                    total_points
                
                    min_pass_points
                
                    productId
                
                    lessonId
                
                    shopId
                
                    createdAt
                
                    createdBy
                }

                assignmentResult{
                    submitted
                    submittedAt
                    marks
                    assignmentId
                    answer
                }
            }
        }
        program {
            _id
            name
            account{
                _id
                name
            }
        }
        batchStartTime
        batchEndTime
    }
}
`