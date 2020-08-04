import React, { useContext } from 'react'
import RenderSites from 'components/Sites/renderSites';
import { SiteContext } from 'hooks/siteContext';
import Loader from 'components/shared/Loader';

const Favorites = () => {
  const { sites, loading } = useContext(SiteContext);

  return (
    loading ? <Loader /> :
    <RenderSites
      sites={sites?.filter(site => site.favorite === true)}
      isFavorite
    />
  )
};

export default Favorites;
