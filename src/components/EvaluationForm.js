  import React, { useState } from 'react';
  import './EvaluationForm.css';

  const EvaluationForm = () => {
    
    const [evaluations, setEvaluations] = useState([
      { id: 1, characteristic: 'Knowledge of the Subject', rating: '', marks: '' },
      { id: 2, characteristic: 'Coming well prepared for the Class', rating: '', marks: '' },
      { id: 3, characteristic: 'Giving Clear Explanations', rating: '', marks: '' },
      { id: 4, characteristic: 'Command of Language', rating: '', marks: '' },
      { id: 5, characteristic: 'Clear and Audible Voice', rating: '', marks: '' },
      { id: 6, characteristic: 'Holding the attention of students through the Class', rating: '', marks: '' },
      { id: 7, characteristic: 'Providing more matter than in the Text Book', rating: '', marks: '' },
      { id: 8, characteristic: 'Capability to clear the doubts of Students', rating: '', marks: '' },
      { id: 9, characteristic: 'Encouraging students to ask questions and participate in  Discussions', rating: '', marks: '' },
      { id: 10, characteristic: 'Appreciating students as and when deserving', rating: '', marks: '' },
      { id: 11, characteristic: 'Willingness to help students even out of Class', rating: '', marks: '' },
      { id: 12, characteristic: 'Return of valued Test Papers / Records in Time', rating: '', marks: '' },
      { id: 13, characteristic: 'Punctuality and following Time Table Schedule', rating: '', marks: '' },
      { id: 14, characteristic: 'Coverage of Syllabus', rating: '', marks: '' },
      { id: 15, characteristic: 'Impartial (Treating all students alike)', rating: '', marks: '' },
    ]);
    
    const handleRatingChange = (id, newRating) => {
      const updatedEvaluations = evaluations.map(evaluation => {
        if (evaluation.id === id) {
          return { ...evaluation, rating: newRating };
        }
        return evaluation;
      });

      setEvaluations(updatedEvaluations);
    };

    const handleMarksChange = (id, newMarks) => {
      if (!isNaN(newMarks) && newMarks >= 0 && newMarks <= 5) {
        const updatedEvaluations = evaluations.map(evaluation => {
          if (evaluation.id === id) {
            return { ...evaluation, marks: newMarks };
          }
          return evaluation;
        });

        setEvaluations(updatedEvaluations);
      }
    };

    return (
      <div className="evaluation-form">
        <table>
          <thead>
            <tr>
              <th>Sl. No.</th>
              <th>Characteristics</th>
              <th>Very Good</th>
              <th>Good</th>
              <th>Average</th>
              <th>Below Average</th>
              <th>Poor</th>
              <th>Marks (0-5)</th>
            </tr>
          </thead>
          <tbody>
            {evaluations.map(evaluation => (
              <tr key={evaluation.id}>
                <td>{evaluation.id}</td>
                <td>{evaluation.characteristic}</td>
                <td>
                  <input
                    type="radio"
                    name={`rating-${evaluation.id}`}
                    value={evaluation.rating}
                    checked={evaluation.rating === 'Very Good'}
                    onChange={() => handleRatingChange(evaluation.id, 'Very Good')}
                  />
                </td>
                <td>
                  <input
                    type="radio"
                    name={`rating-${evaluation.id}`}
                    value="Good"
                    checked={evaluation.rating === 'Good'}
                    onChange={() => handleRatingChange(evaluation.id, 'Good')}
                  />
                </td>
                <td>
                  <input
                    type="radio"
                    name={`rating-${evaluation.id}`}
                    value="Average"
                    checked={evaluation.rating === 'Average'}
                    onChange={() => handleRatingChange(evaluation.id, 'Average')}
                  />
                </td>
                <td>
                  <input
                    type="radio"
                    name={`rating-${evaluation.id}`}
                    value="Below Average"
                    checked={evaluation.rating === 'Below Average'}
                    onChange={() => handleRatingChange(evaluation.id, 'Below Average')}
                  />
                </td>
                <td>
                  <input
                    type="radio"
                    name={`rating-${evaluation.id}`}
                    value="Poor"
                    checked={evaluation.rating === 'Poor'}
                    onChange={() => handleRatingChange(evaluation.id, 'Poor')}
                  />
                </td>
                <td>
                  <input
                    type="text"
                    value={evaluation.marks}
                    onChange={e => handleMarksChange(evaluation.id, e.target.value)}
                  />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    );
  };

  
  
  // export { evaluations };

  export default EvaluationForm;
