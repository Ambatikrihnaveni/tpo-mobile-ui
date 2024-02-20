import gql from "graphql-tag";

export default gql`
query studentTodaySchedule($query: String) {
    studentTodaySchedule(query: $query) {
        _id
        name
        lessonsDuration{
            lesson{
                name
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