
import { connectDb } from "../config/db";

import { faker } from '@faker-js/faker';
import { Student } from "../models/Student";


const mockStudents=async()=>{
    await connectDb();
    await Student.deleteMany({});
    const students=[];
    for(let i=0;i<50;i++){
        students.push({
            name:faker.person.fullName(),
            age:faker.number.bigInt({min:18 ,max:30}),
            email:faker.internet.email(),
            address:faker.location.streetAddress(),

        })
    }
    await Student.insertMany(students);
}
mockStudents();

