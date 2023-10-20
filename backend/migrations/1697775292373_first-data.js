/* eslint-disable camelcase */

exports.shorthands = undefined;

exports.up = async pgm => {
    pgm.sql(`
        INSERT INTO users_type (role_user) VALUES ('organizer');
        INSERT INTO users_type (role_user) VALUES ('student');
        INSERT INTO users_type (role_user) VALUES ('admin');
    `);

    const usersData = [
        { id_user_type: 1, name_user: 'Diogo Krub de Almeida', email_user: 'diogokalmeida@gmail.com', postal_code_user: 'V5K2X1', phone_user: '123-456-7890' },
        { id_user_type: 1, name_user: 'Daisuke Seki', email_user: 'ds@example.com', postal_code_user: '54321', phone_user: '987-654-3210' },
        { id_user_type: 1, name_user: 'Seisuke Yamada', email_user: 'sei@gmail.com', postal_code_user: '12345', phone_user: '123-456-7890' },
        { id_user_type: 1, name_user: 'Masashi Sawada', email_user: 'mas@gmail.com', postal_code_user: '54321', phone_user: '987-654-3210' },
        { id_user_type: 2, name_user: 'Takashi Nakamura', email_user: 'takashi@gmail.conm', postal_code_user: 'V5K2X1', phone_user: '123-456-7890' },
        { id_user_type: 2, name_user: 'Yusuke Takahashi', email_user: 'yt@gmail.com', postal_code_user: '54321', phone_user: '987-654-3210' },

    ];

    for (const user of usersData) {
        await pgm.sql(`
            INSERT INTO users (id_user_type, name_user, email_user, postal_code_user, phone_user)
            VALUES (${user.id_user_type}, '${user.name_user}', '${user.email_user}', '${user.postal_code_user}', '${user.phone_user}');
        `);
    }


    const courses = [
        { name_course: 'English Languages Courses 1.0', category_course: 'English as Second Language' },
        { name_course: 'English Languages Courses 1.5', category_course: 'English as Second Language' },
        { name_course: 'English Languages Courses 2.0', category_course: 'English as Second Language' },
        { name_course: 'English Languages Courses 2.5', category_course: 'English as Second Language' },
        { name_course: 'English Languages Courses 3.0', category_course: 'English as Second Language' },
        { name_course: 'English Languages Courses 3.5', category_course: 'English as Second Language' },
        { name_course: 'English Languages Courses 4.0', category_course: 'English as Second Language' },
        { name_course: 'English Languages Courses 4.5', category_course: 'English as Second Language' },
        { name_course: 'English Languages Courses 5.0', category_course: 'English as Second Language' },
        { name_course: 'English Languages Courses 5.5', category_course: 'English as Second Language' },
        { name_course: 'English Languages Courses 6.0', category_course: 'English as Second Language' },
        { name_course: 'English Languages Courses Advance 1', category_course: 'English as Second Language' },
        { name_course: 'English Languages Courses Advance 2', category_course: 'English as Second Language' },
        { name_course: 'Web Application Development', category_course: 'Tech' },
        { name_course: 'Data Science', category_course: 'Tech' },
        { name_course: 'Network and System Solutions', category_course: 'Tech' },
        { name_course: 'UI/UX Design Specialist', category_course: 'Design' },
        { name_course: 'International Business Management', category_course: 'IBM' },
        { name_course: 'Digital Marketing Specialist', category_course: 'Digital Marketing' },
        { name_course: 'Advanced Digital Marketing', category_course: 'Digital Marketing' },
        { name_course: 'Customer Relations Specialist', category_course: 'Customer Relations' },
        { name_course: 'Hospitality Management', category_course: 'Hospitality' }
    ]

    for (const course of courses) {
        await pgm.sql(`
            INSERT INTO courses (name_course, category_course)
            VALUES ('${course.name_course}', '${course.category_course}');
        `);
    }

    const users_courses = [
        { id_user: 1, id_course: 14 },
        { id_user: 2, id_course: 14 },
        { id_user: 3, id_course: 14 },
        { id_user: 4, id_course: 14 },
        { id_user: 5, id_course: 17 },
        { id_user: 6, id_course: 17 }
    ]

    for (const user_course of users_courses) {
        await pgm.sql(`
            INSERT INTO users_courses (id_user, id_course)
            VALUES (${user_course.id_user}, ${user_course.id_course});
        `);
    }


    const events = [
        {
            id_owner: 1,
            name_event: 'Demo Day',
            description_event: 'Demo Day is a showcase of the projects that our students have been working on during their time at RED Academy. This is a great opportunity for students to show off their work to friends, family, and industry professionals. It is also a chance for prospective students to get a glimpse of what they can expect to learn at RED Academy.',
            date_event_start: '2023-11-01 01:00:00',
            date_event_end: '2023-11-01 03:00:00',
            location_event: '1490 W Broadway #200, Vancouver, BC V6H 4E8',
            capacity_event: 50,
            price_event: 0,
            image_event: null,
            type_event: 'Tech'
        },
        {
            id_owner: 1,
            name_event: 'RED Talks',
            description_event: 'RED Talks is a series of presentations by industry experts on a wide range of topics relevant to people in tech. RED Talks are a great opportunity to learn something new and network with other people in the industry.',
            date_event_start: '2023-11-01 01:00:00',
            date_event_end: '2023-11-01 03:00:00',
            location_event: '1490 W Broadway #200, Vancouver, BC V6H 4E8',
            capacity_event: 50,
            price_event: 0,
            image_event: null,
            type_event: 'Tech'
        },
        {
            id_owner: 1,
            name_event: 'RED Academy Open House',
            description_event: 'Our Open House is a great opportunity to learn more about our programs, tour our campus, and meet our team. Come and see why RED Academy is a great place to learn.',
            date_event_start: '2023-11-01 01:00:00',
            date_event_end: '2023-11-01 03:00:00',
            location_event: '1490 W Broadway #200, Vancouver, BC V6H 4E8',
            capacity_event: 50,
            price_event: 0,
            image_event: null,
            type_event: 'Tech'
        }
    ]


    for (const event of events) {
        await pgm.sql(`
            INSERT INTO events (id_owner, name_event, description_event, date_event_start, date_event_end, location_event, capacity_event, price_event, image_event, type_event)
            VALUES ('${event.id_owner}',${event.name_event}', '${event.description_event}', '${event.date_event_start}', '${event.date_event_end}', '${event.location_event}', ${event.capacity_event}, ${event.price_event}, ${event.image_event}, '${event.type_event}');
        `);
    }

    const attendees = [
        { id_user: 1, id_event: 1 },
        { id_user: 2, id_event: 1 },
        { id_user: 3, id_event: 1 },
        { id_user: 4, id_event: 1 },
        { id_user: 5, id_event: 2 },
        { id_user: 6, id_event: 2 },
        { id_user: 1, id_event: 3 },
        { id_user: 2, id_event: 3 },
        { id_user: 3, id_event: 3 },
        { id_user: 4, id_event: 3 },
        { id_user: 5, id_event: 3 },
        { id_user: 6, id_event: 3 }
    ]

    for (const attendee of attendees) {
        await pgm.sql(`
            INSERT INTO attendees (id_user, id_event)
            VALUES (${attendee.id_user}, ${attendee.id_event});
        `);
    }


    const reviews = [
        { id_user: 1, description_review: 'Great event!', rating: 5, date_review: '2023-11-01 01:00:00' },
        { id_user: 2, description_review: 'Great event!', rating: 5, date_review: '2023-11-01 01:00:00' },
        { id_user: 3, description_review: 'Great event!', rating: 5, date_review: '2023-11-01 01:00:00' },
        { id_user: 4, description_review: 'Great event!', rating: 5, date_review: '2023-11-01 01:00:00' },
        { id_user: 5, description_review: 'Great event!', rating: 5, date_review: '2023-11-01 01:00:00' },
        { id_user: 6, description_review: 'Great event!', rating: 5, date_review: '2023-11-01 01:00:00' },
        { id_user: 1, description_review: 'Great event!', rating: 5, date_review: '2023-11-01 01:00:00' },
        { id_user: 2, description_review: 'Great event!', rating: 5, date_review: '2023-11-01 01:00:00' },
        { id_user: 3, description_review: 'Great event!', rating: 5, date_review: '2023-11-01 01:00:00' },
        { id_user: 4, description_review: 'Great event!', rating: 5, date_review: '2023-11-01 01:00:00' },
        { id_user: 5, description_review: 'Great event!', rating: 5, date_review: '2023-11-01 01:00:00' },
        { id_user: 6, description_review: 'Great event!', rating: 5, date_review: '2023-11-01 01:00:00' }
    ]



};

exports.down = async pgm => {
    pgm.sql(`
        DELETE FROM users_type WHERE role_user = 'organizer';
        DELETE FROM users_type WHERE role_user = 'student';
        DELETE FROM users_type WHERE role_user = 'admin';
    `);

    pgm.sql(`
        DELETE FROM users WHERE name_user = 'Diogo Krub de Almeida';
        DELETE FROM users WHERE name_user = 'Daisuke Seki';
        DELETE FROM users WHERE name_user = 'Seisuke Yamada';
        DELETE FROM users WHERE name_user = 'Masashi Sawada';
        DELETE FROM users WHERE name_user = 'Takashi Nakamura';
        DELETE FROM users WHERE name_user = 'Yusuke Takahashi';
    `);

    pgm.sql(`
        DELETE FROM courses WHERE name_course = 'English Languages Courses 1.0';
        DELETE FROM courses WHERE name_course = 'English Languages Courses 1.5';
        DELETE FROM courses WHERE name_course = 'English Languages Courses 2.0';
        DELETE FROM courses WHERE name_course = 'English Languages Courses 2.5';
        DELETE FROM courses WHERE name_course = 'English Languages Courses 3.0';
        DELETE FROM courses WHERE name_course = 'English Languages Courses 3.5';
        DELETE FROM courses WHERE name_course = 'English Languages Courses 4.0';
        DELETE FROM courses WHERE name_course = 'English Languages Courses 4.5';
        DELETE FROM courses WHERE name_course = 'English Languages Courses 5.0';
        DELETE FROM courses WHERE name_course = 'English Languages Courses 5.5';
        DELETE FROM courses WHERE name_course = 'English Languages Courses 6.0';
        DELETE FROM courses WHERE name_course = 'English Languages Courses Advance 1';
        DELETE FROM courses WHERE name_course = 'English Languages Courses Advance 2';
        DELETE FROM courses WHERE name_course = 'Web Application Development';
        DELETE FROM courses WHERE name_course = 'Data Science';
        DELETE FROM courses WHERE name_course = 'Network and System Solutions';
        DELETE FROM courses WHERE name_course = 'UI/UX Design Specialist';
        DELETE FROM courses WHERE name_course = 'International Business Management';
        DELETE FROM courses WHERE name_course = 'Digital Marketing Specialist';
        DELETE FROM courses WHERE name_course = 'Advanced Digital Marketing';
        DELETE FROM courses WHERE name_course = 'Customer Relations Specialist';
        DELETE FROM courses WHERE name_course = 'Hospitality Management';
    `);

    pgm.sql(`
        DELETE FROM users_courses WHERE id_user = 1;
        DELETE FROM users_courses WHERE id_user = 2;
        DELETE FROM users_courses WHERE id_user = 3;
        DELETE FROM users_courses WHERE id_user = 4;
        DELETE FROM users_courses WHERE id_user = 5;
        DELETE FROM users_courses WHERE id_user = 6;
    `);

    pgm.sql(`
        DELETE FROM events WHERE name_event = 'Demo Day';
        DELETE FROM events WHERE name_event = 'RED Talks';
        DELETE FROM events WHERE name_event = 'RED Academy Open House';
    `);

    pgm.sql(`
        DELETE FROM attendees WHERE id_user = 1;
        DELETE FROM attendees WHERE id_user = 2;
        DELETE FROM attendees WHERE id_user = 3;
        DELETE FROM attendees WHERE id_user = 4;
        DELETE FROM attendees WHERE id_user = 5;
        DELETE FROM attendees WHERE id_user = 6;
    `);

    pgm.sql(`
        DELETE FROM reviews WHERE id_user = 1;
        DELETE FROM reviews WHERE id_user = 2;
        DELETE FROM reviews WHERE id_user = 3;
        DELETE FROM reviews WHERE id_user = 4;
        DELETE FROM reviews WHERE id_user = 5;
        DELETE FROM reviews WHERE id_user = 6;
    `);




};

