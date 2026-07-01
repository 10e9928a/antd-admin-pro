import { useRouter } from 'vue-router'

export function useError() {
  const router = useRouter()
  const handleBack = () => {
    router.replace({
      path: '/',
    })
  }

  return {
    handleBack,
  }
}
