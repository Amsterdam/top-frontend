import { useEffect } from "react"
import { useNavigate } from "react-router-dom"

/**
 * Custom React hook that checks the URL for the second part of the "state" parameter 
 * and performs a redirect to the encoded URL if it exists.
 * 
 * The redirect path can be added by the `url_state` in the `auth.signinRedirect` method.
 * 
 *   const currentUrl = new URL(window.location.href)
 *   const fullPathWithQuery = `${ currentUrl.pathname }${ currentUrl.search }`
 *   auth.signinRedirect({        
 *      url_state: fullPathWithQuery 
 *   })
 * 
 *  Call the useRedirectFromState() hook in the `Home` component or landing page.
 *  useRedirectFromState must be in the browser context.
 * 
 */

export const useRedirectFromState = () => {
  const navigate = useNavigate()
  const url = new URL(window.location.href)
  const state = url.searchParams.get("state")

  useEffect(() => {
    if (!state) return
    const [, originalUrl] = state.split(";")
    if (originalUrl) {
      const decodedUrl = decodeURIComponent(originalUrl)
      window.history.replaceState({}, document.title, window.location.pathname)
      navigate(decodedUrl)
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [navigate])
}

export default useRedirectFromState
