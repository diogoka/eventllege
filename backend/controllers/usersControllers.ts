import pool from '../db/db';
import express from 'express';

export const getUsers = async (req: express.Request, res: express.Response) => {
    try {
        const users = await pool.query('SELECT * FROM users');
        res.json(users.rows);
    } catch (err: any) {
        // console.log(err.message);
    }
}

export const getUser = async (req: express.Request, res: express.Response) => {

    const userId = req.params.id;

    try {
        const userResult = await pool.query(`
        SELECT
            users.id_user AS id,
            users_type.role_user AS role,
            users.name_user AS name,
            users.email_user AS email,
            users.postal_code_user AS postal_code,
            users.phone_user AS phone
        FROM
            users
        JOIN
            users_type ON users.id_user_type = users_type.id_user_type
        WHERE
            users.id_user = $1
        `, [userId]);

        const user = userResult.rows[0];
        user.postalCode = user.postal_code;
        delete user.postal_code;

        const courseResult = await pool.query(`
        SELECT
            courses.id_course AS course_id,
            courses.name_course AS course_name
        FROM
            users_courses
        JOIN
            courses ON users_courses.id_course = courses.id_course
        WHERE
            users_courses.id_user = $1
        `, [userId]);

        user.courseId = courseResult.rows[0].course_id;
        user.courseName = courseResult.rows[0].course_name;

        res.json(user);

    } catch (err: any) {
        console.log(err.message);
    }
}

export const createUser = async (req: express.Request, res: express.Response) => {

    const { id, type, courseId, name, email, postalCode, phone, avatar } = req.body;

    if (!/^[A-Za-z0-9]{10,}$/.test(id)) {
        res.status(500).send("Invalid ID");
        return;
    } else if (isNaN(type)) {
        res.status(500).send("Invalid User Type");
        return;
    } else if (isNaN(courseId)) {
        res.status(500).send("Invalid Course ID");
        return;
    } else if (!/^[^@]+@[^.]+\..+$/.test(email)) {
        res.status(500).send("Invalid Email");
        return;
    } else if (!/^[A-Za-z0-9]{3}[-\s]?[A-Za-z0-9]{3}$/.test(postalCode)) {
        res.status(500).send("Invalid Postal Code");
        return;
    } else if (!/^[0-9]+$/.test(phone)) {
        res.status(500).send("Invalid Phone Number");
        return;
    }

    try {
        // Add a new user to DB
        const user = await pool.query(`
            INSERT INTO
                users (id_user, id_user_type, name_user, email_user, postal_code_user, phone_user, avatar_user)
            VALUES
                ($1, $2, $3, $4, $5, $6, $7)
            RETURNING
                *;
            `, [id, type, name, email, postalCode, phone, avatar]);

        // Add user's course to DB
        await pool.query(`
            INSERT INTO
                users_courses (id_user, id_course)
            VALUES
                ($1, $2)
            RETURNING
                *;
        `, [id, courseId]);

        res.status(200).json(user.rows);
    } catch (err: any) {
        res.status(500).send(err.message);
    }
}