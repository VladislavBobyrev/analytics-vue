
import { Commit } from 'vuex'

const LEAD_HIT_SITE_ID = 'leadhit-site-id'


export default {
  namespaced: true,
  state()
  {
    return {
      key: localStorage.getItem(LEAD_HIT_SITE_ID),
    }
  },
  mutations: {
    setkey(state:any, key:string)
    {
      state.key = key
      state.isAuth = true
      localStorage.setItem(LEAD_HIT_SITE_ID, key)
    },
    logout(state:any)
    {
      state.key = null
      localStorage.removeItem(LEAD_HIT_SITE_ID)
    },
  },
  actions: {
    async login({ commit }: { commit: Commit })
    {
      try
      {
        const response = await fetch('https://track-api.leadhit.io/client/test_auth', {
          method: 'GET', // *GET, POST, PUT, DELETE, etc.
          mode: 'cors', // no-cors, *cors, same-origin
          cache: 'no-cache', // *default, no-cache, reload, force-cache, only-if-cached
          credentials: 'same-origin', // include, *same-origin, omit
          headers: {
            'Content-Type': 'application/json',
            'Api-Key': '5f8475902b0be670555f1bb3:eEZn8u05G3bzRpdL7RiHCvrYAYo',
            'Leadhit-Site-Id': '5f8475902b0be670555f1bb3',
          },
        })
        if (response.status)
        {
          await commit('setkey', '5f8475902b0be670555f1bb3')
        }
        return await response
      }
      catch (e) {}
    },
  },
}