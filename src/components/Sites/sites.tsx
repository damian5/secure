import React, { useEffect, useState, useCallback } from 'react';
import { useFirebaseDB } from 'hooks/useFirebaseDB';
import { CircularProgress } from '@material-ui/core';
import { Site } from 'interfaces/dataAPI';
import { SitesWrapper } from './styles';
import {Link, withRouter, RouteComponentProps} from 'react-router-dom'

const Sites = (props: RouteComponentProps) => {
  const { getSites, loading } = useFirebaseDB()
  const [sites, setSites] = useState<Site[] | null>(null);
  const [showPassword, setShowPassword] = useState<boolean>(false);

  const fetchData = useCallback(() => {
    getSites().then((result: Site[]) => setSites(result))
  }, [getSites]);

  useEffect(() => {
    let mounted: boolean = true
    mounted && fetchData()
    return() => { mounted = false }
    // eslint-disable-next-line
  }, [])

  const handleSiteClick = (e: React.MouseEvent<HTMLDivElement, MouseEvent>, siteId: string) => {
    e.stopPropagation();
    e.preventDefault();
    props.history.push('/manage-site', siteId);
  }

  // TO-DO: move this to a shared component in order to use it in favorites
  const renderSites = () => {
    let JSXElement: JSX.Element | JSX.Element[] = null
    if(loading) {
      JSXElement = <CircularProgress />;
    } else {
      if(sites?.length > 0) {
        JSXElement = sites?.map((site: Site, i: number) => {
          const { siteName, userName, id, password, createdAt, modifiedAt, url } = site;
          return (
            <div
              onClick={(e) => handleSiteClick(e, id)}
              key={i}
              style={{border: '1px solid grey', cursor: 'pointer'}}
            >
              <h1>{siteName}</h1>
              <p>{userName}</p>
              <div>
                <p>{showPassword ? password : Array(password.length).join(" * ")}</p>
                <button type="button" onClick={(e) => {
                  e.stopPropagation()
                  setShowPassword(!showPassword)
                }
                }>Show Password</button>
              </div>
              <p>{url}</p>
              <p>Modified at {modifiedAt}</p>
              <p>Created at {createdAt}</p>
            </div>
          )
        }).reverse();
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