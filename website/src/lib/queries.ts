"use server"
import { sanityClient } from '@/lib/sanity'

interface Profile {
    name: string
    location: {
        city: string
        country: string
    }
    email: string
    bio: string
    image: {
        asset: {
            _ref: string
        }
    }
    birthday: string
    languages: {
        name: string
        prof: string
    }[]
    links: {
        type: string
        name: string
        url: string
    }[]
    skills: string[]
}

export const getProfile = async (): Promise<Profile | null> => {
    const query = `*[_type == "profile"][0]{
        name,
        image,
        birthday,
        location,
        email,
        bio,
        links,
        languages,
        skills,
    }`
    return await sanityClient.fetch(query, {}, {next: { revalidate: 600 }})
}

interface Experience {
    company: string
    url: string
    companyLogo: {
        asset: {
            _ref: string
        }
    }
    position: string
    startDate: string
    endDate: string
    description: string
}

export const getExperience = async (): Promise<Experience[]> => {
    const query = `*[_type == "experience"] | order(startDate desc){
        company,
        url,
        companyLogo,
        position,
        startDate,
        endDate,
        description
    }`
    return await sanityClient.fetch(query, {}, {next: { revalidate: 600 }})
}

interface EducationEntry {
    school: string
    degree: string
    field: string
    startDate: string
    endDate: string
    description: string
}

export const getEducation = async (): Promise<EducationEntry[]> => {
    const query = `*[_type == "education"] | order(startDate desc){
        school,
        degree,
        field,
        startDate,
        endDate,
        description
    }`
    return await sanityClient.fetch(query, {}, {next: { revalidate: 600 }})
}

interface Project {
    stars: number;
    title: string
    description: string
    github: string
    technologies: string[]
}

export const getProjects = async (): Promise<Project[]> => {
    const query = `*[_type == "project"] | order(_createdAt desc){
        title,
        description,
        github,
        technologies[]
    }`
    return await sanityClient.fetch(query, {}, {next: { revalidate: 600 }})
}
