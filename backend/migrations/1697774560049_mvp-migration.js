/* eslint-disable camelcase */

exports.shorthands = undefined;

const tableNameUsersType = 'users_type';
const tableNameUsers = 'users';
const users_courses = 'users_courses';
const courses = 'courses';
const events = 'events';
const reviews = 'reviews';
const events_reviews = 'events_reviews';
const attendees = 'attendees';

exports.up = async pgm => {

    pgm.createTable(tableNameUsersType, {
        id_user_type: 'serial primary key',
        role_user: { type: 'varchar(100)', notNull: true }
    });

    pgm.createTable(tableNameUsers, {
        id_user: 'serial primary key',
        id_user_type: {
            type: 'integer',
            references: `${tableNameUsersType}(id_user_type)`,
            notNull: true
        },
        name_user: { type: 'varchar(500)', notNull: true },
        email_user: { type: 'varchar(500)', notNull: true },
        postal_code_user: { type: 'varchar(500)', notNull: false },
        phone_user: { type: 'varchar(500)', notNull: false },
        avatar_user: { type: 'bytea', notNull: false }
    });

    pgm.addConstraint(tableNameUsers, 'fk_user_user_type', {
        foreignKeys: {
            columns: 'id_user_type',
            references: `${tableNameUsersType}(id_user_type)`,
        }
    });

    pgm.createTable(courses, {
        id_course: 'serial primary key',
        name_course: { type: 'varchar(500)', notNull: true },
        category_course: { type: 'varchar(500)', notNull: true },
    });

    pgm.createTable(users_courses, {
        id_user_course: 'serial primary key',
        id_user: {
            type: 'integer',
            references: `${tableNameUsers}(id_user)`,
            notNull: true
        },
        id_course: {
            type: 'integer',
            references: `${courses}(id_course)`,
            notNull: true
        },
    });

    pgm.addConstraint(users_courses, 'fk_user_course_user', {
        foreignKeys: {
            columns: 'id_user',
            references: `${tableNameUsers}(id_user)`,
        }
    });

    pgm.addConstraint(users_courses, 'fk_user_course_course', {
        foreignKeys: {
            columns: 'id_course',
            references: `${courses}(id_course)`,
        }
    });

    pgm.createTable(events, {
        id_event: 'serial primary key',
        name_event: { type: 'varchar(500)', notNull: true },
        description_event: { type: 'varchar(500)', notNull: true },
        date_event_start: { type: 'timestamp', notNull: true },
        date_event_end: { type: 'timestamp', notNull: true },
        location_event: { type: 'varchar(500)', notNull: true },
        capacity_event: { type: 'integer', notNull: true },
        price_event: { type: 'integer', notNull: true },
        image_event: { type: 'bytea', notNull: false },
        type_event: { type: 'varchar(500)', notNull: true }
    });

    pgm.createTable(reviews, {
        id_review: 'serial primary key',
        id_user: {
            type: 'integer',
            references: `${tableNameUsers}(id_user)`,
            notNull: true
        },
        description_review: { type: 'varchar(500)', notNull: true },
        rating: { type: 'integer', notNull: true },
        date_review: { type: 'timestamp', notNull: true },
    });

    pgm.createTable(events_reviews, {
        id_event_review: 'serial primary key',
        id_event: {
            type: 'integer',
            references: `${events}(id_event)`,
            notNull: true
        },
        id_review: {
            type: 'integer',
            references: `${reviews}(id_review)`,
            notNull: true
        },
    });

    pgm.addConstraint(events_reviews, 'fk_event_review_event', {
        foreignKeys: {
            columns: 'id_event',
            references: `${events}(id_event)`,
        }
    });

    pgm.addConstraint(events_reviews, 'fk_event_review_review', {
        foreignKeys: {
            columns: 'id_review',
            references: `${reviews}(id_review)`,
        }
    });

    pgm.createTable(attendees, {
        id_attendee: 'serial primary key',
        id_user: {
            type: 'integer',
            references: `${tableNameUsers}(id_user)`,
            notNull: true
        },
        id_event: {
            type: 'integer',
            references: `${events}(id_event)`,
            notNull: true
        },
    });

    pgm.addConstraint(attendees, 'fk_attendee_user', {
        foreignKeys: {
            columns: 'id_user',
            references: `${tableNameUsers}(id_user)`,
        }
    });

    pgm.addConstraint(attendees, 'fk_attendee_event', {
        foreignKeys: {
            columns: 'id_event',
            references: `${events}(id_event)`,
        }
    });

};

exports.down = async pgm => {
    pgm.dropTable(attendees);
    pgm.dropTable(events_reviews);
    pgm.dropTable(reviews);
    pgm.dropTable(events);
    pgm.dropTable(users_courses);
    pgm.dropTable(courses);
    pgm.dropTable(tableNameUsers);
    pgm.dropTable(tableNameUsersType);
};

