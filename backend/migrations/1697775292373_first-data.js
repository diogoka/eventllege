/* eslint-disable camelcase */

exports.shorthands = undefined;

exports.up = async (pgm) => {
  pgm.sql(`
        INSERT INTO users_type (role_user) VALUES ('organizer');
        INSERT INTO users_type (role_user) VALUES ('student');
        INSERT INTO users_type (role_user) VALUES ('admin');
    `);

  const usersData = [
    {
      id_user: 'dYcwyptf86XjtaVf5NtKF9iH0Fz1',
      id_user_type: 1,
      first_name_user: 'Hannah Abbott',
      last_name_user: 'lastName',
      email_user: 'hannah.abbott@gmail.com',
      postal_code_user: 'V5K2X1',
      phone_user: '123-456-7890',
    },
    {
      id_user: 't2aZqoHmdsQtRbYfp0TR6dI08q43',
      id_user_type: 1,
      first_name_user: 'Bathilda Bagshot',
      last_name_user: 'lastName',
      email_user: 'bathilda.bagshot@gmail.com',
      postal_code_user: 'V5K2X1',
      phone_user: '123-456-7890',
    },
    {
      id_user: 'XV9Z4l0wMYaLLtyRbwMfb2sbW2g2',
      id_user_type: 1,
      first_name_user: 'Katie Bell',
      last_name_user: 'lastName',
      email_user: 'katie.bell@gmail.com',
      postal_code_user: 'V5K2X1',
      phone_user: '123-456-7890',
    },
    {
      id_user: '2ek278A9t3c8iOzJ81sd4vS17hl2',
      id_user_type: 1,
      first_name_user: 'Cuthbert Binns',
      last_name_user: 'lastName',
      email_user: 'cuthbert.binns@gmail.com',
      postal_code_user: 'V5K2X1',
      phone_user: '123-456-7890',
    },
    {
      id_user: 'Qtqd29YdOVWOYrKJXHu58kGCjjn1',
      id_user_type: 1,
      first_name_user: 'Phineas Nigellus',
      last_name_user: 'lastName',
      email_user: 'phineas.nigellus@gmail.com',
      postal_code_user: 'V5K2X1',
      phone_user: '123-456-7890',
    },
    {
      id_user: '62UDtCUi4FgFqeyDOfyrnZTSgGD2',
      id_user_type: 1,
      first_name_user: 'Sirius Black',
      last_name_user: 'lastName',
      email_user: 'sirius.black@gmail.com',
      postal_code_user: 'sirius.black@gmail.com',
      phone_user: '123-456-7890',
    },
    {
      id_user: 'qF6KDpmaBUgyyFcBPqw5cXVCP4f2',
      id_user_type: 2,
      first_name_user: 'Amelia Bones',
      last_name_user: 'lastName',
      email_user: 'amelia.bones@gmail.com',
      postal_code_user: 'V5K2X1',
      phone_user: '123-456-7890',
    },
    {
      id_user: '5XUb1fmI5VORuTiVFI4KjMdsq0s1',
      id_user_type: 2,
      first_name_user: 'Terry Boot',
      last_name_user: 'lastName',
      email_user: 'terry.boot@gmail.com',
      postal_code_user: 'V5K2X1',
      phone_user: '123-456-7890',
    },
    {
      id_user: 'IueNDcn3M9Uwf2rQvUncIAz5GI53',
      id_user_type: 2,
      first_name_user: 'Lavender Brown',
      last_name_user: 'lastName',
      email_user: 'lavender.brow@gmail.com',
      postal_code_user: 'V5K2X1',
      phone_user: '123-456-7890',
    },
    {
      id_user: 'ZcTbQOHgHjd4C5NRd2xayQTjnxH2',
      id_user_type: 2,
      first_name_user: 'Charity Burbage',
      last_name_user: 'lastName',
      email_user: 'charity.burbage@gmail.com',
      postal_code_user: 'V5K2X1',
      phone_user: '123-456-7890',
    },
    {
      id_user: 'LpYzcAxalOdUAiPAvjSkWYZynrW2',
      id_user_type: 2,
      first_name_user: 'Frank Bryce',
      last_name_user: 'lastName',
      email_user: 'frank.bryce@gmail.com',
      postal_code_user: 'V5K2X1',
      phone_user: '123-456-7890',
    },
    {
      id_user: 'mjPHwkQiWpeerSpdQTFb6taGhtJ3',
      id_user_type: 2,
      first_name_user: 'Alecto Carrow',
      last_name_user: 'lastName',
      email_user: 'alecto.carrow@gmail.com',
      postal_code_user: 'V5K2X1',
      phone_user: '123-456-7890',
    },
    {
      id_user: '5yDFGlMhRkVpOli88hkrUuB9rT02',
      id_user_type: 2,
      first_name_user: 'Amycus Carrow',
      last_name_user: 'lastName',
      email_user: 'amycus.carrow@gmail.com',
      postal_code_user: 'V5K2X1',
      phone_user: '123-456-7890',
    },
    {
      id_user: 'FWd5HFhLwqQ0kTiQtyZL1uKfmC42',
      id_user_type: 2,
      first_name_user: 'John Dawlish',
      last_name_user: 'lastName',
      email_user: 'john.dawlish@gmail.com',
      postal_code_user: 'V5K2X1',
      phone_user: '123-456-7890',
    },
    {
      id_user: 'efUQXwLszSW0pmy7Pc9xj2wmYQy1',
      id_user_type: 2,
      first_name_user: 'Fleur Delacour',
      last_name_user: 'lastName',
      email_user: 'fleur.delacour@gmail.com',
      postal_code_user: 'V5K2X1',
      phone_user: '123-456-7890',
    },
    {
      id_user: '38Y3pNidYySVu3Mnbr1bE0j8pmE2',
      id_user_type: 2,
      first_name_user: 'Marietta Edgecombe',
      last_name_user: 'lastName',
      email_user: 'marietta.edgecombe@gmail.com',
      postal_code_user: 'V5K2X1',
      phone_user: '123-456-7890',
    },
    {
      id_user: 'LuOmfDHZOXQqZ9tmY1Vh6eSoxkW2',
      id_user_type: 2,
      first_name_user: 'Arabella Figg',
      last_name_user: 'lastName',
      email_user: 'arabella.figg@gmail.com',
      postal_code_user: 'V5K2X1',
      phone_user: '123-456-7890',
    },
    {
      id_user: '4OLXHwPmYrW8QLllteWgRHAvRLf1',
      id_user_type: 2,
      first_name_user: 'Cornelius Fudge',
      last_name_user: 'lastName',
      email_user: 'cornelius.fudge@gmail.com',
      postal_code_user: 'V5K2X1',
      phone_user: '123-456-7890',
    },
    {
      id_user: 'ssPO91r1d2U3hBfKxBnqDylXEaq2',
      id_user_type: 2,
      first_name_user: 'Gregory Goyle',
      last_name_user: 'lastName',
      email_user: 'gregory.goyle@gmail.com',
      postal_code_user: 'V5K2X1',
      phone_user: '123-456-7890',
    },
    {
      id_user: '6dcX3QXJOVZS06IpcEdAl9bq3qk1',
      id_user_type: 2,
      first_name_user: 'Fenrir Greyback',
      last_name_user: 'lastName',
      email_user: 'fenrir.greyback@gmail.com',
      postal_code_user: 'V5K2X1',
      phone_user: '123-456-7890',
    },
    {
      id_user: '237GeIZsKrhsgCf7m3z7QWzSf872',
      id_user_type: 2,
      first_name_user: 'Rubeus Hagrid',
      last_name_user: 'lastName',
      email_user: 'rubeus.hagrid@gmail.com',
      postal_code_user: 'V5K2X1',
      phone_user: '123-456-7890',
    },
    {
      id_user: 'isrYIQyDKrP9tVPiyTHRz1oHCGQ2',
      id_user_type: 2,
      first_name_user: 'Mafalda Hopkirk',
      last_name_user: 'lastName',
      email_user: 'mafalda.hopkirk@gmail.com',
      postal_code_user: 'V5K2X1',
      phone_user: '123-456-7890',
    },
    {
      id_user: 'hXUewvFREwQ2RYLpmdVCyVFGSNw1',
      id_user_type: 2,
      first_name_user: 'Angelina Johnson',
      last_name_user: 'lastName',
      email_user: 'angelina.johnson@gmail.com',
      postal_code_user: 'V5K2X1',
      phone_user: '123-456-7890',
    },
    {
      id_user: 'dMm2Xd8FcoT1gl7cq9Hn0pI7NUH2',
      id_user_type: 2,
      first_name_user: 'Igor Karkaroff',
      last_name_user: 'lastName',
      email_user: 'igor.karkaroff@gmail.com',
      postal_code_user: 'V5K2X1',
      phone_user: '123-456-7890',
    },
    {
      id_user: 'kKdhxTqV2Bdy8TLYWQ04qFm7D2j1',
      id_user_type: 2,
      first_name_user: 'Silvanus Kettleburn',
      last_name_user: 'lastName',
      email_user: 'silvanus.kettleburn@gmail.com',
      postal_code_user: 'V5K2X1',
      phone_user: '123-456-7890',
    },
    {
      id_user: 'k14ukzruSWQJFkIyjxFZcMdOA3u1',
      id_user_type: 2,
      first_name_user: 'Luna Lovegood',
      last_name_user: 'lastName',
      email_user: 'luna.lovegood@gmail.com',
      postal_code_user: 'V5K2X1',
      phone_user: '123-456-7890',
    },
    {
      id_user: 'lB3hQ3fFkAOSxMLeHzZEk9tvHWC3',
      id_user_type: 2,
      first_name_user: 'Draco Malfoy',
      last_name_user: 'lastName',
      email_user: 'draco.malfoy@gmail.com',
      postal_code_user: 'V5K2X1',
      phone_user: '123-456-7890',
    },
    {
      id_user: '3eqO0wPZ22RtOXdQPBP53GyyzUm1',
      id_user_type: 2,
      first_name_user: 'Olympe Maxime',
      last_name_user: 'lastName',
      email_user: 'olympe.maxime@gmail.com',
      postal_code_user: 'V5K2X1',
      phone_user: '123-456-7890',
    },
    {
      id_user: '3zyuD87sh2d88QSivlzneLPO4bx2',
      id_user_type: 2,
      first_name_user: 'Padma Patil',
      last_name_user: 'lastName',
      email_user: 'padma.patil@gmail.com',
      postal_code_user: 'V5K2X1',
      phone_user: '123-456-7890',
    },
    {
      id_user: 'CLridLsKAmN72Ui2XEY5ignuPXI3',
      id_user_type: 2,
      first_name_user: 'Sturgis Podmore',
      last_name_user: 'lastName',
      email_user: 'sturgis.podmore@gmail.com',
      postal_code_user: 'V5K2X1',
      phone_user: '123-456-7890',
    },
    {
      id_user: 'fZhC84DlxsXGVQFOcJMRIMfWBl93',
      id_user_type: 2,
      first_name_user: 'Thomas Riddle',
      last_name_user: 'lastName',
      email_user: 'thomas.riddle@gmail.com',
      postal_code_user: 'V5K2X1',
      phone_user: '123-456-7890',
    },
  ];

  for (const user of usersData) {
    await pgm.sql(`
            INSERT INTO users (id_user, id_user_type, first_name_user, last_name_user, email_user, postal_code_user, phone_user)
            VALUES ('${user.id_user}', ${user.id_user_type}, '${user.first_name_user}', '${user.last_name_user.name_user}' ,'${user.email_user}', '${user.postal_code_user}', '${user.phone_user}');
        `);
  }


  const courses = [
    { name_course: 'English Languages Courses 1.0', category_course: 'ESL' },
    { name_course: 'English Languages Courses 1.5', category_course: 'ESL' },
    { name_course: 'English Languages Courses 2.0', category_course: 'ESL' },
    { name_course: 'English Languages Courses 2.5', category_course: 'ESL' },
    { name_course: 'English Languages Courses 3.0', category_course: 'ESL' },
    { name_course: 'English Languages Courses 3.5', category_course: 'ESL' },
    { name_course: 'English Languages Courses 4.0', category_course: 'ESL' },
    { name_course: 'English Languages Courses 4.5', category_course: 'ESL' },
    { name_course: 'English Languages Courses 5.0', category_course: 'ESL' },
    { name_course: 'English Languages Courses 5.5', category_course: 'ESL' },
    { name_course: 'English Languages Courses 6.0', category_course: 'ESL' },
    {
      name_course: 'English Languages Courses Advance 1',
      category_course: 'ESL',
    },
    {
      name_course: 'English Languages Courses Advance 2',
      category_course: 'ESL',
    },
    { name_course: 'Web Application Development', category_course: 'Tech' },
    { name_course: 'Data Science', category_course: 'Tech' },
    { name_course: 'Network and System Solutions', category_course: 'Tech' },
    { name_course: 'UI/UX Design Specialist', category_course: 'Design' },
    {
      name_course: 'International Business Management',
      category_course: 'IBM',
    },
    {
      name_course: 'Digital Marketing Specialist',
      category_course: 'Digital Marketing',
    },
    {
      name_course: 'Advanced Digital Marketing',
      category_course: 'Digital Marketing',
    },
    {
      name_course: 'Customer Relations Specialist',
      category_course: 'Customer Relations',
    },
    { name_course: 'Hospitality Management', category_course: 'Hospitality' },
    { name_course: 'All', category_course: 'All' },
  ];

  for (const course of courses) {
    await pgm.sql(`
            INSERT INTO courses (name_course, category_course)
            VALUES ('${course.name_course}', '${course.category_course}');
        `);
  }

  const users_courses = [
    { id_user: 'dYcwyptf86XjtaVf5NtKF9iH0Fz1', id_course: 1 },
    { id_user: 't2aZqoHmdsQtRbYfp0TR6dI08q43', id_course: 2 },
    { id_user: 'XV9Z4l0wMYaLLtyRbwMfb2sbW2g2', id_course: 3 },
    { id_user: '2ek278A9t3c8iOzJ81sd4vS17hl2', id_course: 4 },
    { id_user: 'Qtqd29YdOVWOYrKJXHu58kGCjjn1', id_course: 5 },
    { id_user: '62UDtCUi4FgFqeyDOfyrnZTSgGD2', id_course: 6 },
    { id_user: 'qF6KDpmaBUgyyFcBPqw5cXVCP4f2', id_course: 7 },
    { id_user: '5XUb1fmI5VORuTiVFI4KjMdsq0s1', id_course: 8 },
    { id_user: 'IueNDcn3M9Uwf2rQvUncIAz5GI53', id_course: 9 },
    { id_user: 'ZcTbQOHgHjd4C5NRd2xayQTjnxH2', id_course: 10 },
    { id_user: 'LpYzcAxalOdUAiPAvjSkWYZynrW2', id_course: 11 },
    { id_user: 'mjPHwkQiWpeerSpdQTFb6taGhtJ3', id_course: 12 },
    { id_user: '5yDFGlMhRkVpOli88hkrUuB9rT02', id_course: 13 },
    { id_user: 'FWd5HFhLwqQ0kTiQtyZL1uKfmC42', id_course: 14 },
    { id_user: 'efUQXwLszSW0pmy7Pc9xj2wmYQy1', id_course: 15 },
    { id_user: '38Y3pNidYySVu3Mnbr1bE0j8pmE2', id_course: 16 },
    { id_user: 'LuOmfDHZOXQqZ9tmY1Vh6eSoxkW2', id_course: 17 },
    { id_user: '4OLXHwPmYrW8QLllteWgRHAvRLf1', id_course: 18 },
    { id_user: 'ssPO91r1d2U3hBfKxBnqDylXEaq2', id_course: 19 },
    { id_user: '6dcX3QXJOVZS06IpcEdAl9bq3qk1', id_course: 20 },
    { id_user: '237GeIZsKrhsgCf7m3z7QWzSf872', id_course: 21 },
    { id_user: 'isrYIQyDKrP9tVPiyTHRz1oHCGQ2', id_course: 22 },
    { id_user: 'hXUewvFREwQ2RYLpmdVCyVFGSNw1', id_course: 1 },
    { id_user: 'dMm2Xd8FcoT1gl7cq9Hn0pI7NUH2', id_course: 2 },
    { id_user: 'kKdhxTqV2Bdy8TLYWQ04qFm7D2j1', id_course: 3 },
    { id_user: 'k14ukzruSWQJFkIyjxFZcMdOA3u1', id_course: 4 },
    { id_user: 'lB3hQ3fFkAOSxMLeHzZEk9tvHWC3', id_course: 5 },
    { id_user: '3eqO0wPZ22RtOXdQPBP53GyyzUm1', id_course: 6 },
    { id_user: '3zyuD87sh2d88QSivlzneLPO4bx2', id_course: 7 },
    { id_user: 'CLridLsKAmN72Ui2XEY5ignuPXI3', id_course: 8 },
    { id_user: 'fZhC84DlxsXGVQFOcJMRIMfWBl93', id_course: 9 },


  ];

  for (const user_course of users_courses) {
    await pgm.sql(`
            INSERT INTO users_courses (id_user, id_course)
            VALUES ('${user_course.id_user}', ${user_course.id_course});
        `);
  }

  const tags = [
    { name_tag: 'Workshop' },
    { name_tag: 'Sports' },
    { name_tag: 'Party' },
    { name_tag: 'Dinner' },
    { name_tag: 'Lunch' },
    { name_tag: 'Hike' },
    { name_tag: 'Others' },
    { name_tag: 'Bring your food' },
    { name_tag: 'Picnic' },
    { name_tag: 'Lesson' },
    { name_tag: 'Network' },
    { name_tag: 'Conversation' },
    { name_tag: 'Heritage Place' },
    { name_tag: 'Culture' },
    { name_tag: 'Music' },
    { name_tag: 'Online' },
    { name_tag: 'In Person' },
    { name_tag: 'Online and In Person' },
  ];

  for (const tag of tags) {
    await pgm.sql(`
            INSERT INTO tags (name_tag)
            VALUES ('${tag.name_tag}');
        `);
  }
};

exports.down = async (pgm) => {
  pgm.sql(`
        DELETE FROM events_tags;
        DELETE FROM tags;
        DELETE FROM events_reviews;
        DELETE FROM reviews;
        DELETE FROM attendees;
        DELETE FROM events;
        DELETE FROM users_courses;
        DELETE FROM courses;
        DELETE FROM users;
        DELETE FROM users_type;
    `);
};
