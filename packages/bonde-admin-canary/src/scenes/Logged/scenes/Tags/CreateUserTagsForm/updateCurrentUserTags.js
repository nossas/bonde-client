import { CURRENT_USER_QUERY } from 'services/auth'

export default (cache, { data: { createUserTags } }) => {
  if (createUserTags && createUserTags.json) {
    const { user } = cache.readQuery({ query: CURRENT_USER_QUERY })
    cache.writeQuery({
      query: CURRENT_USER_QUERY,
      data: {
        user: {
          ...user,
          tags: createUserTags.json
        }
      }
    })
  }
}
