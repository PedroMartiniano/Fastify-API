import { compare } from 'bcrypt'
import { expect, describe, it, beforeEach } from 'vitest'
import { InMemoryCourseRepository } from '../repositories/in-memory/in-memory-course-repository'
import { CourseClass } from './course'

let courseRepository: InMemoryCourseRepository
let courseUseCase: CourseClass

describe('Should test course components', () => {
    beforeEach(() => {
        courseRepository = new InMemoryCourseRepository
        courseUseCase = new CourseClass(courseRepository)
    })
    it('should create a course', async () => {
        const course  = await courseUseCase.executeCreateCourse({
            name: 'nome course',
            description: 'descrição do curso',
            image: 'abc',
            price: 109.90
        })

        expect(course.id).toEqual(expect.any(String))
    })

    it('should get a course by id', async () => {
        const course = await courseUseCase.executeCreateCourse({
            name: 'nome curso',
            description: 'descrição do curso',
            image: 'abc',
            price: 109.90
        })

        const getCourse = await courseUseCase.getCourseById(course.id)

        expect(getCourse.id).toEqual(expect.any(String))
    })

    it('should not get a course by id', async () => {
        const course = await courseUseCase.getCourseById('not-valid-id')

        expect(course).toBe(null)
    })
})