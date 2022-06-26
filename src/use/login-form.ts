import * as yup from 'yup'
import { useField, useForm } from 'vee-validate'
import { useRouter } from 'vue-router'
import { useStore } from 'vuex'

export default function useLoginForm()
{
  const store = useStore()
  const router = useRouter()
  const { handleSubmit } = useForm()

  const MIN_LEHGTH = 24
  const { value: password, errorMessage: pError, handleBlur: pBlur } = useField(
    'password',
    yup
      .string()
      .trim()
      .min(24, `id сайта должен содержать ${MIN_LEHGTH} символа`)
      .max(24, `id сайта должен содержать ${MIN_LEHGTH} символа`),
  )

  const onSubmit = handleSubmit(async (values) =>
  {
    try
    {
      await store.dispatch('auth/login')
      router.push('/')
    }
    catch (e)
    {

    }
  })


  return {
    password,
    pError,
    pBlur,
    onSubmit,
  }
}