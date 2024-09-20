import { useState, useEffect, useContext } from "react";
import useAuth from "../../hooks/useAuth";
import "./style.css";
import Card from "../../components/card";

const CohortViewStudent = () => {
  const { token, user } = useAuth();
  const apiUrl = process.env.REACT_APP_API_URL;

  const [cohort, setCohort] = useState(null);
  const [teachers, setTeachers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [grades, setGrades] = useState(null);
  const [completion, setCompletion] = useState(null);

  //function to calculate completion for user's grades
  function calculateCompletion(data) {
    let result = {
      modules: { total: 0, completed: 0 },
      units: { total: 0, completed: 0 },
      exercises: { total: 0, completed: 0 },
    };

    data.grades.forEach((module) => {
      result.modules.total += 1;
      let moduleCompleted = true;

      module.units.forEach((unit) => {
        result.units.total += 1;
        let unitCompleted = true;

        unit.exercises.forEach((exercise) => {
          result.exercises.total += 1;

          if (exercise.grade >= 70) {
            result.exercises.completed += 1;
          } else {
            unitCompleted = false;
            moduleCompleted = false;
          }
        });

        if (unitCompleted) {
          result.units.completed += 1;
        }
      });

      if (moduleCompleted) {
        result.modules.completed += 1;
      }
    });

    return result;
  }

  // useEffect to load required page data
  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);

        // Fetch cohort information
        const cohortResponse = await fetch(`${apiUrl}/cohorts/1`, {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        });
        const cohortData = await cohortResponse.json();
        setCohort(cohortData.data);

        // Fetch list of teachers
        const usersResponse = await fetch(`${apiUrl}/users`, {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        });
        const usersData = await usersResponse.json();

        const teacherList = usersData.data.users
          .filter((userObj) => userObj.user.role === "TEACHER")
          .map((userObj) => userObj.user);
        setTeachers(teacherList);

        // Fetch grades and calculate completion
        const gradesResponse = await fetch(
          `${apiUrl}/users/${user.id}/completion`,
          {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${token}`,
            },
          }
        );
        const gradesData = await gradesResponse.json();
        setGrades(gradesData);
        setCompletion(calculateCompletion(gradesData));
      } catch (error) {
        console.error("Error fetching data:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [apiUrl, token, user]);

  return (
    <div id="cohort-page-container">
      <div className="cohort-section">
        <Card>
          <h3>My Cohort</h3>
          <div className="cohort-section-header">
            <div className="profile-icon">
              <p className="icon-text">&lt; &gt;</p>
            </div>
            <div className="cohort-header-container">
              <h4 className="cohort-name">Cohort Name</h4>
              <p className="cohort-dates">Cohort Dates</p>
            </div>
          </div>
          <ul className="cohort-details">
            {loading ? (
              <li>
                <p>Loading...</p>
              </li>
            ) : (
              cohort?.users.map((user) => (
                <li key={user.id} className="user-card">
                  <div className="profile-icon">
                    <p>JB</p>
                  </div>
                  <p className="bold-text">User Name</p>
                </li>
              ))
            )}
            <li className="user-card">
              <div className="profile-icon">
                <p>AB</p>
              </div>
              <p className="bold-text">User Name</p>
            </li>
            <li className="user-card">
              <div className="profile-icon">
                <p>AB</p>
              </div>
              <p className="bold-text">User Name</p>
            </li>
            <li className="user-card">
              <div className="profile-icon">
                <p>AB</p>
              </div>
              <p className="bold-text">User Name</p>
            </li>
          </ul>
        </Card>
      </div>
      <div className="right-side-container">
        <div className="teachers-section">
          <Card>
            <h3>Teachers</h3>
            <ul className="teachers-details">
              {loading ? (
                <li>
                  <p>Loading...</p>
                </li>
              ) : (
                teachers.map((teacher) => (
                  <li key={teacher.id} className="user-card">
                    <div className="profile-icon">
                      <p>{`${teacher.firstName[0]}${teacher.lastName[0]}`}</p>
                    </div>
                    <div className="teacher-name-and-specialism">
                      <p className="bold-text">{`${teacher.firstName} ${teacher.lastName}`}</p>
                      <p className="light-text">
                        {teacher.specialism ? teacher.specialism : "General"}
                      </p>
                    </div>
                  </li>
                ))
              )}
            </ul>
          </Card>
        </div>
        <div className="exercises-section">
          <Card>
            <h3>My Exercises</h3>
            {completion ? (
              <div className="exercise-details-container light-text">
                <p className="aligned-left">Modules:</p>
                <p className="aligned-right">
                  {`${completion.modules.completed}/${completion.modules.total} completed`}
                </p>
                <p className="aligned-left">Units:</p>
                <p className="aligned-right">
                  {`${completion.units.completed}/${completion.units.total} completed`}
                </p>
                <p className="aligned-left">Exercises:</p>
                <p className="aligned-right">
                  {`${completion.exercises.completed}/${completion.exercises.total} completed`}
                </p>
              </div>
            ) : (
              <p>Loading exercise data...</p>
            )}
          </Card>
        </div>
      </div>
    </div>
  );
};

export default CohortViewStudent;
