// src/components/ContactUs.js
import React from 'react';

const ContactUs = () => {
  return (
    <div className="container py-5">
      <h1>Contact Us</h1>
      <div className="table-responsive">
        <table className="table borderless">
          <tbody>
            <tr>
              <th className="font-weight-bold">Team Member</th>
              <th className="font-weight-bold">Email</th>
            </tr>
            <tr>
              <td>Ashish Kumar Singh</td>
              <td>elevateu.anz@gmail.com</td>
            </tr>
            <tr>
              <td>Harshita</td>
              <td>harshita27012000@gmail.com</td>
            </tr>
            <tr>
              <td>Arun Gautam</td>
              <td>linktoarun@gmail.com</td>
            </tr>
            <tr>
              <td>Murali Javvadi</td>
              <td>muralijavvadi@gmail.com</td>
            </tr>
            <tr>
              <td>Thavanila N</td>
              <td>thavanila1997@gmail.com</td>
            </tr>
            <tr>
              <td>Raghavendra M S</td>
              <td>msraghaven@gmail.com</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ContactUs;

