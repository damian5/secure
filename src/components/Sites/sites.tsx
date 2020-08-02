import React, { useEffect, useState } from 'react';
import { useFirebaseDB } from 'hooks/useFirebaseDB';
import { Site } from 'interfaces/dataAPI';
import { SitesWrapper } from './styles';
import { Link } from 'react-router-dom'
import RenderSites from './renderSites';
import Loader from 'components/shared/Loader';

const Sites = () => {
  const { getSites, loading } = useFirebaseDB()
  const [sites, setSites] = useState<Site[] | null>(null);

  useEffect(() => {
    let mounted: boolean = true

    if (mounted) {
      getSites().then((result: Site[]) => {
        setSites(result)
      })
    }

    return() => { mounted = false }
  // eslint-disable-next-line
  }, [])

  return(
    <SitesWrapper>
      {loading ? <Loader /> : (
        <>
          <RenderSites sites={sites} loading={loading}/>
          <Link to='/manage-site/'>Add new App</Link>
        </>
      )}
    </SitesWrapper>
  )
}

export default Sites;