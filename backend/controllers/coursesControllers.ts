import pool from "../db/db";
import express from "express";

export const getCourses = async (req: express.Request, res: express.Response) => {
  try {
    const courses = await pool.query("SELECT * FROM courses");
    const resData = courses.rows.map((row: any) => {
      return {
        id: row.id_course,
        name: row.name_course,
        category: row.category_course,
      };
    });
    res.json(resData);
  } catch (_err) {
    // console.log(err.message);
  }
};

export const getCategories = async (req: express.Request, res: express.Response) => {
  try {
    const courseCategory = await pool.query("SELECT DISTINCT courses.category_course FROM courses");
    res.json(courseCategory.rows);
  } catch (error:any) {
    console.log(error.message);
  }
};
