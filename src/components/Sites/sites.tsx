import React, { useContext } from 'react';
import RenderSites from './renderSites';
import { SiteContext } from 'hooks/siteContext';
import Loader from 'components/shared/Loader';

const Sites = () => {
  const { sites, loading } = useContext(SiteContext)
   
  return loading ? <Loader /> : <RenderSites sites={sites} />
}

export default Sites;