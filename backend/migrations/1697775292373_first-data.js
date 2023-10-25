/* eslint-disable camelcase */

exports.shorthands = undefined;

exports.up = async pgm => {
    pgm.sql(`
        INSERT INTO users_type (role_user) VALUES ('organizer');
        INSERT INTO users_type (role_user) VALUES ('student');
        INSERT INTO users_type (role_user) VALUES ('admin');
    `);

    const usersData = [
        { id_user: 'A', id_user_type: 1, name_user: 'Diogo Krub de Almeida', email_user: 'diogokalmeida@gmail.com', postal_code_user: 'V5K2X1', phone_user: '123-456-7890' },
        { id_user: 'B', id_user_type: 1, name_user: 'Daisuke Seki', email_user: 'ds@example.com', postal_code_user: '54321', phone_user: '987-654-3210' },
        { id_user: 'C', id_user_type: 1, name_user: 'Seisuke Yamada', email_user: 'sei@gmail.com', postal_code_user: '12345', phone_user: '123-456-7890' },
        { id_user: 'D', id_user_type: 1, name_user: 'Masashi Sawada', email_user: 'mas@gmail.com', postal_code_user: '54321', phone_user: '987-654-3210' },
        { id_user: 'E', id_user_type: 2, name_user: 'Takashi Nakamura', email_user: 'takashi@gmail.conm', postal_code_user: 'V5K2X1', phone_user: '123-456-7890' },
        { id_user: 'F', id_user_type: 2, name_user: 'Yusuke Takahashi', email_user: 'yt@gmail.com', postal_code_user: '54321', phone_user: '987-654-3210' },

    ];

    for (const user of usersData) {
        await pgm.sql(`
            INSERT INTO users (id_user, id_user_type, name_user, email_user, postal_code_user, phone_user)
            VALUES ('${user.id_user}', ${user.id_user_type}, '${user.name_user}', '${user.email_user}', '${user.postal_code_user}', '${user.phone_user}');
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
        { id_user: 'A', id_course: 14 },
        { id_user: 'B', id_course: 14 },
        { id_user: 'C', id_course: 14 },
        { id_user: 'D', id_course: 14 },
        { id_user: 'E', id_course: 16 },
        { id_user: 'F', id_course: 16 },

    ]

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
    ]

    for (const tag of tags) {
        await pgm.sql(`
            INSERT INTO tags (name_tag)
            VALUES ('${tag.name_tag}');
        `);
    }

    const events = [
        {
            id_owner: 'A',
            name_event: 'Demo Day',
            description_event: 'Demo Day is a showcase of the projects that our students have been working on during their time at RED Academy. This is a great opportunity for students to show off their work to friends, family, and industry professionals. It is also a chance for prospective students to get a glimpse of what they can expect to learn at RED Academy.',
            date_event_start: '2023-11-01 01:00:00',
            date_event_end: '2023-11-01 03:00:00',
            location_event: '1490 W Broadway #200, Vancouver, BC V6H 4E8',
            capacity_event: 50,
            price_event: 0,
            image_event: null,
            category_event: 'Tech'
        },
        {
            id_owner: 'A',
            name_event: 'RED Talks',
            description_event: 'RED Talks is a series of presentations by industry experts on a wide range of topics relevant to people in tech. RED Talks are a great opportunity to learn something new and network with other people in the industry.',
            date_event_start: '2023-11-01 01:00:00',
            date_event_end: '2023-11-01 03:00:00',
            location_event: '1490 W Broadway #200, Vancouver, BC V6H 4E8',
            capacity_event: 50,
            price_event: 0,
            image_event: null,
            category_event: 'Tech'
        },
        {
            id_owner: "B",
            name_event: 'RED Academy Open House',
            description_event: 'Our Open House is a great opportunity to learn more about our programs, tour our campus, and meet our team. Come and see why RED Academy is a great place to learn.',
            date_event_start: '2023-11-01 01:00:00',
            date_event_end: '2023-11-01 03:00:00',
            location_event: '1490 W Broadway #200, Vancouver, BC V6H 4E8',
            capacity_event: 50,
            price_event: 0,
            image_event: null,
            category_event: 'Tech'
        }
    ]


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
    ]

    for (const event_tag of events_tags) {
        await pgm.sql(`
            INSERT INTO events_tags (id_event, id_tag)
            VALUES (${event_tag.id_event}, ${event_tag.id_tag});
        `);
    }

    const attendees = [
        { id_user: 'C', id_event: 1 },
        { id_user: 'D', id_event: 2 },
        { id_user: 'E', id_event: 2 },
    ]

    for (const attendee of attendees) {
        await pgm.sql(`
            INSERT INTO attendees (id_user, id_event)
            VALUES ('${attendee.id_user}', ${attendee.id_event});
        `);
    }


    const reviews = [
        { id_user: 'C', description_review: 'Great event!', rating: 5, date_review: '2023-11-01 01:00:00' },
        { id_user: 'D', description_review: 'Great event!', rating: 3, date_review: '2023-11-01 01:00:00' },
        { id_user: 'E', description_review: 'Great event!', rating: 2, date_review: '2023-11-01 01:00:00' },
    ]

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
    ]

    for (const event_review of events_reviews) {
        await pgm.sql(`
            INSERT INTO events_reviews (id_event, id_review)
            VALUES (${event_review.id_event}, ${event_review.id_review});
        `);
    }


};

exports.down = async pgm => {


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

