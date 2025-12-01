import type { LoginInput, RegisterInput } from '@/graphql/graphql';
import { graphql } from '../graphql'
import { graphQLClient } from './graphql'

export const CSRFTokenQuery = {
  queryKey: ['csrf-token'],
  queryFn: async () => {
    await fetch('http://localhost:8000/sanctum/csrf-cookie', {
        credentials: 'include',
    });

    const xsrfToken = document.cookie
        .split('; ')
        .find(cookie => cookie.startsWith('XSRF-TOKEN='))
        ?.split('=')[1];

    if (!xsrfToken) {
        console.error('XSRF-TOKEN not found in cookies');
        return null;
    }

    const decoded = decodeURIComponent(xsrfToken);

    graphQLClient.setHeader('X-XSRF-TOKEN', decoded);

    return decoded;
  }
}

const currentUserGraphQL = graphql(`
query CurrentUser {
  me {
    id
    name
    email
    role
    created_at
  }
}`)

export const currentUserQuery = {
  queryKey: ['currentUser'],
  queryFn: async () => {
    return graphQLClient.request(currentUserGraphQL);
  }
}

const registerGraphQL = graphql(`
mutation Register($input: RegisterInput!) {
    register(input: $input) {
        id
        name
        email
        role
        created_at
    }
}
`)

export const registerMutation = {
  mutationKey: ['register'],
  mutationFn: async (input : RegisterInput) => {
    return graphQLClient.request(registerGraphQL, { input });
  }
}

const loginGraphQL = graphql(`
mutation Login($input: LoginInput!) {
    login(input: $input) {
        id
        name
        email
        role
        created_at
    }
}
`)

export const loginMutation = {
  mutationKey: ['login'],
  mutationFn: async (input : LoginInput) => {
    return graphQLClient.request(loginGraphQL, { input });
  }
}

const logoutGraphQL = graphql(`
mutation Logout {
    logout {
        id
    }
}
`)

export const logoutMutation = {
  mutationKey: ['logout'],
  mutationFn: async () => {
    return graphQLClient.request(logoutGraphQL);
  }
}