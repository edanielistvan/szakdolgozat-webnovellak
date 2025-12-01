import { graphql } from '../graphql'
import { graphQLClient } from './graphql'

const mostReadWebnovelsGraphQL = graphql(`
query MostReadWebnovels {
    mostReadWebnovels {
        id
        title
        image
        rating
        reads
        user {
            id
            name
        }
    }
}
`)

export const mostReadWebnovelsQuery = {
  queryKey: ['mostReadWebnovels'],
  queryFn: async () => {
    return graphQLClient.request(mostReadWebnovelsGraphQL);
  }
}

const longestWebnovelsGraphQL = graphql(`
query LongestWebnovels {
    longestWebnovels {
        id
        title
        image
        rating
        reads
        
        user {
            id
            name
        }
    }
}`)

export const longestWebnovelsQuery = {
  queryKey: ['longestWebnovels'],
  queryFn: async () => {
    return graphQLClient.request(longestWebnovelsGraphQL);
  }
}

const mostLikedWebnovelsGraphQL = graphql(`
query MostLikedWebnovels {
    mostLikedWebnovels {
        id
        title
        image
        rating
        reads
        
        user {
            id
            name
        }
    }
}`)

export const mostLikedWebnovelsQuery = {
  queryKey: ['mostLikedWebnovels'],
  queryFn: async () => {
    return graphQLClient.request(mostLikedWebnovelsGraphQL);
  }
}