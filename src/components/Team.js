// src/components/Team.js
import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';

const teamMembers = [
  {
    name: 'Harshita',
    photo: '/images/Harshita.jpg',
  },
  {
    name: 'Ashish Kumar Singh',
    photo: '/images/Ashish.jpg',
  },
  {
    name: 'Thavanila N',
    photo: '/images/Thavanila.jpg',
  },
  {
    name: 'Arun Gautam',
    photo: '/images/Arun.jpg',
  },
    {
      name: 'Murali Javvadi ',
      photo: '/images/Murali.jpg',
    },
     {
       name: 'Raghavendra M S',
       photo: '/images/Raghav.jpg',
     },
];

const Team = () => {
  return (
    <div className="container text-center py-5">
      <h1>Our Team</h1>
      <div className="row">
        {teamMembers.map((member, index) => (
          <div className="col-md-3 mb-4" key={index}>
            <div className="card">
              <img src={member.photo} className="card-img-top" alt={member.name} />
              <div className="card-body">
                <h5 className="card-title">{member.name}</h5>
                <p className="card-text">{member.role}</p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Team;





