import React, { useEffect, useState, useCallback } from 'react';
import { useFirebaseDB } from 'hooks/useFirebaseDB';
import { CircularProgress } from '@material-ui/core';
import { Site, UserData } from 'interfaces/dataAPI';
import { SitesWrapper } from './styles';
import ManageSite from 'components/Sites/ManageSite';

interface ModalProps {
  isOpen: boolean;
  site: Site;
}

const Sites = () => {
  const { getSites, loading } = useFirebaseDB()
  const [sites, setSites] = useState<Site[] | null>(null);
  const [modalInfo, setModalInfo] = useState<ModalProps>({ isOpen: false, site: null })

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
    setModalInfo({
      isOpen: true,
      site: site,
    });
  }

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
        <button onClick={
          () => setModalInfo(prevState => ({isOpen: true, site: prevState.site}))
        }>
          add new app
        </button>
        <ManageSite
          fetchData={fetchData}
          isOpen={modalInfo.isOpen}
          site={modalInfo.site}
          onClose={() => setModalInfo({isOpen: false, site: null})}
          onChange={()=>{}}
        />
      </div>
    </SitesWrapper>
  )
}

export default Sites;