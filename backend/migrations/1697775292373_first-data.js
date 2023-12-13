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
      name_user: 'Hannah Abbott',
      email_user: 'hannah.abbott@gmail.com',
      postal_code_user: 'V5K2X1',
      phone_user: '123-456-7890',
    },
    {
      id_user: 't2aZqoHmdsQtRbYfp0TR6dI08q43',
      id_user_type: 1,
      name_user: 'Bathilda Bagshot',
      email_user: 'bathilda.bagshot@gmail.com',
      postal_code_user: 'V5K2X1',
      phone_user: '123-456-7890',
    },
    {
      id_user: 'XV9Z4l0wMYaLLtyRbwMfb2sbW2g2',
      id_user_type: 1,
      name_user: 'Katie Bell',
      email_user: 'katie.bell@gmail.com',
      postal_code_user: 'V5K2X1',
      phone_user: '123-456-7890',
    },
    {
      id_user: '2ek278A9t3c8iOzJ81sd4vS17hl2',
      id_user_type: 1,
      name_user: 'Cuthbert Binns',
      email_user: 'cuthbert.binns@gmail.com',
      postal_code_user: 'V5K2X1',
      phone_user: '123-456-7890',
    },
    {
      id_user: 'Qtqd29YdOVWOYrKJXHu58kGCjjn1',
      id_user_type: 1,
      name_user: 'Phineas Nigellus',
      email_user: 'phineas.nigellus@gmail.com',
      postal_code_user: 'V5K2X1',
      phone_user: '123-456-7890',
    },
    {
      id_user: '62UDtCUi4FgFqeyDOfyrnZTSgGD2',
      id_user_type: 1,
      name_user: 'Sirius Black',
      email_user: 'sirius.black@gmail.com',
      postal_code_user: 'sirius.black@gmail.com',
      phone_user: '123-456-7890',
    },
    {
      id_user: 'qF6KDpmaBUgyyFcBPqw5cXVCP4f2',
      id_user_type: 2,
      name_user: 'Amelia Bones',
      email_user: 'amelia.bones@gmail.com',
      postal_code_user: 'V5K2X1',
      phone_user: '123-456-7890',
    },
    {
      id_user: '5XUb1fmI5VORuTiVFI4KjMdsq0s1',
      id_user_type: 2,
      name_user: 'Terry Boot',
      email_user: 'terry.boot@gmail.com',
      postal_code_user: 'V5K2X1',
      phone_user: '123-456-7890',
    },
    {
      id_user: 'IueNDcn3M9Uwf2rQvUncIAz5GI53',
      id_user_type: 2,
      name_user: 'Lavender Brown',
      email_user: 'lavender.brow@gmail.com',
      postal_code_user: 'V5K2X1',
      phone_user: '123-456-7890',
    },
    {
      id_user: 'ZcTbQOHgHjd4C5NRd2xayQTjnxH2',
      id_user_type: 2,
      name_user: 'Charity Burbage',
      email_user: 'charity.burbage@gmail.com',
      postal_code_user: 'V5K2X1',
      phone_user: '123-456-7890',
    },
    {
      id_user: 'LpYzcAxalOdUAiPAvjSkWYZynrW2',
      id_user_type: 2,
      name_user: 'Frank Bryce',
      email_user: 'frank.bryce@gmail.com',
      postal_code_user: 'V5K2X1',
      phone_user: '123-456-7890',
    },
    {
      id_user: 'mjPHwkQiWpeerSpdQTFb6taGhtJ3',
      id_user_type: 2,
      name_user: 'Alecto Carrow',
      email_user: 'alecto.carrow@gmail.com',
      postal_code_user: 'V5K2X1',
      phone_user: '123-456-7890',
    },
    {
      id_user: '5yDFGlMhRkVpOli88hkrUuB9rT02',
      id_user_type: 2,
      name_user: 'Amycus Carrow',
      email_user: 'amycus.carrow@gmail.com',
      postal_code_user: 'V5K2X1',
      phone_user: '123-456-7890',
    },
    {
      id_user: 'FWd5HFhLwqQ0kTiQtyZL1uKfmC42',
      id_user_type: 2,
      name_user: 'John Dawlish',
      email_user: 'john.dawlish@gmail.com',
      postal_code_user: 'V5K2X1',
      phone_user: '123-456-7890',
    },
    {
      id_user: 'efUQXwLszSW0pmy7Pc9xj2wmYQy1',
      id_user_type: 2,
      name_user: 'Fleur Delacour',
      email_user: 'fleur.delacour@gmail.com',
      postal_code_user: 'V5K2X1',
      phone_user: '123-456-7890',
    },
    {
      id_user: '38Y3pNidYySVu3Mnbr1bE0j8pmE2',
      id_user_type: 2,
      name_user: 'Marietta Edgecombe',
      email_user: 'marietta.edgecombe@gmail.com',
      postal_code_user: 'V5K2X1',
      phone_user: '123-456-7890',
    },
    {
      id_user: 'LuOmfDHZOXQqZ9tmY1Vh6eSoxkW2',
      id_user_type: 2,
      name_user: 'Arabella Figg',
      email_user: 'arabella.figg@gmail.com',
      postal_code_user: 'V5K2X1',
      phone_user: '123-456-7890',
    },
    {
      id_user: '4OLXHwPmYrW8QLllteWgRHAvRLf1',
      id_user_type: 2,
      name_user: 'Cornelius Fudge',
      email_user: 'cornelius.fudge@gmail.com',
      postal_code_user: 'V5K2X1',
      phone_user: '123-456-7890',
    },
    {
      id_user: 'ssPO91r1d2U3hBfKxBnqDylXEaq2',
      id_user_type: 2,
      name_user: 'Gregory Goyle',
      email_user: 'gregory.goyle@gmail.com',
      postal_code_user: 'V5K2X1',
      phone_user: '123-456-7890',
    },
    {
      id_user: '6dcX3QXJOVZS06IpcEdAl9bq3qk1',
      id_user_type: 2,
      name_user: 'Fenrir Greyback',
      email_user: 'fenrir.greyback@gmail.com',
      postal_code_user: 'V5K2X1',
      phone_user: '123-456-7890',
    },
    {
      id_user: '237GeIZsKrhsgCf7m3z7QWzSf872',
      id_user_type: 2,
      name_user: 'Rubeus Hagrid',
      email_user: 'rubeus.hagrid@gmail.com',
      postal_code_user: 'V5K2X1',
      phone_user: '123-456-7890',
    },
    {
      id_user: 'isrYIQyDKrP9tVPiyTHRz1oHCGQ2',
      id_user_type: 2,
      name_user: 'Mafalda Hopkirk',
      email_user: 'mafalda.hopkirk@gmail.com',
      postal_code_user: 'V5K2X1',
      phone_user: '123-456-7890',
    },
    {
      id_user: 'hXUewvFREwQ2RYLpmdVCyVFGSNw1',
      id_user_type: 2,
      name_user: 'Angelina Johnson',
      email_user: 'angelina.johnson@gmail.com',
      postal_code_user: 'V5K2X1',
      phone_user: '123-456-7890',
    },
    {
      id_user: 'dMm2Xd8FcoT1gl7cq9Hn0pI7NUH2',
      id_user_type: 2,
      name_user: 'Igor Karkaroff',
      email_user: 'igor.karkaroff@gmail.com',
      postal_code_user: 'V5K2X1',
      phone_user: '123-456-7890',
    },
    {
      id_user: 'kKdhxTqV2Bdy8TLYWQ04qFm7D2j1',
      id_user_type: 2,
      name_user: 'Silvanus Kettleburn',
      email_user: 'silvanus.kettleburn@gmail.com',
      postal_code_user: 'V5K2X1',
      phone_user: '123-456-7890',
    },
    {
      id_user: 'k14ukzruSWQJFkIyjxFZcMdOA3u1',
      id_user_type: 2,
      name_user: 'Luna Lovegood',
      email_user: 'luna.lovegood@gmail.com',
      postal_code_user: 'V5K2X1',
      phone_user: '123-456-7890',
    },
    {
      id_user: 'lB3hQ3fFkAOSxMLeHzZEk9tvHWC3',
      id_user_type: 2,
      name_user: 'Draco Malfoy',
      email_user: 'draco.malfoy@gmail.com',
      postal_code_user: 'V5K2X1',
      phone_user: '123-456-7890',
    },
    {
      id_user: '3eqO0wPZ22RtOXdQPBP53GyyzUm1',
      id_user_type: 2,
      name_user: 'Olympe Maxime',
      email_user: 'olympe.maxime@gmail.com',
      postal_code_user: 'V5K2X1',
      phone_user: '123-456-7890',
    },
    {
      id_user: '3zyuD87sh2d88QSivlzneLPO4bx2',
      id_user_type: 2,
      name_user: 'Padma Patil',
      email_user: 'padma.patil@gmail.com',
      postal_code_user: 'V5K2X1',
      phone_user: '123-456-7890',
    },
    {
      id_user: 'CLridLsKAmN72Ui2XEY5ignuPXI3',
      id_user_type: 2,
      name_user: 'Sturgis Podmore',
      email_user: 'sturgis.podmore@gmail.com',
      postal_code_user: 'V5K2X1',
      phone_user: '123-456-7890',
    },
    {
      id_user: 'fZhC84DlxsXGVQFOcJMRIMfWBl93',
      id_user_type: 2,
      name_user: 'Thomas Riddle',
      email_user: 'thomas.riddle@gmail.com',
      postal_code_user: 'V5K2X1',
      phone_user: '123-456-7890',
    },
  ];

  for (const user of usersData) {
    await pgm.sql(`
            INSERT INTO users (id_user, id_user_type, name_user, email_user, postal_code_user, phone_user)
            VALUES ('${user.id_user}', ${user.id_user_type}, '${user.name_user}', '${user.email_user}', '${user.postal_code_user}', '${user.phone_user}');
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

  const events = [
    {
      id_owner: 'dYcwyptf86XjtaVf5NtKF9iH0Fz1',
      name_event: 'Demo Day',
      description_event:
        'Demo Day is a showcase of the projects that our students have been working on during their time at Cornerstone. This is a great opportunity for students to show off their work to friends, family, and industry professionals. It is also a chance for prospective students to get a glimpse of what they can expect to learn at Cornerstone.',
      date_event_start: '2023-12-01 01:00:00',
      date_event_end: '2023-12-01 03:00:00',
      location_event: '816 Granville Street, Vancouver, BC, Canada',
      capacity_event: 50,
      price_event: 0,
      image_event: null,
      category_event: 'Tech',
    },
    {
      id_owner: 't2aZqoHmdsQtRbYfp0TR6dI08q43',
      name_event: 'Cornerstone Talks',
      description_event:
        'Cornerstone Talks is a series of presentations by industry experts on a wide range of topics relevant to people in tech. Cornerstone Talks are a great opportunity to learn something new and network with other people in the industry.',
      date_event_start: '2023-12-01 01:00:00',
      date_event_end: '2023-12-01 03:00:00',
      location_event: '816 Granville Street, Vancouver, BC, Canada',
      capacity_event: 50,
      price_event: 0,
      image_event: null,
      category_event: 'Tech',
    },
    {
      id_owner: 'XV9Z4l0wMYaLLtyRbwMfb2sbW2g2',
      name_event: 'Cornerstone College Open House',
      description_event:
        'Our Open House is a great opportunity to learn more about our programs, tour our campus, and meet our team. Come and see why Cornerstone College is a great place to learn.',
      date_event_start: '2023-12-01 01:00:00',
      date_event_end: '2023-12-01 03:00:00',
      location_event: '816 Granville Street, Vancouver, BC, Canada',
      capacity_event: 50,
      price_event: 0,
      image_event: null,
      category_event: 'Tech',
    },
    {
      id_owner: '2ek278A9t3c8iOzJ81sd4vS17hl2',
      name_event: 'English Languages Course 3.0 Workshop',
      description_event:
        'Interactive workshop for English Language Course 3.0 students to practice language skills.',
      date_event_start: '2023-11-10 10:00:00',
      date_event_end: '2023-11-10 12:00:00',
      location_event: '123 Main St, Vancouver, BC V6H 1A1',
      capacity_event: 30,
      price_event: 0,
      image_event: null,
      category_event: 'ESL',
    },
    {
      id_owner: 'Qtqd29YdOVWOYrKJXHu58kGCjjn1',
      name_event: 'Tech Networking Night',
      description_event:
        'An evening of networking for tech enthusiasts and professionals.',
      date_event_start: '2023-11-15 18:30:00',
      date_event_end: '2023-11-15 20:30:00',
      location_event: '456 Tech Blvd, Vancouver, BC V6H 2B2',
      capacity_event: 50,
      price_event: 0,
      image_event: null,
      category_event: 'Tech',
    },
    {
      id_owner: '62UDtCUi4FgFqeyDOfyrnZTSgGD2',
      name_event: 'Digital Marketing Strategies Workshop',
      description_event:
        'Learn effective digital marketing strategies from industry experts.',
      date_event_start: '2023-11-20 14:00:00',
      date_event_end: '2023-11-20 16:00:00',
      location_event: '789 Marketing Lane, Vancouver, BC V6H 3C3',
      capacity_event: 40,
      price_event: 0,
      image_event: null,
      category_event: 'Digital Marketing',
    },
    {
      id_owner: 'dYcwyptf86XjtaVf5NtKF9iH0Fz1',
      name_event: 'Music Night in the Park',
      description_event:
        'Enjoy live music performances in the beautiful city park.',
      date_event_start: '2023-12-02 19:00:00',
      date_event_end: '2023-12-02 21:00:00',
      location_event: 'City Park, Vancouver, BC V6H 4F4',
      capacity_event: 100,
      price_event: 0,
      image_event: null,
      category_event: 'Music',
    },
    {
      id_owner: 't2aZqoHmdsQtRbYfp0TR6dI08q43',
      name_event: 'Web Development Workshop',
      description_event:
        'Hands-on workshop for aspiring web developers to build and deploy their first website.',
      date_event_start: '2023-11-25 15:00:00',
      date_event_end: '2023-11-25 18:00:00',
      location_event: '567 Coding Avenue, Vancouver, BC V6H 5E5',
      capacity_event: 40,
      price_event: 0,
      image_event: null,
      category_event: 'Tech',
    },
    {
      id_owner: 'XV9Z4l0wMYaLLtyRbwMfb2sbW2g2',
      name_event: 'Tech and Business Panel Discussion',
      description_event:
        'Insightful panel discussion on the intersection of technology and business in todays market.',
      date_event_start: '2023-12-05 17:30:00',
      date_event_end: '2023-12-05 19:30:00',
      location_event: '789 Business Tower, Vancouver, BC V6H 6F6',
      capacity_event: 60,
      price_event: 0,
      image_event: null,
      category_event: 'Tech',
    },
    {
      id_owner: '2ek278A9t3c8iOzJ81sd4vS17hl2',
      name_event: 'English Language Course 4.5 Graduation Ceremony',
      description_event:
        'A celebration of achievement for English Language Course 4.5 students and their language proficiency.',
      date_event_start: '2023-12-10 14:30:00',
      date_event_end: '2023-12-10 16:30:00',
      location_event: '321 Language Hall, Vancouver, BC V6H 7G7',
      capacity_event: 50,
      price_event: 0,
      image_event: null,
      category_event: 'ESL',
    },
    {
      id_owner: 'Qtqd29YdOVWOYrKJXHu58kGCjjn1',
      name_event: 'Digital Art Exhibition',
      description_event:
        'Showcasing digital artworks from talented local artists in a gallery setting.',
      date_event_start: '2023-12-15 19:00:00',
      date_event_end: '2023-12-15 21:00:00',
      location_event: '234 Art Avenue, Vancouver, BC V6H 8H8',
      capacity_event: 80,
      price_event: 0,
      image_event: null,
      category_event: 'Design',
    },
    {
      id_owner: '62UDtCUi4FgFqeyDOfyrnZTSgGD2',
      name_event: 'Customer Relations Workshop',
      description_event:
        'Interactive workshop focusing on improving customer relations skills for businesses and professionals.',
      date_event_start: '2023-12-20 10:00:00',
      date_event_end: '2023-12-20 12:00:00',
      location_event: '345 Service Street, Vancouver, BC V6H 9I9',
      capacity_event: 35,
      price_event: 0,
      image_event: null,
      category_event: 'Customer Relations',
    },
    {
      id_owner: 'dYcwyptf86XjtaVf5NtKF9iH0Fz1',
      name_event: 'Holiday Party Extravaganza',
      description_event:
        'Year-end holiday party with music, dance, and festive activities for all attendees.',
      date_event_start: '2023-12-31 20:00:00',
      date_event_end: '2024-01-01 01:00:00',
      location_event: '456 Celebration Plaza, Vancouver, BC V6H 0A0',
      capacity_event: 100,
      price_event: 10,
      image_event: null,
      category_event: 'ESL',
    },
    {
      id_owner: 't2aZqoHmdsQtRbYfp0TR6dI08q43',
      name_event: 'Tech Startups Pitch Night',
      description_event:
        'An evening where tech startups pitch their innovative ideas to potential investors and partners.',
      date_event_start: '2024-02-05 18:00:00',
      date_event_end: '2024-02-05 20:00:00',
      location_event: '123 Startup Lane, Vancouver, BC V6H 1A1',
      capacity_event: 30,
      price_event: 0,
      image_event: null,
      category_event: 'Tech',
    },
    {
      id_owner: 'XV9Z4l0wMYaLLtyRbwMfb2sbW2g2',
      name_event: 'Digital Marketing Trends Seminar',
      description_event:
        'Seminar discussing the latest trends and strategies in digital marketing for businesses and marketers.',
      date_event_start: '2024-02-10 14:00:00',
      date_event_end: '2024-02-10 16:00:00',
      location_event: '234 Marketing Center, Vancouver, BC V6H 2B2',
      capacity_event: 50,
      price_event: 0,
      image_event: null,
      category_event: 'Digital Marketing',
    },
    {
      id_owner: '2ek278A9t3c8iOzJ81sd4vS17hl2',
      name_event: 'Artists Networking Mixer',
      description_event:
        'Networking event for local artists to connect, collaborate, and showcase their creative works.',
      date_event_start: '2024-02-15 19:00:00',
      date_event_end: '2024-02-15 21:00:00',
      location_event: '345 Creative Space, Vancouver, BC V6H 3C3',
      capacity_event: 40,
      price_event: 0,
      image_event: null,
      category_event: 'Design',
    },
    {
      id_owner: 'Qtqd29YdOVWOYrKJXHu58kGCjjn1',
      name_event: 'Web Development Hackathon',
      description_event:
        'Intense 24-hour hackathon challenging web developers to build innovative web applications.',
      date_event_start: '2024-02-22 12:00:00',
      date_event_end: '2024-02-23 12:00:00',
      location_event: '456 Code Hub, Vancouver, BC V6H 4D4',
      capacity_event: 20,
      price_event: 0,
      image_event: null,
      category_event: 'Tech',
    },
    {
      id_owner: '62UDtCUi4FgFqeyDOfyrnZTSgGD2',
      name_event: 'English Language Course 6.0 Graduation Ceremony',
      description_event:
        'A prestigious graduation ceremony honoring high-achieving English Language Course 6.0 students.',
      date_event_start: '2024-02-29 15:30:00',
      date_event_end: '2024-02-29 17:30:00',
      location_event: '567 Language Hall, Vancouver, BC V6H 5E5',
      capacity_event: 60,
      price_event: 0,
      image_event: null,
      category_event: 'ESL',
    },
    {
      id_owner: 'dYcwyptf86XjtaVf5NtKF9iH0Fz1',
      name_event: 'Creative Photography Workshop',
      description_event:
        'A hands-on workshop for photography enthusiasts to learn creative photography techniques and explore their artistic skills.',
      date_event_start: '2023-11-18 14:00:00',
      date_event_end: '2023-11-18 16:00:00',
      location_event: '678 Shutter Street, Vancouver, BC V6H 2W2',
      capacity_event: 25,
      price_event: 0,
      image_event: null,
      category_event: 'Design',
    },
    {
      id_owner: 't2aZqoHmdsQtRbYfp0TR6dI08q43',
      name_event: 'Charity Gala Dinner',
      description_event:
        'A fundraising gala dinner to support local charities and community projects. Join us for an elegant evening of fine dining and charitable giving.',
      date_event_start: '2024-06-30 19:00:00',
      date_event_end: '2024-06-30 22:00:00',
      location_event: '789 Charity Avenue, Vancouver, BC V6H 3B3',
      capacity_event: 150,
      price_event: 100,
      image_event: null,
      category_event: 'Tech',
    },
    {
      id_owner: 'XV9Z4l0wMYaLLtyRbwMfb2sbW2g2',
      name_event: 'Outdoor Movie Night',
      description_event:
        'Enjoy a night under the stars with a screening of a popular movie. Bring your blankets and snacks for a cozy outdoor cinema experience.',
      date_event_start: '2023-12-08 18:30:00',
      date_event_end: '2023-12-08 21:00:00',
      location_event: 'City Park, Vancouver, BC V6H 4G4',
      capacity_event: 80,
      price_event: 0,
      image_event: null,
      category_event: 'ESL',
    },
    {
      id_owner: '2ek278A9t3c8iOzJ81sd4vS17hl2',
      name_event: 'Entrepreneurship Conference 2024',
      description_event:
        'A comprehensive conference for aspiring and experienced entrepreneurs. Gain insights from successful business leaders, attend workshops, and network with potential investors.',
      date_event_start: '2023-01-15 09:00:00',
      date_event_end: '2023-01-15 17:00:00',
      location_event: '567 Business Center, Vancouver, BC V6H 5F5',
      capacity_event: 200,
      price_event: 50,
      image_event: null,
      category_event: 'IBM',
    },
    {
      id_owner: 'Qtqd29YdOVWOYrKJXHu58kGCjjn1',
      name_event: 'Comedy Night Live',
      description_event:
        'Laugh out loud with stand-up comedy performances by local comedians. A night of humor and entertainment for everyone.',
      date_event_start: '2023-02-10 20:00:00',
      date_event_end: '2023-02-10 22:00:00',
      location_event: '789 Comedy Club, Vancouver, BC V6H 6G6',
      capacity_event: 120,
      price_event: 20,
      image_event: null,
      category_event: 'ESL',
    },
    {
      id_owner: '62UDtCUi4FgFqeyDOfyrnZTSgGD2',
      name_event: 'Contemporary Art Exhibition',
      description_event:
        'Explore a diverse collection of contemporary artworks by local and international artists. Immerse yourself in the world of modern art.',
      date_event_start: '2023-03-15 10:00:00',
      date_event_end: '2023-03-15 18:00:00',
      location_event: '456 Art Gallery, Vancouver, BC V6H 7G7',
      capacity_event: 75,
      price_event: 0,
      image_event: null,
      category_event: 'ESL',
    },
    {
      id_owner: 'dYcwyptf86XjtaVf5NtKF9iH0Fz1',
      name_event: 'Science and Technology Lecture Series',
      description_event:
        'Engage in enlightening talks by experts in the fields of science and technology. Discover cutting-edge advancements and their impact on society.',
      date_event_start: '2023-04-05 18:30:00',
      date_event_end: '2023-04-05 20:30:00',
      location_event: '789 Science Hall, Vancouver, BC V6H 8H8',
      capacity_event: 100,
      price_event: 0,
      image_event: null,
      category_event: 'Tech',
    },
    {
      id_owner: 't2aZqoHmdsQtRbYfp0TR6dI08q43',
      name_event: 'Robotics Competition 2024',
      description_event:
        'Witness the creativity and innovation of student-built robots in action. Teams compete in exciting challenges, showcasing their technical skills.',
      date_event_start: '2023-04-20 09:00:00',
      date_event_end: '2023-04-20 16:00:00',
      location_event: '567 Robotics Arena, Vancouver, BC V6H 9I9',
      capacity_event: 200,
      price_event: 0,
      image_event: null,
      category_event: 'Tech',
    },
    {
      id_owner: 'XV9Z4l0wMYaLLtyRbwMfb2sbW2g2',
      name_event: 'Local Music Festival',
      description_event:
        'Celebrate the vibrant music scene of Vancouver with live performances by talented local musicians. Enjoy a day filled with diverse musical genres.',
      date_event_start: '2023-05-10 14:00:00',
      date_event_end: '2023-05-10 22:00:00',
      location_event: '123 Music Park, Vancouver, BC V6H 0A0',
      capacity_event: 300,
      price_event: 10,
      image_event: null,
      category_event: 'ESL',
    },
    {
      id_owner: '2ek278A9t3c8iOzJ81sd4vS17hl2',
      name_event: 'Culinary Competition',
      description_event:
        'Top chefs compete in a culinary showdown, showcasing their creativity and culinary expertise. Experience gourmet dishes and culinary delights.',
      date_event_start: '2023-06-03 17:00:00',
      date_event_end: '2023-06-03 21:00:00',
      location_event: '789 Culinary Center, Vancouver, BC V6H 1A1',
      capacity_event: 150,
      price_event: 25,
      image_event: null,
      category_event: 'ESL',
    },
    {
      id_owner: 'Qtqd29YdOVWOYrKJXHu58kGCjjn1',
      name_event: 'Wine Wonderland',
      description_event:
        'Savor the rich flavors of handpicked wines from renowned vineyards. Explore the world of wine with experts guiding you through a delightful tasting journey.',
      date_event_start: '2023-01-24 18:30:00',
      date_event_end: '2023-01-24 22:00:00',
      location_event: 'Vineyard Haven, Napa Valley, CA 94558',
      capacity_event: 100,
      price_event: 35,
      image_event: null,
      category_event: 'ESL',
    },
    {
      id_owner: '62UDtCUi4FgFqeyDOfyrnZTSgGD2',
      name_event: 'Harmony Fest',
      description_event:
        'Immerse yourself in a day of musical bliss. Live performances by top artists across genres. Enjoy good music, good company, and good vibes.',
      date_event_start: '2023-01-24 12:00:00',
      date_event_end: '2023-01-24 23:59:00',
      location_event: 'Meadow Park, Chicago, IL 60601',
      capacity_event: 500,
      price_event: 40,
      image_event: null,
      category_event: 'ESL',
    },
    {
      id_owner: 'qF6KDpmaBUgyyFcBPqw5cXVCP4f2',
      name_event: 'Innovation Expo',
      description_event:
        'Witness the latest in technology and innovation. From cutting-edge gadgets to futuristic concepts, explore the tech landscape and meet industry pioneers.',
      date_event_start: '2023-01-24 10:00:00',
      date_event_end: '2023-01-24 18:00:00',
      location_event: 'Tech Hub Convention Center, San Francisco, CA 94105',
      capacity_event: 300,
      price_event: 30,
      image_event: null,
      category_event: 'Tech',
    },
    {
      id_owner: '5XUb1fmI5VORuTiVFI4KjMdsq0s1',
      name_event: 'Chic Couture Showcase',
      description_event:
        'Experience the glamour of haute couture. Top designers present their latest collections in a dazzling runway show. A night of style and sophistication.',
      date_event_start: '2023-01-24 19:00:00',
      date_event_end: '2023-01-24 22:30:00',
      location_event: 'Fashion Center, New York, NY 10001',
      capacity_event: 200,
      price_event: 50,
      image_event: null,
      category_event: 'ESL',
    },
  ];

  for (const event of events) {
    await pgm.sql(`
            INSERT INTO events (id_owner, name_event, description_event, date_event_start, date_event_end, location_event, capacity_event, price_event, image_event, category_event)
            VALUES ('${event.id_owner}', '${event.name_event}', '${event.description_event}', '${event.date_event_start}', '${event.date_event_end}', '${event.location_event}', ${event.capacity_event}, ${event.price_event}, ${event.image_event}, '${event.category_event}');
        `);
  }

  const events_tags = [
    { id_event: 1, id_tag: 1 },
    { id_event: 1, id_tag: 2 },
    { id_event: 2, id_tag: 3 },
    { id_event: 2, id_tag: 4 },
    { id_event: 3, id_tag: 6 },
    { id_event: 3, id_tag: 7 },
    { id_event: 28, id_tag: 4 },
    { id_event: 28, id_tag: 7 },
    { id_event: 27, id_tag: 15 },
    { id_event: 1, id_tag: 17 },
    { id_event: 2, id_tag: 16 },
    { id_event: 3, id_tag: 17 },
    { id_event: 4, id_tag: 16 },
    { id_event: 5, id_tag: 16 },
    { id_event: 6, id_tag: 17 },
    { id_event: 7, id_tag: 16 },
    { id_event: 8, id_tag: 17 },
    { id_event: 9, id_tag: 16 },
    { id_event: 10, id_tag: 16 },
    { id_event: 11, id_tag: 17 },
    { id_event: 12, id_tag: 17 },
    { id_event: 13, id_tag: 16 },
    { id_event: 14, id_tag: 17 },
    { id_event: 15, id_tag: 16 },
    { id_event: 16, id_tag: 16 },
    { id_event: 17, id_tag: 16 },
    { id_event: 18, id_tag: 17 },
    { id_event: 19, id_tag: 17 },
    { id_event: 20, id_tag: 17 },
    { id_event: 21, id_tag: 17 },
    { id_event: 22, id_tag: 16 },
    { id_event: 23, id_tag: 16 },
    { id_event: 24, id_tag: 17 },
    { id_event: 25, id_tag: 16 },
    { id_event: 26, id_tag: 16 },
    { id_event: 27, id_tag: 17 },
    { id_event: 28, id_tag: 17 },
    { id_event: 29, id_tag: 16 },
    { id_event: 30, id_tag: 17 },
  ];

  for (const event_tag of events_tags) {
    await pgm.sql(`
            INSERT INTO events_tags (id_event, id_tag)
            VALUES (${event_tag.id_event}, ${event_tag.id_tag});
        `);
  }

  const attendees = [
    { id_user: '5XUb1fmI5VORuTiVFI4KjMdsq0s1', id_event: 1 },
    { id_user: 'qF6KDpmaBUgyyFcBPqw5cXVCP4f2', id_event: 2 },
    { id_user: '62UDtCUi4FgFqeyDOfyrnZTSgGD2', id_event: 2 },
  ];

  for (const attendee of attendees) {
    await pgm.sql(`
            INSERT INTO attendees (id_user, id_event)
            VALUES ('${attendee.id_user}', ${attendee.id_event});
        `);
  }

  const reviews = [
    {
      id_user: '5XUb1fmI5VORuTiVFI4KjMdsq0s1',
      description_review: 'Great event!',
      rating: 5,
      date_review: '2023-11-01 01:00:00',
    },
    {
      id_user: 'qF6KDpmaBUgyyFcBPqw5cXVCP4f2',
      description_review: 'Great event!',
      rating: 3,
      date_review: '2023-11-01 01:00:00',
    },
    {
      id_user: '62UDtCUi4FgFqeyDOfyrnZTSgGD2',
      description_review: 'Great event!',
      rating: 2,
      date_review: '2023-11-01 01:00:00',
    },
  ];

  for (const review of reviews) {
    await pgm.sql(`
            INSERT INTO reviews (id_user, description_review, rating, date_review)
            VALUES ('${review.id_user}', '${review.description_review}', ${review.rating}, '${review.date_review}');
        `);
  }

  const events_reviews = [
    { id_event: 1, id_review: 1 },
    { id_event: 2, id_review: 2 },
    { id_event: 2, id_review: 3 },
  ];

  for (const event_review of events_reviews) {
    await pgm.sql(`
            INSERT INTO events_reviews (id_event, id_review)
            VALUES (${event_review.id_event}, ${event_review.id_review});
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
