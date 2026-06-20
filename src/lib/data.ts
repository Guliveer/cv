import cv from "@/data/cv.json";

export type Profile = typeof cv.profile;
export type Experience = typeof cv.experience[number];
export type EducationEntry = typeof cv.education[number];
export type Project = typeof cv.projects[number] & { stars?: number };

export const getProfile = (): Profile => cv.profile;
export const getExperience = (): Experience[] => cv.experience;
export const getEducation = (): EducationEntry[] => cv.education;
export const getProjects = (): Project[] => cv.projects;
