import axios, { AxiosRequestConfig } from 'axios'

// TODO: all functions to be replaced by graphql queries to bratislava api somewhere else in the project
export const fetchProjects = async (page: number) => {
  const axiosConfig: AxiosRequestConfig = {
    headers: {
      'Content-Type': 'application/json; charset=utf-8',
    },
  }

  return axios.get(
    `${process.env.NEXT_PUBLIC_TEMPORARY_API}user/projects?page=${page}&pageSize=99`,
    axiosConfig,
  )
}
export const fetchProject = async (id: string) => {
  const axiosConfig: AxiosRequestConfig = {
    headers: {
      'Content-Type': 'application/json; charset=utf-8',
    },
  }

  return axios.get(`${process.env.NEXT_PUBLIC_TEMPORARY_API}user/projects/${id}`, axiosConfig)
}

export const upvoteProject = async (id: number) => {
  const axiosConfig: AxiosRequestConfig = {
    headers: {
      'Content-Type': 'application/json; charset=utf-8',
    },
  }

  return axios.put(
    `${process.env.NEXT_PUBLIC_TEMPORARY_API}user/projects/${id}/up`,
    {},
    axiosConfig,
  )
}

export const downvoteProject = async (id: number) => {
  const axiosConfig: AxiosRequestConfig = {
    headers: {
      'Content-Type': 'application/json; charset=utf-8',
    },
  }

  return axios.put(
    `${process.env.NEXT_PUBLIC_TEMPORARY_API}user/projects/${id}/down`,
    {},
    axiosConfig,
  )
}