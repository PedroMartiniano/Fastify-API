import { compare } from 'bcrypt'
import { expect, describe, it, beforeEach } from 'vitest'
import { InMemoryCourseRepository } from '../repositories/in-memory/in-memory-course-repository'
import { CourseClass } from './course'
import { AppError } from '../errors/AppError'

let courseRepository: InMemoryCourseRepository
let courseUseCase: CourseClass

describe('Should test course components', () => {
    beforeEach(() => {
        courseRepository = new InMemoryCourseRepository
        courseUseCase = new CourseClass(courseRepository)
    })
    it('should create a course', async () => {
        const course = await courseUseCase.executeCreateCourse({
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

    it('should get all courses', async () => {
        const courses = await courseUseCase.getAllCourses()

        expect(courses).toEqual([
            { id: '123', name: 'course', description: 'course description', rating: 0, image: 'abc', price: 10, status: 1 },
            { id: '321', name: 'course2', description: 'course description2', rating: 0, image: 'cba', price: 15, status: 1 }
        ])
    })

    it('should edit a course', async () => {
        const course = await courseUseCase.executeCreateCourse({
            name: 'nome curso',
            description: 'descrição do curso',
            image: 'abc',
            price: 109.90
        })

        const courseEdited = await courseUseCase.executeEditCourse({ name: 'curso editado', description: 'descrição editada', image: 'abcde', price: 99.90 }, course.id)

        expect(courseEdited).toEqual({ id: course.id, name: 'curso editado', description: 'descrição editada', image: 'abcde', price: 99.90, rating: course.rating, status: course.status })
    })

    it('should edit a course that dont exists', async () => {
        expect(courseUseCase.executeEditCourse({ name: 'curso editado', description: 'descrição editada', image: 'abcde', price: 99.90 }, 'invalid-id')).rejects.toBeInstanceOf(AppError)
    })

    it('should edit a course that is deleted', async () => {
        const course = await courseUseCase.executeCreateCourse({
            name: 'nome curso',
            description: 'descrição do curso',
            image: 'abc',
            price: 109.90
        })

        const courseDeleted = await courseUseCase.executeDeleteCourse(course.id)

        expect(courseUseCase.executeEditCourse({ name: 'curso editado', description: 'descrição editada', image: 'abcde', price: 99.90 }, courseDeleted.id)).rejects.toBeInstanceOf(AppError)
    })

    it('should soft delete a course', async () => {
        const course = await courseUseCase.executeCreateCourse({
            name: 'nome curso',
            description: 'descrição do curso',
            image: 'abc',
            price: 109.90
        })

        const courseDeleted = await courseUseCase.executeDeleteCourse(course.id)

        expect(courseDeleted.status).toBe(0)
    })

    it('should soft delete a course that dont exist', async () => {
        expect(courseUseCase.executeDeleteCourse('invalid-id')).rejects.toBeInstanceOf(AppError)
    })

    it('should soft delete a course that is already deleted', async () => {
        const course = await courseUseCase.executeCreateCourse({
            name: 'nome curso',
            description: 'descrição do curso',
            image: 'abc',
            price: 109.90
        })

        const courseDeleted = await courseUseCase.executeDeleteCourse(course.id)

        expect(courseUseCase.executeDeleteCourse(courseDeleted.id)).rejects.toBeInstanceOf(AppError)
    })
})