import React, { useEffect, useState, useCallback } from 'react';
import { useFirebaseDB } from 'hooks/useFirebaseDB';
import { CircularProgress } from '@material-ui/core';
import { Site } from 'interfaces/dataAPI';
import { SitesWrapper } from './styles';
import {Link, withRouter, RouteComponentProps} from 'react-router-dom'

interface ModalProps {
  isOpen: boolean;
  site: Site;
}

const Sites = (props: RouteComponentProps) => {
  const { getSites, loading } = useFirebaseDB()
  const [sites, setSites] = useState<Site[] | null>(null);

  const fetchData = useCallback(() => {
    getSites().then((result: Site[]) => setSites(result))
  }, [getSites]);

  useEffect(() => {
    let mounted: boolean = true
    mounted && fetchData()
    return() => { mounted = false }
    // eslint-disable-next-line
  }, [])

  const handleSiteClick = (e: React.MouseEvent<HTMLDivElement, MouseEvent>, site: Site) => {
    e.stopPropagation();
    e.preventDefault();
    props.history.push('/manage-site', site.id)
  }

  // TO-DO: move this to a shared component in order to use it in favorites
  const renderSites = () => {
    let JSXElement: JSX.Element | JSX.Element[] = null
    if(loading) {
      JSXElement = <CircularProgress />;
    } else {
      if(sites?.length > 0) {
        JSXElement = sites?.map((site: Site, i: number) =>
          <div
            onClick={(e) => handleSiteClick(e, site)}
            key={i}
            style={{border: '1px solid grey', cursor: 'pointer'}}
          >
            <h1>{site.siteName}</h1>
            <p>{site.userName}</p>
            <p>{site.password}</p>
          </div>
        ).reverse();
      } else {
        JSXElement = <div>Crate your first site here</div>;
      }
    }
    return JSXElement;
  }

  return(
    <SitesWrapper>
      <input placeholder="search"/>
      <div>
        {renderSites()}
        <Link to='/manage-site/'>Add new App</Link>
      </div>
    </SitesWrapper>
  )
}

export default withRouter(Sites);